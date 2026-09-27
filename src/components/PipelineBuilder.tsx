import React, { useState, useMemo, useRef } from 'react';
import { PromptItem } from '../data/promptsLoader';
import { METHODOLOGY_DESIGNS } from '../data/methodologyMatrix';
import { AUDIT_MODULES } from '../data/auditModules';
import { SAMPLE_AUDIT_REPORTS } from '../data/sampleAudits';
import { PaperType, ProjectState, AuditIntakeForm, AuditReportData, UploadedPdfInfo } from '../types';
import { generateSamplePdfBase64 } from '../utils/samplePdf';
import { 
  GitBranch, 
  Play, 
  Copy, 
  Check, 
  Download, 
  Layers, 
  ShieldCheck, 
  BookOpen, 
  Sparkles, 
  FileText, 
  AlertTriangle,
  ArrowRight,
  RotateCcw,
  CheckCircle2,
  Info,
  Upload,
  FileCheck2,
  Cpu,
  ShieldAlert,
  Loader2,
  RefreshCw,
  ExternalLink,
  ChevronRight,
  FileSearch,
  CheckCircle
} from 'lucide-react';

export type PipelineStep = 'upload' | 'taxonomy' | 'prompt' | 'audit' | 'dag';

interface PipelineBuilderProps {
  prompts: PromptItem[];
  onOpenPromptInExplorer?: (promptId: string) => void;
  onAuditReportGenerated?: (report: AuditReportData) => void;
  onNavigateToTab?: (tab: 'ledger' | 'latex') => void;
}

export const PipelineBuilder: React.FC<PipelineBuilderProps> = ({ 
  prompts, 
  onOpenPromptInExplorer,
  onAuditReportGenerated,
  onNavigateToTab
}) => {
  const [currentStep, setCurrentStep] = useState<PipelineStep>('upload');

  // Uploaded PDF State
  const [uploadedPdf, setUploadedPdf] = useState<UploadedPdfInfo | null>(() => {
    // Initial default: DiD sample
    const sampleTitle = 'Minimum Wage Dynamics and Local Labor Market Reallocation';
    const sampleAuthor = 'A. Huerta & J. Miller (NBER Working Paper)';
    const sampleExcerpt = 'Y_{it} = \\alpha_i + \\gamma_t + \\beta Treat_{it} + X_{it}\' \\delta + \\varepsilon_{it} with county clustering.';
    return {
      fileName: 'minimum_wage_reallocation_did.pdf',
      fileSize: 428000,
      base64: generateSamplePdfBase64(sampleTitle, sampleAuthor, sampleExcerpt),
      mimeType: 'application/pdf',
      uploadedAt: 'Pre-loaded Sample'
    };
  });

  const [isAnalyzingPdf, setIsAnalyzingPdf] = useState(false);
  const [analysisError, setAnalysisError] = useState<string | null>(null);
  const [analysisSource, setAnalysisSource] = useState<'gemini' | 'heuristic_fallback' | 'manual'>('gemini');
  const [analysisRationale, setAnalysisRationale] = useState<string>(
    'Automatically classified as Empirical (DiD) using staggered county-level variation and two-way fixed effects.'
  );

  // Manuscript Intake & Taxonomy State
  const [intake, setIntake] = useState<AuditIntakeForm>({
    title: 'Minimum Wage Dynamics and Local Labor Market Reallocation: Evidence from Staggered County Policies',
    authors: 'A. Huerta & J. Miller',
    paperType: 'empirical',
    projectState: 'CLOSED',
    primaryMethod: 'did',
    abstract: 'We exploit county-level variation in minimum wage adjustments across the United States between 2008 and 2019 to estimate labor reallocation across low-wage industries. Using administrative establishment-level records, we test whether statutory wage increases induce compositional shifts toward higher-productivity firms.',
    manuscriptExcerpt: `Equation (3): Y_{it} = \\alpha_i + \\gamma_t + \\beta \\text{Treat}_{it} + X_{it}' \\delta + \\varepsilon_{it}
where \\alpha_i are county fixed effects, \\gamma_t are calendar year fixed effects, and \\text{Treat}_{it} indicates an enacted local minimum wage threshold exceeding $10.00/hour. Standard errors are clustered at the county level (312 clusters).
Headline Results (Table 2): \\hat{\\beta} = -0.042 (SE = 0.012, p = 0.0005). Pre-trend tests in Figure 3 evaluate event study leads t-4 to t-1 against t=0.`,
    targetJournal: 'American Economic Review',
    includeLiteratureVerification: true,
    includeReproducibility: false,
    selectedModules: [
      'submission_readiness',
      'consistency_audit',
      'econometric_audit',
      'causal_identification',
      'estimand_identification',
      'inference_dependence',
      'robustness_falsification',
      'journal_targeting',
      'implementation_changeset'
    ],
    specificConcerns: 'Scrutinize staggered adoption two-way fixed effects decomposition and commuting zone spatial correlation.'
  });

  // Prompt Assembly State
  const [copied, setCopied] = useState(false);

  // Live Audit State
  const [isRunningAudit, setIsRunningAudit] = useState(false);
  const [auditProgressStage, setAuditProgressStage] = useState<string>('');
  const [auditError, setAuditError] = useState<string | null>(null);
  const [auditReport, setAuditReport] = useState<AuditReportData | null>(SAMPLE_AUDIT_REPORTS.did_labor);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Compute recommended modules based on 00_MASTER_ROUTER logic
  const recommendedModuleIds = useMemo(() => {
    const list: string[] = ['submission_readiness', 'consistency_audit', 'journal_targeting', 'implementation_changeset'];

    if (intake.paperType === 'empirical' || intake.paperType === 'theory-empirical' || intake.paperType === 'structural-quantitative') {
      list.push('econometric_audit', 'causal_identification', 'estimand_identification', 'inference_dependence', 'robustness_falsification');
    }

    if (intake.paperType === 'theoretical' || intake.paperType === 'theory-empirical' || intake.paperType === 'structural-quantitative') {
      list.push('mathematical_audit');
    }

    if (intake.paperType === 'theory-empirical') {
      list.push('theory_evidence');
    }

    if (intake.includeLiteratureVerification) {
      list.push('literature_contribution');
    }

    if (intake.includeReproducibility) {
      list.push('reproducibility');
    }

    return list;
  }, [intake.paperType, intake.includeLiteratureVerification, intake.includeReproducibility]);

  // Selected method design
  const selectedDesign = useMemo(() => {
    return METHODOLOGY_DESIGNS.find(d => d.id === intake.primaryMethod);
  }, [intake.primaryMethod]);

  // Handle module toggle
  const toggleModule = (moduleId: string) => {
    setIntake(prev => {
      const exists = prev.selectedModules.includes(moduleId);
      return {
        ...prev,
        selectedModules: exists 
          ? prev.selectedModules.filter(id => id !== moduleId)
          : [...prev.selectedModules, moduleId]
      };
    });
  };

  const applyRecommendedModules = () => {
    setIntake(prev => ({
      ...prev,
      selectedModules: Array.from(new Set([...recommendedModuleIds]))
    }));
  };

  // Handle local PDF file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== 'application/pdf' && !file.name.endsWith('.pdf')) {
      setAnalysisError('Please upload a valid PDF document (.pdf).');
      return;
    }

    setAnalysisError(null);
    const reader = new FileReader();
    reader.onload = async () => {
      const result = reader.result as string;
      const base64 = result.includes(',') ? result.split(',')[1] : result;

      const pdfInfo: UploadedPdfInfo = {
        fileName: file.name,
        fileSize: file.size,
        base64,
        mimeType: file.type || 'application/pdf',
        uploadedAt: new Date().toLocaleTimeString()
      };
      setUploadedPdf(pdfInfo);

      // Automatically trigger taxonomy analysis on the uploaded PDF
      await triggerAnalyzePdf(pdfInfo);
    };
    reader.readAsDataURL(file);
  };

  // Trigger Backend PDF Analysis (Step 0 -> Step 1)
  const triggerAnalyzePdf = async (pdfInfoToAnalyze?: UploadedPdfInfo) => {
    const target = pdfInfoToAnalyze || uploadedPdf;
    if (!target?.base64 && !intake.manuscriptExcerpt) {
      setAnalysisError('Please provide a PDF or excerpt to analyze.');
      return;
    }

    setIsAnalyzingPdf(true);
    setAnalysisError(null);

    try {
      const response = await fetch('/api/analyze-pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pdfBase64: target?.base64,
          mimeType: target?.mimeType || 'application/pdf',
          fileName: target?.fileName,
          textFallback: intake.abstract || intake.manuscriptExcerpt
        })
      });

      if (!response.ok) {
        throw new Error(`Server returned HTTP ${response.status}`);
      }

      const result = await response.json();
      if (result.success && result.data) {
        const d = result.data;
        setAnalysisSource(result.source || 'gemini');
        if (d.taxonomyRationale) {
          setAnalysisRationale(d.taxonomyRationale);
        }

        setIntake(prev => ({
          ...prev,
          title: d.title || prev.title,
          authors: d.authors || prev.authors,
          paperType: (d.paperType as PaperType) || prev.paperType,
          projectState: (d.projectState as ProjectState) || prev.projectState,
          primaryMethod: d.primaryMethod || prev.primaryMethod,
          abstract: d.abstract || prev.abstract,
          manuscriptExcerpt: d.manuscriptExcerpt || prev.manuscriptExcerpt,
          targetJournal: d.targetJournal || prev.targetJournal,
          specificConcerns: d.specificConcerns || prev.specificConcerns,
          selectedModules: d.suggestedModules && d.suggestedModules.length > 0
            ? Array.from(new Set([...d.suggestedModules, 'submission_readiness', 'consistency_audit', 'journal_targeting', 'implementation_changeset']))
            : prev.selectedModules
        }));

        // Advance to Step 1 (Taxonomy Verification)
        setCurrentStep('taxonomy');
      } else {
        throw new Error(result.error || 'Failed to extract taxonomy.');
      }
    } catch (err: any) {
      console.error('PDF Analysis error:', err);
      setAnalysisError(err.message || 'Error communicating with analysis engine.');
    } finally {
      setIsAnalyzingPdf(false);
    }
  };

  // Load Archetypes with Base64 PDF
  const handleLoadArchetype = async (key: 'did' | 'auctions' | 'macro') => {
    let title = '';
    let author = '';
    let excerpt = '';
    let fileName = '';

    if (key === 'did') {
      title = 'Minimum Wage Dynamics and Local Labor Market Reallocation: Evidence from Staggered County Policies';
      author = 'A. Huerta & J. Miller (NBER Working Paper 31248)';
      excerpt = 'We estimate Y_{it} = \\alpha_i + \\gamma_t + \\beta Treat_{it} + X_{it}\' \\delta + \\varepsilon_{it} with county clustering (N=312). \\hat{\\beta} = -0.042 (SE 0.012).';
      fileName = 'minimum_wage_reallocation_did.pdf';

      const base64 = generateSamplePdfBase64(title, author, excerpt);
      const pdfInfo: UploadedPdfInfo = {
        fileName,
        fileSize: 418200,
        base64,
        mimeType: 'application/pdf',
        uploadedAt: 'Pre-loaded Archetype'
      };
      setUploadedPdf(pdfInfo);
      setIntake({
        title,
        authors: 'A. Huerta & J. Miller',
        paperType: 'empirical',
        projectState: 'CLOSED',
        primaryMethod: 'did',
        abstract: 'We exploit county-level variation in minimum wage adjustments across the United States between 2008 and 2019 to estimate labor reallocation across low-wage industries.',
        manuscriptExcerpt: excerpt,
        targetJournal: 'American Economic Review',
        includeLiteratureVerification: true,
        includeReproducibility: false,
        selectedModules: [
          'submission_readiness',
          'consistency_audit',
          'econometric_audit',
          'causal_identification',
          'estimand_identification',
          'inference_dependence',
          'robustness_falsification',
          'journal_targeting',
          'implementation_changeset'
        ],
        specificConcerns: 'Scrutinize staggered adoption two-way fixed effects decomposition and commuting zone spatial correlation.'
      });
      setAnalysisRationale('Classified as Empirical DiD with staggered adoption across US county panels.');
    } else if (key === 'auctions') {
      title = 'Optimal Multi-Unit Procurement with Correlated Signals and Endogenous Entry';
      author = 'S. Banerjee & R. Klein (Cowles Foundation Discussion Paper)';
      excerpt = 'Direct mechanism (q*(theta), t*(theta)). Lemma 3 asserts weak monotonicity of allocation rule q_i using envelope condition. Outside option u_0=0 vs u_i>=w_bar.';
      fileName = 'procurement_auctions_theory.pdf';

      const base64 = generateSamplePdfBase64(title, author, excerpt);
      const pdfInfo: UploadedPdfInfo = {
        fileName,
        fileSize: 345100,
        base64,
        mimeType: 'application/pdf',
        uploadedAt: 'Pre-loaded Archetype'
      };
      setUploadedPdf(pdfInfo);
      setIntake({
        title,
        authors: 'S. Banerjee & R. Klein',
        paperType: 'theoretical',
        projectState: 'CLOSED',
        primaryMethod: 'mechanism_design',
        abstract: 'We characterize the revenue-maximizing multi-unit procurement auction when suppliers possess multidimensional private information comprising correlated cost signals and heterogeneous entry barriers.',
        manuscriptExcerpt: excerpt,
        targetJournal: 'Econometrica',
        includeLiteratureVerification: true,
        includeReproducibility: false,
        selectedModules: [
          'submission_readiness',
          'consistency_audit',
          'mathematical_audit',
          'journal_targeting',
          'implementation_changeset'
        ],
        specificConcerns: 'Check Lemma 3 envelope condition and multidimensional single-crossing condition.'
      });
      setAnalysisRationale('Classified as Pure Microeconomic Theory (Mechanism Design & Auctions).');
    } else if (key === 'macro') {
      title = 'Household Heterogeneity, Mortgage Refinancing Friabilities, and the Transmission of Monetary Policy';
      author = 'C. Vance & M. Lindqvist (CEPR Discussion Paper)';
      excerpt = 'Continuous-time HJB with S-s refinancing adjustment: rho V = max { u(c) + ... }. Refinancing menu cost psi = $3,200. Stopping criterion ||V^{k+1} - V^k|| < 1e-5.';
      fileName = 'hank_mortgage_refinancing.pdf';

      const base64 = generateSamplePdfBase64(title, author, excerpt);
      const pdfInfo: UploadedPdfInfo = {
        fileName,
        fileSize: 512800,
        base64,
        mimeType: 'application/pdf',
        uploadedAt: 'Pre-loaded Archetype'
      };
      setUploadedPdf(pdfInfo);
      setIntake({
        title,
        authors: 'C. Vance & M. Lindqvist',
        paperType: 'structural-quantitative',
        projectState: 'OPEN',
        primaryMethod: 'dynamic_macro',
        abstract: 'This paper builds a Heterogeneous Agent New Keynesian (HANK) model with long-term fixed-rate mortgage contracts and state-dependent refinancing costs.',
        manuscriptExcerpt: excerpt,
        targetJournal: 'Journal of Monetary Economics',
        includeLiteratureVerification: true,
        includeReproducibility: true,
        selectedModules: [
          'submission_readiness',
          'consistency_audit',
          'mathematical_audit',
          'econometric_audit',
          'theory_evidence',
          'robustness_falsification',
          'journal_targeting',
          'implementation_changeset'
        ],
        specificConcerns: 'Verify continuous-time PDE solver convergence and pre-fintech refinancing cost calibration.'
      });
      setAnalysisRationale('Classified as Structural-Quantitative HANK Macro model.');
    }

    setCurrentStep('taxonomy');
  };

  // Compile Master Prompt (Protocol 00 & 01 Orchestration)
  const assembledPrompt = useMemo(() => {
    const lines: string[] = [];

    lines.push(`# RIGOR RESEARCH AUDIT ENGINE — ORCHESTRATED MASTER RUN`);
    lines.push(`% Target: Top-tier Social Science / Economics Review Standards (AER / Econometrica / QJE)`);
    lines.push(`% Generated via RIGOR Master Router (00_MASTER_ROUTER.md & 01_ITERATIVE_CONVERGENCE_PROTOCOL.md)`);
    lines.push(``);
    lines.push(`================================================================================`);
    lines.push(`PHASE 0: INTAKE & SPECIFICATION METADATA`);
    lines.push(`================================================================================`);
    lines.push(`Paper Title: ${intake.title}`);
    lines.push(`Authors: ${intake.authors}`);
    lines.push(`Paper Type: ${intake.paperType.toUpperCase()}`);
    lines.push(`Project State: ${intake.projectState} (${intake.projectState === 'CLOSED' ? 'FROZEN MANUSCRIPT — AUDIT TRUTH, CONSISTENCY, & VALIDITY ONLY. NO RESCUE SEARCH.' : 'OPEN — PROPOSE SMALLEST SUBSTANTIVE REMEDIES REQUIRED FOR CREDIBILITY.'})`);
    lines.push(`Primary Methodology: ${selectedDesign ? selectedDesign.name : intake.primaryMethod}`);
    lines.push(`Target Journal: ${intake.targetJournal || 'Top General Economics / Field Top 5'}`);
    lines.push(`External Literature Verification: ${intake.includeLiteratureVerification ? 'AUTHORIZED / REQUIRED' : 'OFFLINE ONLY'}`);
    lines.push(`Reproducibility Audit: ${intake.includeReproducibility ? 'ENABLED' : 'DISABLED'}`);
    if (intake.specificConcerns) {
      lines.push(`Author Stated Focus / Specific Vulnerabilities: ${intake.specificConcerns}`);
    }
    lines.push(``);
    lines.push(`================================================================================`);
    lines.push(`PHASE 1: MANDATORY EXECUTION GATES`);
    lines.push(`================================================================================`);
    lines.push(`1. SUBMISSION READINESS GATE (20_SUBMISSION_READINESS_REFEREE_ATTACK):`);
    lines.push(`   - Conduct hostile referee attack to identify fatal flaws before detailed notes.`);
    lines.push(`   - Issue one unambiguous verdict: READY, CONDITIONAL REVISION, MAJOR RESTRUCTURE, or NOT READY FATAL.`);
    lines.push(`   - Check whether claims in abstract/introduction outrun the empirical/theoretical proofs.`);
    lines.push(``);
    lines.push(`================================================================================`);
    lines.push(`PHASE 2: SPECIALIZED AUDIT MODULES TO EXECUTE`);
    lines.push(`================================================================================`);

    // Add selected core modules
    intake.selectedModules.forEach(modId => {
      const mod = AUDIT_MODULES.find(m => m.id === modId);
      if (mod) {
        lines.push(`[MODULE ${mod.number}] ${mod.name.toUpperCase()} (${mod.promptFilename})`);
        lines.push(`  Directive: ${mod.description}`);
      }
    });

    // Add method-specific consistency and literature prompts
    if (selectedDesign) {
      lines.push(``);
      lines.push(`[METHOD-SPECIFIC DEEP AUDIT: ${selectedDesign.name.toUpperCase()}]`);
      lines.push(`  Checklist File: ${selectedDesign.consistencyPromptId}.md`);
      lines.push(`  Mandatory Assumption Verifications:`);
      selectedDesign.keyAssumptions.forEach((assump, i) => {
        lines.push(`    ${i + 1}. ${assump}`);
      });
      lines.push(`  Vulnerability Probes:`);
      selectedDesign.vulnerabilities.forEach((vuln, i) => {
        lines.push(`    - ${vuln}`);
      });
      if (intake.includeLiteratureVerification && selectedDesign.literaturePromptId) {
        lines.push(`  Specialized Literature Verification: ${selectedDesign.literaturePromptId}.md`);
      }
    }

    lines.push(``);
    lines.push(`================================================================================`);
    lines.push(`PHASE 3: MERGE & ROOT-CAUSE ISSUE LEDGER REQUIREMENTS`);
    lines.push(`================================================================================`);
    lines.push(`Merge all module outputs into ONE root-cause Issue Ledger. Do NOT double-count symptoms of the same root cause.`);
    lines.push(`Order findings by:`);
    lines.push(`  1. Logical dependency / root cause`);
    lines.push(`  2. Severity (CRITICAL > SUBSTANTIVE > MINOR)`);
    lines.push(`  3. Centrality to headline contribution`);
    lines.push(`  4. Expected value of remedy`);
    lines.push(`  5. Implementation burden`);
    lines.push(``);
    lines.push(`Issue Ledger Format Required for each finding:`);
    lines.push(`  - Finding ID (e.g. FINDING-01)`);
    lines.push(`  - Module & Exact Manuscript Location (Section, Theorem, Equation, Table)`);
    lines.push(`  - Severity Level: CRITICAL (fatal to paper) / SUBSTANTIVE (distorts findings) / MINOR`);
    lines.push(`  - Root Cause Analysis (why it failed vs merely what looks odd)`);
    lines.push(`  - Concrete Implementation Remedy & Verbatim Changeset (before / after)`);
    lines.push(``);
    lines.push(`================================================================================`);
    lines.push(`MANUSCRIPT MATERIAL UNDER AUDIT`);
    lines.push(`================================================================================`);
    lines.push(`### ABSTRACT:`);
    lines.push(intake.abstract || '[No abstract provided]');
    lines.push(``);
    lines.push(`### MANUSCRIPT EXCERPT / SPECIFICATIONS / THEOREMS:`);
    lines.push(intake.manuscriptExcerpt || '[No excerpt provided]');
    lines.push(``);
    lines.push(`================================================================================`);
    lines.push(`EXECUTE THE AUDIT NOW. RETURN THE COMPLETE VERDICT, FINDINGS LEDGER, AND CHANGESET.`);
    lines.push(`================================================================================`);

    return lines.join('\n');
  }, [intake, selectedDesign]);

  const wordCount = assembledPrompt.split(/\s+/).filter(Boolean).length;
  const estimatedTokens = Math.round(wordCount * 1.35);

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(assembledPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([assembledPrompt], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `RIGOR_AUDIT_PROMPT_${intake.title.slice(0, 30).replace(/\s+/g, '_')}.md`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // STEP 3: Execute Full RIGOR Referee Audit on the Original PDF
  const triggerRunAudit = async () => {
    setIsRunningAudit(true);
    setAuditError(null);
    setAuditProgressStage('Streaming PDF & Assembled Prompt to Gemini 3.8 Flash...');

    try {
      setTimeout(() => setAuditProgressStage('Executing Protocol 20: Submission Readiness Referee Gate...'), 1500);
      setTimeout(() => setAuditProgressStage('Auditing identification assumptions & mathematical proofs...'), 3500);
      setTimeout(() => setAuditProgressStage('Synthesizing root causes & formatting verbatim changesets...'), 5500);

      const response = await fetch('/api/run-audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pdfBase64: uploadedPdf?.base64,
          mimeType: uploadedPdf?.mimeType || 'application/pdf',
          assembledPrompt,
          paperTitle: intake.title,
          paperType: intake.paperType,
          projectState: intake.projectState
        })
      });

      if (!response.ok) {
        throw new Error(`Server returned HTTP ${response.status}`);
      }

      const result = await response.json();
      if (result.success && result.report) {
        setAuditReport(result.report);
        if (onAuditReportGenerated) {
          onAuditReportGenerated(result.report);
        }
        setCurrentStep('audit');
      } else {
        throw new Error(result.error || 'Failed to complete audit run.');
      }
    } catch (err: any) {
      console.error('Audit execution error:', err);
      setAuditError(err.message || 'Error running live audit.');
    } finally {
      setIsRunningAudit(false);
      setAuditProgressStage('');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Top Banner & Integrated Pipeline Breadcrumb */}
      <div className="bg-gradient-to-r from-stone-900 via-stone-850 to-stone-900 text-white rounded-2xl p-6 shadow-sm border border-stone-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[11px] font-mono uppercase tracking-widest text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800/60">
                End-to-End Orchestrated Pipeline
              </span>
              <span className="text-xs text-stone-300">
                Protocol 00 & 20 Referee Engine
              </span>
            </div>
            <h1 className="font-serif font-bold text-2xl sm:text-3xl text-stone-100 tracking-tight">
              Integrated Manuscript Audit Pipeline
            </h1>
            <p className="text-xs sm:text-sm text-stone-300 mt-1 max-w-3xl leading-relaxed">
              Upload a research PDF → auto-extract taxonomy & identification design → compile the custom RIGOR Master Prompt → execute the hostile referee attack audit on the original document.
            </p>
          </div>

          {/* Quick Archetype Loader */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1.5 bg-stone-800/80 p-2 rounded-xl border border-stone-700/60 shrink-0 text-xs">
            <span className="text-[10px] uppercase font-bold text-stone-400 px-1">Archetypes:</span>
            <button
              onClick={() => handleLoadArchetype('did')}
              className="px-2.5 py-1.5 bg-stone-700 hover:bg-stone-600 text-stone-200 rounded-md font-medium transition-colors"
            >
              DiD Labor Paper
            </button>
            <button
              onClick={() => handleLoadArchetype('auctions')}
              className="px-2.5 py-1.5 bg-stone-700 hover:bg-stone-600 text-stone-200 rounded-md font-medium transition-colors"
            >
              Auctions Theory
            </button>
            <button
              onClick={() => handleLoadArchetype('macro')}
              className="px-2.5 py-1.5 bg-stone-700 hover:bg-stone-600 text-stone-200 rounded-md font-medium transition-colors"
            >
              HANK Macro DSGE
            </button>
          </div>
        </div>

        {/* Step Navigation Breadcrumb */}
        <div className="flex items-center gap-1 sm:gap-2 mt-6 pt-4 border-t border-stone-800 overflow-x-auto text-xs font-medium">
          <button
            onClick={() => setCurrentStep('upload')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all shrink-0 ${
              currentStep === 'upload'
                ? 'bg-amber-500 text-stone-950 font-semibold shadow-xs'
                : 'text-stone-300 hover:text-white hover:bg-stone-800'
            }`}
          >
            <span className="w-4 h-4 rounded-full bg-stone-900/40 flex items-center justify-center text-[10px] font-bold">0</span>
            <span>Upload & Analyze PDF</span>
          </button>

          <ChevronRight className="w-3.5 h-3.5 text-stone-600 shrink-0" />

          <button
            onClick={() => setCurrentStep('taxonomy')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all shrink-0 ${
              currentStep === 'taxonomy'
                ? 'bg-amber-500 text-stone-950 font-semibold shadow-xs'
                : 'text-stone-300 hover:text-white hover:bg-stone-800'
            }`}
          >
            <span className="w-4 h-4 rounded-full bg-stone-900/40 flex items-center justify-center text-[10px] font-bold">1</span>
            <span>Check Taxonomy & Modules</span>
          </button>

          <ChevronRight className="w-3.5 h-3.5 text-stone-600 shrink-0" />

          <button
            onClick={() => setCurrentStep('prompt')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all shrink-0 ${
              currentStep === 'prompt'
                ? 'bg-amber-500 text-stone-950 font-semibold shadow-xs'
                : 'text-stone-300 hover:text-white hover:bg-stone-800'
            }`}
          >
            <span className="w-4 h-4 rounded-full bg-stone-900/40 flex items-center justify-center text-[10px] font-bold">2</span>
            <span>Master Prompt ({wordCount.toLocaleString()} words)</span>
          </button>

          <ChevronRight className="w-3.5 h-3.5 text-stone-600 shrink-0" />

          <button
            onClick={() => setCurrentStep('audit')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all shrink-0 ${
              currentStep === 'audit'
                ? 'bg-amber-500 text-stone-950 font-semibold shadow-xs'
                : 'text-stone-300 hover:text-white hover:bg-stone-800'
            }`}
          >
            <span className="w-4 h-4 rounded-full bg-stone-900/40 flex items-center justify-center text-[10px] font-bold">3</span>
            <span>Live Referee Audit Results</span>
            {auditReport && <CheckCircle className="w-3 h-3 text-emerald-300 ml-0.5" />}
          </button>

          <ChevronRight className="w-3.5 h-3.5 text-stone-600 shrink-0" />

          <button
            onClick={() => setCurrentStep('dag')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all shrink-0 ${
              currentStep === 'dag'
                ? 'bg-amber-500 text-stone-950 font-semibold shadow-xs'
                : 'text-stone-300 hover:text-white hover:bg-stone-800'
            }`}
          >
            <GitBranch className="w-3.5 h-3.5" />
            <span>DAG Flow</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* STEP 0: UPLOAD & ANALYZE PDF                                              */}
      {/* ========================================================================= */}
      {currentStep === 'upload' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 bg-white rounded-xl border border-stone-200 shadow-xs p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-stone-100 pb-4">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 font-semibold">
                  Step 0 Intake
                </span>
                <h2 className="font-serif font-bold text-xl text-stone-900 mt-1">
                  Upload Research Paper Manuscript (PDF)
                </h2>
                <p className="text-xs text-stone-500 mt-0.5">
                  Upload an academic working paper or journal manuscript. Gemini 3.8 Flash will inspect the document and parse its taxonomy against Protocol 00.
                </p>
              </div>
            </div>

            {/* Drag & Drop Upload Zone */}
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-stone-300 hover:border-amber-500 bg-stone-50/70 hover:bg-amber-50/30 rounded-2xl p-8 text-center cursor-pointer transition-all flex flex-col items-center justify-center space-y-3"
            >
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                accept="application/pdf" 
                className="hidden" 
              />
              <div className="w-12 h-12 bg-amber-100 text-amber-800 rounded-full flex items-center justify-center shadow-xs">
                <Upload className="w-6 h-6" />
              </div>
              <div>
                <div className="font-serif font-bold text-base text-stone-900">
                  Click to browse or drop your research manuscript PDF
                </div>
                <div className="text-xs text-stone-500 mt-1">
                  Supports standard academic preprint/journal PDFs up to 50MB
                </div>
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-stone-200 rounded-md text-xs font-mono text-stone-600 shadow-2xs">
                <span>PDF Format</span>
                <span>•</span>
                <span>Automated Extraction</span>
              </div>
            </div>

            {/* Current Loaded PDF Details */}
            {uploadedPdf && (
              <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-amber-100 text-amber-900 rounded-lg flex items-center justify-center shrink-0">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-serif font-bold text-xs sm:text-sm text-stone-900 line-clamp-1">
                      {uploadedPdf.fileName}
                    </div>
                    <div className="text-[11px] text-stone-500 font-mono flex items-center gap-2 mt-0.5">
                      <span>{(uploadedPdf.fileSize / 1024).toFixed(1)} KB</span>
                      <span>•</span>
                      <span>{uploadedPdf.uploadedAt}</span>
                      <span>•</span>
                      <span className="text-emerald-700 font-medium">Ready for Analysis</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => triggerAnalyzePdf()}
                    disabled={isAnalyzingPdf}
                    className="w-full sm:w-auto px-4 py-2 bg-stone-900 hover:bg-stone-800 disabled:bg-stone-400 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-2 shadow-xs transition-colors"
                  >
                    {isAnalyzingPdf ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin text-amber-400" />
                        <span>Analyzing Taxonomy...</span>
                      </>
                    ) : (
                      <>
                        <Cpu className="w-3.5 h-3.5 text-amber-400" />
                        <span>Analyze Taxonomy with Gemini</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

            {analysisError && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-900 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />
                <span>{analysisError}</span>
              </div>
            )}
          </div>

          {/* Step 0 Right Column: Protocol 00 Rules & Presets */}
          <div className="lg:col-span-4 bg-white rounded-xl border border-stone-200 shadow-xs p-6 space-y-4">
            <h3 className="font-serif font-bold text-base text-stone-900 border-b border-stone-100 pb-2">
              Protocol 00 Taxonomy Engine
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              When a PDF is uploaded, the engine executes a multi-dimensional structural classification:
            </p>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-stone-50 rounded-lg border border-stone-200">
                <div className="font-bold text-stone-800">1. Paper Taxonomy Classification</div>
                <div className="text-stone-600 text-[11.5px] mt-0.5">
                  Determines whether paper is <strong>Empirical</strong>, <strong>Theoretical</strong>, <strong>Theory-Empirical</strong>, or <strong>Structural</strong> to bind required verification proofs.
                </div>
              </div>

              <div className="p-3 bg-stone-50 rounded-lg border border-stone-200">
                <div className="font-bold text-stone-800">2. Project State Determination</div>
                <div className="text-stone-600 text-[11.5px] mt-0.5">
                  Classifies into <strong>CLOSED</strong> (frozen submission; audit validity only) or <strong>OPEN</strong> (propose smallest substantive remedies).
                </div>
              </div>

              <div className="p-3 bg-stone-50 rounded-lg border border-stone-200">
                <div className="font-bold text-stone-800">3. Primary Identification Routing</div>
                <div className="text-stone-600 text-[11.5px] mt-0.5">
                  Selects from 19 econometric and theoretical designs (DiD, IV, RDD, RCT, HANK, Matching, etc.) and injects specific assumptions.
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setCurrentStep('taxonomy')}
                className="w-full py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-colors"
              >
                <span>Skip to Taxonomy Verification</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* STEP 1: VERIFY TAXONOMY & MODULES                                         */}
      {/* ========================================================================= */}
      {currentStep === 'taxonomy' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Intake Form (Left 7 Cols) */}
          <div className="lg:col-span-7 bg-white rounded-xl border border-stone-200 shadow-xs p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 font-semibold">
                  Step 1 Verification
                </span>
                <h2 className="font-serif font-bold text-lg text-stone-900 mt-1">
                  Taxonomy & Identification Design
                </h2>
                <p className="text-xs text-stone-500">
                  Review and refine the taxonomy parameters extracted from the manuscript.
                </p>
              </div>

              <span className="text-[11px] font-mono px-2 py-0.5 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded flex items-center gap-1 font-semibold">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                {analysisSource === 'gemini' ? 'Gemini 3.8 Flash' : 'Classified'}
              </span>
            </div>

            {/* Rationale Banner */}
            {analysisRationale && (
              <div className="p-3 bg-amber-50/70 border border-amber-200/80 rounded-lg text-xs text-stone-800 flex items-start gap-2">
                <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-amber-950 font-semibold">Classification Rationale: </strong>
                  {analysisRationale}
                </div>
              </div>
            )}

            {/* Title & Target Journal */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1">Paper Title</label>
                <input
                  type="text"
                  value={intake.title}
                  onChange={e => setIntake({ ...intake, title: e.target.value })}
                  className="w-full text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 font-serif"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1">Target Journal</label>
                <input
                  type="text"
                  value={intake.targetJournal}
                  onChange={e => setIntake({ ...intake, targetJournal: e.target.value })}
                  className="w-full text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600"
                />
              </div>
            </div>

            {/* Paper Type & Project State */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1">Paper Taxonomy</label>
                <select
                  value={intake.paperType}
                  onChange={e => setIntake({ ...intake, paperType: e.target.value as PaperType })}
                  className="w-full text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-stone-900"
                >
                  <option value="empirical">Empirical (Micro / Applied)</option>
                  <option value="theoretical">Theoretical (Pure Micro / Game Theory)</option>
                  <option value="theory-empirical">Theory + Empirical (Model + Empirical Test)</option>
                  <option value="structural-quantitative">Structural-Quantitative / Macro</option>
                  <option value="qualitative-mixed">Qualitative / Mixed Methods</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1">Project State</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setIntake({ ...intake, projectState: 'CLOSED' })}
                    className={`px-3 py-2 rounded-lg text-xs font-medium border text-left transition-all ${
                      intake.projectState === 'CLOSED'
                        ? 'bg-stone-900 text-white border-stone-900 shadow-xs'
                        : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                    }`}
                  >
                    <div className="font-bold">CLOSED (Frozen)</div>
                    <div className="text-[10px] opacity-80">Audit validity only</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setIntake({ ...intake, projectState: 'OPEN' })}
                    className={`px-3 py-2 rounded-lg text-xs font-medium border text-left transition-all ${
                      intake.projectState === 'OPEN'
                        ? 'bg-amber-600 text-white border-amber-600 shadow-xs'
                        : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                    }`}
                  >
                    <div className="font-bold">OPEN (Unfrozen)</div>
                    <div className="text-[10px] opacity-80">Permit minimal fixes</div>
                  </button>
                </div>
              </div>
            </div>

            {/* Primary Methodology */}
            <div>
              <label className="text-xs font-semibold text-stone-700 block mb-1">
                Primary Research Design / Methodology Checklist
              </label>
              <select
                value={intake.primaryMethod}
                onChange={e => setIntake({ ...intake, primaryMethod: e.target.value })}
                className="w-full text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-stone-900"
              >
                {METHODOLOGY_DESIGNS.map(design => (
                  <option key={design.id} value={design.id}>
                    [{design.shortCode}] {design.name}
                  </option>
                ))}
              </select>
              {selectedDesign && (
                <div className="mt-2 bg-stone-50 p-2.5 rounded-lg border border-stone-200 text-xs text-stone-600">
                  <span className="font-semibold text-stone-800">Injected Checks: </span>
                  {selectedDesign.keyAssumptions.slice(0, 2).join(' • ')}...
                </div>
              )}
            </div>

            {/* Abstract */}
            <div>
              <label className="text-xs font-semibold text-stone-700 block mb-1">Abstract</label>
              <textarea
                rows={3}
                value={intake.abstract}
                onChange={e => setIntake({ ...intake, abstract: e.target.value })}
                className="w-full text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-lg p-3 text-stone-900 font-sans"
              />
            </div>

            {/* Manuscript Excerpt / Equations */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-semibold text-stone-700">
                  Manuscript Excerpt / Estimating Equations / Theorems
                </label>
                <span className="text-[10px] text-stone-400">Extracted from PDF</span>
              </div>
              <textarea
                rows={4}
                value={intake.manuscriptExcerpt}
                onChange={e => setIntake({ ...intake, manuscriptExcerpt: e.target.value })}
                className="w-full text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-lg p-3 text-stone-900 font-mono"
              />
            </div>

            {/* Specific Concerns */}
            <div>
              <label className="text-xs font-semibold text-stone-700 block mb-1">
                Author's Specific Vulnerabilities or Known Caveats
              </label>
              <input
                type="text"
                value={intake.specificConcerns}
                onChange={e => setIntake({ ...intake, specificConcerns: e.target.value })}
                className="w-full text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-stone-900"
              />
            </div>
          </div>

          {/* Module Selector (Right 5 Cols) */}
          <div className="lg:col-span-5 bg-white rounded-xl border border-stone-200 shadow-xs p-6 flex flex-col space-y-4">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <div>
                <h2 className="font-serif font-bold text-lg text-stone-900">Step 1b: Review Modules</h2>
                <p className="text-xs text-stone-500">Selected: {intake.selectedModules.length} modules</p>
              </div>
              <button
                onClick={applyRecommendedModules}
                className="text-xs text-amber-700 hover:text-amber-800 font-medium flex items-center gap-1 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200"
              >
                <RotateCcw className="w-3 h-3" /> Auto-Route
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-2 pr-1 max-h-[520px]">
              {AUDIT_MODULES.map(mod => {
                const isSelected = intake.selectedModules.includes(mod.id);
                const isMandatory = mod.category === 'gate';
                const isRecommended = recommendedModuleIds.includes(mod.id);

                return (
                  <div
                    key={mod.id}
                    onClick={() => !isMandatory && toggleModule(mod.id)}
                    className={`p-3 rounded-lg border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-amber-50/70 border-amber-300 text-stone-900 shadow-xs'
                        : 'bg-stone-50/60 border-stone-200 text-stone-600 hover:bg-stone-50'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          disabled={isMandatory}
                          onChange={() => !isMandatory && toggleModule(mod.id)}
                          className="rounded text-amber-600 focus:ring-amber-500"
                        />
                        <span className="font-mono text-xs font-bold text-stone-700">
                          [{mod.number}]
                        </span>
                        <span className="font-serif font-semibold text-xs text-stone-900">
                          {mod.name}
                        </span>
                      </div>

                      <div className="flex items-center gap-1">
                        {isMandatory && (
                          <span className="text-[9px] uppercase px-1.5 py-0.2 bg-red-100 text-red-700 font-bold rounded">
                            Mandatory Gate
                          </span>
                        )}
                        {isRecommended && !isMandatory && (
                          <span className="text-[9px] uppercase px-1.5 py-0.2 bg-amber-100 text-amber-800 font-semibold rounded">
                            Routed
                          </span>
                        )}
                      </div>
                    </div>

                    <p className="text-[11px] text-stone-500 mt-1 pl-6">
                      {mod.description}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Advance to Master Prompt */}
            <div className="pt-3 border-t border-stone-100 flex items-center gap-2">
              <button
                onClick={() => setCurrentStep('prompt')}
                className="w-full py-2.5 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 shadow-xs transition-colors"
              >
                <span>Build Master Prompt ({wordCount.toLocaleString()} words)</span>
                <ArrowRight className="w-4 h-4 text-amber-400" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* STEP 2: BUILD & INSPECT MASTER PROMPT                                     */}
      {/* ========================================================================= */}
      {currentStep === 'prompt' && (
        <div className="bg-white rounded-xl border border-stone-200 shadow-xs p-6 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-200 pb-4">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 font-semibold">
                Step 2 Compiled Specification
              </span>
              <h2 className="font-serif font-bold text-xl text-stone-900 mt-1">
                Custom Master Audit Prompt
              </h2>
              <p className="text-xs text-stone-500 mt-0.5">
                Ready to execute directly against the original PDF with Gemini 3.8 Flash, or paste into Claude/ChatGPT.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <div className="text-xs text-stone-500 font-mono hidden sm:block mr-2">
                ~{estimatedTokens.toLocaleString()} tokens ({wordCount.toLocaleString()} words)
              </div>

              <button
                onClick={handleCopyPrompt}
                className="flex items-center gap-1.5 px-3 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-lg text-xs font-semibold border border-stone-200 transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied Prompt!' : 'Copy Prompt'}</span>
              </button>

              <button
                onClick={handleDownload}
                className="p-2 text-stone-700 hover:text-stone-900 hover:bg-stone-100 rounded-lg border border-stone-200 transition-colors"
                title="Download .md prompt"
              >
                <Download className="w-4 h-4" />
              </button>

              {/* Primary Action Button: TEST ORIGINAL PDF */}
              <button
                onClick={triggerRunAudit}
                disabled={isRunningAudit}
                className="flex items-center gap-2 px-4 py-2 bg-amber-600 hover:bg-amber-500 disabled:bg-stone-400 text-white rounded-lg text-xs sm:text-sm font-semibold shadow-xs transition-colors"
              >
                {isRunningAudit ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Running Audit...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-white" />
                    <span>Execute Referee Audit on Original PDF</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Running progress alert */}
          {isRunningAudit && (
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-950 flex items-center gap-3">
              <Loader2 className="w-5 h-5 text-amber-700 animate-spin shrink-0" />
              <div>
                <div className="font-bold text-amber-900">Executing RIGOR Referee Attack on Manuscript</div>
                <div className="text-stone-700 mt-0.5">{auditProgressStage || 'Processing document bytes and evaluating identification...'}</div>
              </div>
            </div>
          )}

          {auditError && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-900 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />
              <span>{auditError}</span>
            </div>
          )}

          {/* Terminal / Code Box */}
          <div className="relative">
            <pre className="p-4 bg-stone-950 text-stone-100 rounded-xl text-xs font-mono overflow-x-auto leading-relaxed border border-stone-800 max-h-[500px] overflow-y-auto">
              {assembledPrompt}
            </pre>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* STEP 3: LIVE REFEREE AUDIT RESULTS                                        */}
      {/* ========================================================================= */}
      {currentStep === 'audit' && (
        <div className="space-y-6">
          {/* Verdict Banner */}
          {auditReport ? (
            <div className="bg-white rounded-xl border border-stone-200 shadow-xs p-6 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-100 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 bg-amber-50 text-amber-800 border border-amber-200 rounded font-semibold">
                      Step 3 Referee Attack Execution
                    </span>
                    <span className="text-xs text-stone-500">Evaluated on Original PDF</span>
                  </div>
                  <h2 className="font-serif font-bold text-2xl text-stone-900 mt-1">
                    Audit Verdict & Issue Ledger
                  </h2>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={triggerRunAudit}
                    disabled={isRunningAudit}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-lg text-xs font-medium border border-stone-200 transition-colors"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isRunningAudit ? 'animate-spin' : ''}`} />
                    <span>Re-Run Audit</span>
                  </button>

                  {onNavigateToTab && (
                    <>
                      <button
                        onClick={() => onNavigateToTab('ledger')}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors"
                      >
                        <FileCheck2 className="w-3.5 h-3.5 text-amber-400" />
                        <span>Interactive Ledger</span>
                      </button>

                      <button
                        onClick={() => onNavigateToTab('latex')}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-lg text-xs font-medium border border-stone-200 transition-colors"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>Export LaTeX (.tex)</span>
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Verdict Summary Box */}
              <div className={`p-5 rounded-xl border ${
                auditReport.verdict === 'READY' 
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                  : auditReport.verdict === 'CONDITIONAL_REVISION'
                  ? 'bg-amber-50 border-amber-300 text-amber-950'
                  : auditReport.verdict === 'MAJOR_RESTRUCTURE'
                  ? 'bg-orange-50 border-orange-300 text-orange-950'
                  : 'bg-red-50 border-red-300 text-red-950'
              } space-y-3`}>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <ShieldAlert className="w-5 h-5 text-amber-700" />
                    <span className="font-bold text-xs uppercase tracking-wider">
                      Submission Readiness Verdict:
                    </span>
                    <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded shadow-2xs bg-stone-900 text-white">
                      {auditReport.verdict.replace(/_/g, ' ')}
                    </span>
                  </div>

                  <div className="text-xs font-mono text-stone-700">
                    Manuscript: <strong>{auditReport.paperTitle}</strong>
                  </div>
                </div>

                <p className="text-xs sm:text-sm leading-relaxed text-stone-800 font-sans">
                  {auditReport.verdictSummary}
                </p>

                {/* Desk Reject Risks */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-3 border-t border-black/10 text-xs">
                  <div>
                    <span className="font-bold text-stone-900 block mb-1">Recommended Journal Tiers:</span>
                    <ul className="list-disc list-inside space-y-0.5 text-stone-700">
                      {auditReport.journalReadiness.recommendedTiers.map((tier, idx) => (
                        <li key={idx}>{tier}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <span className="font-bold text-stone-900 block mb-1">Immediate Desk-Reject Risks:</span>
                    <ul className="list-disc list-inside space-y-0.5 text-red-900">
                      {auditReport.journalReadiness.immediateDeskRejectRisks.map((risk, idx) => (
                        <li key={idx}>{risk}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Findings List */}
              <div className="space-y-4 pt-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif font-bold text-lg text-stone-900">
                    Root-Cause Findings ({auditReport.findings.length})
                  </h3>
                  <div className="text-xs text-stone-500 font-mono">
                    Protocol 01 & 27 Verbatim Changesets
                  </div>
                </div>

                <div className="space-y-3">
                  {auditReport.findings.map(finding => (
                    <div 
                      key={finding.id} 
                      className="p-4 bg-white rounded-xl border border-stone-200 shadow-2xs space-y-3"
                    >
                      <div className="flex items-center justify-between gap-2 border-b border-stone-100 pb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold px-2 py-0.5 bg-stone-100 rounded">
                            {finding.id}
                          </span>
                          <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                            finding.severity === 'CRITICAL'
                              ? 'bg-red-100 text-red-800'
                              : finding.severity === 'SUBSTANTIVE'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-stone-100 text-stone-700'
                          }`}>
                            {finding.severity}
                          </span>
                          <span className="text-xs text-stone-500 font-mono">{finding.location}</span>
                        </div>

                        <span className="text-xs text-stone-500 font-medium">{finding.module}</span>
                      </div>

                      <div className="font-serif font-bold text-base text-stone-900">
                        {finding.title}
                      </div>

                      <p className="text-xs text-stone-700 leading-relaxed font-sans">
                        {finding.summary}
                      </p>

                      {/* Root cause vs symptom */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                        <div className="p-2.5 bg-amber-50/60 border border-amber-200 rounded-lg">
                          <strong className="text-amber-950 block text-[10px] uppercase font-bold tracking-wider mb-0.5">
                            Root Cause:
                          </strong>
                          <span className="text-stone-800">{finding.rootCause}</span>
                        </div>

                        <div className="p-2.5 bg-stone-50 border border-stone-200 rounded-lg">
                          <strong className="text-stone-700 block text-[10px] uppercase font-bold tracking-wider mb-0.5">
                            Symptom in Text:
                          </strong>
                          <span className="text-stone-800">{finding.symptom}</span>
                        </div>
                      </div>

                      {/* Implementation Remedy */}
                      <div className="p-3 bg-emerald-50/60 border border-emerald-200 rounded-lg text-xs space-y-1">
                        <strong className="text-emerald-950 text-[10px] uppercase font-bold tracking-wider block">
                          Implementation-Ready Remedy (Protocol 27 Changeset):
                        </strong>
                        <p className="text-stone-800 leading-relaxed">{finding.remedy}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-stone-200 p-12 text-center space-y-3">
              <FileSearch className="w-10 h-10 text-stone-400 mx-auto" />
              <div className="font-serif font-bold text-lg text-stone-800">No Audit Run Yet</div>
              <p className="text-xs text-stone-500 max-w-md mx-auto">
                Go back to Step 2 and click "Execute Referee Audit on Original PDF" to test the manuscript document against the compiled RIGOR protocol.
              </p>
              <button
                onClick={() => setCurrentStep('prompt')}
                className="px-4 py-2 bg-stone-900 text-white rounded-lg text-xs font-semibold hover:bg-stone-800 transition-colors"
              >
                Go to Master Prompt →
              </button>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* STEP DAG: DEPENDENCY GRAPH VIEW                                           */}
      {/* ========================================================================= */}
      {currentStep === 'dag' && (
        <div className="bg-white rounded-xl border border-stone-200 shadow-xs p-6 space-y-6">
          <div className="border-b border-stone-100 pb-4">
            <h2 className="font-serif font-bold text-xl text-stone-900">
              Convergence DAG & Execution Graph
            </h2>
            <p className="text-xs text-stone-500 mt-1">
              Visualizes the sequential dependency chain defined in Protocol 01 (Iterative Convergence) and Protocol 00 (Master Router).
            </p>
          </div>

          <div className="space-y-4">
            {/* Step 0 */}
            <div className="p-4 bg-stone-50 rounded-xl border border-stone-200">
              <div className="flex items-center gap-2 text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                <span className="w-5 h-5 bg-stone-200 text-stone-800 rounded-full flex items-center justify-center text-[10px]">0</span>
                <span>Document Ingestion & Taxonomy Extraction</span>
              </div>
              <p className="text-xs text-stone-600 mb-2">
                PDF Upload: <strong>{uploadedPdf?.fileName || 'No PDF'}</strong> | Paper Type: <strong>{intake.paperType.toUpperCase()}</strong> | State: <strong>{intake.projectState}</strong>.
              </p>
            </div>

            {/* Step 1 */}
            <div className="p-4 bg-red-50/50 rounded-xl border border-red-200">
              <div className="flex items-center gap-2 text-xs font-bold text-red-900 uppercase tracking-wider mb-2">
                <span className="w-5 h-5 bg-red-200 text-red-900 rounded-full flex items-center justify-center text-[10px]">1</span>
                <span>Mandatory Gate: Referee Attack (Protocol 20)</span>
              </div>
              <p className="text-xs text-stone-600">
                Hostile referee attack evaluates whether claims match proof/data. If fatal flaw is identified, issues <code>NOT_READY_FATAL</code> and halts deep modules to prevent wasted rounds.
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-4 bg-amber-50/50 rounded-xl border border-amber-200">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-900 uppercase tracking-wider mb-2">
                <span className="w-5 h-5 bg-amber-200 text-amber-900 rounded-full flex items-center justify-center text-[10px]">2</span>
                <span>Specialized Diagnostic Passes ({intake.selectedModules.length} Modules)</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 mt-2">
                {intake.selectedModules.map(modId => {
                  const mod = AUDIT_MODULES.find(m => m.id === modId);
                  return (
                    <div key={modId} className="bg-white p-2.5 rounded-lg border border-amber-200 text-xs shadow-2xs">
                      <div className="font-semibold text-stone-900">[{mod?.number}] {mod?.name}</div>
                      <div className="text-[11px] text-stone-500 line-clamp-1">{mod?.promptFilename}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 3 */}
            <div className="p-4 bg-blue-50/50 rounded-xl border border-blue-200">
              <div className="flex items-center gap-2 text-xs font-bold text-blue-900 uppercase tracking-wider mb-2">
                <span className="w-5 h-5 bg-blue-200 text-blue-900 rounded-full flex items-center justify-center text-[10px]">3</span>
                <span>Issue Ledger Root-Cause Synthesis & Changeset (Protocol 27)</span>
              </div>
              <p className="text-xs text-stone-600">
                Module findings are merged into a single issue ledger sorted by Root Cause &gt; Severity &gt; Centrality. Verbatim replacement changesets are generated for the author.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

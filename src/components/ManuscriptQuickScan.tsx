import React, { useState } from 'react';
import { 
  Zap, 
  CheckCircle, 
  AlertTriangle, 
  AlertCircle, 
  ArrowRight, 
  FileText,
  Sparkles,
  RotateCcw
} from 'lucide-react';

interface DiagnosticResult {
  ruleId: string;
  category: 'econometric' | 'theory' | 'inference' | 'prose';
  severity: 'PASS' | 'WARNING' | 'ALERT';
  title: string;
  explanation: string;
  recommendedModule: string;
}

export const ManuscriptQuickScan: React.FC<{ onNavigateToModule?: (moduleId: string) => void }> = ({ onNavigateToModule }) => {
  const [text, setText] = useState<string>(`Equation (3): Y_it = \\alpha_i + \\gamma_t + \\beta Treat_it + X_it' \\delta + \\varepsilon_it
where \\alpha_i are county fixed effects and \\gamma_t are calendar year fixed effects. Treat_it indicates county minimum wage exceeding $10.00/hour. Standard errors are clustered at the county level (312 clusters).
Headline Results (Table 2): \\hat{\\beta} = -0.042 (SE = 0.012, p = 0.0005). This pivotal finding delves into the intricate tapestry of local labor market reallocation and stands as a testament to the crucial nuance of wage floor dynamics.`);

  const [results, setResults] = useState<DiagnosticResult[] | null>(null);

  const runScan = () => {
    const raw = text.toLowerCase();
    const findings: DiagnosticResult[] = [];

    // 1. Two-way Fixed Effects & Staggered Timing Check
    const mentionsTWFE = raw.includes('fixed effect') || raw.includes('fe') || raw.includes('\\alpha_i') || raw.includes('\\gamma_t');
    const mentionsHeterogeneityEstimator = raw.includes('callaway') || raw.includes('sun-abraham') || raw.includes('bacon') || raw.includes('de chaisemartin') || raw.includes('staggered');
    if (mentionsTWFE && !mentionsHeterogeneityEstimator) {
      findings.push({
        ruleId: 'TWFE-STAGGERED',
        category: 'econometric',
        severity: 'ALERT',
        title: 'Two-Way Fixed Effects Without Modern Staggered Adoption Corrections',
        explanation: 'The text specifies unit and time fixed effects (alpha_i, gamma_t) without discussing negative weighting or dynamic treatment heterogeneity (Goodman-Bacon 2021; Callaway & Sant\'Anna 2021).',
        recommendedModule: '06_ECONOMETRIC_AUDIT_CLOSED / specialized/consistency/05_DID_EVENT_STUDY'
      });
    } else if (mentionsTWFE && mentionsHeterogeneityEstimator) {
      findings.push({
        ruleId: 'TWFE-STAGGERED-OK',
        category: 'econometric',
        severity: 'PASS',
        title: 'Modern Difference-in-Differences Corrections Acknowledged',
        explanation: 'The manuscript mentions robust treatment effect heterogeneity estimators alongside fixed effects.',
        recommendedModule: 'specialized/consistency/05_DID_EVENT_STUDY'
      });
    }

    // 2. Standard Error Clustering Check
    const mentionsCluster = raw.includes('cluster') || raw.includes('clustered');
    const mentionsClusterCount = raw.match(/\d+\s*clusters/i);
    if (!mentionsCluster) {
      findings.push({
        ruleId: 'INF-NO-CLUSTER',
        category: 'inference',
        severity: 'WARNING',
        title: 'No Error Dependence or Clustering Level Specified',
        explanation: 'No mention of standard error clustering or spatial dependence was detected. Referees will demand specification of the clustering level.',
        recommendedModule: '09_INFERENCE_DEPENDENCE_AUDIT'
      });
    } else if (mentionsCluster && !mentionsClusterCount) {
      findings.push({
        ruleId: 'INF-CLUSTER-COUNT',
        category: 'inference',
        severity: 'WARNING',
        title: 'Clustering Mentioned But Number of Clusters Unstated',
        explanation: 'Text mentions clustering, but does not state the number of clusters (G). If G < 50, wild cluster bootstrap or Conley spatial SEs are required.',
        recommendedModule: '09_INFERENCE_DEPENDENCE_AUDIT'
      });
    } else {
      findings.push({
        ruleId: 'INF-CLUSTER-PASS',
        category: 'inference',
        severity: 'PASS',
        title: 'Clustering Level & Unit Count Documented',
        explanation: 'Documented cluster count helps evaluate asymptotic normality and degrees of freedom.',
        recommendedModule: '09_INFERENCE_DEPENDENCE_AUDIT'
      });
    }

    // 3. Instrumental Variables Check
    const mentionsIV = raw.includes('instrument') || raw.includes('iv') || raw.includes('2sls') || raw.includes('late');
    const mentionsFirstStage = raw.includes('first stage') || raw.includes('f-stat') || raw.includes('f statistic') || raw.includes('montiel olea');
    if (mentionsIV && !mentionsFirstStage) {
      findings.push({
        ruleId: 'IV-WEAK-CHECK',
        category: 'econometric',
        severity: 'ALERT',
        title: 'Instrumental Variable Without First-Stage F-Statistic',
        explanation: 'Instrumental variables approach is referenced, but effective first-stage F-statistics (Montiel Olea & Pflueger 2013 threshold > 10 or 23) are not reported.',
        recommendedModule: 'specialized/consistency/07_IV_LATE'
      });
    }

    // 4. AI Prose / Academic Register Check (Protocol 16)
    const aiBuzzwords = [
      'delve', 'delves', 'intricate tapestry', 'testament to', 'crucial nuance', 
      'sheds light', 'pivotal', 'underscores the importance', 'deep dive', 
      'it is worth noting that', 'vital role', 'multifaceted', 'navigating the'
    ];
    const detectedBuzzwords = aiBuzzwords.filter(word => raw.includes(word));
    if (detectedBuzzwords.length > 0) {
      findings.push({
        ruleId: 'PROSE-AI-BUZZWORDS',
        category: 'prose',
        severity: 'ALERT',
        title: `AI Artifact Prose Detected (${detectedBuzzwords.length} terms)`,
        explanation: `Text contains classic LLM writing artifacts: "${detectedBuzzwords.join('", "')}". Protocol 16 instructs eliminating these to preserve authentic scholarly tone.`,
        recommendedModule: '16_AI_PROSE_CLEANUP'
      });
    } else {
      findings.push({
        ruleId: 'PROSE-CLEAN',
        category: 'prose',
        severity: 'PASS',
        title: 'Clean Academic Register (No LLM clichés detected)',
        explanation: 'Text avoids common AI filler phrases and rhetorical throat-clearing.',
        recommendedModule: '15_FINAL_MANUSCRIPT_STYLE_PASS'
      });
    }

    setResults(findings);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Banner */}
      <div className="bg-white rounded-xl border border-stone-200 shadow-xs p-6 space-y-3">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 bg-amber-50 text-amber-800 border border-amber-200 rounded font-semibold">
            Instant Heuristic Audit
          </span>
          <span className="text-xs text-stone-500">Pre-Scan Check against RIGOR Standards</span>
        </div>
        <h1 className="font-serif font-bold text-2xl text-stone-900 mt-1">
          Manuscript Diagnostic Pre-Scan
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-3xl leading-relaxed">
          Paste an abstract, introduction excerpt, or regression specification to instantly test against
          common referee rejection triggers (staggered DiD weights, clustering pitfalls, weak instruments, AI prose artifacts).
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Input box */}
        <div className="lg:col-span-6 bg-white rounded-xl border border-stone-200 shadow-xs p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-serif font-bold text-base text-stone-900">
              Input Manuscript Excerpt
            </h2>
            <button
              onClick={() => setText('')}
              className="text-xs text-stone-500 hover:text-stone-800"
            >
              Clear
            </button>
          </div>

          <textarea
            rows={10}
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="Paste your abstract, model specification, or theorem statement here..."
            className="w-full text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-lg p-3 text-stone-900 font-mono focus:outline-hidden focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 leading-relaxed"
          />

          <button
            onClick={runScan}
            className="w-full py-2.5 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 shadow-xs transition-colors"
          >
            <Zap className="w-4 h-4 text-amber-400" />
            <span>Run Diagnostic Pre-Scan</span>
          </button>
        </div>

        {/* Results */}
        <div className="lg:col-span-6 bg-white rounded-xl border border-stone-200 shadow-xs p-6 space-y-4">
          <h2 className="font-serif font-bold text-base text-stone-900 border-b border-stone-100 pb-3">
            Diagnostic Heuristic Results
          </h2>

          {!results ? (
            <div className="py-12 text-center text-stone-400 text-xs">
              Click "Run Diagnostic Pre-Scan" to evaluate your excerpt against the RIGOR referee criteria.
            </div>
          ) : (
            <div className="space-y-3">
              {results.map((res, idx) => (
                <div
                  key={idx}
                  className={`p-3.5 rounded-xl border text-xs space-y-1.5 ${
                    res.severity === 'ALERT'
                      ? 'bg-red-50/70 border-red-200 text-red-950'
                      : res.severity === 'WARNING'
                      ? 'bg-amber-50/70 border-amber-200 text-amber-950'
                      : 'bg-emerald-50/70 border-emerald-200 text-emerald-950'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5 font-bold">
                      {res.severity === 'ALERT' && <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />}
                      {res.severity === 'WARNING' && <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />}
                      {res.severity === 'PASS' && <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />}
                      <span>{res.title}</span>
                    </div>
                    <span className="font-mono text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-white/70 border border-black/10">
                      {res.severity}
                    </span>
                  </div>

                  <p className="text-stone-700 leading-relaxed font-sans">
                    {res.explanation}
                  </p>

                  <div className="pt-1.5 border-t border-black/5 flex items-center justify-between text-[11px] text-stone-600">
                    <span>Target Module: <strong className="font-mono text-stone-900">{res.recommendedModule}</strong></span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

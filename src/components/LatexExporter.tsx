import React, { useState, useMemo } from 'react';
import { SAMPLE_AUDIT_REPORTS } from '../data/sampleAudits';
import { AuditReportData, AuditFinding } from '../types';
import { Copy, Check, Download, FileText, Sparkles } from 'lucide-react';

interface LatexExporterProps {
  customReport?: AuditReportData | null;
}

export const LatexExporter: React.FC<LatexExporterProps> = ({ customReport }) => {
  const [selectedReportKey, setSelectedReportKey] = useState<string>(customReport ? 'custom' : 'did_labor');
  const [copied, setCopied] = useState(false);

  React.useEffect(() => {
    if (customReport) {
      setSelectedReportKey('custom');
    }
  }, [customReport]);

  const report = selectedReportKey === 'custom' && customReport 
    ? customReport 
    : SAMPLE_AUDIT_REPORTS[selectedReportKey] || SAMPLE_AUDIT_REPORTS.did_labor;

  // Generate valid LaTeX code according to Protocol 21
  const latexSource = useMemo(() => {
    return `\\documentclass[11pt,letterpaper]{article}
\\usepackage[margin=1in]{geometry}
\\usepackage{amsmath,amssymb,amsfonts}
\\usepackage{booktabs}
\\usepackage{tabularx}
\\usepackage{xcolor}
\\usepackage{microtype}
\\usepackage{enumitem}
\\usepackage{tcolorbox}
\\usepackage{hyperref}

\\hypersetup{
    colorlinks=true,
    linkcolor=black,
    citecolor=black,
    urlcolor=blue
}

\\definecolor{darkamber}{RGB}{180, 83, 9}
\\definecolor{critred}{RGB}{185, 28, 28}
\\definecolor{subamber}{RGB}{217, 119, 6}
\\definecolor{minorgray}{RGB}{75, 85, 99}

\\title{\\textbf{RIGOR Academic Audit Report}\\\\\\large\\textsc{Referee Verification \\& Integrity Assessment}}
\\author{\\textbf{Manuscript:} ${report.paperTitle}}
\\date{\\today}

\\begin{document}

\\maketitle

\\begin{tcolorbox}[colback=yellow!5!white,colframe=darkamber,title=\\textbf{SUBMISSION READINESS VERDICT: ${report.verdict.replace(/_/g, ' ')}}]
\\textbf{Status:} ${report.projectState} Manuscript \\quad \\textbf{Taxonomy:} ${report.paperType.toUpperCase()} \\\\
\\textbf{Executive Summary:} ${report.verdictSummary}
\\end{tcolorbox}

\\section{Journal Readiness \\& Referee Vulnerabilities}
\\begin{itemize}[leftmargin=1.5em]
${report.journalReadiness.recommendedTiers.map((t: string) => `  \\item \\textbf{Recommended Tier:} ${t}`).join('\n')}
${report.journalReadiness.immediateDeskRejectRisks.map((r: string) => `  \\item \\textbf{\\color{critred}Desk-Reject Risk:} ${r}`).join('\n')}
\\end{itemize}

\\section{Root-Cause Issue Ledger}
\\noindent The audit merges all module findings into a single, de-duplicated ledger ordered by root-cause logical dependency and severity.

\\vspace{0.5em}
\\noindent
\\begin{tabularx}{\\textwidth}{l p{2.5cm} p{1.8cm} X}
\\toprule
\\textbf{ID} & \\textbf{Location} & \\textbf{Severity} & \\textbf{Finding \\& Root Cause} \\\\
\\midrule
${report.findings.map((f: AuditFinding) => {
  const sevColor = f.severity === 'CRITICAL' ? 'critred' : f.severity === 'SUBSTANTIVE' ? 'subamber' : 'minorgray';
  return `\\textbf{${f.id}} & \\small ${f.location.replace(/_/g, '\\_')} & {\\bfseries\\color{${sevColor}} ${f.severity}} & \\textbf{${f.title}} \\newline \\small \\textit{Root Cause:} ${f.rootCause.replace(/_/g, '\\_')} \\newline \\textit{Remedy:} ${f.remedy.replace(/_/g, '\\_')} \\\\
\\midrule`;
}).join('\n')}
\\bottomrule
\\end{tabularx}

\\section{Detailed Module Evaluations}
${report.findings.map((f: AuditFinding) => `
\\subsection*{[${f.id}] ${f.title}}
\\begin{itemize}[leftmargin=1.5em]
  \\item \\textbf{Module:} ${f.module}
  \\item \\textbf{Manuscript Location:} ${f.location.replace(/_/g, '\\_')}
  \\item \\textbf{Observed Symptom:} ${f.symptom.replace(/_/g, '\\_')}
  \\item \\textbf{Direct Evidence:} \\texttt{${f.evidence.replace(/_/g, '\\_')}}
  \\item \\textbf{Implementation-Ready Remedy:} ${f.remedy.replace(/_/g, '\\_')}
  \\item \\textbf{Implementation Burden:} ${f.implementationBurden} \\quad \\textbf{Centrality to Contribution:} ${f.centralityToContribution}
\\end{itemize}
`).join('\n')}

\\section{Standard Protocol Compliance}
This report was compiled in adherence to RIGOR Protocol 20 (Submission Readiness Gate), Protocol 00 (Master Router Priority Rules), and Protocol 21 (LaTeX Audit Standard).

\\end{document}
`;
  }, [report]);

  const handleCopyLatex = () => {
    navigator.clipboard.writeText(latexSource);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([latexSource], { type: 'text/plain;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `RIGOR_AUDIT_REPORT_${report.paperTitle.slice(0, 25).replace(/\s+/g, '_')}.tex`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      <div className="bg-white rounded-xl border border-stone-200 shadow-xs p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-100 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 bg-amber-50 text-amber-800 border border-amber-200 rounded font-semibold">
                Protocol 21
              </span>
              <span className="text-xs text-stone-500">Publication-Grade LaTeX / PDF Standard</span>
            </div>
            <h1 className="font-serif font-bold text-2xl text-stone-900 mt-1">
              LaTeX Report Formatter & Exporter
            </h1>
            <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-3xl leading-relaxed">
              Export findings into a compiled, professional LaTeX document adhering to AER / Econometrica
              editorial standards with tabular issue ledgers and verdict callout boxes.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-stone-500 font-medium">Select Report:</span>
            <select
              value={selectedReportKey}
              onChange={e => setSelectedReportKey(e.target.value)}
              className="text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-lg px-3 py-1.5 font-medium text-stone-800"
            >
              {customReport && (
                <option value="custom">★ Live PDF Audit: {customReport.paperTitle.slice(0, 32)}...</option>
              )}
              <option value="did_labor">DiD Labor Reallocation</option>
              <option value="mechanism_auctions">Procurement Auctions</option>
              <option value="structural_macro">HANK Mortgage Refinancing</option>
            </select>
          </div>
        </div>

        {/* Action bar */}
        <div className="flex items-center justify-between gap-2 pt-1">
          <div className="text-xs text-stone-500 font-mono">
            Format: LaTeX 2e (booktabs, tabularx, tcolorbox)
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyLatex}
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-amber-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied LaTeX!' : 'Copy LaTeX Code'}</span>
            </button>

            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-lg text-xs font-medium border border-stone-200 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download .tex</span>
            </button>
          </div>
        </div>

        {/* LaTeX Code Box */}
        <div className="relative">
          <pre className="p-4 bg-stone-950 text-stone-100 rounded-xl text-xs font-mono overflow-x-auto leading-relaxed border border-stone-800 max-h-[550px] overflow-y-auto">
            {latexSource}
          </pre>
        </div>
      </div>
    </div>
  );
};

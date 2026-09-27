import React, { useState } from 'react';
import { SAMPLE_AUDIT_REPORTS } from '../data/sampleAudits';
import { AuditFinding, SeverityLevel, AuditReportData } from '../types';
import { 
  FileCheck, 
  AlertCircle, 
  AlertTriangle, 
  CheckCircle, 
  Search, 
  Filter, 
  Copy, 
  Download, 
  ArrowRight,
  ShieldAlert,
  GitPullRequest,
  Check,
  ChevronDown,
  ChevronRight,
  Sparkles
} from 'lucide-react';

interface IssueLedgerViewerProps {
  customReport?: AuditReportData | null;
  onReportUpdated?: (report: AuditReportData) => void;
}

export const IssueLedgerViewer: React.FC<IssueLedgerViewerProps> = ({ customReport, onReportUpdated }) => {
  const [selectedReportKey, setSelectedReportKey] = useState<string>(customReport ? 'custom' : 'did_labor');
  const [activeReport, setActiveReport] = useState<AuditReportData>(customReport || SAMPLE_AUDIT_REPORTS.did_labor);
  const [severityFilter, setSeverityFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedFindingId, setExpandedFindingId] = useState<string>(
    (customReport?.findings[0]?.id) || 'FINDING-DID-01'
  );
  const [copied, setCopied] = useState(false);

  // Sync if customReport changes
  React.useEffect(() => {
    if (customReport) {
      setSelectedReportKey('custom');
      setActiveReport(customReport);
      if (customReport.findings.length > 0) {
        setExpandedFindingId(customReport.findings[0].id);
      }
    }
  }, [customReport]);

  // Switch report
  const handleSelectReport = (key: string) => {
    setSelectedReportKey(key);
    if (key === 'custom' && customReport) {
      setActiveReport(customReport);
      if (customReport.findings.length > 0) {
        setExpandedFindingId(customReport.findings[0].id);
      }
      return;
    }
    const report = SAMPLE_AUDIT_REPORTS[key];
    if (report) {
      setActiveReport(report);
      if (report.findings.length > 0) {
        setExpandedFindingId(report.findings[0].id);
      }
    }
  };

  // Toggle finding status (accept/contest)
  const handleToggleStatus = (findingId: string, status: 'accepted' | 'contested' | 'pending') => {
    setActiveReport(prev => {
      const updated = {
        ...prev,
        findings: prev.findings.map(f => f.id === findingId ? { ...f, status } : f)
      };
      if (onReportUpdated) {
        onReportUpdated(updated);
      }
      return updated;
    });
  };

  // Filter findings
  const filteredFindings = activeReport.findings.filter(f => {
    if (severityFilter !== 'all' && f.severity !== severityFilter) return false;
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      return (
        f.id.toLowerCase().includes(term) ||
        f.title.toLowerCase().includes(term) ||
        f.summary.toLowerCase().includes(term) ||
        f.rootCause.toLowerCase().includes(term) ||
        f.location.toLowerCase().includes(term)
      );
    }
    return true;
  });

  // Severity counts
  const criticalCount = activeReport.findings.filter(f => f.severity === 'CRITICAL').length;
  const substantiveCount = activeReport.findings.filter(f => f.severity === 'SUBSTANTIVE').length;
  const minorCount = activeReport.findings.filter(f => f.severity === 'MINOR').length;

  const handleCopyLedger = () => {
    const text = activeReport.findings.map(f => `
### [${f.id}] ${f.title} (${f.severity})
- Location: ${f.location}
- Module: ${f.module}
- Root Cause: ${f.rootCause}
- Symptom: ${f.symptom}
- Implementation Remedy: ${f.remedy}
- Status: ${f.status || 'pending'}
`).join('\n---\n');

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Verdict style helper
  const getVerdictStyle = (verdict: AuditReportData['verdict']) => {
    switch (verdict) {
      case 'READY':
        return {
          bg: 'bg-emerald-50 border-emerald-300 text-emerald-900',
          badge: 'bg-emerald-600 text-white',
          label: 'READY FOR SUBMISSION'
        };
      case 'CONDITIONAL_REVISION':
        return {
          bg: 'bg-amber-50 border-amber-300 text-amber-900',
          badge: 'bg-amber-600 text-white',
          label: 'CONDITIONAL REVISION REQUIRED'
        };
      case 'MAJOR_RESTRUCTURE':
        return {
          bg: 'bg-orange-50 border-orange-300 text-orange-900',
          badge: 'bg-orange-600 text-white',
          label: 'MAJOR RESTRUCTURE NEEDED'
        };
      case 'NOT_READY_FATAL':
        return {
          bg: 'bg-red-50 border-red-300 text-red-900',
          badge: 'bg-red-600 text-white',
          label: 'NOT READY — FATAL FLAW DETECTED'
        };
    }
  };

  const verdictStyle = getVerdictStyle(activeReport.verdict);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Header and paper selector */}
      <div className="bg-white rounded-xl border border-stone-200 shadow-xs p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-100 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 bg-stone-100 text-stone-700 rounded font-semibold">
                Issue Ledger Standard
              </span>
              <span className="text-xs text-stone-500">Protocol 00 & 20 Gate</span>
            </div>
            <h1 className="font-serif font-bold text-2xl text-stone-900 mt-1">
              Referee Attack Verdict & Findings Ledger
            </h1>
          </div>

          {/* Archetype switcher */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-stone-500 font-medium">Select Audit Run:</span>
            <select
              value={selectedReportKey}
              onChange={e => handleSelectReport(e.target.value)}
              className="text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-lg px-3 py-1.5 font-medium text-stone-800"
            >
              {customReport && (
                <option value="custom">★ Live PDF Audit: {customReport.paperTitle.slice(0, 32)}...</option>
              )}
              <option value="did_labor">DiD Labor Reallocation (Empirical)</option>
              <option value="mechanism_auctions">Procurement Auctions (Theoretical)</option>
              <option value="structural_macro">HANK Mortgage Refinancing (Structural)</option>
            </select>
          </div>
        </div>

        {/* Verdict Box (Mandatory Submission Readiness Gate) */}
        <div className={`p-5 rounded-xl border ${verdictStyle.bg} space-y-3`}>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-amber-700" />
              <span className="font-bold text-xs uppercase tracking-wider">
                Submission Readiness Verdict:
              </span>
              <span className={`text-xs font-mono font-bold px-2.5 py-0.5 rounded shadow-2xs ${verdictStyle.badge}`}>
                {verdictStyle.label}
              </span>
            </div>

            <div className="flex items-center gap-3 text-xs font-mono">
              <span>Paper State: <strong>{activeReport.projectState}</strong></span>
              <span>•</span>
              <span>Type: <strong>{activeReport.paperType.toUpperCase()}</strong></span>
            </div>
          </div>

          <p className="text-xs sm:text-sm leading-relaxed text-stone-800 font-sans">
            {activeReport.verdictSummary}
          </p>

          {/* Journal Targeting & Desk Reject Risks */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-3 border-t border-stone-200/60 text-xs">
            <div>
              <span className="font-bold text-stone-900 block mb-1">Recommended Journal Tiers:</span>
              <ul className="list-disc list-inside space-y-0.5 text-stone-700">
                {activeReport.journalReadiness.recommendedTiers.map((tier, idx) => (
                  <li key={idx}>{tier}</li>
                ))}
              </ul>
            </div>

            <div>
              <span className="font-bold text-stone-900 block mb-1">Immediate Desk-Reject Risks:</span>
              <ul className="list-disc list-inside space-y-0.5 text-red-900">
                {activeReport.journalReadiness.immediateDeskRejectRisks.map((risk, idx) => (
                  <li key={idx}>{risk}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Modules executed badge list */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1 text-xs">
          <span className="text-stone-500 font-medium">Executed Passes:</span>
          {activeReport.modulesExecuted.map((mod, idx) => (
            <span key={idx} className="px-2 py-0.5 bg-stone-100 text-stone-700 rounded text-[11px] font-mono">
              {mod}
            </span>
          ))}
        </div>
      </div>

      {/* Findings Ledger Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Finding list & filters (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-xl border border-stone-200 shadow-xs p-4 flex flex-col space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-stone-100">
            <h2 className="font-serif font-bold text-base text-stone-900">
              Root-Cause Issue Ledger ({filteredFindings.length})
            </h2>
            <div className="flex items-center gap-1 text-[11px]">
              <span className="px-1.5 py-0.5 bg-red-100 text-red-800 rounded font-bold">{criticalCount} Crit</span>
              <span className="px-1.5 py-0.5 bg-amber-100 text-amber-800 rounded font-bold">{substantiveCount} Sub</span>
              <span className="px-1.5 py-0.5 bg-stone-100 text-stone-700 rounded font-bold">{minorCount} Min</span>
            </div>
          </div>

          {/* Search bar */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-stone-400" />
            <input
              type="text"
              placeholder="Filter findings by keyword or location..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-stone-50 border border-stone-200 rounded-lg text-stone-900"
            />
          </div>

          {/* Severity tabs */}
          <div className="grid grid-cols-4 gap-1 p-1 bg-stone-100 rounded-lg text-xs font-medium text-stone-600">
            <button
              onClick={() => setSeverityFilter('all')}
              className={`py-1 rounded text-center transition-colors ${severityFilter === 'all' ? 'bg-white text-stone-900 font-semibold shadow-xs' : 'hover:text-stone-900'}`}
            >
              All ({activeReport.findings.length})
            </button>
            <button
              onClick={() => setSeverityFilter('CRITICAL')}
              className={`py-1 rounded text-center transition-colors ${severityFilter === 'CRITICAL' ? 'bg-red-600 text-white font-semibold shadow-xs' : 'hover:text-stone-900'}`}
            >
              Critical
            </button>
            <button
              onClick={() => setSeverityFilter('SUBSTANTIVE')}
              className={`py-1 rounded text-center transition-colors ${severityFilter === 'SUBSTANTIVE' ? 'bg-amber-600 text-white font-semibold shadow-xs' : 'hover:text-stone-900'}`}
            >
              Substantive
            </button>
            <button
              onClick={() => setSeverityFilter('MINOR')}
              className={`py-1 rounded text-center transition-colors ${severityFilter === 'MINOR' ? 'bg-stone-600 text-white font-semibold shadow-xs' : 'hover:text-stone-900'}`}
            >
              Minor
            </button>
          </div>

          {/* Findings List */}
          <div className="space-y-2 overflow-y-auto max-h-[500px] pr-1">
            {filteredFindings.map(finding => {
              const isSelected = expandedFindingId === finding.id;
              return (
                <button
                  key={finding.id}
                  onClick={() => setExpandedFindingId(finding.id)}
                  className={`w-full text-left p-3 rounded-lg border transition-all ${
                    isSelected
                      ? 'bg-amber-50/80 border-amber-300 shadow-xs'
                      : 'bg-stone-50/60 border-stone-200 hover:bg-stone-50'
                  }`}
                >
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span className="font-mono text-xs font-bold text-stone-800">
                      {finding.id}
                    </span>
                    <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${
                      finding.severity === 'CRITICAL'
                        ? 'bg-red-100 text-red-800'
                        : finding.severity === 'SUBSTANTIVE'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-stone-200 text-stone-700'
                    }`}>
                      {finding.severity}
                    </span>
                  </div>

                  <div className="font-serif font-bold text-xs text-stone-900 line-clamp-1">
                    {finding.title}
                  </div>

                  <div className="text-[11px] text-stone-500 font-mono mt-1">
                    {finding.location}
                  </div>

                  <div className="flex items-center justify-between mt-2 pt-1.5 border-t border-stone-100 text-[10px]">
                    <span className="text-stone-500">Module: {finding.module}</span>
                    <span className={`font-semibold capitalize ${
                      finding.status === 'accepted' ? 'text-emerald-700' : finding.status === 'contested' ? 'text-red-700' : 'text-stone-500'
                    }`}>
                      {finding.status || 'Pending'}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Copy Ledger button */}
          <div className="pt-2 border-t border-stone-100">
            <button
              onClick={handleCopyLedger}
              className="w-full py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied Ledger!' : 'Copy Entire Issue Ledger (Markdown)'}</span>
            </button>
          </div>
        </div>

        {/* Right Column: Active Finding Detail & Changeset (7 cols) */}
        <div className="lg:col-span-7">
          {(() => {
            const activeFinding = activeReport.findings.find(f => f.id === expandedFindingId) || activeReport.findings[0];
            if (!activeFinding) {
              return (
                <div className="bg-white rounded-xl border border-stone-200 p-8 text-center text-stone-400">
                  Select a finding to inspect root cause, evidence, and implementation changesets.
                </div>
              );
            }

            return (
              <div className="bg-white rounded-xl border border-stone-200 shadow-xs p-6 space-y-5">
                {/* Header */}
                <div className="border-b border-stone-200 pb-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm font-bold px-2 py-0.5 bg-stone-100 text-stone-900 rounded">
                        {activeFinding.id}
                      </span>
                      <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                        activeFinding.severity === 'CRITICAL'
                          ? 'bg-red-100 text-red-800'
                          : activeFinding.severity === 'SUBSTANTIVE'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-stone-100 text-stone-700'
                      }`}>
                        {activeFinding.severity} SEVERITY
                      </span>
                    </div>

                    {/* Author response status buttons */}
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handleToggleStatus(activeFinding.id, 'accepted')}
                        className={`text-xs px-2.5 py-1 rounded font-medium transition-colors ${
                          activeFinding.status === 'accepted'
                            ? 'bg-emerald-600 text-white font-semibold'
                            : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                        }`}
                      >
                        Accept Fix
                      </button>
                      <button
                        onClick={() => handleToggleStatus(activeFinding.id, 'contested')}
                        className={`text-xs px-2.5 py-1 rounded font-medium transition-colors ${
                          activeFinding.status === 'contested'
                            ? 'bg-red-600 text-white font-semibold'
                            : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                        }`}
                      >
                        Contest
                      </button>
                    </div>
                  </div>

                  <h2 className="font-serif font-bold text-xl text-stone-900">
                    {activeFinding.title}
                  </h2>
                  <p className="text-xs text-stone-500 font-mono mt-1">
                    Manuscript Location: <strong className="text-stone-800">{activeFinding.location}</strong>
                  </p>
                </div>

                {/* Summary */}
                <div>
                  <h3 className="text-xs uppercase font-bold tracking-wider text-stone-500 mb-1">
                    Summary of Vulnerability
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-800 leading-relaxed">
                    {activeFinding.summary}
                  </p>
                </div>

                {/* Root Cause vs Symptom Analysis (Crucial RIGOR distinction) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-3.5 bg-amber-50/70 border border-amber-200/80 rounded-lg">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-amber-900 block mb-1">
                      Root Cause
                    </span>
                    <p className="text-xs text-stone-800 leading-relaxed">
                      {activeFinding.rootCause}
                    </p>
                  </div>

                  <div className="p-3.5 bg-stone-50 border border-stone-200 rounded-lg">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-stone-700 block mb-1">
                      Observed Symptom
                    </span>
                    <p className="text-xs text-stone-800 leading-relaxed">
                      {activeFinding.symptom}
                    </p>
                  </div>
                </div>

                {/* Evidence */}
                <div>
                  <h3 className="text-xs uppercase font-bold tracking-wider text-stone-500 mb-1">
                    Direct Manuscript Evidence
                  </h3>
                  <div className="p-3 bg-stone-50 font-mono text-xs text-stone-800 rounded-lg border border-stone-200">
                    {activeFinding.evidence}
                  </div>
                </div>

                {/* Concrete Implementation Remedy */}
                <div className="p-4 bg-emerald-50/60 border border-emerald-200 rounded-xl space-y-2">
                  <div className="flex items-center gap-2">
                    <GitPullRequest className="w-4 h-4 text-emerald-700" />
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-900">
                      Implementation-Ready Remedy (Protocol 27)
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-stone-800 leading-relaxed">
                    {activeFinding.remedy}
                  </p>
                  <div className="flex items-center gap-4 pt-2 text-xs text-stone-600">
                    <span>Implementation Burden: <strong>{activeFinding.implementationBurden}</strong></span>
                    <span>•</span>
                    <span>Centrality to Contribution: <strong>{activeFinding.centralityToContribution}</strong></span>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      </div>
    </div>
  );
};

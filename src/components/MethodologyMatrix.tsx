import React, { useState } from 'react';
import { METHODOLOGY_DESIGNS } from '../data/methodologyMatrix';
import { MethodDesign } from '../types';
import { 
  Grid3X3, 
  Search, 
  FileText, 
  ArrowUpRight, 
  ShieldAlert, 
  CheckCircle2, 
  Filter,
  Layers,
  ExternalLink
} from 'lucide-react';

interface MethodologyMatrixProps {
  onSelectPrompt: (promptId: string) => void;
}

export const MethodologyMatrix: React.FC<MethodologyMatrixProps> = ({ onSelectPrompt }) => {
  const [domainFilter, setDomainFilter] = useState<'all' | 'empirical' | 'theoretical' | 'both'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMethodId, setSelectedMethodId] = useState<string>('did');

  const filteredMethods = METHODOLOGY_DESIGNS.filter(m => {
    if (domainFilter !== 'all' && m.domain !== 'both' && m.domain !== domainFilter) {
      return false;
    }
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      const matchesName = m.name.toLowerCase().includes(term);
      const matchesCode = m.shortCode.toLowerCase().includes(term);
      const matchesDesc = m.description.toLowerCase().includes(term);
      const matchesAssump = m.keyAssumptions.some(a => a.toLowerCase().includes(term));
      const matchesVuln = m.vulnerabilities.some(v => v.toLowerCase().includes(term));
      return matchesName || matchesCode || matchesDesc || matchesAssump || matchesVuln;
    }
    return true;
  });

  const activeMethod = METHODOLOGY_DESIGNS.find(m => m.id === selectedMethodId) || filteredMethods[0] || METHODOLOGY_DESIGNS[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-xl border border-stone-200 shadow-xs p-6 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 bg-amber-50 text-amber-800 border border-amber-200 rounded font-semibold">
                Specialized Router Matrix
              </span>
              <span className="text-xs text-stone-500">19 Method-Specific Audit Checklists</span>
            </div>
            <h1 className="font-serif font-bold text-2xl text-stone-900 mt-1">
              Methodology & Identification Decision Matrix
            </h1>
            <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-3xl leading-relaxed">
              Every research design in modern economics has distinct identification assumptions, blind spots,
              and referee attack vectors. Explore the exact verification protocols used by top-tier journals.
            </p>
          </div>

          {/* Quick Domain Filter */}
          <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-lg text-xs font-medium text-stone-600 self-start sm:self-center">
            <button
              onClick={() => setDomainFilter('all')}
              className={`px-3 py-1.5 rounded-md transition-colors ${domainFilter === 'all' ? 'bg-white text-stone-900 font-semibold shadow-xs' : 'hover:text-stone-900'}`}
            >
              All (19)
            </button>
            <button
              onClick={() => setDomainFilter('empirical')}
              className={`px-3 py-1.5 rounded-md transition-colors ${domainFilter === 'empirical' ? 'bg-white text-stone-900 font-semibold shadow-xs' : 'hover:text-stone-900'}`}
            >
              Empirical (11)
            </button>
            <button
              onClick={() => setDomainFilter('theoretical')}
              className={`px-3 py-1.5 rounded-md transition-colors ${domainFilter === 'theoretical' ? 'bg-white text-stone-900 font-semibold shadow-xs' : 'hover:text-stone-900'}`}
            >
              Theoretical (6)
            </button>
            <button
              onClick={() => setDomainFilter('both')}
              className={`px-3 py-1.5 rounded-md transition-colors ${domainFilter === 'both' ? 'bg-white text-stone-900 font-semibold shadow-xs' : 'hover:text-stone-900'}`}
            >
              Both / Macro (2)
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="relative pt-2">
          <Search className="w-4 h-4 absolute left-3 top-4.5 text-stone-400" />
          <input
            type="text"
            placeholder="Search assumptions, estimators, or vulnerabilities (e.g. SUTVA, McCrary, Bacon weights, Blanchard-Kahn)..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-lg text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600"
          />
        </div>
      </div>

      {/* Grid of Designs */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Designs List (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-xl border border-stone-200 shadow-xs p-4 flex flex-col space-y-2 h-[calc(100vh-280px)] overflow-y-auto">
          {filteredMethods.map(m => {
            const isSelected = activeMethod.id === m.id;
            return (
              <button
                key={m.id}
                onClick={() => setSelectedMethodId(m.id)}
                className={`w-full text-left p-3 rounded-lg border transition-all ${
                  isSelected
                    ? 'bg-amber-50/80 border-amber-300 shadow-xs'
                    : 'bg-stone-50/60 border-stone-200 hover:bg-stone-50'
                }`}
              >
                <div className="flex items-center justify-between gap-1 mb-1">
                  <span className="font-mono text-xs font-bold text-stone-800">
                    [{m.shortCode}]
                  </span>
                  <span className={`text-[9px] uppercase font-bold px-1.5 py-0.5 rounded ${
                    m.domain === 'empirical' ? 'bg-blue-100 text-blue-800' : m.domain === 'theoretical' ? 'bg-purple-100 text-purple-800' : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    {m.domain}
                  </span>
                </div>

                <div className="font-serif font-bold text-xs sm:text-sm text-stone-900">
                  {m.name}
                </div>

                <div className="text-[11px] text-stone-500 line-clamp-1 mt-1">
                  {m.description}
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Column: Active Design Audit Blueprint (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-xl border border-stone-200 shadow-xs p-6 space-y-6">
          <div className="border-b border-stone-200 pb-4">
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="font-mono text-xs font-bold px-2 py-0.5 bg-stone-100 text-stone-700 rounded">
                DESIGN AUDIT BLUEPRINT
              </span>
              <span className={`text-xs uppercase font-bold px-2 py-0.5 rounded ${
                activeMethod.domain === 'empirical' ? 'bg-blue-100 text-blue-800' : activeMethod.domain === 'theoretical' ? 'bg-purple-100 text-purple-800' : 'bg-emerald-100 text-emerald-800'
              }`}>
                {activeMethod.domain.toUpperCase()} DOMAIN
              </span>
            </div>

            <h2 className="font-serif font-bold text-2xl text-stone-900">
              {activeMethod.name}
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-1 leading-relaxed">
              {activeMethod.description}
            </p>

            {/* Quick action buttons to view full prompts */}
            <div className="flex flex-wrap items-center gap-2 mt-4 pt-3 border-t border-stone-100">
              <button
                onClick={() => onSelectPrompt(activeMethod.consistencyPromptId)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-stone-900 hover:bg-stone-800 text-white rounded-md text-xs font-medium transition-colors shadow-2xs"
              >
                <FileText className="w-3.5 h-3.5 text-amber-400" />
                <span>Open Consistency Audit ({activeMethod.consistencyPromptId.split('/').pop()})</span>
                <ArrowUpRight className="w-3 h-3 opacity-70" />
              </button>

              {activeMethod.literaturePromptId && (
                <button
                  onClick={() => onSelectPrompt(activeMethod.literaturePromptId!)}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-md text-xs font-medium transition-colors"
                >
                  <FileText className="w-3.5 h-3.5 text-stone-500" />
                  <span>Open Literature Audit</span>
                  <ArrowUpRight className="w-3 h-3 opacity-70" />
                </button>
              )}
            </div>
          </div>

          {/* Key Assumptions Checklist */}
          <div>
            <div className="flex items-center gap-2 mb-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <h3 className="font-serif font-bold text-sm uppercase tracking-wide text-stone-900">
                Core Identification Assumptions Checked
              </h3>
            </div>
            <div className="space-y-2 bg-emerald-50/40 p-3.5 rounded-xl border border-emerald-200/60">
              {activeMethod.keyAssumptions.map((assump, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-stone-800 leading-relaxed">
                  <span className="font-mono font-bold text-emerald-700 mt-0.5">•</span>
                  <span>{assump}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Vulnerabilities & Referee Attacks */}
          <div>
            <div className="flex items-center gap-2 mb-2.5">
              <ShieldAlert className="w-4 h-4 text-red-600" />
              <h3 className="font-serif font-bold text-sm uppercase tracking-wide text-stone-900">
                Classic Referee Attack Vectors & Vulnerabilities
              </h3>
            </div>
            <div className="space-y-2 bg-red-50/40 p-3.5 rounded-xl border border-red-200/60">
              {activeMethod.vulnerabilities.map((vuln, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-stone-800 leading-relaxed">
                  <span className="font-mono font-bold text-red-600 mt-0.5">!</span>
                  <span>{vuln}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

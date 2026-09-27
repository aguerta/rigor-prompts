import React from 'react';
import { 
  GitBranch, 
  BookOpen, 
  Grid3X3, 
  FileCheck, 
  Zap, 
  FileText,
  ShieldCheck,
  Award
} from 'lucide-react';

export type TabType = 'builder' | 'library' | 'matrix' | 'ledger' | 'quickscan' | 'latex';

interface HeaderProps {
  currentTab: TabType;
  onSelectTab: (tab: TabType) => void;
  totalPromptsCount: number;
}

export const Header: React.FC<HeaderProps> = ({ currentTab, onSelectTab, totalPromptsCount }) => {
  return (
    <header className="border-b border-stone-200 bg-white sticky top-0 z-40 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Identity */}
          <div className="flex items-center gap-3.5">
            <div className="w-9 h-9 bg-stone-900 rounded-lg flex items-center justify-center text-amber-400 font-serif font-bold text-xl shadow-xs">
              R
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif font-black tracking-tight text-xl text-stone-900">
                  RIGOR
                </span>
                <span className="text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 bg-stone-100 text-stone-700 rounded border border-stone-200">
                  Audit Engine
                </span>
                <span className="text-[11px] text-amber-700 font-medium hidden sm:inline-flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded border border-amber-200/60">
                  <ShieldCheck className="w-3 h-3 text-amber-600" /> Top-Tier Standard
                </span>
              </div>
              <p className="text-[11.5px] text-stone-500 hidden md:block">
                Academic Research Audit Protocols & Orchestration for Economics & Social Sciences
              </p>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="flex items-center gap-3 text-xs">
            <div className="hidden lg:flex items-center gap-4 bg-stone-50 px-3 py-1.5 rounded-md border border-stone-200 text-stone-600">
              <div className="flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-stone-400" />
                <span><strong className="text-stone-900 font-mono">{totalPromptsCount}</strong> Audit Protocols</span>
              </div>
              <div className="h-3 w-px bg-stone-200" />
              <div className="flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-stone-400" />
                <span>AER / Econometrica / QJE</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 sm:space-x-2 overflow-x-auto pb-1 pt-1 scrollbar-none border-t border-stone-100">
          <button
            onClick={() => onSelectTab('builder')}
            className={`flex items-center gap-1.5 py-2 px-3 text-xs sm:text-sm font-medium rounded-md whitespace-nowrap transition-colors ${
              currentTab === 'builder'
                ? 'bg-amber-100/70 text-amber-900 border border-amber-300/80 font-semibold'
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
            }`}
          >
            <GitBranch className="w-4 h-4 text-amber-700" />
            <span>Master Router & Pipeline</span>
          </button>

          <button
            onClick={() => onSelectTab('library')}
            className={`flex items-center gap-1.5 py-2 px-3 text-xs sm:text-sm font-medium rounded-md whitespace-nowrap transition-colors ${
              currentTab === 'library'
                ? 'bg-amber-100/70 text-amber-900 border border-amber-300/80 font-semibold'
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
            }`}
          >
            <BookOpen className="w-4 h-4 text-amber-700" />
            <span>Prompt Library ({totalPromptsCount})</span>
          </button>

          <button
            onClick={() => onSelectTab('matrix')}
            className={`flex items-center gap-1.5 py-2 px-3 text-xs sm:text-sm font-medium rounded-md whitespace-nowrap transition-colors ${
              currentTab === 'matrix'
                ? 'bg-amber-100/70 text-amber-900 border border-amber-300/80 font-semibold'
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
            }`}
          >
            <Grid3X3 className="w-4 h-4 text-amber-700" />
            <span>Methodology Matrix (19)</span>
          </button>

          <button
            onClick={() => onSelectTab('ledger')}
            className={`flex items-center gap-1.5 py-2 px-3 text-xs sm:text-sm font-medium rounded-md whitespace-nowrap transition-colors ${
              currentTab === 'ledger'
                ? 'bg-amber-100/70 text-amber-900 border border-amber-300/80 font-semibold'
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
            }`}
          >
            <FileCheck className="w-4 h-4 text-amber-700" />
            <span>Findings Ledger & Attack</span>
          </button>

          <button
            onClick={() => onSelectTab('quickscan')}
            className={`flex items-center gap-1.5 py-2 px-3 text-xs sm:text-sm font-medium rounded-md whitespace-nowrap transition-colors ${
              currentTab === 'quickscan'
                ? 'bg-amber-100/70 text-amber-900 border border-amber-300/80 font-semibold'
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
            }`}
          >
            <Zap className="w-4 h-4 text-amber-700" />
            <span>Manuscript Diagnostic Pre-Scan</span>
          </button>

          <button
            onClick={() => onSelectTab('latex')}
            className={`flex items-center gap-1.5 py-2 px-3 text-xs sm:text-sm font-medium rounded-md whitespace-nowrap transition-colors ${
              currentTab === 'latex'
                ? 'bg-amber-100/70 text-amber-900 border border-amber-300/80 font-semibold'
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
            }`}
          >
            <FileText className="w-4 h-4 text-amber-700" />
            <span>LaTeX Report Standard</span>
          </button>
        </div>
      </div>
    </header>
  );
};

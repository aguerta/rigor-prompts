import React, { useState } from 'react';
import { Header, TabType } from './components/Header';
import { PromptExplorer } from './components/PromptExplorer';
import { PipelineBuilder } from './components/PipelineBuilder';
import { IssueLedgerViewer } from './components/IssueLedgerViewer';
import { MethodologyMatrix } from './components/MethodologyMatrix';
import { ManuscriptQuickScan } from './components/ManuscriptQuickScan';
import { LatexExporter } from './components/LatexExporter';
import { ALL_PROMPTS, PromptItem } from './data/promptsLoader';
import { AuditReportData } from './types';

export const App: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<TabType>('builder');
  const [selectedPromptId, setSelectedPromptId] = useState<string>('00_MASTER_ROUTER');
  const [customReport, setCustomReport] = useState<AuditReportData | null>(null);

  const handleSelectPromptFromAnywhere = (promptId: string) => {
    setSelectedPromptId(promptId);
    setCurrentTab('library');
  };

  const handleLoadPromptIntoBuilder = (prompt: PromptItem) => {
    setCurrentTab('builder');
  };

  return (
    <div className="min-h-screen flex flex-col bg-stone-100/60 text-stone-900 font-sans">
      <Header
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        totalPromptsCount={ALL_PROMPTS.length}
      />

      <main className="flex-1 pb-16">
        {currentTab === 'builder' && (
          <PipelineBuilder
            prompts={ALL_PROMPTS}
            onOpenPromptInExplorer={handleSelectPromptFromAnywhere}
            onAuditReportGenerated={setCustomReport}
            onNavigateToTab={setCurrentTab}
          />
        )}

        {currentTab === 'library' && (
          <PromptExplorer
            prompts={ALL_PROMPTS}
            selectedPromptId={selectedPromptId}
            onSelectPrompt={setSelectedPromptId}
            onLoadIntoBuilder={handleLoadPromptIntoBuilder}
          />
        )}

        {currentTab === 'matrix' && (
          <MethodologyMatrix
            onSelectPrompt={handleSelectPromptFromAnywhere}
          />
        )}

        {currentTab === 'ledger' && (
          <IssueLedgerViewer 
            customReport={customReport}
            onReportUpdated={setCustomReport}
          />
        )}

        {currentTab === 'quickscan' && (
          <ManuscriptQuickScan
            onNavigateToModule={handleSelectPromptFromAnywhere}
          />
        )}

        {currentTab === 'latex' && (
          <LatexExporter 
            customReport={customReport}
          />
        )}
      </main>

      {/* Academic Citation Footer */}
      <footer className="border-t border-stone-200 bg-white py-6 text-xs text-stone-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-serif font-black text-stone-800">RIGOR</span>
            <span>—</span>
            <span>AI Research Audit Prompts for Social Science & Economics</span>
          </div>

          <div className="flex items-center gap-4 text-stone-600">
            <span>66 Audits Indexed</span>
            <span>•</span>
            <span>AER / QJE / Econometrica / JPE Benchmarks</span>
            <span>•</span>
            <a 
              href="https://github.com/aguerta/rigor-prompts" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-stone-800 hover:text-amber-800 underline font-mono"
            >
              aguerta/rigor-prompts
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

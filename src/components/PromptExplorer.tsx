import React, { useState, useMemo } from 'react';
import { PromptItem } from '../data/promptsLoader';
import { MarkdownRenderer } from './MarkdownRenderer';
import { 
  Search, 
  Copy, 
  Check, 
  Download, 
  Filter, 
  FileText, 
  Layers, 
  Hash, 
  ArrowUpRight,
  Code,
  Eye,
  SlidersHorizontal,
  FolderOpen
} from 'lucide-react';

interface PromptExplorerProps {
  prompts: PromptItem[];
  selectedPromptId?: string;
  onSelectPrompt: (promptId: string) => void;
  onLoadIntoBuilder?: (prompt: PromptItem) => void;
}

export const PromptExplorer: React.FC<PromptExplorerProps> = ({
  prompts,
  selectedPromptId,
  onSelectPrompt,
  onLoadIntoBuilder
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [stateFilter, setStateFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'rendered' | 'raw'>('rendered');
  const [copied, setCopied] = useState(false);

  // Filter prompts
  const filteredPrompts = useMemo(() => {
    return prompts.filter(p => {
      // Category filter
      if (categoryFilter === 'core' && p.category !== 'core') return false;
      if (categoryFilter === 'specialized-consistency' && p.category !== 'specialized-consistency') return false;
      if (categoryFilter === 'specialized-literature' && p.category !== 'specialized-literature') return false;

      // State filter
      if (stateFilter !== 'all' && p.stateTarget !== 'BOTH' && p.stateTarget !== stateFilter) return false;

      // Type filter
      if (typeFilter !== 'all') {
        const matches = p.paperTypes.includes(typeFilter as any) || p.paperTypes.includes('all');
        if (!matches) return false;
      }

      // Search term
      if (searchTerm.trim()) {
        const term = searchTerm.toLowerCase();
        const matchesTitle = p.title.toLowerCase().includes(term);
        const matchesFilename = p.filename.toLowerCase().includes(term);
        const matchesDesc = p.description.toLowerCase().includes(term);
        const matchesContent = p.content.toLowerCase().includes(term);
        return matchesTitle || matchesFilename || matchesDesc || matchesContent;
      }

      return true;
    });
  }, [prompts, categoryFilter, stateFilter, typeFilter, searchTerm]);

  // Selected prompt
  const activePrompt = useMemo(() => {
    if (selectedPromptId) {
      const found = prompts.find(p => p.id === selectedPromptId);
      if (found) return found;
    }
    return filteredPrompts[0] || prompts[0];
  }, [selectedPromptId, filteredPrompts, prompts]);

  const handleCopyPrompt = () => {
    if (!activePrompt) return;
    navigator.clipboard.writeText(activePrompt.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!activePrompt) return;
    const blob = new Blob([activePrompt.content], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = activePrompt.filename;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Explorer Directory & Filters */}
        <div className="lg:col-span-4 flex flex-col space-y-3 bg-white p-4 rounded-xl border border-stone-200 shadow-xs h-[calc(100vh-140px)] sticky top-24">
          <div className="flex items-center justify-between pb-2 border-b border-stone-100">
            <div className="flex items-center gap-2">
              <FolderOpen className="w-4 h-4 text-amber-600" />
              <h2 className="font-serif font-bold text-stone-900 text-base">Prompt Library</h2>
            </div>
            <span className="text-xs font-mono font-medium px-2 py-0.5 bg-stone-100 text-stone-600 rounded">
              {filteredPrompts.length} / {prompts.length}
            </span>
          </div>

          {/* Search bar */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-stone-400" />
            <input
              type="text"
              placeholder="Search prompts, lemmas, DAGs, estimators..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 transition-all"
            />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm('')} 
                className="absolute right-2.5 top-2 text-stone-400 hover:text-stone-600 text-xs"
              >
                ✕
              </button>
            )}
          </div>

          {/* Category Tabs */}
          <div className="grid grid-cols-4 gap-1 p-1 bg-stone-100 rounded-lg text-[11px] font-medium text-stone-600">
            <button
              onClick={() => setCategoryFilter('all')}
              className={`py-1 rounded text-center transition-colors ${categoryFilter === 'all' ? 'bg-white text-stone-900 font-semibold shadow-xs' : 'hover:text-stone-900'}`}
            >
              All ({prompts.length})
            </button>
            <button
              onClick={() => setCategoryFilter('core')}
              className={`py-1 rounded text-center transition-colors ${categoryFilter === 'core' ? 'bg-white text-stone-900 font-semibold shadow-xs' : 'hover:text-stone-900'}`}
              title="Core protocols 00-27"
            >
              Core (28)
            </button>
            <button
              onClick={() => setCategoryFilter('specialized-consistency')}
              className={`py-1 rounded text-center transition-colors ${categoryFilter === 'specialized-consistency' ? 'bg-white text-stone-900 font-semibold shadow-xs' : 'hover:text-stone-900'}`}
              title="Specialized Method Consistency"
            >
              Method (19)
            </button>
            <button
              onClick={() => setCategoryFilter('specialized-literature')}
              className={`py-1 rounded text-center transition-colors ${categoryFilter === 'specialized-literature' ? 'bg-white text-stone-900 font-semibold shadow-xs' : 'hover:text-stone-900'}`}
              title="Specialized Literature Checks"
            >
              Lit (18)
            </button>
          </div>

          {/* Secondary Filters */}
          <div className="flex items-center gap-2 text-xs">
            <div className="flex-1">
              <label className="text-[10px] uppercase font-semibold text-stone-500 mb-0.5 block">State</label>
              <select
                value={stateFilter}
                onChange={e => setStateFilter(e.target.value)}
                className="w-full text-xs bg-stone-50 border border-stone-200 rounded px-2 py-1 text-stone-700"
              >
                <option value="all">Any State</option>
                <option value="CLOSED">CLOSED (Frozen)</option>
                <option value="OPEN">OPEN (Constructive)</option>
              </select>
            </div>
            <div className="flex-1">
              <label className="text-[10px] uppercase font-semibold text-stone-500 mb-0.5 block">Paper Type</label>
              <select
                value={typeFilter}
                onChange={e => setTypeFilter(e.target.value)}
                className="w-full text-xs bg-stone-50 border border-stone-200 rounded px-2 py-1 text-stone-700"
              >
                <option value="all">Any Type</option>
                <option value="empirical">Empirical</option>
                <option value="theoretical">Theoretical</option>
                <option value="structural-quantitative">Structural</option>
              </select>
            </div>
          </div>

          {/* List of prompts */}
          <div className="flex-1 overflow-y-auto space-y-1.5 pr-1 divide-y divide-stone-100/80">
            {filteredPrompts.length === 0 ? (
              <div className="text-center py-10 text-stone-400 text-xs">
                No audit protocols match your filter criteria.
              </div>
            ) : (
              filteredPrompts.map(p => {
                const isSelected = activePrompt?.id === p.id;
                return (
                  <button
                    key={p.id}
                    onClick={() => onSelectPrompt(p.id)}
                    className={`w-full text-left p-2.5 rounded-lg transition-all ${
                      isSelected
                        ? 'bg-amber-50/80 border border-amber-300/80 shadow-xs'
                        : 'hover:bg-stone-50 border border-transparent'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded font-semibold ${
                        p.category === 'core' 
                          ? 'bg-stone-100 text-stone-700' 
                          : p.category === 'specialized-consistency'
                          ? 'bg-blue-50 text-blue-700 border border-blue-200/50'
                          : 'bg-emerald-50 text-emerald-700 border border-emerald-200/50'
                      }`}>
                        {p.filename.replace(/\.md$/, '').split('_')[0]}
                      </span>
                      <span className="text-[10px] text-stone-400 font-mono">
                        {p.wordCount.toLocaleString()} words
                      </span>
                    </div>

                    <div className="font-serif font-bold text-xs text-stone-900 line-clamp-1">
                      {p.title}
                    </div>

                    <div className="text-[11px] text-stone-500 line-clamp-1 mt-0.5">
                      {p.description}
                    </div>

                    <div className="flex items-center gap-1.5 mt-1.5">
                      {p.stateTarget !== 'BOTH' && (
                        <span className={`text-[9px] uppercase px-1 py-0.2 rounded font-semibold ${
                          p.stateTarget === 'CLOSED' ? 'bg-stone-200/60 text-stone-800' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {p.stateTarget}
                        </span>
                      )}
                      {p.methodTag && (
                        <span className="text-[9px] uppercase px-1 py-0.2 rounded font-mono bg-stone-100 text-stone-600">
                          {p.methodTag}
                        </span>
                      )}
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* Right Column: Prompt Viewer & Content */}
        <div className="lg:col-span-8 flex flex-col space-y-4">
          {activePrompt ? (
            <div className="bg-white rounded-xl border border-stone-200 shadow-xs p-6">
              {/* Document Header */}
              <div className="border-b border-stone-200 pb-5">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                      activePrompt.category === 'core'
                        ? 'bg-stone-100 text-stone-800 border border-stone-200'
                        : activePrompt.category === 'specialized-consistency'
                        ? 'bg-blue-50 text-blue-800 border border-blue-200'
                        : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                    }`}>
                      {activePrompt.category.toUpperCase()}
                    </span>
                    <span className="text-xs text-stone-500 font-mono">
                      {activePrompt.path}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <div className="flex rounded-md border border-stone-200 bg-stone-50 p-0.5 text-xs">
                      <button
                        onClick={() => setViewMode('rendered')}
                        className={`flex items-center gap-1 px-2.5 py-1 rounded font-medium transition-colors ${
                          viewMode === 'rendered' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-500 hover:text-stone-900'
                        }`}
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Formatted</span>
                      </button>
                      <button
                        onClick={() => setViewMode('raw')}
                        className={`flex items-center gap-1 px-2.5 py-1 rounded font-medium transition-colors ${
                          viewMode === 'raw' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-500 hover:text-stone-900'
                        }`}
                      >
                        <Code className="w-3.5 h-3.5" />
                        <span>Raw Markdown</span>
                      </button>
                    </div>

                    <button
                      onClick={handleCopyPrompt}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-stone-900 hover:bg-stone-800 text-white rounded-md text-xs font-medium transition-colors shadow-xs"
                      title="Copy full prompt to clipboard"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-amber-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copied ? 'Copied!' : 'Copy Prompt'}</span>
                    </button>

                    <button
                      onClick={handleDownload}
                      className="p-1.5 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-md border border-stone-200 transition-colors"
                      title="Download Markdown file"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <h1 className="font-serif font-bold text-2xl sm:text-3xl text-stone-900 tracking-tight">
                  {activePrompt.title}
                </h1>

                <p className="text-sm text-stone-600 mt-2 font-sans leading-relaxed">
                  {activePrompt.description}
                </p>

                {/* Metadata Pills */}
                <div className="flex flex-wrap items-center gap-3 mt-4 text-xs">
                  <div className="flex items-center gap-1 text-stone-500">
                    <FileText className="w-3.5 h-3.5 text-stone-400" />
                    <span>Filename: <strong className="text-stone-800 font-mono">{activePrompt.filename}</strong></span>
                  </div>
                  <div className="h-3 w-px bg-stone-200" />
                  <div className="flex items-center gap-1 text-stone-500">
                    <Hash className="w-3.5 h-3.5 text-stone-400" />
                    <span>Length: <strong className="text-stone-800 font-mono">{activePrompt.wordCount.toLocaleString()} words</strong></span>
                  </div>
                  <div className="h-3 w-px bg-stone-200" />
                  <div className="flex items-center gap-1 text-stone-500">
                    <Layers className="w-3.5 h-3.5 text-stone-400" />
                    <span>State: <strong className="text-stone-800">{activePrompt.stateTarget}</strong></span>
                  </div>
                  {onLoadIntoBuilder && (
                    <button
                      onClick={() => onLoadIntoBuilder(activePrompt)}
                      className="ml-auto text-amber-700 hover:text-amber-800 font-medium flex items-center gap-1 text-xs underline"
                    >
                      Configure in Master Router Pipeline <ArrowUpRight className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>

              {/* Document Body */}
              <div className="pt-6">
                {viewMode === 'rendered' ? (
                  <div className="font-serif prose-stone max-w-none">
                    <MarkdownRenderer content={activePrompt.content} />
                  </div>
                ) : (
                  <pre className="p-4 bg-stone-950 text-stone-200 rounded-lg text-xs font-mono overflow-x-auto leading-relaxed border border-stone-800">
                    {activePrompt.content}
                  </pre>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-stone-200 p-12 text-center text-stone-400">
              Select a prompt from the directory on the left to read its full instructions.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

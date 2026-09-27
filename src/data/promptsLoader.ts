// Raw markdown imports via Vite
const rawPromptFiles = import.meta.glob('/prompts/**/*.md', {
  query: '?raw',
  import: 'default',
  eager: true
}) as Record<string, string>;

export interface PromptItem {
  id: string;
  path: string;
  filename: string;
  title: string;
  category: 'core' | 'specialized-consistency' | 'specialized-literature' | 'specialized-router';
  phase?: string;
  description: string;
  paperTypes: ('theoretical' | 'empirical' | 'theory-empirical' | 'structural-quantitative' | 'all')[];
  methodTag?: string;
  stateTarget: 'CLOSED' | 'OPEN' | 'BOTH';
  content: string;
  wordCount: number;
}

// Helper to extract title and brief summary from markdown text
function parseMarkdownHeader(content: string, filename: string): { title: string; description: string } {
  const lines = content.split('\n');
  let title = filename.replace(/\.md$/, '').replace(/^\d+_+/, '').replace(/_/g, ' ');
  let description = '';

  for (let i = 0; i < Math.min(lines.length, 30); i++) {
    const line = lines[i].trim();
    if (!title || title.length < 5) {
      if (line.startsWith('# ')) {
        title = line.replace(/^#\s+/, '').trim();
      }
    }
    if (!description && line && !line.startsWith('#') && !line.startsWith('---') && line.length > 20) {
      description = line;
    }
  }

  // Fallbacks if not found
  if (!description) {
    description = `Audit checklist and instructions for ${title.toLowerCase()}.`;
  } else if (description.length > 220) {
    description = description.slice(0, 217) + '...';
  }

  return { title, description };
}

// Compute catalog
export const ALL_PROMPTS: PromptItem[] = Object.entries(rawPromptFiles).map(([path, content]) => {
  const filename = path.split('/').pop() || '';
  const { title, description } = parseMarkdownHeader(content, filename);
  
  let category: PromptItem['category'] = 'core';
  let methodTag: string | undefined;

  if (path.includes('/specialized/consistency/')) {
    category = 'specialized-consistency';
    methodTag = filename.replace(/^\d+_+/, '').replace(/\.md$/, '');
  } else if (path.includes('/specialized/literature/')) {
    category = 'specialized-literature';
    methodTag = filename.replace(/^\d+_+/, '').replace(/_LIT\.md$/, '');
  } else if (path.includes('/specialized/')) {
    category = 'specialized-router';
  }

  // Determine state target
  let stateTarget: 'CLOSED' | 'OPEN' | 'BOTH' = 'BOTH';
  if (filename.includes('CLOSED')) {
    stateTarget = 'CLOSED';
  } else if (filename.includes('OPEN')) {
    stateTarget = 'OPEN';
  }

  // Determine paper types
  let paperTypes: PromptItem['paperTypes'] = ['all'];
  const upper = filename.toUpperCase();
  if (upper.includes('THEORY') || upper.includes('MATHEMATICAL') || upper.includes('GAME_THEORY') || upper.includes('MECHANISM')) {
    paperTypes = ['theoretical', 'theory-empirical'];
  } else if (upper.includes('ECONOMETRIC') || upper.includes('CAUSAL') || upper.includes('DID') || upper.includes('RCT') || upper.includes('RDD') || upper.includes('IV_') || upper.includes('PANEL') || upper.includes('EMPIRICAL')) {
    paperTypes = ['empirical', 'theory-empirical'];
  } else if (upper.includes('STRUCTURAL') || upper.includes('DYNAMIC_MACRO')) {
    paperTypes = ['structural-quantitative', 'theoretical', 'empirical'];
  }

  return {
    id: path.replace(/^\/prompts\//, '').replace(/\.md$/, ''),
    path,
    filename,
    title,
    category,
    description,
    paperTypes,
    methodTag,
    stateTarget,
    content,
    wordCount: content.split(/\s+/).filter(Boolean).length
  };
}).sort((a, b) => {
  // Sort core prompts by number prefix if available
  return a.path.localeCompare(b.path, undefined, { numeric: true, sensitivity: 'base' });
});

export const CORE_PROMPTS = ALL_PROMPTS.filter(p => p.category === 'core');
export const CONSISTENCY_PROMPTS = ALL_PROMPTS.filter(p => p.category === 'specialized-consistency');
export const LITERATURE_PROMPTS = ALL_PROMPTS.filter(p => p.category === 'specialized-literature');

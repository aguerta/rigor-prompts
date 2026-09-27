import React from 'react';

interface MarkdownRendererProps {
  content: string;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];
  let inCodeBlock = false;
  let codeBlockContent: string[] = [];
  let inList = false;
  let listItems: string[] = [];
  let inTable = false;
  let tableRows: string[][] = [];

  const flushList = () => {
    if (inList && listItems.length > 0) {
      elements.push(
        <ul key={`list-${elements.length}`} className="my-3 space-y-1.5 list-disc list-inside text-stone-700 leading-relaxed pl-2">
          {listItems.map((item, idx) => (
            <li key={idx} className="text-stone-800 text-[15px]">
              {renderInline(item)}
            </li>
          ))}
        </ul>
      );
      inList = false;
      listItems = [];
    }
  };

  const flushTable = () => {
    if (inTable && tableRows.length > 0) {
      const [headerRow, ...bodyRows] = tableRows.filter(row => !row.every(cell => cell.match(/^[-:| ]+$/)));
      elements.push(
        <div key={`table-${elements.length}`} className="my-4 overflow-x-auto rounded border border-stone-200">
          <table className="min-w-full text-left text-sm divide-y divide-stone-200">
            {headerRow && (
              <thead className="bg-stone-100 font-semibold text-stone-900">
                <tr>
                  {headerRow.map((cell, idx) => (
                    <th key={idx} className="px-3 py-2 border-r border-stone-200 last:border-0 font-medium">
                      {renderInline(cell.trim())}
                    </th>
                  ))}
                </tr>
              </thead>
            )}
            <tbody className="divide-y divide-stone-100 bg-white">
              {bodyRows.map((row, rIdx) => (
                <tr key={rIdx} className={rIdx % 2 === 0 ? 'bg-white' : 'bg-stone-50/50'}>
                  {row.map((cell, cIdx) => (
                    <td key={cIdx} className="px-3 py-2 border-r border-stone-200 last:border-0 text-stone-700 text-[13.5px]">
                      {renderInline(cell.trim())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      inTable = false;
      tableRows = [];
    }
  };

  const renderInline = (text: string) => {
    // Handle inline formatting: bold, italic, code
    const parts: React.ReactNode[] = [];
    let current = text;
    let key = 0;

    // Replace bold **text** or __text__
    const regex = /(\*\*|__)(.*?)\1|(`)(.*?)\3|(\*|_)(.*?)\5/g;
    let match;
    let lastIndex = 0;

    while ((match = regex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push(text.substring(lastIndex, match.index));
      }

      if (match[2]) {
        // Bold
        parts.push(<strong key={key++} className="font-semibold text-stone-950">{match[2]}</strong>);
      } else if (match[4]) {
        // Code
        parts.push(
          <code key={key++} className="px-1.5 py-0.5 text-[13px] bg-stone-100 border border-stone-200 text-stone-800 rounded font-code">
            {match[4]}
          </code>
        );
      } else if (match[6]) {
        // Italic
        parts.push(<em key={key++} className="italic text-stone-800">{match[6]}</em>);
      }

      lastIndex = regex.lastIndex;
    }

    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex));
    }

    return parts.length > 0 ? parts : text;
  };

  lines.forEach((rawLine, idx) => {
    const line = rawLine;

    // Handle code blocks ```
    if (line.trim().startsWith('```')) {
      if (inCodeBlock) {
        elements.push(
          <div key={`code-${elements.length}`} className="my-3 rounded bg-stone-900 text-stone-100 p-3.5 text-xs font-code overflow-x-auto shadow-inner">
            <pre>{codeBlockContent.join('\n')}</pre>
          </div>
        );
        codeBlockContent = [];
        inCodeBlock = false;
      } else {
        flushList();
        flushTable();
        inCodeBlock = true;
      }
      return;
    }

    if (inCodeBlock) {
      codeBlockContent.push(line);
      return;
    }

    // Handle Tables | cell | cell |
    if (line.trim().startsWith('|') && line.trim().endsWith('|')) {
      flushList();
      inTable = true;
      const cells = line.split('|').slice(1, -1);
      tableRows.push(cells);
      return;
    } else {
      flushTable();
    }

    // Handle unordered lists - or *
    if (line.trim().match(/^[-*]\s+/)) {
      inList = true;
      listItems.push(line.trim().replace(/^[-*]\s+/, ''));
      return;
    }

    // Handle numbered lists 1. 2.
    if (line.trim().match(/^\d+\.\s+/)) {
      flushList();
      elements.push(
        <div key={`num-${idx}`} className="my-1.5 flex gap-2 text-stone-800 text-[15px] pl-2">
          <span className="font-semibold text-stone-500 font-mono text-xs mt-1 shrink-0">{line.trim().match(/^\d+\./)?.[0]}</span>
          <span className="flex-1">{renderInline(line.trim().replace(/^\d+\.\s+/, ''))}</span>
        </div>
      );
      return;
    }

    flushList();

    // Headers
    if (line.startsWith('# ')) {
      elements.push(
        <h1 key={`h1-${idx}`} className="text-2xl font-bold font-serif text-stone-900 border-b border-stone-200 pb-2 mt-6 mb-3 tracking-tight">
          {line.replace(/^#\s+/, '')}
        </h1>
      );
      return;
    }

    if (line.startsWith('## ')) {
      elements.push(
        <h2 key={`h2-${idx}`} className="text-xl font-bold font-serif text-stone-900 border-b border-stone-100 pb-1.5 mt-5 mb-2.5 tracking-tight flex items-center gap-2">
          <span className="w-1.5 h-4 bg-amber-600 rounded-sm inline-block"></span>
          {line.replace(/^##\s+/, '')}
        </h2>
      );
      return;
    }

    if (line.startsWith('### ')) {
      elements.push(
        <h3 key={`h3-${idx}`} className="text-base font-semibold text-stone-800 mt-4 mb-1.5">
          {line.replace(/^###\s+/, '')}
        </h3>
      );
      return;
    }

    if (line.startsWith('#### ')) {
      elements.push(
        <h4 key={`h4-${idx}`} className="text-sm font-semibold uppercase tracking-wider text-stone-600 mt-3 mb-1">
          {line.replace(/^####\s+/, '')}
        </h4>
      );
      return;
    }

    // Horizontal Rule
    if (line.trim() === '---' || line.trim() === '***') {
      elements.push(<hr key={`hr-${idx}`} className="my-5 border-stone-200" />);
      return;
    }

    // Blockquote
    if (line.startsWith('> ')) {
      elements.push(
        <blockquote key={`quote-${idx}`} className="my-2 border-l-3 border-amber-600 pl-3 py-1 italic text-stone-600 bg-amber-50/40 rounded-r text-[14.5px]">
          {renderInline(line.replace(/^>\s+/, ''))}
        </blockquote>
      );
      return;
    }

    // Empty line
    if (!line.trim()) {
      return;
    }

    // Normal Paragraph
    elements.push(
      <p key={`p-${idx}`} className="my-2 text-[15px] leading-relaxed text-stone-700 font-sans">
        {renderInline(line)}
      </p>
    );
  });

  flushList();
  flushTable();

  return <div className="space-y-1">{elements}</div>;
};

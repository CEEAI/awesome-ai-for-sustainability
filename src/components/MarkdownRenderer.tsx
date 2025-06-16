
import React from 'react';
import ReactMarkdown from 'react-markdown';

interface MarkdownRendererProps {
  content: string;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  return (
    <div className="markdown-content">
      <ReactMarkdown 
        components={{
          h1: ({children}) => <h1 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200">{children}</h1>,
          h2: ({children}) => <h2 className="text-xl font-semibold text-gray-800 mb-3 mt-6">{children}</h2>,
          h3: ({children}) => <h3 className="text-lg font-medium text-gray-800 mb-2 mt-4">{children}</h3>,
          h4: ({children}) => <h4 className="text-base font-medium text-gray-700 mb-2 mt-3">{children}</h4>,
          p: ({children}) => <p className="text-gray-600 mb-4 leading-relaxed">{children}</p>,
          ul: ({children}) => <ul className="list-disc list-inside text-gray-600 mb-4 space-y-1">{children}</ul>,
          ol: ({children}) => <ol className="list-decimal list-inside text-gray-600 mb-4 space-y-1">{children}</ol>,
          li: ({children}) => <li className="leading-relaxed text-gray-600">{children}</li>,
          code: ({children, className}) => {
            const isInline = !className;
            return isInline ? 
              <code className="bg-gray-100 text-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">{children}</code> :
              <code className="block bg-gray-50 text-gray-800 p-4 rounded-lg text-sm font-mono overflow-x-auto border">{children}</code>
          },
          pre: ({children}) => <pre className="bg-gray-50 p-4 rounded-lg mb-4 overflow-x-auto border">{children}</pre>,
          blockquote: ({children}) => <blockquote className="border-l-4 border-blue-200 pl-4 py-2 mb-4 bg-blue-50 text-gray-700 italic">{children}</blockquote>,
          a: ({children, href}) => <a href={href} className="text-blue-600 hover:text-blue-800 underline" target="_blank" rel="noopener noreferrer">{children}</a>,
          img: ({src, alt, title}) => (
            <div className="my-4">
              <img 
                src={src} 
                alt={alt || ''} 
                title={title}
                className="max-w-full h-auto rounded-lg border border-gray-200 shadow-sm"
                loading="lazy"
              />
              {alt && <p className="text-sm text-gray-500 mt-2 text-center italic">{alt}</p>}
            </div>
          ),
          table: ({children}) => <div className="overflow-x-auto mb-4"><table className="min-w-full border border-gray-200 rounded-lg">{children}</table></div>,
          thead: ({children}) => <thead className="bg-gray-50">{children}</thead>,
          tbody: ({children}) => <tbody className="divide-y divide-gray-200">{children}</tbody>,
          tr: ({children}) => <tr>{children}</tr>,
          th: ({children}) => <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 border-b border-gray-200">{children}</th>,
          td: ({children}) => <td className="px-4 py-2 text-sm text-gray-600 border-b border-gray-200">{children}</td>,
          hr: () => <hr className="border-gray-200 my-6" />,
          strong: ({children}) => <strong className="font-semibold text-gray-900">{children}</strong>,
          em: ({children}) => <em className="italic text-gray-700">{children}</em>
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

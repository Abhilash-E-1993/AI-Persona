import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { User, AlertTriangle } from 'lucide-react';
import { cleanMarkdownFormatting } from '../utils/markdownUtils';

/**
 * ChatBubble Component
 * Renders individual dialogue bubbles inside the chat window.
 * Parses and formats markdown responses for the mentor's replies.
 */
export default function ChatBubble({ message, mentor }) {
  const isUser = message.role === 'user';
  const isError = message.role === 'error';
  const isHitesh = mentor?.id === 'hitesh';

  return (
    <div
      className={`flex w-full items-start gap-3 my-4 animate-fade-in ${
        isUser ? 'flex-row-reverse' : 'flex-row'
      }`} 
    >
      
      {/* Avatar Initial Badge */}
      <div
        className={`flex h-9 w-9 shrink-0 select-none items-center justify-center rounded-full text-xs font-bold border ${
          isUser
            ? 'bg-slate-900 border-slate-800 text-slate-400'
            : isError
            ? 'bg-red-950/40 border-red-900 text-red-400'
            : isHitesh
            ? 'bg-linear-to-tr from-orange-600 to-amber-500 border-orange-400 text-white'
            : 'bg-linear-to-tr from-blue-600 to-cyan-500 border-blue-400 text-white'
        }`}
      >
        {isUser ? (
          <User className="h-4.5 w-4.5" />
        ) : isError ? (
          <AlertTriangle className="h-4.5 w-4.5" />
        ) : (
          mentor.name.split(' ').map(n => n[0]).join('')
        )}
      </div>

      {/* Bubble Message Body */}
      <div
        className={`max-w-[85%] sm:max-w-[75%] rounded-2xl px-4 py-3 text-sm border ${
          isUser
            ? 'bg-slate-900/60 border-slate-800 text-slate-200 rounded-tr-none'
            : isError
            ? 'bg-red-950/20 border-red-900/30 text-red-400 font-medium rounded-tl-none'
            : 'bg-slate-950/60 border-slate-900 text-slate-300 rounded-tl-none shadow-sm'
        }`}
      >
        {/* Name Header */}
        <div className="mb-1 text-[10px] font-bold uppercase tracking-wider text-slate-500 select-none">
          {isUser ? 'You' : isError ? 'System Error' : mentor.name}
        </div>

        {/* Text Area */}
        {isUser || isError ? (
          <p className="whitespace-pre-wrap leading-relaxed">{message.content}</p>
        ) : (
          <div className="text-slate-300">
            <ReactMarkdown 
              remarkPlugins={[remarkGfm]}
              components={{
                h1: ({children}) => <h1 className="text-lg font-bold mb-2 mt-3 text-slate-100">{children}</h1>,
                h2: ({children}) => <h2 className="text-base font-bold mb-2 mt-2 text-slate-100">{children}</h2>,
                h3: ({children}) => <h3 className="text-sm font-bold mb-1 mt-2 text-slate-200">{children}</h3>,
                h4: ({children}) => <h4 className="text-xs font-bold mb-1 mt-2 text-slate-200">{children}</h4>,
                p: ({children}) => <p className="mb-2 leading-relaxed text-slate-300">{children}</p>,
                ul: ({children}) => <ul className="list-disc list-inside mb-2 space-y-1 text-slate-300">{children}</ul>,
                ol: ({children}) => <ol className="list-decimal list-inside mb-2 space-y-1 text-slate-300">{children}</ol>,
                li: ({children}) => <li className="text-slate-300 mb-1">{children}</li>,
                code: ({inline, children}) => 
                  inline ? (
                    <code className="bg-slate-900/50 px-1.5 py-0.5 rounded text-cyan-300 text-xs font-mono">{children}</code>
                  ) : (
                    <code className="block bg-slate-900/50 p-2 rounded mb-2 text-cyan-300 text-xs font-mono overflow-x-auto whitespace-pre">{children}</code>
                  ),
                pre: ({children}) => <pre className="bg-slate-900/50 p-2 rounded mb-2 overflow-x-auto">{children}</pre>,
                blockquote: ({children}) => <blockquote className="border-l-4 border-amber-500 pl-3 my-2 italic text-slate-400">{children}</blockquote>,
                strong: ({children}) => <strong className="font-bold text-slate-100">{children}</strong>,
                em: ({children}) => <em className="italic text-slate-300">{children}</em>,
                a: ({href, children}) => <a href={href} className="text-cyan-400 hover:underline" target="_blank" rel="noopener noreferrer">{children}</a>,
              }}
            >
              {cleanMarkdownFormatting(message.content)}
            </ReactMarkdown>
          </div>
        )}
      </div>

    </div>
  );
}

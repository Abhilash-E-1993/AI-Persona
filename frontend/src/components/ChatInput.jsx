import React, { useState, useRef, useEffect } from 'react';
import { Send, Loader2 } from 'lucide-react';

/**
 * ChatInput Component
 * Renders the input toolbar with auto-resize textarea and submit actions.
 */
export default function ChatInput({ onSendMessage, isLoading }) {
  const [message, setMessage] = useState('');
  const textareaRef = useRef(null);

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    if (!message.trim() || isLoading) return;

    onSendMessage(message.trim());
    setMessage('');
  };

  const handleKeyDown = (e) => {
    // Submit on Enter, insert newline on Shift + Enter
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  // Dynamically resize text box height based on user text volume
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 160)}px`;
    }
  }, [message]);

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative flex items-center rounded-xl bg-slate-900 border border-slate-800 focus-within:border-slate-700 transition-colors p-1.5 pr-2">
        
        {/* Textbox input */}
        <textarea
          ref={textareaRef}
          rows={1}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask a technical or career question..."
          className="flex-1 max-h-40 bg-transparent text-slate-100 placeholder-slate-500 border-0 outline-none focus:ring-0 py-2.5 px-3 resize-none text-sm scrollbar-none"
          disabled={isLoading}
        />
        
        {/* Send Button */}
        <button
          type="submit"
          disabled={!message.trim() || isLoading}
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-all cursor-pointer ${
            !message.trim() || isLoading
              ? 'bg-slate-950 text-slate-600 border border-slate-900 cursor-not-allowed'
              : 'bg-amber-500 text-slate-950 hover:bg-amber-400 shadow-md hover:shadow-amber-500/10'
          }`}
        >
          {isLoading ? (
            <Loader2 className="h-4.5 w-4.5 animate-spin" />
          ) : (
            <Send className="h-4 w-4" />
          )}
        </button>

      </div>
      
      <p className="mt-1.5 text-center text-[10px] text-slate-500 select-none">
        Press Enter to send. Shift + Enter for new line.
      </p>
    </form>
  );
}

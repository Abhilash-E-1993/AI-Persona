import React, { useState, useEffect, useRef } from 'react';
import { sendChatMessage } from '../services/api';
import { ArrowLeft, Coffee, Zap, Send, User, Trash2 } from 'lucide-react';

// Kept in sync with Landing.jsx — consider moving to a shared constants file
// so both pages read from one source of truth.
const MENTORS = [
  {
    id: 'hitesh',
    name: 'Hitesh Choudhary',
    subtitle: 'Aapka chai-time coding guru',
    badge: 'Chai aur Charcha',
    tagline: 'Chai ready kar lo, charcha ke liye toh hum hamesha ready hain!',
  },
  {
    id: 'piyush',
    name: 'Piyush Garg',
    subtitle: 'Aapka full-josh coding guru',
    badge: 'Full Josh, Full Charcha',
    tagline: 'Alrighttt! Welcome welcome to ek aur josh bhara charcha — chaliye shuru karte hain!',
  },
];

/**
 * Chat page — themed per mentor, with a nav bar to switch mentors anytime.
 * Switching mentors always starts a fresh conversation.
 *
 * Props:
 *  - mentor: initial mentor object { id, name, subtitle, badge, tagline }
 *  - onExit: optional — called when the home/back control is pressed (return to Landing)
 *  - onSelectMentor: optional — called with the new mentor whenever the user switches
 */
export default function Chat({ mentor, onExit, onSelectMentor }) {
  const [activeMentor, setActiveMentor] = useState(
    mentor || MENTORS.find((m) => m.id === 'hitesh')
  );
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [draft, setDraft] = useState('');
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  const isChai = activeMentor.id === 'hitesh';
  const theme = isChai ? 'am-chat-chai' : 'am-chat-josh';
  const initials = activeMentor.name
    ? activeMentor.name.split(' ').map((n) => n[0]).join('').slice(0, 2)
    : '??';

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSwitchMentor = (next) => {
    if (next.id === activeMentor.id) return;
    setActiveMentor(next);
    setMessages([]);
    setDraft('');
    setIsLoading(false);
    onSelectMentor?.(next);
  };

  const handleSend = async () => {
    const text = draft.trim();
    if (!text || isLoading) return;

    const userMessage = { role: 'user', content: text };
    const updatedMessages = [...messages, userMessage];

    setMessages(updatedMessages);
    setDraft('');
    setIsLoading(true);
    if (textareaRef.current) textareaRef.current.style.height = 'auto';

    try {
      const reply = await sendChatMessage(activeMentor.id, updatedMessages);
      setMessages([...updatedMessages, { role: 'assistant', content: reply }]);
    } catch (error) {
      setMessages([
        ...updatedMessages,
        { role: 'error', content: error.message || 'Connection dropped. Try sending that again.' },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleTextareaChange = (e) => {
    setDraft(e.target.value);
    const el = e.target;
    el.style.height = 'auto';
    el.style.height = Math.min(el.scrollHeight, 160) + 'px';
  };

  const handleClearHistory = () => {
    if (window.confirm(`Clear this conversation with ${activeMentor.name}?`)) {
      setMessages([]);
    }
  };

  return (
    <div className={`am-chat ${theme}`}>
      <style>{`
        .am-chat {
          --bg: #100c09;
          --cream: #f6efdd;
          --cream-dim: rgba(246, 239, 221, 0.6);
          --cream-faint: rgba(246, 239, 221, 0.32);
          --line: rgba(246, 239, 221, 0.1);
          --panel: rgba(246, 239, 221, 0.04);

          --chai-deep: #5f3a1f;
          --chai-mid: #a3652f;
          --chai-bright: #eab654;

          --josh-deep: #1b1044;
          --josh-mid: #4b2e9e;
          --josh-bright: #47c6f0;
          --josh-pink: #ff5da2;

          height: 100vh;
          height: 100dvh;
          display: flex;
          flex-direction: column;
          background: var(--bg);
          color: var(--cream);
          font-family: 'Manrope', sans-serif;
          position: relative;
          overflow: hidden;
          transition: background 0.4s ease;
        }

        .am-chat-chai { --accent: var(--chai-bright); --accent-deep: var(--chai-deep); --accent-mid: var(--chai-mid); }
        .am-chat-josh { --accent: var(--josh-bright); --accent-deep: var(--josh-deep); --accent-mid: var(--josh-mid); }

        .am-chat::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: radial-gradient(circle at 1px 1px, rgba(246,239,221,0.045) 1px, transparent 0);
          background-size: 26px 26px;
          pointer-events: none;
        }

        .am-glow {
          position: absolute;
          top: -160px;
          left: 50%;
          transform: translateX(-50%);
          width: 520px;
          height: 320px;
          border-radius: 50%;
          background: var(--accent-mid);
          filter: blur(120px);
          opacity: 0.28;
          pointer-events: none;
          transition: background 0.4s ease;
        }

        /* ---------- Nav bar ---------- */
        .am-navbar {
          position: relative;
          z-index: 3;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.75rem;
          padding: 0.85rem 1.2rem;
          border-bottom: 1px solid var(--line);
          background: rgba(16, 12, 9, 0.75);
          backdrop-filter: blur(10px);
        }

        .am-nav-left {
          display: flex;
          align-items: center;
          gap: 0.7rem;
          min-width: 0;
          flex-shrink: 0;
        }

        .am-home {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 34px;
          height: 34px;
          border-radius: 50%;
          border: 1px solid var(--line);
          background: transparent;
          color: var(--cream-dim);
          cursor: pointer;
          flex-shrink: 0;
          transition: border-color 0.2s ease, color 0.2s ease;
        }
        .am-home:hover { border-color: var(--accent); color: var(--accent); }

        .am-brand {
          display: none;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.64rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--cream-faint);
          white-space: nowrap;
        }
        @media (min-width: 560px) {
          .am-brand { display: inline; }
        }

        /* ---------- Mentor switcher tabs ---------- */
        .am-tabs {
          display: flex;
          align-items: center;
          gap: 2px;
          background: rgba(246, 239, 221, 0.05);
          border: 1px solid var(--line);
          border-radius: 999px;
          padding: 3px;
          flex-shrink: 1;
          min-width: 0;
        }

        .am-tab {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.42rem 0.75rem;
          border-radius: 999px;
          border: none;
          background: transparent;
          color: var(--cream-dim);
          font-family: 'Manrope', sans-serif;
          font-size: 0.76rem;
          font-weight: 700;
          cursor: pointer;
          white-space: nowrap;
          transition: background 0.3s ease, color 0.3s ease, transform 0.15s ease;
        }
        .am-tab:hover:not(.active) { color: var(--cream); }

        .am-tab.active.chai {
          background: linear-gradient(135deg, var(--chai-mid), var(--chai-deep));
          color: #fff;
        }
        .am-tab.active.josh {
          background: linear-gradient(135deg, var(--josh-mid), var(--josh-deep));
          color: #fff;
        }

        .am-tab-label { display: none; }
        @media (min-width: 460px) {
          .am-tab-label { display: inline; }
        }

        .am-nav-right {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          flex-shrink: 0;
        }

        .am-pill-btn {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.72rem;
          font-weight: 600;
          color: var(--cream-dim);
          border: 1px solid var(--line);
          background: transparent;
          padding: 0.42rem 0.75rem;
          border-radius: 999px;
          cursor: pointer;
          transition: border-color 0.2s ease, color 0.2s ease, background 0.2s ease;
          white-space: nowrap;
        }
        .am-pill-btn:hover {
          border-color: rgba(255,90,90,0.4);
          color: #ff8686;
          background: rgba(255,90,90,0.06);
        }

        /* ---------- Thread ---------- */
        .am-thread {
          position: relative;
          z-index: 2;
          flex: 1;
          overflow-y: auto;
          padding: 1.5rem 1.2rem 1rem;
        }
        .am-thread::-webkit-scrollbar { width: 6px; }
        .am-thread::-webkit-scrollbar-thumb { background: var(--line); border-radius: 999px; }

        .am-thread-inner {
          max-width: 680px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          min-height: 100%;
        }

        /* ---------- Empty state ---------- */
        .am-empty {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          gap: 1.1rem;
          padding: 2rem 1rem;
        }
        .am-empty-avatar {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Fraunces', serif;
          font-weight: 600;
          font-size: 1.3rem;
          background: radial-gradient(120% 130% at 30% 100%, var(--accent-mid), var(--accent-deep));
          border: 1px solid rgba(246,239,221,0.25);
        }
        .am-empty-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.65rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--accent);
        }
        .am-empty-quote {
          font-family: 'Fraunces', serif;
          font-style: italic;
          font-size: 1.25rem;
          line-height: 1.55;
          max-width: 30ch;
          color: var(--cream);
        }
        .am-empty-hint {
          font-size: 0.8rem;
          color: var(--cream-faint);
        }

        /* ---------- Bubbles ---------- */
        .am-row {
          display: flex;
          gap: 0.65rem;
          margin: 0.55rem 0;
          align-items: flex-end;
        }
        .am-row.user { flex-direction: row-reverse; }

        .am-bubble-avatar {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Fraunces', serif;
          font-weight: 600;
          font-size: 0.7rem;
          flex-shrink: 0;
        }
        .am-row.assistant .am-bubble-avatar {
          background: radial-gradient(120% 130% at 30% 100%, var(--accent-mid), var(--accent-deep));
          border: 1px solid rgba(246,239,221,0.2);
        }
        .am-row.user .am-bubble-avatar {
          background: rgba(246,239,221,0.08);
          border: 1px solid var(--line);
          color: var(--cream-dim);
        }

        .am-bubble {
          max-width: 74%;
          padding: 0.7rem 1rem;
          border-radius: 16px;
          font-size: 0.9rem;
          line-height: 1.55;
          white-space: pre-wrap;
          word-break: break-word;
        }
        .am-row.assistant .am-bubble {
          background: var(--panel);
          border: 1px solid var(--line);
          border-bottom-left-radius: 4px;
          color: var(--cream);
        }
        .am-row.user .am-bubble {
          background: linear-gradient(135deg, var(--accent-mid), var(--accent-deep));
          border-bottom-right-radius: 4px;
          color: #fff;
        }
        .am-row.error .am-bubble {
          background: rgba(255, 90, 90, 0.08);
          border: 1px solid rgba(255, 90, 90, 0.3);
          color: #ffb3b3;
          border-bottom-left-radius: 4px;
        }

        .am-typing {
          display: flex;
          gap: 0.65rem;
          margin: 0.55rem 0;
          align-items: flex-end;
        }
        .am-typing-bubble {
          background: var(--panel);
          border: 1px solid var(--line);
          border-radius: 16px;
          border-bottom-left-radius: 4px;
          padding: 0.85rem 1.1rem;
          display: flex;
          gap: 0.3rem;
        }
        .am-typing-bubble span {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: var(--accent);
          animation: typingBounce 1.2s ease-in-out infinite;
        }
        .am-typing-bubble span:nth-child(2) { animation-delay: 0.15s; }
        .am-typing-bubble span:nth-child(3) { animation-delay: 0.3s; }
        @keyframes typingBounce {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
          30% { transform: translateY(-4px); opacity: 1; }
        }

        /* ---------- Input bar ---------- */
        .am-inputbar {
          position: relative;
          z-index: 2;
          padding: 1rem 1.2rem 1.3rem;
          border-top: 1px solid var(--line);
          background: rgba(16, 12, 9, 0.7);
          backdrop-filter: blur(10px);
        }
        .am-input-shell {
          max-width: 680px;
          margin: 0 auto;
          display: flex;
          align-items: flex-end;
          gap: 0.6rem;
          background: rgba(246,239,221,0.05);
          border: 1px solid var(--line);
          border-radius: 20px;
          padding: 0.5rem 0.6rem 0.5rem 1rem;
          transition: border-color 0.2s ease;
        }
        .am-input-shell:focus-within {
          border-color: var(--accent);
        }
        .am-textarea {
          flex: 1;
          background: transparent;
          border: none;
          outline: none;
          resize: none;
          color: var(--cream);
          font-family: 'Manrope', sans-serif;
          font-size: 0.9rem;
          line-height: 1.5;
          max-height: 160px;
          padding: 0.45rem 0;
        }
        .am-textarea::placeholder { color: var(--cream-faint); }

        .am-send {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, var(--accent-mid), var(--accent-deep));
          color: #fff;
          cursor: pointer;
          flex-shrink: 0;
          transition: opacity 0.2s ease, transform 0.15s ease;
        }
        .am-send:disabled {
          opacity: 0.35;
          cursor: not-allowed;
        }
        .am-send:not(:disabled):hover { transform: scale(1.06); }

        .am-input-hint {
          text-align: center;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.62rem;
          color: var(--cream-faint);
          margin-top: 0.6rem;
          letter-spacing: 0.03em;
        }

        @media (prefers-reduced-motion: reduce) {
          .am-typing-bubble span { animation: none !important; }
        }
      `}</style>

      <span className="am-glow" />

      <div className="am-navbar">
        <div className="am-nav-left">
          <button className="am-home" onClick={onExit} aria-label="Back to home">
            <ArrowLeft size={16} />
          </button>
          <span className="am-brand">Do Guru, Ek Charcha</span>
        </div>

        <div className="am-tabs" role="tablist" aria-label="Switch mentor">
          {MENTORS.map((m) => {
            const active = m.id === activeMentor.id;
            const isMChai = m.id === 'hitesh';
            return (
              <button
                key={m.id}
                role="tab"
                aria-selected={active}
                className={`am-tab ${active ? `active ${isMChai ? 'chai' : 'josh'}` : ''}`}
                onClick={() => handleSwitchMentor(m)}
              >
                {isMChai ? <Coffee size={13} /> : <Zap size={13} />}
                <span className="am-tab-label">{m.name.split(' ')[0]}</span>
              </button>
            );
          })}
        </div>

        <div className="am-nav-right">
          {messages.length > 0 && (
            <button className="am-pill-btn" onClick={handleClearHistory}>
              <Trash2 size={13} />
            </button>
          )}
        </div>
      </div>

      <div className="am-thread">
        <div className="am-thread-inner">
          {messages.length === 0 ? (
            <div className="am-empty">
              <div className="am-empty-avatar">{initials}</div>
              <span className="am-empty-badge">
                {isChai ? <Coffee size={12} /> : <Zap size={12} />}
                {activeMentor.badge}
              </span>
              <p className="am-empty-quote">"{activeMentor.tagline}"</p>
              <p className="am-empty-hint">
                Type a doubt, a topic, anything — {activeMentor.name.split(' ')[0]} is listening.
              </p>
            </div>
          ) : (
            <>
              {messages.map((msg, i) => (
                <div key={i} className={`am-row ${msg.role}`}>
                  <div className="am-bubble-avatar">
                    {msg.role === 'user' ? <User size={13} /> : initials}
                  </div>
                  <div className="am-bubble">{msg.content}</div>
                </div>
              ))}

              {isLoading && (
                <div className="am-typing">
                  <div
                    className="am-bubble-avatar"
                    style={{
                      background: `radial-gradient(120% 130% at 30% 100%, var(--accent-mid), var(--accent-deep))`,
                      border: '1px solid rgba(246,239,221,0.2)',
                    }}
                  >
                    {initials}
                  </div>
                  <div className="am-typing-bubble">
                    <span /><span /><span />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </>
          )}
        </div>
      </div>

      <div className="am-inputbar">
        <div className="am-input-shell">
          <textarea
            ref={textareaRef}
            className="am-textarea"
            rows={1}
            placeholder={isChai ? 'Apna coding doubt likho...' : 'Kya seekhna hai aaj...'}
            value={draft}
            onChange={handleTextareaChange}
            onKeyDown={handleKeyDown}
          />
          <button
            className="am-send"
            onClick={handleSend}
            disabled={!draft.trim() || isLoading}
            aria-label="Send message"
          >
            <Send size={16} />
          </button>
        </div>
        <p className="am-input-hint">ENTER TO SEND · SHIFT+ENTER FOR NEW LINE</p>
      </div>
    </div>
  );
}
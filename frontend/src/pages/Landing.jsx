import React from 'react';
import { Coffee, Zap, ArrowRight } from 'lucide-react';

// Mentor profiles — kept in the same shape the rest of the app expects
const MENTORS = [
  {
    id: 'hitesh',
    name: 'Hitesh Choudhary',
    subtitle: 'Aapka chai-time coding guru',
    badge: 'Chai aur Charcha',
    tagline: 'Chai ready kar lo, charcha ke liye toh hum hamesha ready hain!',
    cta: 'Chai pe baithen',
    isComingSoon: false,
  },
  {
    id: 'piyush',
    name: 'Piyush Garg',
    subtitle: 'Aapka full-josh coding guru',
    badge: 'Full Josh, Full Charcha',
    tagline: 'Alrighttt! Welcome welcome to ek aur josh bhara episode — chaliye shuru karte hain!',
    cta: 'Chalo shuru karein',
    isComingSoon: false,
  },
];

export default function Landing({ onSelectMentor }) {
  return (
    <div className="am-landing">
      <style>{`
        .am-landing {
          --bg: #100c09;
          --cream: #f6efdd;
          --cream-dim: rgba(246, 239, 221, 0.6);
          --line: rgba(246, 239, 221, 0.1);

          --chai-deep: #5f3a1f;
          --chai-mid: #a3652f;
          --chai-bright: #eab654;

          --josh-deep: #1b1044;
          --josh-mid: #4b2e9e;
          --josh-bright: #47c6f0;
          --josh-pink: #ff5da2;

          min-height: 100vh;
          background: var(--bg);
          color: var(--cream);
          font-family: 'Manrope', sans-serif;
          display: flex;
          flex-direction: column;
          position: relative;
          overflow: hidden;
        }

        .am-landing::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: radial-gradient(circle at 1px 1px, rgba(246,239,221,0.05) 1px, transparent 0);
          background-size: 26px 26px;
          pointer-events: none;
        }

        .glow {
          position: absolute;
          border-radius: 50%;
          filter: blur(90px);
          opacity: 0.35;
          pointer-events: none;
        }
        .glow-chai {
          width: 420px;
          height: 420px;
          top: -140px;
          left: -120px;
          background: var(--chai-mid);
        }
        .glow-josh {
          width: 420px;
          height: 420px;
          top: -140px;
          right: -120px;
          background: var(--josh-mid);
        }

        .am-header {
          position: relative;
          z-index: 2;
          text-align: center;
          padding: 3.4rem 1.5rem 2.2rem;
        }

        .am-kicker {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.68rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--cream-dim);
          border: 1px solid var(--line);
          padding: 0.4rem 0.9rem;
          border-radius: 999px;
          margin-bottom: 1.6rem;
        }

        .am-kicker .dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: linear-gradient(90deg, var(--chai-bright), var(--josh-bright));
        }

        .am-title {
          font-family: 'Fraunces', serif;
          font-weight: 600;
          font-size: clamp(2.1rem, 4.6vw, 3.2rem);
          line-height: 1.14;
          letter-spacing: -0.01em;
          max-width: 32ch;
          margin: 0 auto;
        }

        .am-title .hl-chai { color: var(--chai-bright); }
        .am-title .hl-josh { color: var(--josh-bright); }

        .am-sub {
          margin: 1rem auto 0;
          max-width: 42ch;
          color: var(--cream-dim);
          font-size: 0.95rem;
          line-height: 1.6;
        }

        .am-panels {
          position: relative;
          z-index: 2;
          flex: 1;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1px;
          background: var(--line);
          margin: 0 1.5rem 1.5rem;
          border-radius: 22px;
          overflow: hidden;
          border: 1px solid var(--line);
          min-height: 460px;
        }

        @media (max-width: 760px) {
          .am-panels {
            grid-template-columns: 1fr;
          }
        }

        .am-panel {
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 2.4rem;
          min-height: 360px;
          text-align: left;
          border: none;
          cursor: pointer;
          overflow: hidden;
          font-family: inherit;
          color: inherit;
          transition: flex-grow 0.5s ease, transform 0.3s ease;
        }

        .am-panel-chai {
          background: radial-gradient(130% 150% at 15% 100%, var(--chai-mid) 0%, var(--chai-deep) 45%, #1c1109 100%);
        }

        .am-panel-josh {
          background: radial-gradient(130% 150% at 85% 100%, var(--josh-mid) 0%, var(--josh-deep) 45%, #0c0a22 100%);
        }

        .am-panel:hover {
          flex-grow: 1.06;
        }

        .am-panel:focus-visible {
          outline: 2px solid var(--cream);
          outline-offset: -4px;
        }

        .am-top-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
        }

        .am-avatar {
          width: 46px;
          height: 46px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Fraunces', serif;
          font-weight: 600;
          font-size: 1.05rem;
          border: 1px solid rgba(246,239,221,0.25);
          background: rgba(246,239,221,0.08);
          flex-shrink: 0;
        }

        /* --- Chai steam signature --- */
        .steam {
          position: absolute;
          top: 1.6rem;
          right: 2rem;
          width: 54px;
          height: 80px;
          opacity: 0.55;
        }
        .steam path {
          fill: none;
          stroke: var(--chai-bright);
          stroke-width: 2;
          stroke-linecap: round;
          stroke-dasharray: 40;
          animation: steamRise 3.2s ease-in-out infinite;
        }
        .steam path:nth-child(2) { animation-delay: 0.6s; opacity: 0.7; }
        .steam path:nth-child(3) { animation-delay: 1.2s; opacity: 0.5; }
        @keyframes steamRise {
          0%   { stroke-dashoffset: 40; opacity: 0; transform: translateY(6px); }
          25%  { opacity: 0.8; }
          80%  { opacity: 0; }
          100% { stroke-dashoffset: 0; transform: translateY(-14px); }
        }

        /* --- Josh energy signature: pulsing rings + bolt --- */
        .josh-burst {
          position: absolute;
          top: 1.3rem;
          right: 1.6rem;
          width: 54px;
          height: 54px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .josh-ring {
          position: absolute;
          border-radius: 50%;
          border: 1.5px solid var(--josh-bright);
          opacity: 0;
          animation: joshPulse 2.4s ease-out infinite;
        }
        .josh-ring:nth-child(2) { animation-delay: 0.8s; border-color: var(--josh-pink); }
        .josh-ring:nth-child(3) { animation-delay: 1.6s; }
        @keyframes joshPulse {
          0%   { width: 14px; height: 14px; opacity: 0.8; }
          100% { width: 54px; height: 54px; opacity: 0; }
        }
        .josh-bolt {
          position: relative;
          z-index: 1;
          color: var(--josh-bright);
          filter: drop-shadow(0 0 6px rgba(71,198,240,0.6));
        }

        .am-badge {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.66rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--cream-dim);
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
        }

        .am-mid {
          margin: 1.4rem 0;
        }

        .am-name {
          font-family: 'Fraunces', serif;
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 0.15rem;
        }

        .am-subtitle {
          font-size: 0.8rem;
          color: var(--cream-dim);
        }

        .am-tagline {
          font-family: 'Fraunces', serif;
          font-style: italic;
          font-size: 1.18rem;
          line-height: 1.5;
          color: var(--cream);
          max-width: 30ch;
        }

        .am-bottom-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
        }

        .am-cta {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.85rem;
          font-weight: 700;
          padding: 0.65rem 1.2rem;
          border-radius: 999px;
          border: 1px solid rgba(246,239,221,0.3);
          width: fit-content;
          transition: gap 0.2s ease, background 0.2s ease;
        }
        .am-panel:hover .am-cta {
          gap: 0.85rem;
          background: rgba(246,239,221,0.1);
        }

        .am-footer {
          position: relative;
          z-index: 2;
          text-align: center;
          padding: 1.5rem;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.68rem;
          letter-spacing: 0.08em;
          color: rgba(246,239,221,0.32);
        }

        @media (prefers-reduced-motion: reduce) {
          .steam path, .josh-ring {
            animation: none !important;
          }
        }
      `}</style>

      <span className="glow glow-chai" />
      <span className="glow glow-josh" />

      <header className="am-header">
        <span className="am-kicker">
          <span className="dot" />
          Do Guru, Ek Charcha
        </span>
        <h1 className="am-title">
          Chai pe <span className="hl-chai">charcha</span>, ya josh bhari <span className="hl-josh">baatein</span> — aap chuno.
        </h1>
        <p className="am-sub">
          Real mentors, real andaaz — ab AI ke saath, jab chaho tab.
        </p>
      </header>

      <main className="am-panels">
        <button
          className="am-panel am-panel-chai"
          onClick={() => onSelectMentor(MENTORS[0])}
          aria-label={`Start a chat with ${MENTORS[0].name}`}
        >
          <svg className="steam" viewBox="0 0 54 80">
            <path d="M18 80 C9 62, 27 54, 18 36 C9 22, 23 13, 18 0" />
            <path d="M31 80 C22 62, 40 54, 31 36 C22 22, 36 13, 31 0" />
            <path d="M43 80 C34 62, 52 54, 43 36 C34 22, 48 13, 43 0" />
          </svg>

          <div className="am-top-row">
            <div className="am-avatar">HC</div>
            <span className="am-badge">
              <Coffee size={12} />
              {MENTORS[0].badge}
            </span>
          </div>

          <div className="am-mid">
            <h2 className="am-name">{MENTORS[0].name}</h2>
            <p className="am-subtitle">{MENTORS[0].subtitle}</p>
          </div>

          <div className="am-bottom-row">
            <p className="am-tagline">"{MENTORS[0].tagline}"</p>
          </div>

          <span className="am-cta" style={{ marginTop: '1.2rem' }}>
            {MENTORS[0].cta} <ArrowRight size={15} />
          </span>
        </button>

        <button
          className="am-panel am-panel-josh"
          onClick={() => onSelectMentor(MENTORS[1])}
          aria-label={`Start a chat with ${MENTORS[1].name}`}
        >
          <div className="josh-burst" aria-hidden="true">
            <span className="josh-ring" />
            <span className="josh-ring" />
            <span className="josh-ring" />
            <Zap className="josh-bolt" size={20} fill="currentColor" />
          </div>

          <div className="am-top-row">
            <div className="am-avatar">PG</div>
            <span className="am-badge">
              <Zap size={12} />
              {MENTORS[1].badge}
            </span>
          </div>

          <div className="am-mid">
            <h2 className="am-name">{MENTORS[1].name}</h2>
            <p className="am-subtitle">{MENTORS[1].subtitle}</p>
          </div>

          <div className="am-bottom-row">
            <p className="am-tagline">"{MENTORS[1].tagline}"</p>
          </div>

          <span className="am-cta" style={{ marginTop: '1.2rem' }}>
            {MENTORS[1].cta} <ArrowRight size={15} />
          </span>
        </button>
      </main>

      <footer className="am-footer">HITESH_CHOUDHARY // PIYUSH_GARG</footer>
    </div>
  );
}
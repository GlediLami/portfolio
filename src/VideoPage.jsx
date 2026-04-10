import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMuted } from './useMuted';

const PROJECTS = [
  { id: "p1", title: "SONIQ - PRIVACY LAYER FOR LIVE AUDIO", status: "ONGOING", tech: "WASM, Rust, Python", desc: "Soniq is an edge-computing React SDK that redacts PII (Personally Identifiable Information) from live audio streams directly in the user's device. By using high-performance WASM inference, Soniq ensures that sensitive data—like IBANs, names, and credit card numbers never reaches any servers or third-party AI providers." },
  { id: "p2", title: "WAVELET TRANSFORM", status: "COMPLETE", tech: "C++, CUDA", desc: "Implemented a fully GPU-accelerated wavelet transform and a simple multi-resolution representation (MRA) in the style of JPEG2000. Developed an efficient 1D/2D/3D GPU implementation." },
  { id: "p3", title: "AI EMAIL CLASSIFIER", status: "COMPLETE", tech: "Python", desc: "Undergraduate thesis project using AI for automated spam email detection and categorization." },
  { id: "p4", title: "PERSONA 3 PORTFOLIO", status: "COMPLETE", tech: "React", desc: "A premium, high-fidelity portfolio inspired by Persona 3 aesthetics." },
  { id: "p5", title: "GOOD 2 GO", status: "ONGOING", tech: "Flutter, React", desc: "A food waste management mobile app for the Albanian market, where people can find good deals on food that would be thrown away." },

];

export default function VideoPage({ src }) {
  const navigate = useNavigate();
  const [active, setActive] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [isMuted, toggleMute, registerVideo] = useMuted();

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowUp') setActive(i => Math.max(0, i - 1));
      if (e.key === 'ArrowDown') setActive(i => Math.min(PROJECTS.length - 1, i + 1));
      if (e.key === 'ArrowLeft' || e.key === 'Escape' || e.key === 'Backspace') navigate(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [navigate]);

  return (
    <div id="menu-screen">
      <video ref={registerVideo} src={src} autoPlay loop muted playsInline />

      <button
        tabIndex="-1"
        onFocus={(e) => e.target.blur()}
        style={{
          position: "fixed",
          bottom: "20px",
          left: "20px",
          zIndex: 100,
          fontFamily: "'Anton', sans-serif",
          fontSize: "20px",
          letterSpacing: "2px",
          color: "#fff",
          background: "rgba(0, 0, 0, 0.5)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          padding: "6px 14px",
          cursor: "pointer",
        }}
        onClick={(e) => {
          e.stopPropagation();
          toggleMute();
          e.currentTarget.blur();
        }}
      >
        {isMuted ? "UNMUTE AUDIO" : "MUTE AUDIO"}
      </button>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&family=Bebas+Neue&display=swap');

        .sp-root {
          position: absolute;
          inset: 0;
          z-index: 10;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          padding-right: 8vw;
          pointer-events: none;
        }

        .sp-mask {
          position: absolute;
          inset: 0;
          background: linear-gradient(to right, rgba(8, 20, 50, 0.9) 0%, transparent 60%);
          z-index: 5;
          pointer-events: none;
        }

        /* --- Left Detail Panel --- */
        .sp-left-panel {
          position: absolute;
          left: 6vw;
          top: 50%;
          transform: translateY(-50%);
          width: 440px;
          z-index: 30;
          pointer-events: none;
        }

        .sp-detail-card {
          position: relative;
          width: 100%;
          background: #0b1c4d;
          border-left: 8px solid #00d9ff;
          padding: 32px;
          color: #fff;
          clip-path: polygon(0 0, 100% 0, 95% 100%, 0% 100%);
          box-shadow: 20px 20px 0 rgba(0, 217, 255, 0.1);
          
          /* "Opening from nothingness" animation */
          opacity: 0;
          transform: translateX(-40px) scaleX(0);
          transform-origin: left;
          transition: all 0.45s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .sp-detail-card.visible {
          opacity: 1;
          transform: translateX(0) scaleX(1);
        }

        .sp-detail-header {
          display: flex;
          align-items: baseline;
          gap: 12px;
          margin-bottom: 20px;
          border-bottom: 1px solid rgba(0, 217, 255, 0.3);
          padding-bottom: 12px;
        }

        .sp-detail-index {
          font-family: 'Anton', sans-serif;
          font-size: 32px;
          color: #00d9ff;
        }

        .sp-detail-tech {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 24px;
          color: #fff;
          letter-spacing: 1px;
        }

        .sp-detail-desc {
          font-family: 'Anton', sans-serif;
          font-size: 22px;
          line-height: 1.3;
          color: #edfaff;
          margin: 0;
        }

        /* --- Right List --- */
        .sp-list {
          position: relative;
          z-index: 20;
          display: flex;
          flex-direction: column;
          gap: 12px;
          pointer-events: all;
        }

        .sp-project-bar {
          position: relative;
          width: 420px;
          height: 80px;
          background: #111;
          clip-path: polygon(0 0, 95% 0, 100% 100%, 5% 100%);
          cursor: pointer;
          transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1), background 0.3s ease;
          opacity: 0;
          transform: translateX(100px);
        }
        .sp-project-bar.mounted {
          opacity: 1;
          transform: translateX(0);
        }
        .sp-project-bar.active {
          background: #fff;
          transform: translateX(-20px) scale(1.05);
          box-shadow: 10px 10px 0 #c4001a;
        }

        .sp-project-content {
          height: 100%;
          display: flex;
          align-items: center;
          padding: 0 40px;
          justify-content: space-between;
        }

        .sp-project-title {
          font-family: 'Anton', sans-serif;
          font-size: 28px;
          color: #00d9ff;
          transition: color 0.3s ease;
        }
        .sp-project-bar.active .sp-project-title { color: #000; }

        .sp-project-status {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 16px;
          color: #fff;
          background: #c4001a;
          padding: 2px 8px;
          clip-path: polygon(0 0, 100% 0, calc(100% - 5px) 100%, 5% 100%);
        }

        .sp-footer {
          position: fixed;
          bottom: 24px; right: 28px;
          z-index: 50;
          display: flex; flex-direction: column;
          align-items: flex-end; gap: 5px;
          font-family: 'Anton', sans-serif;
          opacity: 0;
          transition: opacity 0.4s ease 0.6s;
        }
        .sp-footer.mounted { opacity: 1; }
        .sp-footer-row {
          display: flex; align-items: center; gap: 8px;
          font-size: 25px; letter-spacing: 2px;
          color: rgba(255, 255, 255, 0.75);
        }
        .sp-footer-key {
          border: 1px solid rgba(255, 255, 255, 0.75);
          border-radius: 3px;
          padding: 1px 6px; font-size: 11px;
        }
      `}</style>

      <div className="sp-mask" />

      <div className="sp-left-panel">
        {PROJECTS.map((proj, i) => (
          <div
            key={`detail-${proj.id}`}
            className={`sp-detail-card ${active === i ? 'visible' : ''}`}
            style={{ position: active === i ? 'relative' : 'absolute', top: 0 }}
          >
            <div className="sp-detail-header">
              <span className="sp-detail-index">0{i + 1}</span>
              <span className="sp-detail-tech">{proj.tech}</span>
            </div>
            <p className="sp-detail-desc">{proj.desc}</p>
          </div>
        ))}
      </div>

      <div className="sp-root">
        <div className="sp-list">
          {PROJECTS.map((proj, i) => (
            <div
              key={proj.id}
              className={`sp-project-bar ${active === i ? "active" : ""} ${mounted ? "mounted" : ""}`}
              style={{ transitionDelay: `${i * 100}ms` }}
              onMouseEnter={() => setActive(i)}
            >
              <div className="sp-project-content">
                <span className="sp-project-title">{proj.title}</span>
                <span className="sp-project-status">{proj.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={`sp-footer ${mounted ? "mounted" : ""}`}>
        <div className="sp-footer-row"><span className="sp-footer-key">↑↓</span><span>SELECT</span></div>
        <div className="sp-footer-row"><span className="sp-footer-key">ESC</span><span>BACK</span></div>
      </div>
    </div>
  );
}

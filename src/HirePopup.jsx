import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

const DELAY_MS = 60 * 1000;
const SEEN_KEY = "hirePopupSeen";

export default function HirePopup() {
  const [open, setOpen] = useState(false);
  const [choice, setChoice] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.getItem(SEEN_KEY)) return;
    const t = setTimeout(() => {
      sessionStorage.setItem(SEEN_KEY, "1");
      setOpen(true);
    }, DELAY_MS);
    return () => clearTimeout(t);
  }, []);

  const pick = (idx) => {
    setOpen(false);
    if (idx === 0) navigate("/socials");
  };

  useEffect(() => {
    if (!open) return;
    // Capture phase so the page menus underneath don't react while the popup is up
    const onKey = (e) => {
      e.stopImmediatePropagation();
      e.preventDefault();
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") setChoice(0);
      if (e.key === "ArrowRight" || e.key === "ArrowDown") setChoice(1);
      if (e.key === "Enter") pick(choice);
      if (e.key === "Escape" || e.key === "Backspace") setOpen(false);
    };
    window.addEventListener("keydown", onKey, true);
    return () => window.removeEventListener("keydown", onKey, true);
  }, [open, choice]);

  return (
    <>
      <style>{`
        .hp-backdrop {
          position: fixed;
          inset: 0;
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(0, 10, 30, 0.55);
        }

        .hp-box {
          position: relative;
          width: min(760px, 90vw);
          padding: 44px 56px 36px;
          background: #0a1a4a;
          border: 4px solid #3ce2ff;
          transform: skewX(-6deg) rotate(-2deg);
          box-shadow: 14px 14px 0 #c4001a;
        }

        .hp-inner { transform: skewX(6deg); }

        @media (max-width: 600px) {
          .hp-box { padding: 40px 24px 28px; }
          .hp-choices { flex-wrap: wrap; justify-content: flex-start; gap: 10px; }
        }

        .hp-tag {
          position: absolute;
          top: -26px;
          left: 28px;
          padding: 4px 18px;
          background: #ffffff;
          color: #6b0010;
          font-family: 'Anton', sans-serif;
          font-style: italic;
          font-size: 30px;
          letter-spacing: 2px;
          transform: rotate(-4deg);
        }

        .hp-line {
          font-family: 'Anton', sans-serif;
          font-style: italic;
          letter-spacing: 2px;
          line-height: 1.05;
          color: #ffffff;
          font-size: clamp(26px, 4vw, 44px);
        }
        .hp-line.hp-red {
          color: #ff2a2a;
          margin-top: 10px;
        }

        .hp-choices {
          display: flex;
          gap: 18px;
          justify-content: flex-end;
          margin-top: 30px;
        }

        .hp-choice {
          font-family: 'Anton', sans-serif;
          font-style: italic;
          font-size: clamp(20px, 2.6vw, 28px);
          letter-spacing: 2px;
          padding: 6px 22px;
          border: none;
          cursor: pointer;
          background: transparent;
          color: #3ce2ff;
          clip-path: polygon(0 0, 100% 0, 92% 100%, 0 100%);
          white-space: nowrap;
          transition: background 0.15s ease, color 0.15s ease;
        }
        .hp-choice.active {
          background: #ffffff;
          color: #6b0010;
        }

        .hp-arrow {
          position: absolute;
          right: 22px;
          bottom: -18px;
          width: 0;
          height: 0;
          border-left: 14px solid transparent;
          border-right: 14px solid transparent;
          border-top: 18px solid #3ce2ff;
          animation: hp-bob 0.8s ease-in-out infinite;
        }
        @keyframes hp-bob {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(6px); }
        }
      `}</style>

      <AnimatePresence>
        {open && (
          <motion.div
            className="hp-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ x: 400, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -400, opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="hp-box">
              <div className="hp-tag">GLEDIS</div>
              <div className="hp-inner">
                <div className="hp-line">You seem to enjoy my Portfolio.</div>
                <div className="hp-line hp-red">You would enjoy having me as a colleague more.</div>
                <div className="hp-choices">
                  {["LET'S TALK", "MAYBE LATER"].map((label, i) => (
                    <button
                      key={label}
                      className={`hp-choice ${choice === i ? "active" : ""}`}
                      onMouseEnter={() => setChoice(i)}
                      onClick={() => pick(i)}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
              <div className="hp-arrow" />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

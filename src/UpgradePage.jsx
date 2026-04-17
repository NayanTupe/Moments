import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useState, useRef } from "react";
import { trackClick } from "./utils/tracking";

function UpgradePage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [finalMessage, setFinalMessage] = useState("");
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });
  const startTime = useRef(Date.now());

  const getTimeSpent = () => Math.round((Date.now() - startTime.current) / 1000) + "s";

  const moveButton = () => {
    // Generate random movement within a reasonable range inside the card
    const randomX = Math.random() * 160 - 80; // Moves -80 to 80px horizontally
    const randomY = Math.random() * 80 - 40;  // Moves -40 to 40px vertically
    setNoPos({ x: randomX, y: randomY });
  };

  const handleYes = (e) => {
    trackClick("UPGRADE_YES_BUTTON", e, { 
      timeSpent: getTimeSpent(), 
      noChasedCount: step 
    });
    setFinalMessage("That actually made me smile 😊 let’s see where this goes… 💫");
  };

  const handleNo = (e) => {
    const nextStep = step + 1;
    trackClick("UPGRADE_NO_BUTTON", e, { 
      timeSpent: getTimeSpent(), 
      interactionCount: nextStep 
    });

    setStep((prev) => {
      const actualNext = prev + 1;
      if (actualNext >= 4) {
        setFinalMessage("No worries at all 😊 I understand and respect your decision.");
        return 4;
      }
      moveButton(); // Jump to a new spot after each catch
      return actualNext;
    });
  };

  return (
    <div className="upgrade-page">
      {/* Floating particles */}
      <div className="upgrade-particles">
        {["😏", "✨", "💫", "🌟", "😊", "💕", "🔥", "🌸"].map((e, i) => (
          <span key={i} className={`upgrade-particle upgrade-p${i + 1}`}>
            {e}
          </span>
        ))}
      </div>

      <motion.div
        className="upgrade-card"
        initial={{ opacity: 0, y: 60, scale: 0.88 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.75, ease: "easeOut" }}
      >
        {finalMessage ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="final-message-container"
          >
            <motion.div
              className="final-emoji"
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              {finalMessage.includes("smile") ? "💫" : "🤝"}
            </motion.div>
            <p className="final-message-text">{finalMessage}</p>
          </motion.div>
        ) : (
          <>
            {/* Top emoji */}
            <motion.div
              className="upgrade-top-emoji"
              animate={{ rotate: [0, 8, -8, 0], scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 2.8 }}
            >
              😏
            </motion.div>

            <motion.h2
              className="upgrade-label"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Be honest…
            </motion.h2>

            <motion.p
              className="upgrade-question"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 }}
            >
              mi tujhya life madhe{" "}
              <span className="upgrade-highlight">'just friend'</span> category
              madhe yeto ki thoda{" "}
              <span className="upgrade-highlight2">upgrade</span> milu shakto? 😏
            </motion.p>

            {/* Reaction messages on No */}
            <div className="reaction-wrapper" style={{ minHeight: "60px" }}>
              {step === 1 && (
                <motion.p className="upgrade-reaction" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                  "Are you sure though? 🥺 catch me!"
                </motion.p>
              )}
              {step === 2 && (
                <motion.p className="upgrade-reaction" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                  "okay okay… 😔 chasing me now?"
                </motion.p>
              )}
              {step === 3 && (
                <motion.p className="upgrade-reaction" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                  "Last chance 👀 you're almost there!"
                </motion.p>
              )}
            </div>

            <motion.div
              className="upgrade-buttons"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.85 }}
            >
              <motion.button
                className="upgrade-btn upgrade-btn-yes"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.93 }}
                onClick={handleYes}
                animate={step > 0 ? { scale: [1, 1.05, 1] } : {}}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                💖 Yes, why not!
              </motion.button>

              <motion.button
                className="upgrade-btn upgrade-btn-no"
                animate={{ 
                  x: noPos.x, 
                  y: noPos.y,
                  scale: step === 3 ? 0.85 : 1,
                  boxShadow: step > 0 ? "0 0 20px rgba(255,255,255,0.3)" : ""
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                onMouseEnter={() => {
                  if (step > 0 && Math.random() > 0.3) moveButton();
                }}
                onClick={handleNo}
              >
                🙈 No…
              </motion.button>
            </motion.div>
          </>
        )}
      </motion.div>
    </div>
  );
}

export default UpgradePage;

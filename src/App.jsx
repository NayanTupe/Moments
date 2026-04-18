import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import LeftText from "./LeftText";
import RightImage from "./RightImage";
import Question from "./Question";
import Logo from "./Logo";
import UpgradePage from "./UpgradePage";
import NoResponse from "./NoResponse";

// Firebase
import { trackClick, trackAction } from "./utils/tracking";
import { useRef } from "react";

function Home() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);

  const startTime = useRef(Date.now());

  // TRACK USER (ONLY ONCE)
  useEffect(() => {
    // Increment visit count
    let count = parseInt(localStorage.getItem("visit_count") || "0");
    count += 1;
    localStorage.setItem("visit_count", count.toString());

    trackAction("page_view", { visitCount: count });
  }, []);

  const getTimeSpent = () =>
    Math.round((Date.now() - startTime.current) / 1000) + "s";

  // Yes button
  const handleYes = (e) => {
    trackClick("YES_BUTTON", e, {
      timeSpent: getTimeSpent(),
      noClickCount: step,
    });
    navigate("/yes");
  };

  // No button
  const handleNo = (e) => {
    trackClick("NO_BUTTON", e, {
      timeSpent: getTimeSpent(),
      interactionCount: 1,
    });
    navigate("/no-response");
  };

  return (
    <div className="hero">
      <Logo />

      <LeftText />
      <RightImage />

      {step === 1 && (
        <p className="fun-text" style={{ fontSize: "14px" }}>
          “काही हरकत नाही 😊 मी फक्त honestly विचारलं होतं…” 🥺
        </p>
      )}

      {step === 2 && (
        <p className="fun-text" style={{ fontSize: "12px" }}>
          “तुला uncomfortable वाटू नये म्हणूनच विचारलं 😊 Relax… काही pressure
          नाही.” 💭
        </p>
      )}

      {step === 3 && (
        <p className="fun-text" style={{ fontSize: "12px" }}>
          “तुझा answer मला मान्य आहे 👍 तू जशी comfortable आहेस तसंच राहूया…”
          (तरीही… कधीतरी ‘Yes’ वाटलं तर सांगशील 😄) 😌💖
        </p>
      )}

      {step === 4 && (
        <p className="fun-text" style={{ fontSize: "18px" }}>
          “Honestly… तुझ्याशी बोलायला आवडतं मला 😊 पण friends म्हणूनही ते पुरेसं
          आहे.”
        </p>
      )}

      <Question onYes={handleYes} onNo={handleNo} />

      <footer>
        <p>Created with feelings, Not just code..</p>
        <p>© 2026 | Developed by Nayan Mahendra Tupe</p>
      </footer>
    </div>
  );
}

function YesPage() {
  const navigate = useNavigate();

  return (
    <div className="yes-container">
      <audio autoPlay loop>
        <source src="/music.mp3" type="audio/mp3" />
      </audio>

      <div className="hearts">
        <span>💖</span>
        <span>💗</span>
        <span>💓</span>
        <span>💞</span>
      </div>

      <motion.div
        className="message-box"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
      >
        <h1>I'm really happy you said YES 🥹💖</h1>

        <img src="/bear.gif" alt="cute bear" className="bear" />

        <p className="contact">
          Honestly, I’ve always felt we could have a good vibe… 💕 <br />
        </p>
      </motion.div>

      {/* 👉 Side floating question button */}
      <motion.div
        className="yes-side-btn"
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        onClick={(e) => {
          trackClick("YES_SIDE_UPGRADE_BTN", e);
          navigate("/upgrade");
        }}
        whileHover={{ scale: 1.07 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="yes-side-question" title="Click here!">
          ek question? 🖱️😏
        </span>
        <span className="yes-side-arrow">→</span>
      </motion.div>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/yes" element={<YesPage />} />
      <Route path="/upgrade" element={<UpgradePage />} />
      <Route path="/no-response" element={<NoResponse />} />
    </Routes>
  );
}

export default App;

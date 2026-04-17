import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import LeftText from "./LeftText";
import RightImage from "./RightImage";
import Question from "./Question";
import Logo from "./Logo";

// Firebase
import { db } from "./firebase";
import { addDoc, collection } from "firebase/firestore";

function Home() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);

  // TRACK USER (ONLY ONCE)
  const trackUser = async () => {
    console.log("trackUser called");

    const hasTracked = localStorage.getItem("tracked");
    console.log("hasTracked:", hasTracked);

    if (!hasTracked) {
      try {
        console.log("before addDoc");

        const docRef = await addDoc(collection(db, "users"), {
          action: "link_opened",
          time: new Date(),
          pageUrl: window.location.href,
        });

        console.log("after addDoc");
        console.log("User tracked successfully", docRef.id);

        localStorage.setItem("tracked", "true");
      } catch (error) {
        console.error("Firebase Error full:", error);
        console.error("Firebase Error message:", error.message);
        console.error("Firebase Error code:", error.code);
      }
    } else {
      console.log("User already tracked");
    }
  };

  // RUN ON PAGE LOAD
  useEffect(() => {
    trackUser();
  }, []);

  // TRACK BUTTON CLICK
  const trackClick = async (action, e) => {
    try {
      await addDoc(collection(db, "clicks"), {
        action,
        buttonText: e?.target?.innerText || "",
        elementId: e?.target?.id || "",
        elementClass: e?.target?.className || "",
        pageUrl: window.location.href,
        time: new Date(),
      });

      console.log("Tracked:", action);
    } catch (err) {
      console.error("Tracking Error:", err);
    }
  };

  // Yes button
  const handleYes = (e) => {
    trackClick("YES_BUTTON", e);
    navigate("/yes");
  };

  // No button
  const handleNo = (e) => {
    trackClick("NO_BUTTON", e);

    setStep((prev) => {
      const nextStep = prev + 1;

      if (nextStep === 4) {
        setTimeout(() => navigate("/yes"), 1000);
      }

      return nextStep > 4 ? 4 : nextStep;
    });
  };

  return (
    <div className="hero">
      <Logo />

      <LeftText />
      <RightImage />

      {step === 1 && <p className="fun-text" style={{ fontSize: "14px" }} >“काही हरकत नाही 😊
मी फक्त honestly विचारलं होतं…” 🥺</p>}
      
      {step === 2 && <p className="fun-text" style={{ fontSize: "12px" }} >“तुला uncomfortable वाटू नये म्हणूनच विचारलं 😊 Relax… काही pressure नाही.” 💭</p>}
      
      {step === 3 && (
        <p className="fun-text" style={{ fontSize: "12px" }} >“तुझा answer मला मान्य आहे 👍 तू जशी comfortable आहेस तसंच राहूया…” (तरीही… कधीतरी ‘Yes’ वाटलं तर सांगशील 😄) 😌💖</p>
      )}
      
      {step === 4 && (
        <p className="fun-text" style={{ fontSize: "18px" }}>
         “Honestly… तुझ्याशी बोलायला आवडतं मला 😊 पण friends म्हणूनही ते पुरेसं आहे.”
        </p>
      )}
      

      <Question onYes={handleYes} onNo={handleNo} />

      <footer>
        <p>Created with feelings, not just code.</p>
      </footer>
    </div>
  );
}

function YesPage() {
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
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/yes" element={<YesPage />} />
    </Routes>
  );
}

export default App;

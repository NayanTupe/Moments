import { motion } from "framer-motion";
import { useState } from "react";

function Question({ onYes, onNo }) {
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });
  const [hasMoved, setHasMoved] = useState(false);

  const moveButton = () => {
    const randomX = Math.random() * 200 - 100; // -100px to 100px
    const randomY = Math.random() * 100 - 50;  // -50px to 50px
    setNoPos({ x: randomX, y: randomY });
    setHasMoved(true);
  };

  return (
    <div className="question-container">
      <p>Hey Sakshiii… “I’d really like to talk to you more… would you like that too? 😊”</p>

      <div className="buttons">
        <button onClick={onYes}>Yes..🖤</button>

        <motion.button
          onClick={(e) => {
            onNo(e);
            moveButton();
          }}
          onMouseEnter={() => {
            if (hasMoved) moveButton();
          }}
          animate={{ x: noPos.x, y: noPos.y }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          style={{
            boxShadow: hasMoved ? "0 0 15px rgba(255,255,255,0.3)" : "none",
            border: hasMoved ? "1px solid rgba(255,255,255,0.2)" : "none"
          }}
        >
          No 🙂
        </motion.button>
      </div>
    </div>
  );
}

export default Question;
import { motion } from "framer-motion";

function NoResponse() {
  return (
    <div className="no-response-container">
      <motion.div
        className="no-response-card"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.div
          className="no-response-emoji"
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          😌✨
        </motion.div>
        
        <h2 className="no-response-title">I Understand...</h2>
        
        <p className="no-response-text">
          No worries at all! 😊 <br />
          I truly value our friendship and respect your decision. <br />
          I'm just glad I could share how I felt. Let's keep things as cool as they've always been! 🤝🌸
        </p>

        <motion.div 
          className="no-response-hearts"
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ repeat: Infinity, duration: 3 }}
        >
          🤍✨🤍
        </motion.div>
      </motion.div>
    </div>
  );
}

export default NoResponse;

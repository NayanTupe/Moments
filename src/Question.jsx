function Question({ onYes, onNo }) {
  return (
    <div className="question-container">
      <p>Hey Sakshiii… “I’d really like to talk to you more… would you like that too? 😊”</p>

      <div className="buttons">
        <button onClick={onYes}>Yes..🖤</button>
        
        <button onClick={onNo}>No 🙂</button>
      </div>
    </div>
  );
}

export default Question;
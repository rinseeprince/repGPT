import { useState } from "react";
import ScenarioSelector from "./components/ScenarioSelector";
import ChatWindow from "./components/ChatWindow";
import FeedbackPanel from "./components/FeedbackPanel";

function App() {
  const [scenario, setScenario] = useState(null);
  const [chatHistory, setChatHistory] = useState([]);
  const [feedback, setFeedback] = useState(null);

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>🧠 AI Sales Mock Call</h1>

      {!scenario && (
        <ScenarioSelector setScenario={setScenario} />
      )}

      {scenario && (
        <>
          <ChatWindow
            scenario={scenario}
            chatHistory={chatHistory}
            setChatHistory={setChatHistory}
            setFeedback={setFeedback}
          />
          {feedback && <FeedbackPanel feedback={feedback} />}
        </>
      )}
    </div>
  );
}

export default App;

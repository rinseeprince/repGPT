import { useState } from "react";

export default function ChatWindow({ scenario, chatHistory, setChatHistory, setFeedback }) {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    const updatedHistory = [...chatHistory, userMessage];
    setChatHistory(updatedHistory);
    setInput("");
    setLoading(true);

    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: [
          { role: "system", content: scenario.prompt },
          ...updatedHistory,
        ],
      }),
    });

    const data = await res.json();
    const aiMessage = { role: "assistant", content: data.reply };
    setChatHistory([...updatedHistory, aiMessage]);
    setLoading(false);
  };

  const getFeedback = async () => {
    const conversation = chatHistory.map((m) => `${m.role}: ${m.content}`).join("\n");

    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/feedback`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ conversation }),
    });

    const data = await res.json();
    setFeedback(data.feedback);
  };

  return (
    <div style={{ marginTop: "2rem" }}>
      <h2>👥 Chat</h2>
      <div style={{ maxHeight: 300, overflowY: "auto", border: "1px solid #ccc", padding: "1rem", marginBottom: "1rem" }}>
        {chatHistory.map((msg, i) => (
          <div key={i}><strong>{msg.role}:</strong> {msg.content}</div>
        ))}
      </div>

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type your message..."
        style={{ width: "70%", marginRight: "1rem" }}
      />
      <button onClick={sendMessage} disabled={loading}>
        Send
      </button>
      <button onClick={getFeedback} style={{ marginLeft: "1rem" }}>
        End Call & Get Feedback
      </button>
    </div>
  );
}

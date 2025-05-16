export default function FeedbackPanel({ feedback }) {
  return (
    <div style={{ marginTop: "2rem", padding: "1rem", border: "1px solid #4caf50", background: "#f0fff0" }}>
      <h2>📊 Feedback</h2>
      <pre style={{ whiteSpace: "pre-wrap", fontFamily: "inherit" }}>
        {feedback}
      </pre>
    </div>
  );
}

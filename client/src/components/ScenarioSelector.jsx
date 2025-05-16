import { useState } from "react";

const predefinedScenarios = [
  {
    id: 1,
    title: "🛍️ Retail CMO - Budget Conscious",
    prompt:
      "You're a CMO of a retail brand evaluating ad tech partners. You're skeptical about ROI and want cost-effective acquisition."
  },
  {
    id: 2,
    title: "💡 SaaS VP - Feature-Driven",
    prompt:
      "You're a VP of Marketing at a SaaS startup. You're curious about integrations, roadmap, and competitive edge."
  },
  {
    id: 3,
    title: "📦 Ecom CEO - Growth Obsessed",
    prompt:
      "You're a founder who only cares about CAC, ROAS, and fast scaling. You're impatient and tough."
  }
];

export default function ScenarioSelector({ setScenario }) {
  const [customPrompt, setCustomPrompt] = useState("");

  const handleCustomSubmit = () => {
    if (customPrompt.trim()) {
      setScenario({ id: "custom", title: "🧠 Custom Persona", prompt: customPrompt });
    }
  };

  return (
    <div>
      <h2>Pick a Mock Prospect</h2>
      <ul>
        {predefinedScenarios.map((s) => (
          <li key={s.id} style={{ marginBottom: "1rem" }}>
            <button onClick={() => setScenario(s)}>{s.title}</button>
          </li>
        ))}
      </ul>

      <hr style={{ margin: "2rem 0" }} />

      <h3>🧠 Create Your Own Prospect</h3>
      <textarea
        rows={4}
        style={{ width: "100%", marginBottom: "1rem" }}
        placeholder="Describe your ideal buyer persona and context..."
        value={customPrompt}
        onChange={(e) => setCustomPrompt(e.target.value)}
      />
      <br />
      <button onClick={handleCustomSubmit} disabled={!customPrompt.trim()}>
        Start Mock Call
      </button>
    </div>
  );
}


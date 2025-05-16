from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from openai import OpenAI

app = Flask(__name__)

# CORS configuration for frontend
CORS(app, resources={r"/api/*": {"origins": ["http://localhost:5173", "https://rep-gpt-ie1b.vercel.app"]}}, supports_credentials=True)




# Initialize OpenAI client with API key
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

@app.route("/api/chat", methods=["POST", "OPTIONS"])
def chat():
    if request.method == "OPTIONS":
        return '', 200

    data = request.get_json()
    messages = data.get("messages", [])

    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=messages,
        temperature=0.7
    )

    return jsonify({"reply": response.choices[0].message.content})


@app.route("/api/feedback", methods=["POST", "OPTIONS"])
def feedback():
    if request.method == "OPTIONS":
        return '', 200

    conversation = request.json.get("conversation")
    prompt = f"""
    Evaluate this mock sales conversation:

    {conversation}

    Provide:
    1. Three strengths
    2. Three areas of improvement
    3. Specific discovery questions that were missed
    """

    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.7
    )

    return jsonify({"feedback": response.choices[0].message.content})


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5050, debug=True)

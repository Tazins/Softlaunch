/* /src/pages/AcademyPractice.jsx
   A minimal all-in-one live-coding playground
--------------------------------------------------------------- */
import { useEffect, useRef, useState } from "react";
import Editor from "@monaco-editor/react";
import NavBar from "../components/NavBar.jsx";

/* ---- demo database ------------------------------------------------ */
const QUESTIONS = [
  {
    id: 1,
    title: "Two-Sum",
    description:
      "Given an array nums and an integer target, return indices of the two numbers such that they add up to target.",
    languages: ["javascript", "python", "java"],
    prompts: [
      "Why did you choose this data structure?",
      "What is the time complexity of your current approach?",
      "How would you test edge-cases for this problem?",
    ],
  },
  {
    id: 2,
    title: "Valid Parentheses",
    description:
      "Given a string containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
    languages: ["javascript", "python"],
    prompts: [
      "Can you think of a one-pass solution?",
      "What happens if the input is 10 MB long?",
      "Which STL / built-in container could simplify your code?",
    ],
  },
];

/* ---- tiny reusable styles ---------------------------------------- */
const box   = { background: "#fff", borderRadius: 12, boxShadow: "0 1px 4px rgba(0,0,0,.15)" };
const label = { fontWeight: 700, marginBottom: 6 };

/* ------------------------------------------------------------------ */
export default function AcademyPractice() {
  const [q] = useState(() => QUESTIONS[Math.floor(Math.random() * QUESTIONS.length)]);
  const [lang, setLang] = useState(q.languages[0]);
  const [promptIdx, setPromptIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setPromptIdx(i => (i + 1) % q.prompts.length), 25_000);
    return () => clearInterval(id);
  }, [q.prompts.length]);

  const videoRef = useRef(null);
  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
      if (videoRef.current) videoRef.current.srcObject = stream;
    });
  }, []);

  return (
    <>
      <NavBar />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr minmax(260px, 28%)",
          gap: 24,
          padding: 24,
          height: "calc(100vh - 80px)",
        }}
      >
        {/* ---------- left : question + editor ----------------------- */}
        <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
          {/* question card */}
          <div style={{ ...box, padding: 24, marginBottom: 16 }}>
            <h2 style={{ margin: "0 0 12px", color: "#111827" }}>{q.title}</h2>
            <p style={{ margin: 0, whiteSpace: "pre-line", color: "#111827" }}>
              {q.description}
            </p>

            {/* language picker */}
            <div style={{ marginTop: 16 }}>
              <span style={label}>Language:</span>{" "}
              <select
                value={lang}
                onChange={e => setLang(e.target.value)}
                style={{
                  padding: "6px 12px",
                  borderRadius: 6,
                  border: "1px solid #d1d5db",
                  fontSize: 14,
                }}
              >
                {q.languages.map(l => (
                  <option key={l}>{l}</option>
                ))}
              </select>
            </div>
          </div>

          {/* code editor */}
          <div style={{ flex: 1, ...box, overflow: "hidden" }}>
            <Editor
              height="100%"
              defaultLanguage={lang}
              language={lang}
              defaultValue={`// ${q.title}\n`}
              theme="vs-dark"
              options={{
                fontSize: 16,
                minimap: { enabled: false },
              }}
            />
          </div>
        </div>

        {/* ---------- right : camera + prompt ------------------------ */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            style={{ width: "100%", borderRadius: 12, objectFit: "cover", ...box }}
          />

          <div
            style={{
              ...box,
              padding: 16,
              background: "#10b981",
              color: "#fff",
              fontSize: 16,
              fontWeight: 600,
              display: "flex",
              alignItems: "flex-start",
              gap: 8,
            }}
          >
            ✓ {q.prompts[promptIdx]}
          </div>
        </div>
      </div>
    </>
  );
}


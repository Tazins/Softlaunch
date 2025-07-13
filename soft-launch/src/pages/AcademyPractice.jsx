import { useEffect, useRef, useState } from "react";
import Editor                           from "@monaco-editor/react";
import NavBar                           from "../components/NavBar.jsx";

/* question banks */
const TECHNICAL = [
  {
    id: 1,
    title: "Two-Sum",
    description:
`Given an array \`nums\` and an integer \`target\`, return **indices** of the
two numbers such that they add up to target.`,
    starter: `// Two-Sum
function twoSum(nums, target) {
  // your code here
}`,
    languages: ["javascript", "python"],
    prompts: [
      "Why did you choose this data structure?",
      "What is the time-complexity of your approach?",
      "How would you test edge-cases?",
    ],
  },
  {
    id: 2,
    title: "Valid Parentheses",
    description:
`Given a string containing just '(', ')', '{', '}', '[' and ']', determine
if the input string is valid.`,
    starter: `// Valid Parentheses
function isValid(s) {
  // your code here
}`,
    languages: ["javascript", "python"],
    prompts: [
      "Can you think of a one-pass solution?",
      "What happens if the input is 10 MB long?",
      "Which built-in container could simplify your code?",
    ],
  },
];

const BEHAVIOURAL = [
  {
    id: 1,
    question: "Tell me about a time you dealt with a difficult teammate.",
    model  : "Use the STAR format. Emphasise empathy, conflict-resolution and a positive outcome.",
  },
  {
    id: 2,
    question: "Describe a project where you had to learn a new technology quickly.",
    model  : "Show initiative, the learning process, concrete results and reflection.",
  },
];

const card  = { background:"#fff", borderRadius:12,
                boxShadow:"0 1px 4px rgba(0,0,0,.15)" };
const label = { fontWeight:700 };
const pill  = (active)=>({
  padding:"8px 18px",
  borderRadius:20,
  fontWeight:600,
  cursor:"pointer",
  background: active? "#3b82f6" : "#e5e7eb",
  color     : active? "#fff"    : "#111827",
});
const btn   = (clr)=>({
  padding:"10px 24px", borderRadius:8,
  background:clr, color:"#fff", fontWeight:600,
  border:"none", cursor:"pointer",
});


export default function AcademyPractice() {
  /* which track? */
  const [track, setTrack] = useState("technical");   // "technical" | "behavioural"

  const [techIdx, setTechIdx] = useState(0);
  const techQ = TECHNICAL[techIdx];
  const [lang, setLang]   = useState(techQ.languages[0]);
  const [code, setCode]   = useState(techQ.starter);
  const [promptIdx, setPromptIdx] = useState(0);
  const [feedback, setFb] = useState("");
  const [submitted, setSub] = useState(false);

  /* rotate coding prompt */
  useEffect(() => {
    if (track !== "technical") return;
    const id = setInterval(
      () => setPromptIdx(p => (p + 1) % techQ.prompts.length),
      25_000
    );
    return () => clearInterval(id);
  }, [track, techQ]);


  const [behIdx, setBehIdx] = useState(0);
  const behQ = BEHAVIOURAL[behIdx];
  const [answer, setAns] = useState("");
  const [showModel, setShow] = useState(false);

  /* shared webcam */
  const cam = useRef(null);
  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(s => cam.current && (cam.current.srcObject = s))
      .catch(() => {/* camera denied – ignore */});
  }, []);

  /* tech: submit / next */
  const submitTech = () => {
    const fb = code.trim().length < 30
      ? "Looks a bit short – are you sure your solution covers all cases?"
      : "Nice! Your solution compiles – think about edge-cases next.";
    setFb(fb);
    setSub(true);
  };
  const nextTech = () => {
    const n = (techIdx + 1) % TECHNICAL.length;
    setTechIdx(n);
    const nq = TECHNICAL[n];
    setLang(nq.languages[0]);
    setCode(nq.starter);
    setPromptIdx(0);
    setFb(""); setSub(false);
  };

  /* behavioural: next */
  const nextBeh = () => {
    setBehIdx((behIdx + 1) % BEHAVIOURAL.length);
    setAns(""); setShow(false);
  };


  return (
    <>
      <NavBar />

      {/* track picker */}
      <div style={{ display:"flex", gap:12, justifyContent:"center", marginTop:24 }}>
        <span style={pill(track==="technical")}  onClick={() => setTrack("technical")}>Technical</span>
        <span style={pill(track==="behavioural")}onClick={() => setTrack("behavioural")}>Behavioural</span>
      </div>

      {track === "technical" ? (
        <TechPane
          q={techQ} lang={lang} setLang={setLang}
          code={code} setCode={setCode}
          cam={cam} prompt={techQ.prompts[promptIdx]}
          submitted={submitted} feedback={feedback}
          onSubmit={submitTech} onNext={nextTech}
        />
      ) : (
        <BehPane
          q={behQ} cam={cam}
          answer={answer} setAnswer={setAns}
          showModel={showModel} setShow={setShow}
          onNext={nextBeh}
        />
      )}
    </>
  );
}


function TechPane({ q, lang, setLang, code, setCode,
                    cam, prompt, submitted, feedback,
                    onSubmit, onNext }) {
  return (
    <div style={{
      display:"grid", gap:24, padding:24,
      gridTemplateColumns:"1fr minmax(260px,28%)",
      height:"calc(100vh - 140px)",
    }}>
      {/* left */}
      <div style={{ display:"flex", flexDirection:"column" }}>
        <div style={{ ...card, padding:24, marginBottom:16 }}>
          <h2 style={{ margin:"0 0 12px", color:"#111827" }}>{q.title}</h2>
          <p  style={{ margin:0, whiteSpace:"pre-line", color:"#111827" }}>{q.description}</p>

          <div style={{ marginTop:16 }}>
            <span style={label}>Language:</span>{" "}
            <select value={lang} onChange={e => setLang(e.target.value)}
                    style={{ padding:"6px 12px", borderRadius:6,
                             border:"1px solid #d1d5db", fontSize:14 }}>
              {q.languages.map(l => <option key={l}>{l}</option>)}
            </select>
          </div>
        </div>

        <div style={{ flex:1, ...card, overflow:"hidden" }}>
          <Editor
            height="100%" theme="vs-dark"
            language={lang} value={code}
            onChange={v => setCode(v ?? "")}
            options={{ fontSize:16, minimap:{ enabled:false } }}
          />
        </div>

        <div style={{ marginTop:16, display:"flex", gap:12 }}>
          <button style={btn("#10b981")} onClick={onSubmit}>Submit ✓</button>
          {submitted && <button style={btn("#3b82f6")} onClick={onNext}>Next »</button>}
        </div>

        {submitted && (
          <div style={{
            ...card, marginTop:16, padding:16,
            borderLeft:"6px solid #10b981", color:"#111827"
          }}>
            {feedback}
          </div>
        )}
      </div>

      {/* right */}
      <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
        <video ref={cam} autoPlay muted playsInline
               style={{ ...card, width:"100%", borderRadius:12, objectFit:"cover" }} />
        <div style={{
          ...card, padding:16, background:"#10b981",
          color:"#fff", fontSize:16, fontWeight:600 }}>
          ✓ {prompt}
        </div>
      </div>
    </div>
  );
}


function BehPane({ q, cam, answer, setAnswer,
                   showModel, setShow, onNext }) {
  return (
    <div style={{
      display:"grid", gap:24, padding:24,
      gridTemplateColumns:"1fr minmax(260px,28%)",
      height:"calc(100vh - 140px)",
    }}>
      {/* left */}
      <div style={{ display:"flex", flexDirection:"column" }}>
        <div style={{ ...card, padding:24, marginBottom:16 }}>
          <h2 style={{ margin:0, color:"#111827" }}>{q.question}</h2>
        </div>

        <textarea
          value={answer} onChange={e => setAnswer(e.target.value)}
          placeholder="Type your answer here…"
          style={{
            flex:1, ...card, padding:16, fontSize:16,
            fontFamily:"inherit", resize:"none", color:"#111827"
          }}
        />

        <div style={{ marginTop:16, display:"flex", gap:12 }}>
          {!showModel && (
            <button style={btn("#f59e0b")} onClick={() => setShow(true)}>
              Reveal Model Answer
            </button>
          )}
          <button style={btn("#3b82f6")} onClick={onNext}>Next »</button>
        </div>

        {showModel && (
          <div style={{
            ...card, marginTop:16, padding:16,
            borderLeft:"6px solid #f59e0b", color:"#111827"
          }}>
            {q.model}
          </div>
        )}
      </div>

      {/* right */}
      <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
        <video ref={cam} autoPlay muted playsInline
               style={{ ...card, width:"100%", borderRadius:12, objectFit:"cover" }} />
      </div>
    </div>
  );
}

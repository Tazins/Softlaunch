/* /src/pages/PracticeResult.jsx
   Shows verdict + next-question button
-------------------------------------------------------------------- */
import { useLocation, useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar.jsx";

export default function PracticeResult(){
  const {state} = useLocation();          // { pass, error, question, code }
  const nav      = useNavigate();

  if(!state) return null;                 // direct visit – nothing to show

  return(
    <>
      <NavBar/>
      <div style={{maxWidth:800,margin:"64px auto",padding:24,
                   background:"#fff",borderRadius:12,boxShadow:"0 1px 4px rgba(0,0,0,.15)"}}>
        <h2 style={{marginTop:0}}>
          {state.pass ? "🎉 Great job!" : "❌ Needs work"}
        </h2>
        <p>{state.pass
              ? `Your solution for “${state.question}” passed all sample tests.`
              : state.error
                   ? `Your code threw:\n${state.error}`
                   : `Your solution for “${state.question}” didn’t pass the sample tests.`}
        </p>

        <pre style={{background:"#f3f4f6",padding:16,overflowX:"auto"}}>
{state.code}
        </pre>

        <button
          onClick={()=>nav("/academy")}
          style={{marginTop:24,padding:"12px 28px",borderRadius:8,
                  background:"#3b82f6",color:"#fff",fontWeight:600,border:"none"}}
        >
          Try another question →
        </button>
      </div>
    </>
  );
}

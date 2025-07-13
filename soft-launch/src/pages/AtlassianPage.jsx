import { useState } from "react";
import NavBar from "../components/NavBar.jsx";

export default function AtlassianPage() {
  /* top-level state */
  const [tab, setTab] = useState("about");
  const [sub, setSub] = useState("Application Guides");

  /* ───────── company profile ───────── */
  const company = {
    name: "Atlassian",
    industry: "SaaS",
    banner: "/atlassian-hero.png",
    logo  : "/atlassian.png",

    social: {
      website  : ["🌐", "https://atlassian.com"],
      linkedin : ["in",  "https://linkedin.com/company/atlassian"],
      instagram: ["📷",  "https://instagram.com/atlassian"],
      facebook : ["f",   "https://facebook.com/atlassian"],
      youtube  : ["▶",   "https://youtube.com/@atlassian"],
    },

    about: `Atlassian builds collaboration and productivity software including Jira, Confluence and Trello.
Founded in Sydney in 2002, the company emphasises open teamwork, agile methodologies and a strong engineering culture.
Interns at Atlassian work on production code from day one, paired with experienced mentors, and take part in “ShipIt” days, hackathons and global intern showcases.`,

    news: [
      {
        title : "Atlassian stock drops 9 % as CEO sells $1.6 M of shares",
        source: "Investopedia",
        date  : "11 Jul 2025",
        url   : "https://www.investopedia.com/atlassian-stock-drops-9-percent-as-ceo-sheds-over-usd1-6-million-of-shares-11770175",
      },
    ],

    /* ───── PREP RESOURCES ───── */
    resources: {
      "Application Guides": [
        {
          id   : 1,
          title: "Crafting a stand-out Atlassian cover letter",
          date : "15 Jul 2025",
          url  : "#",
        },
      ],
      Resume: [
        {
          id   : 1,
          title: "Intern Resume – Software Engineer 2024 (hired)",
          date : "PDF · 2 pages",
          url  : "/resume.pdf",
        },
        {
          id   : 2,
          title: "Graduate Résumé – Product Manager 2023 (hired)",
          date : "PDF · 1 page",
          url  : "/resume1.pdf",
        },
      ],
      "Online Assessment"   : [],
      "Behavioural Interview": [],
      "Technical Interview"  : [],
    },
  };

  /* ───────── helpers ───────── */
  const TabBtn = ({ id, children }) => (
    <button
      onClick={() => setTab(id)}
      style={{
        padding: "12px 28px",
        background: "none",
        border: "none",
        fontWeight: 600,
        fontSize: 16,
        color: "#111827",
        borderBottom: tab === id ? "3px solid #10b981" : "3px solid transparent",
        cursor: "pointer",
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </button>
  );

  const SubBtn = ({ id }) => (
    <span
      onClick={() => setSub(id)}
      style={{
        padding: "8px 16px",
        borderRadius: 8,
        background: sub === id ? "#10b981" : "#e5e7eb",
        color: sub === id ? "#fff" : "#111827",
        cursor: "pointer",
        fontWeight: 600,
        fontSize: 14,
      }}
    >
      {id}
    </span>
  );

  /* ───────── render ───────── */
  return (
    <>
      <NavBar />

      {/* HERO */}
      <div style={{ position: "relative", height: 260, overflow: "hidden" }}>
        <img src={company.banner} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,.35)" }} />
        {/* overlay */}
        <div style={{ position: "absolute", bottom: 24, left: "5%", display: "flex", gap: 24 }}>
          <img src={company.logo} alt={company.name}
               style={{ width: 120, height: 120, borderRadius: 12, objectFit: "contain" }} />
          <div>
            <h1 style={{ margin: 0, fontSize: 56, fontWeight: 800, color: "#fff" }}>{company.name}</h1>
            <p  style={{ margin: 4, fontSize: 20, color: "#e5e7eb" }}>{company.industry}</p>
            <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
              {Object.values(company.social).map(([icon, url]) => (
                <a key={url} href={url} target="_blank" rel="noreferrer" style={iconStyle}>{icon}</a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* MAIN TABS */}
      <div style={{
        background: "#fff", borderTop:"1px solid #d1d5db", borderBottom:"1px solid #d1d5db",
        display:"flex", justifyContent:"center", gap:24, paddingInline:"5%", overflowX:"auto",
      }}>
        {["about","jobs","news","prep"].map(id=>(
          <TabBtn key={id} id={id}>{id[0].toUpperCase()+id.slice(1)}</TabBtn>
        ))}
      </div>

      {/* CONTENT */}
      <div style={{ width:"90%", maxWidth:1400, margin:"32px auto 64px", padding:"0 24px" }}>
        {/* ABOUT */}
        {tab==="about" && <p style={aboutText}>{company.about}</p>}

        {/* JOBS */}
        {tab==="jobs" && <p>No jobs loaded yet.</p>}

        {/* NEWS */}
        {tab==="news" && (
          company.news.length
            ? company.news.map(n=>(
                <a key={n.url} href={n.url} target="_blank" rel="noreferrer"
                   style={{ ...newsStyle, ...card }}>
                  <div style={{ fontWeight:700 }}>{n.title}</div>
                  <div style={{ fontSize:14, color:"#6b7280" }}>{n.source} · {n.date}</div>
                </a>
              ))
            : <p style={{ color:"#6b7280" }}>No news articles yet.</p>
        )}

        {/* PREP RESOURCES */}
        {tab==="prep" && (
          <>
            {/* sub-tabs */}
            <div style={{ display:"flex", gap:12, marginBottom:28, flexWrap:"wrap" }}>
              {Object.keys(company.resources).map(cat => <SubBtn key={cat} id={cat} />)}
            </div>

            {/* list or empty */}
            {company.resources[sub].length
              ? company.resources[sub].map(item=>(
                  <a key={item.id} href={item.url} target="_blank" rel="noreferrer"
                     style={{ ...card, ...newsStyle }}>
                    <div style={{ fontWeight:700 }}>{item.title}</div>
                    <div style={{ fontSize:14, color:"#6b7280" }}>{item.date}</div>
                  </a>
                ))
              : <p>No resources yet.</p>}
          </>
        )}
      </div>
    </>
  );
}

/* ───── inline styles ───── */
const aboutText = { fontSize:18, lineHeight:1.65, whiteSpace:"pre-line" };

const iconStyle = {
  width:36, height:36, borderRadius:8, background:"#10b981",
  color:"#fff", display:"flex", alignItems:"center", justifyContent:"center",
  textDecoration:"none", fontWeight:700, fontSize:18,
};

const newsStyle = {
  display:"block", padding:20, marginBottom:20,
  textDecoration:"none", color:"#111827",
};

const card = { background:"#fff", borderRadius:12,
               boxShadow:"0 1px 4px rgba(0,0,0,.12)" };

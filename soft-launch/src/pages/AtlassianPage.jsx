import { useState } from "react";
import NavBar from "../components/NavBar.jsx";

export default function AtlassianPage() {
  /* state */
  const [tab, setTab] = useState("about");
  const [sub, setSub] = useState("Application Guides");

  /* company data (short) */
  const company = {
    name: "Atlassian",
    industry: "SaaS",
    banner: "/atlassian-hero.png",
    logo: "/atlassian.png",
    social: {
      website:   ["🌐", "https://atlassian.com"],
      linkedin:  ["in",  "https://linkedin.com/company/atlassian"],
      instagram: ["📷",  "https://instagram.com/atlassian"],
      facebook:  ["f",   "https://facebook.com/atlassian"],
      youtube:   ["▶",   "https://youtube.com/@atlassian"],
    },
    about: `Atlassian builds collaboration and productivity software including Jira, Confluence and Trello.
Founded in Sydney in 2002, the company emphasises open teamwork, agile methodologies and a strong engineering culture.
Interns at Atlassian work on production code from day one, paired with experienced mentors, and take part in “ShipIt” days, hackathons and global intern showcases.`,
    resources: {
      "Application Guides": [],
      Resume: [],
      "Online Assessment": [],
      "Behavioural Interview": [],
      "Technical Interview": [],
    },
  };

  /* tiny helpers */
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

  return (
    <>
      <NavBar />

      {/* HERO — full-width */}
      <div style={{ position: "relative", height: 260, width: "100%", overflow: "hidden" }}>
        <img src={company.banner} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,.35)" }} />

        {/* overlayed logo + title */}
        <div style={{
          position: "absolute",
          bottom: 24,
          left: "5%",
          display: "flex",
          gap: 24,
          alignItems: "center",
          flexWrap: "wrap",
        }}>
          <img
            src={company.logo}
            alt={company.name}
            style={{ width: 120, height: 120, borderRadius: 12, objectFit: "contain" }}
          />
          <div>
            <h1 style={{ margin: 0, fontSize: 56, fontWeight: 800, color: "#fff" }}>
              {company.name}
            </h1>
            <p style={{ margin: 4, fontSize: 20, color: "#e5e7eb" }}>{company.industry}</p>

            <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
              {Object.values(company.social).map(([icon, url]) => (
                <a key={url} href={url} target="_blank" rel="noreferrer" style={iconStyle}>
                  {icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* TAB BAR — full width */}
      <div style={{
        width: "100%",
        background: "#fff",
        borderTop: "1px solid #d1d5db",
        borderBottom: "1px solid #d1d5db",
        display: "flex",
        justifyContent: "center",
        gap: 24,
        paddingInline: "5%",
        overflowX: "auto",
      }}>
        <TabBtn id="about">About</TabBtn>
        <TabBtn id="jobs">Jobs</TabBtn>
        <TabBtn id="news">News</TabBtn>
        <TabBtn id="prep">Preparation Resources</TabBtn>
      </div>

      {/* CONTENT — 90 % width */}
      <div style={{
        width: "90%",
        maxWidth: 1400,
        margin: "32px auto 64px",
        padding: "0 24px",
      }}>
        {tab === "about" && (
          <p style={{ fontSize: 18, lineHeight: 1.65, whiteSpace: "pre-line" }}>{company.about}</p>
        )}

        {tab === "jobs" && <p>No jobs loaded yet.</p>}

        {tab === "news" && <p style={{ color: "#6b7280" }}>No news articles yet.</p>}

        {tab === "prep" && (
          <>
            <div style={{ display: "flex", gap: 12, marginBottom: 28, flexWrap: "wrap" }}>
              {Object.keys(company.resources).map((cat) => (
                <SubBtn key={cat} id={cat} />
              ))}
            </div>
            <p>No resources yet.</p>
          </>
        )}
      </div>
    </>
  );
}

/* little green pill */
const iconStyle = {
  width: 36,
  height: 36,
  borderRadius: 8,
  background: "#10b981",
  color: "#fff",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  textDecoration: "none",
  fontWeight: 700,
  fontSize: 18,
};

import { useState, useMemo } from "react";
import NavBar from "../components/NavBar.jsx";
import CompanyCard from "../components/CompanyCard.jsx";

/*  DATA  */
const COMPANIES = [
  { id: 1, name: "Atlassian",      logo: "/atlassian.png",   industry: "SaaS",            city: "Sydney",     open: "2025-07-10", close: "2025-08-02", url: "/companies/atlassian" },
  { id: 2, name: "Google",         logo: "/google.webp",     industry: "Internet",        city: "Sydney",     open: "2025-07-18", close: "2025-09-01", url: "#" },
  { id: 3, name: "Canva",          logo: "/canva.png",       industry: "Design Tech",     city: "Sydney",     open: "2025-07-24", close: "2025-08-20", url: "#" },
  { id: 4, name: "WiseTech Global",logo: "/wisetech.png",    industry: "Logistics Tech",  city: "Sydney",     open: "2025-08-05", close: "2025-09-10", url: "#" },
  { id: 5, name: "Neara",          logo: "/neara.png",       industry: "Infrastructure AI",city: "Sydney",    open: "2025-07-12", close: "2025-08-15", url: "#" },
  { id: 6, name: "SafetyCulture",  logo: "/safetyculture.png",industry:"SaaS",            city: "Townsville", open: "2025-07-30", close: "2025-09-05", url: "#" },
  { id: 7, name: "The Trade Desk", logo: "/thetradedesk.png",industry:"Ad-Tech",          city: "Sydney",     open: "2025-08-01", close: "2025-09-20", url: "#" },
];

export default function InternshipsPage() {
  const [query, setQuery]       = useState("");
  const [industry, setIndustry] = useState("");
  const [city, setCity]         = useState("");

  const industries = [...new Set(COMPANIES.map(c => c.industry))];
  const cities     = [...new Set(COMPANIES.map(c => c.city))];

  const filtered = useMemo(
    () =>
      COMPANIES.filter(c => {
        const okName = c.name.toLowerCase().includes(query.toLowerCase());
        const okInd  = !industry || c.industry === industry;
        const okCity = !city     || c.city     === city;
        return okName && okInd && okCity;
      }),
    [query, industry, city]
  );

  return (
    <>
      <NavBar />

      <div style={{ padding: 24, paddingTop: 96 /* clear sticky bar */ }}>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 24 }}>Companies</h1>

        {/* filter bar */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 16, marginBottom: 32 }}>
          <input
            placeholder="Search company"
            value={query}
            onChange={e => setQuery(e.target.value)}
            style={input}
          />

          <select value={industry} onChange={e => setIndustry(e.target.value)} style={select}>
            <option value="">Industry</option>
            {industries.map(i => <option key={i}>{i}</option>)}
          </select>

          <select value={city} onChange={e => setCity(e.target.value)} style={select}>
            <option value="">Location</option>
            {cities.map(c => <option key={c}>{c}</option>)}
          </select>

          <button onClick={() => { setQuery(""); setIndustry(""); setCity(""); }} style={btnGray}>
            Reset
          </button>
        </div>

        {/* grid */}
        <div style={grid}>
          {filtered.map(c => <CompanyCard key={c.id} company={c} />)}
          {filtered.length === 0 && (
            <p style={{ gridColumn: "1 / -1", textAlign: "center" }}>No results 😔</p>
          )}
        </div>
      </div>
    </>
  );
}

/* ---- tiny reusable styles ---- */
const input = {
  flex: 1,
  minWidth: 220,
  padding: "0.75rem 1rem",
  border: "1px solid #d1d5db",
  borderRadius: 8,
  fontSize: 16,
};

const select = { ...input, flex: "0 0 200px" };

const btnGray = {
  padding: "0.75rem 1.5rem",
  borderRadius: 8,
  background: "#e5e7eb",
  border: "none",
  fontWeight: 600,
  cursor: "pointer",
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
  gap: 24,
};

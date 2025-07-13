import { useState } from "react";
import NavBar from "../components/NavBar.jsx";
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
} from "date-fns";


const INTERNSHIPS = [
  { id: 1, name: "Atlassian",      open: "2025-07-10", close: "2025-08-02" },
  { id: 2, name: "Google STEP",    open: "2025-07-18", close: "2025-09-01" },
  { id: 3, name: "Canva Grad SE",  open: "2025-07-24", close: "2025-08-20" },
  { id: 4, name: "WiseTech Grad",  open: "2025-08-05", close: "2025-09-10" },
  { id: 5, name: "Neara SE",       open: "2025-07-12", close: "2025-08-15" },
];
/* --------------------------------- */

export default function CalendarPage() {
  const [cursor, setCursor] = useState(new Date());                // month pointer

  /* build date range for the grid */
  const monthStart = startOfMonth(cursor);
  const monthEnd   = endOfMonth(cursor);
  const gridStart  = startOfWeek(monthStart, { weekStartsOn: 0 });
  const gridEnd    = endOfWeek(monthEnd, { weekStartsOn: 0 });
  const days       = eachDayOfInterval({ start: gridStart, end: gridEnd });

  /* fast lookup maps */
  const opens  = new Map();
  const closes = new Map();
  INTERNSHIPS.forEach((j) => { opens.set(j.open, j); closes.set(j.close, j); });

  return (
    <>
      <NavBar />

      <div style={{ padding: 24, paddingTop: 96 }}>
        {/* header row */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
          <button onClick={() => setCursor(subMonths(cursor, 1))} style={btn}>← Prev</button>
          <h2 style={{ margin: 0, fontSize: 28, fontWeight: 800 }}>
            {format(cursor, "MMMM yyyy")}
          </h2>
          <button onClick={() => setCursor(addMonths(cursor, 1))} style={btn}>Next →</button>
        </div>

        {/* weekday labels */}
        <div style={grid}>
          {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map((d) => (
            <div key={d} style={{ textAlign: "center", fontWeight: 600, paddingBottom: 8 }}>{d}</div>
          ))}
        </div>

        {/* month cells */}
        <div style={grid}>
          {days.map((day) => {
            const iso = format(day, "yyyy-MM-dd");
            const isCurrent = isSameMonth(day, cursor);
            const openJob   = opens.get(iso);
            const closeJob  = closes.get(iso);

            let bg = "transparent";
            if (openJob)  bg = "#d1fae5";   // green-100
            if (closeJob) bg = "#fee2e2";   // red-100

            return (
              <div
                key={iso}
                style={{
                  height: 110,
                  border: "1px solid #3f3f46",
                  padding: 8,
                  boxSizing: "border-box",
                  background: bg,
                  opacity: isCurrent ? 1 : 0.35,
                  fontSize: 14,
                  overflow: "hidden",
                }}
              >
                <div style={{ fontWeight: 600 }}>{day.getDate()}</div>
                {openJob && (
                  <div style={{ fontSize: 12, color: "#065f46" }}>opens – {openJob.name}</div>
                )}
                {closeJob && (
                  <div style={{ fontSize: 12, color: "#991b1b" }}>closes – {closeJob.name}</div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

/* -------- tiny styles -------- */
const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(7, 1fr)",
};

const btn = {
  padding: "8px 16px",
  borderRadius: 6,
  border: "1px solid #d1d5db",
  background: "#f3f4f6",
  fontWeight: 600,
  cursor: "pointer",
};

import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage        from "./pages/HomePage.jsx";
import JobsPage        from "./pages/JobsPage.jsx";
import InternshipsPage from "./pages/InternshipsPage.jsx";
import CalendarPage    from "./pages/CalendarPage.jsx";  
import AtlassianPage   from "./pages/AtlassianPage.jsx"; 
import AcademyPractice from "./pages/AcademyPractice.jsx";

function Placeholder() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <h2 className="text-3xl font-semibold">Job detail coming soon 🙂</h2>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"            element={<HomePage />} />
        <Route path="/internships" element={<InternshipsPage />} />
        <Route path="/calendar"    element={<CalendarPage />} />  {/* ← NEW */}
        <Route path="/companies/atlassian"    element={<AtlassianPage />} /> {/* profile */}
        <Route path="/jobs"        element={<JobsPage />} />
        <Route path="/jobs/:id"    element={<Placeholder />} />
        <Route path="/academy" element={<AcademyPractice />} />

      </Routes>
    </BrowserRouter>
  );
}

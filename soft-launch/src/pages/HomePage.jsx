import { motion } from "framer-motion";

/**
 * Responsive inline styles – scale nicely from phone to projector.
 */
const styles = {
  /** pills in navbar */
  navLink: {
    marginLeft: "clamp(0.5rem, 1vw, 1.25rem)",
    padding: "0.5rem clamp(0.9rem, 1.3vw, 1.5rem)",
    background: "#e5e7eb",
    borderRadius: "0.5rem",
    color: "#111827",
    textDecoration: "none",
    fontSize: "clamp(0.9rem, 1vw, 1.2rem)",
    fontWeight: 600,
    whiteSpace: "nowrap",
  },
  /** sticky top bar */
  navBar: {
    position: "sticky",
    top: 0,
    zIndex: 30,
    width: "100%",
    padding: "0.75rem clamp(1rem, 2vw, 2.5rem)",
    background: "rgba(255,255,255,0.8)",
    backdropFilter: "blur(6px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
  },
};

export default function HomePage() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* ---------------- NAVBAR ---------------- */}
      <header style={styles.navBar}>
        {/* brand */}
        <a
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            fontWeight: 800,
            fontSize: "clamp(1.25rem, 2vw, 2rem)",
            color: "#111827",
            textDecoration: "none",
            whiteSpace: "nowrap",
          }}
        >
          <img
            src="/logo-cap.png"
            alt="SoftLaunch logo"
            style={{ height: "clamp(30px, 3vw, 90px)", width: "auto", objectFit: "contain" }}
          />
          SoftLaunch
        </a>

        {/* nav links */}
        <nav style={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}>
          <a href="/internships" style={styles.navLink}>Internships</a>
          <a href="/academy" style={styles.navLink}>Academy</a>
          <a href="/calendar" style={styles.navLink}>Calendar</a>
          <a href="/signup" style={styles.navLink}>Sign Up</a>
          <a href="/login" style={styles.navLink}>Log In</a>
        </nav>
      </header>

      {/* ---------------- HERO ---------------- */}
      
      <main
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          width: "100%",
          maxWidth: "100%",
          padding: 0,
        }}
      >
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            fontSize: "clamp(3rem, 8vw, 8rem)",
            fontWeight: 800,
            lineHeight: 1.1,
            margin: "0 1rem",
            width: "100%",
          }}
        >
          SoftLaunch your career
        </motion.h1>
        <p
          style={{
            marginTop: "2rem",
            fontSize: "clamp(1.25rem, 1.6vw, 1.8rem)",
            width: "100%",
            maxWidth: 1100,
            color: "#4b5563",
            padding: "0 1rem",
          }}
        >
          Tools, guidance and practice to land your dream internship—everything in
          one place.
        </p>
        <div
          style={{
            marginTop: "3rem",
            display: "flex",
            gap: "1.5rem",
            flexWrap: "wrap",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <a
            href="/internships"
            style={{
              padding: "1rem 2.4rem",
              borderRadius: "0.5rem",
              background: "#10b981",
              color: "white",
              fontWeight: 600,
              textDecoration: "none",
              fontSize: "clamp(1.1rem, 1.2vw, 1.4rem)",
              minWidth: 200,
              textAlign: "center",
            }}
          >
            Explore Internships
          </a>
          <a
            href="/academy"
            style={{
              padding: "1rem 2.4rem",
              borderRadius: "0.5rem",
              border: "3px solid #d1d5db",
              fontWeight: 600,
              color: "#111827",
              textDecoration: "none",
              fontSize: "clamp(1.1rem, 1.2vw, 1.4rem)",
              background: "white",
              minWidth: 200,
              textAlign: "center",
            }}
          >
            Visit Academy
          </a>
        </div>
      </main>
    </div>
  );
}

export default function NavBar() {
  const navLink = {
    marginLeft: "clamp(0.5rem, 1vw, 1.25rem)",
    padding: "0.55rem 1.25rem",
    background: "#e5e7eb",
    borderRadius: "0.5rem",
    color: "#111827",
    textDecoration: "none",
    fontSize: "clamp(0.9rem, 1vw, 1.1rem)",
    fontWeight: 600,
    whiteSpace: "nowrap",
  };

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        width: "100%",
        zIndex: 40,
        backdropFilter: "blur(6px)",
        background: "rgba(255,255,255,.85)",
        boxShadow: "0 1px 4px rgba(0,0,0,.08)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0.75rem clamp(1rem, 2vw, 2.5rem)",
      }}
    >
      {/* brand */}
      <a
        href="/"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          fontWeight: 800,
          fontSize: "clamp(1.25rem, 2vw, 1.75rem)",
          color: "#111827",
          textDecoration: "none",
        }}
      >
        <img
          src="/logo-cap.png"
          alt="SoftLaunch"
          style={{
            height: "clamp(30px, 3vw, 36px)",
            width: "auto",
            objectFit: "contain",
          }}
        />
        SoftLaunch
      </a>

      {/* links */}
      <nav style={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}>
        <a href="/internships" style={navLink}>
          Internships
        </a>
        <a href="/academy" style={navLink}>
          Academy
        </a>
        <a href="/calendar" style={navLink}>
          Calendar
        </a>
        <a href="/signup" style={navLink}>
          Sign Up
        </a>
        <a href="/login" style={navLink}>
          Log In
        </a>
      </nav>
    </header>
  );
}

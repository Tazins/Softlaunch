export default function CompanyCard({ company }) {
  return (
    <a
      href={company.url}
      style={{
        display: "block",
        borderRadius: 12,
        overflow: "hidden",
        boxShadow: "0 1px 4px rgba(0,0,0,.12)",
        textDecoration: "none",
        color: "#ffffff",
        transition: "transform .2s",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-4px)')}
      onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
    >
      <div
        style={{
          height: 140,
          background: '#f3f4f6',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <img
          src={company.logo}
          alt=""
          style={{ maxHeight: 80, maxWidth: '70%', objectFit: 'contain' }}
        />
      </div>

      <div style={{ padding: 16 }}>
        <h3
          style={{
            margin: 0,
            fontSize: 18,
            fontWeight: 700,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            color: '#ffffff',
          }}
        >
          {company.name}
        </h3>
        <p style={{ margin: 0, fontSize: 14, color: '#d1d5db' }}>
          {company.industry}
        </p>
      </div>
    </a>
  );
}

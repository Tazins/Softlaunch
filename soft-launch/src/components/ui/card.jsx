// src/components/ui/Card.jsx
export function Card({ children, className = '' }) {
  return (
    <div className={`bg-white rounded-2xl shadow-sm ring-1 ring-gray-200 ${className}`}>
      {children}
    </div>
  );
}

export function CardContent({ children, className = '' }) {
  return <div className={`p-6 ${className}`}>{children}</div>;
}

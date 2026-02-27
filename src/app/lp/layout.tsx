// src/app/lp/layout.tsx

export default function LpLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* LP-specific legacy CSS */}
      <link rel="stylesheet" href="/css/lp.css" />

      {children}
    </>
  );
}

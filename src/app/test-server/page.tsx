// src/app/test-server/page.tsx

export const metadata = {
  title: "Server Test - GAMESBEAT",
};

export default function TestServerPage() {
  return (
    <main style={{ padding: 24 }}>
      <h1>Server is Working!</h1>
      <p>If you can see this, the server is running correctly.</p>
      <p>
        <a href="/">Go to Main Site</a>
      </p>
    </main>
  );
}

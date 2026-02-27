//src/components/LanguageSwitcher.tsx
"use client";

import { LABELS, SUPPORTED_LOCALES, type Locale } from "@/i18n/dict";

function buildHostForLocale(currentHost: string, targetLocale: Locale) {
  // Examples:
  // - localhost:3000 -> fr.localhost:3000
  // - fr.localhost:3000 -> localhost:3000 (for en)
  // - gamesbeat.top -> fr.gamesbeat.top
  // - fr.gamesbeat.top -> gamesbeat.top (for en)

  const [hostOnly, port] = currentHost.split(":");
  const parts = hostOnly.split(".");

  // Handle localhost / *.localhost
  const isLocalhost = hostOnly === "localhost" || parts[parts.length - 1] === "localhost";
  if (isLocalhost) {
    const base = "localhost";
    const nextHostOnly = targetLocale === "en" ? base : `${targetLocale}.${base}`;
    return port ? `${nextHostOnly}:${port}` : nextHostOnly;
  }

  // General domains: remove known locale subdomain if present
  const first = parts[0];
  const hasLocaleSub = SUPPORTED_LOCALES.includes(first as Locale) && first !== "en";
  const baseParts = hasLocaleSub ? parts.slice(1) : parts; // gamesbeat.top etc.

  const nextHostOnly =
    targetLocale === "en" ? baseParts.join(".") : `${targetLocale}.${baseParts.join(".")}`;

  return port ? `${nextHostOnly}:${port}` : nextHostOnly;
}

export default function LanguageSwitcher({ locale }: { locale: Locale }) {
  function onChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const nextLocale = e.target.value as Locale;

    const { protocol, host, pathname, search, hash } = window.location;
    const nextHost = buildHostForLocale(host, nextLocale);

    // Preserve the exact path/query/hash
    window.location.href = `${protocol}//${nextHost}${pathname}${search}${hash}`;
  }

  return (
    <select
      value={locale}
      onChange={onChange}
      aria-label="Change language"
      style={{
        borderRadius: 999,
        padding: "8px 10px",
        border: "1px solid rgba(255,255,255,.35)",
        background: "rgba(0,0,0,.20)",
        color: "white",
      }}
    >
      {SUPPORTED_LOCALES.map((l) => (
        <option key={l} value={l}>
          {LABELS[l].flag} {LABELS[l].name}
        </option>
      ))}
    </select>
  );
}

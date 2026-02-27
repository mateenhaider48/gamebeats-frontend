// src/lib/localeUrl.ts
import type { Locale } from "@/i18n/dict";
import { SUPPORTED_LOCALES } from "@/i18n/dict";

export function buildHostForLocale(currentHost: string, targetLocale: Locale) {
  const [hostOnly, port] = currentHost.split(":");
  const parts = hostOnly.split(".");

  const isLocalhost =
    hostOnly === "localhost" || parts[parts.length - 1] === "localhost";

  if (isLocalhost) {
    const base = "localhost";
    const nextHostOnly = targetLocale === "en" ? base : `${targetLocale}.${base}`;
    return port ? `${nextHostOnly}:${port}` : nextHostOnly;
  }

  const first = parts[0] as Locale;
  const hasLocaleSub = SUPPORTED_LOCALES.includes(first) && first !== "en";
  const baseParts = hasLocaleSub ? parts.slice(1) : parts;

  const nextHostOnly =
    targetLocale === "en"
      ? baseParts.join(".")
      : `${targetLocale}.${baseParts.join(".")}`;

  return port ? `${nextHostOnly}:${port}` : nextHostOnly;
}

export function withLocaleHref(href: string, locale: Locale) {
  // external/schemes: keep untouched
  if (/^https?:\/\//i.test(href)) return href;
  if (href.startsWith("mailto:") || href.startsWith("tel:")) return href;
  if (href.startsWith("//")) return href;
  if (href.startsWith("#")) return href;

  const { protocol, host } = window.location;
  const nextHost = buildHostForLocale(host, locale);
  const path = href.startsWith("/") ? href : `/${href}`;
  return `${protocol}//${nextHost}${path}`;
}

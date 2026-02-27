"use client";

import type { Locale } from "@/i18n/dict";

const SUPPORTED = ["en", "fr", "pl", "ro", "bd"] as const;

function buildHostForLocale(currentHost: string, targetLocale: Locale) {
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
  const hasLocaleSub = (SUPPORTED as readonly string[]).includes(first) && first !== "en";
  const baseParts = hasLocaleSub ? parts.slice(1) : parts;

  const nextHostOnly =
    targetLocale === "en"
      ? baseParts.join(".")
      : `${targetLocale}.${baseParts.join(".")}`;

  return port ? `${nextHostOnly}:${port}` : nextHostOnly;
}

function withLocaleHref(href: string, locale: Locale) {
  // keep external links untouched
  if (/^https?:\/\//i.test(href)) return href;
  if (href.startsWith("mailto:") || href.startsWith("tel:")) return href;

  // if already absolute, keep it
  if (href.startsWith("//")) return href;

  // build absolute URL on current host but with locale subdomain
  const { protocol, host } = window.location;
  const nextHost = buildHostForLocale(host, locale);
  const path = href.startsWith("/") ? href : `/${href}`;
  return `${protocol}//${nextHost}${path}`;
}

export default function SmartLink({
  href,
  locale,
  children,
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  locale: Locale;
}) {
  const finalHref = typeof window === "undefined" ? href : withLocaleHref(href, locale);

  return (
    <a href={finalHref} {...props}>
      {children}
    </a>
  );
}

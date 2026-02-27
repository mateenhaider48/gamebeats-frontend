// middleware.ts
import { NextRequest, NextResponse } from "next/server";

const SUPPORTED = ["en", "fr", "pl", "ro", "bd"] as const;
type Locale = (typeof SUPPORTED)[number];

const LOCALE_BY_SUBDOMAIN: Record<string, Locale> = {
  fr: "fr",
  pl: "pl",
  ro: "ro",
  bd: "bd",
};

function detectLocaleFromHost(hostHeader: string | null): Locale {
  if (!hostHeader) return "en";

  // remove port
  const hostOnly = hostHeader.split(":")[0];
  const parts = hostOnly.split(".");
  const sub = parts[0]?.toLowerCase() || "";

  const isLocalhost =
    hostOnly === "localhost" || parts[parts.length - 1] === "localhost";

  // localhost or *.localhost
  if (isLocalhost) {
    return LOCALE_BY_SUBDOMAIN[sub] ?? "en";
  }

  // production domains
  return LOCALE_BY_SUBDOMAIN[sub] ?? "en";
}

export function middleware(req: NextRequest) {
  const host = req.headers.get("host");
  const locale = detectLocaleFromHost(host);

  const res = NextResponse.next();

  // ✅ keep cookie synced with subdomain
  res.cookies.set("gb_locale", locale, {
    path: "/",
    sameSite: "lax",
  });

  // ✅ optional header (do NOT rely on this in Next 15 unless you await headers())
  res.headers.set("x-gb-locale", locale);

  return res;
}

export const config = {
  matcher: ["/((?!_next|favicon.ico|robots.txt|sitemap.xml|images|css|js).*)"],
};

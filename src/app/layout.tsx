// src/app/layout.tsx
import LegacyScripts from "@/components/LegacyScripts";
import type { Metadata } from "next";
import { cookies, headers } from "next/headers";
import "./globals.css";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

const SUPPORTED_LOCALES = ["en", "fr", "pl", "ro", "bd"] as const;
type Locale = (typeof SUPPORTED_LOCALES)[number];

function isLocale(v: string | null | undefined): v is Locale {
  return !!v && (SUPPORTED_LOCALES as readonly string[]).includes(v);
}

async function getLocale(): Promise<Locale> {
  // ✅ 1) Prefer middleware header (most reliable)
  const h = await headers();
  const headerLocale = h.get("x-gb-locale");
  if (isLocale(headerLocale)) return headerLocale;

  // ✅ 2) Fallback to cookie
  const jar = await cookies();
  const cookieLocale = jar.get("gb_locale")?.value;
  if (isLocale(cookieLocale)) return cookieLocale;

  return "en";
}

export const metadata: Metadata = {
  title: "GAMESBEAT",
  icons: { icon: "/favicon.ico" },
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
  ),
  openGraph: {
    images: ["/images/og-image.png"],
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();

  return (
    <html lang={locale} data-locale={locale} suppressHydrationWarning>
      <head>
        <link rel="stylesheet" href="/css/bootstrap.min.css" />
        <link rel="stylesheet" href="/css/style.css?v=3.6" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bangers&family=Poppins:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>

      <body suppressHydrationWarning>
        {children}
        {/* ✅ load legacy scripts ONCE for all pages */}
        <LegacyScripts />
      </body>
    </html>
  );
}

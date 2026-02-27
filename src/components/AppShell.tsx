// src/components/AppShell.tsx

import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { SUPPORTED_LOCALES, type Locale } from "@/i18n/dict";
import { cookies } from "next/headers";

async function getLocaleFromCookie(): Promise<Locale> {
  const jar = await cookies();
  const v = jar.get("gb_locale")?.value;

  if (v && (SUPPORTED_LOCALES as readonly string[]).includes(v)) {
    return v as Locale;
  }

  return "en";
}

export default async function AppShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocaleFromCookie();

  return (
    <>
      <SiteHeader locale={locale} />
      {children}
      <SiteFooter locale={locale} />
    </>
  );
}

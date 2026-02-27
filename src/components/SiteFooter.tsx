// src/components/SiteFooter.tsx
"use client";

import { getDict, SUPPORTED_LOCALES, type Locale } from "@/i18n/dict";

// same host builder logic as header
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
  const hasLocaleSub = SUPPORTED_LOCALES.includes(first) && first !== "en";
  const baseParts = hasLocaleSub ? parts.slice(1) : parts;

  const nextHostOnly =
    targetLocale === "en"
      ? baseParts.join(".")
      : `${targetLocale}.${baseParts.join(".")}`;

  return port ? `${nextHostOnly}:${port}` : nextHostOnly;
}

function withLocaleHref(href: string, locale: Locale) {
  // keep external & special links untouched
  if (/^https?:\/\//i.test(href)) return href;
  if (href.startsWith("mailto:") || href.startsWith("tel:")) return href;
  if (href.startsWith("//")) return href;
  if (href.startsWith("#")) return href;

  const { protocol, host } = window.location;
  const nextHost = buildHostForLocale(host, locale);
  const path = href.startsWith("/") ? href : `/${href}`;
  return `${protocol}//${nextHost}${path}`;
}

export default function SiteFooter({ locale = "en" }: { locale?: Locale }) {
  const safeLocale: Locale = (SUPPORTED_LOCALES as readonly string[]).includes(locale)
    ? (locale as Locale)
    : "en";

  const t = getDict(safeLocale);

  const H = (href: string) =>
    typeof window === "undefined" ? href : withLocaleHref(href, safeLocale);

  return (
    <>
      <footer className="container-fluid text-white content pt-3 pb-3">
        <div className="container">
          <div className="row">
            <div className="col-md-6 order-md-2">
              <img src="/images/logo-footer.png" alt="Gamesbeat" />
            </div>

            <div className="col-md-3 order-md-1">
              <ul>
                <li>
                  <a href={H("/category/adventures")} data-i18n="footer.adventures">
                    {t.footer.adventures}
                  </a>
                </li>
                <li>
                  <a href={H("/category/arcade")} data-i18n="footer.arcade">
                    {t.footer.arcade}
                  </a>
                </li>
                <li>
                  <a href={H("/category/strategy")} data-i18n="footer.strategy">
                    {t.footer.strategy}
                  </a>
                </li>
                <li>
                  <a href={H("/category/braintraining")} data-i18n="footer.braintraining">
                    {t.footer.braintraining}
                  </a>
                </li>
                <li>
                  <a href={H("/category/sports")} data-i18n="footer.sports">
                    {t.footer.sports}
                  </a>
                </li>
              </ul>
            </div>

            <div className="col-md-3 order-md-1">{/* keep empty like legacy */}</div>
          </div>
        </div>
      </footer>

      <div className="container">
        <div className="row">
          <p className="mb-0 text-center" data-i18n="footer.copyright">
            {t.footer.copyright}
          </p>

          <a
            href={H("/tyc")}
            className="text-center"
            style={{ color: "#666" }}
            data-i18n="footer.terms"
          >
            {t.footer.terms}
          </a>
        </div>
      </div>
    </>
  );
}

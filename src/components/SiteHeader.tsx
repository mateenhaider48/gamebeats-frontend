// src/components/SiteHeader.tsx
"use client";

import {
  LABELS,
  SUPPORTED_LOCALES,
  getDict,
  isLocale,
  type Locale,
} from "@/i18n/dict";

// Builds new host for locale and keeps path/query/hash.
// Works for:
// - localhost:3000 <-> fr.localhost:3000
// - gamesbeat.top <-> fr.gamesbeat.top
function buildHostForLocale(currentHost: string, targetLocale: Locale) {
  const [hostOnly, port] = currentHost.split(":");
  const parts = hostOnly.split(".");

  const isLocalhost =
    hostOnly === "localhost" || parts[parts.length - 1] === "localhost";

  if (isLocalhost) {
    const base = "localhost";
    const nextHostOnly =
      targetLocale === "en" ? base : `${targetLocale}.${base}`;
    return port ? `${nextHostOnly}:${port}` : nextHostOnly;
  }

  const first = parts[0] as Locale;
  const hasLocaleSub =
    (SUPPORTED_LOCALES as readonly string[]).includes(first) && first !== "en";
  const baseParts = hasLocaleSub ? parts.slice(1) : parts;

  const nextHostOnly =
    targetLocale === "en"
      ? baseParts.join(".")
      : `${targetLocale}.${baseParts.join(".")}`;

  return port ? `${nextHostOnly}:${port}` : nextHostOnly;
}

function switchLocale(nextLocale: Locale) {
  const { protocol, host, pathname, search, hash } = window.location;
  const nextHost = buildHostForLocale(host, nextLocale);
  window.location.href = `${protocol}//${nextHost}${pathname}${search}${hash}`;
}

export default function SiteHeader({ locale = "en" }: { locale?: Locale }) {
  const safeLocale: Locale = isLocale(locale) ? locale : "en";

  const t = getDict(safeLocale);
  const active = LABELS[safeLocale];

  const LanguageMenu = ({ mobile }: { mobile: boolean }) => (
    <div
      className={
        mobile
          ? "language-selector-mobile d-inline-block d-xl-none ml-2"
          : "language-selector d-none d-xl-inline-block mt-0 mb-0"
      }
    >
      <div className="dropdown">
        <button
          className={
            mobile
              ? "btn language-btn-mobile dropdown-toggle"
              : "btn language-btn dropdown-toggle"
          }
          type="button"
          id={mobile ? "languageDropdownMobile" : "languageDropdown"}
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
          data-lang-name={active.name}
        >
          <span
            className="language-flag"
            id={mobile ? "currentFlagMobile" : "currentFlag"}
          >
            {active.flag}
          </span>
        </button>

        <div
          className="dropdown-menu dropdown-menu-right language-dropdown"
          aria-labelledby={
            mobile ? "languageDropdownMobile" : "languageDropdown"
          }
        >
          {SUPPORTED_LOCALES.map((l) => {
            const isActive = l === safeLocale;
            return (
              <button
                key={l}
                type="button"
                className={`dropdown-item language-option${isActive ? " active" : ""}`}
                onClick={() => switchLocale(l)}
                data-lang={l === "bd" ? "bn" : l} // legacy mapping
                data-flag={LABELS[l].flag}
                style={{ cursor: "pointer" }}
              >
                <span className="language-flag">{LABELS[l].flag}</span>
                <span className="language-name" style={{ marginLeft: 8 }}>
                  {LABELS[l].name}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );

  return (
    <header className="sticky-top header-white">
      <div className="container">
        <nav
          id="navbar"
          className="navbar navbar-expand-xl navbar-dark pt-xl-3 pb-xl-3 pt-2 pb-2 mt-xl-3 mb-xl-3"
        >
          {/* ✅ Relative links keep the current host (pl., ro., bd., etc.) */}
          <a href="/" className="logo">
            <img
              src="/images/logo-header.png"
              width="120"
              className="img-fluid"
              alt="Gamesbeat"
            />
          </a>

          {/* Mobile Language Selector */}
          <LanguageMenu mobile />

          {/* Mobile My Account */}
          <a
            href="/login"
            className="mobile-myaccount btn btn-rounded btn-outline-light ml-auto mr-lg-0 d-inline-block d-xl-none"
          >
            <span className="icon-account mr-xl-2" aria-hidden="true" />
          </a>

          <button
            className="navbar-toggler ml-3"
            type="button"
            data-toggle="collapse"
            data-target="#principal"
            aria-controls="principal"
            aria-expanded="false"
            aria-label="toggle navigation"
            id="menu-principal"
          >
            <span className="navbar-toggler-icon" />
            <span className="navbar-toggler-icon" />
            <span className="navbar-toggler-icon" />
          </button>

          <div
            className="navbar-collapse collapse ml-lg-auto mt-5"
            id="principal"
          >
            <ul className="navbar-nav ml-auto mt-lg-0 mt-3 mb-3 mb-lg-0 flex-lg-row justify-content-lg-center">
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="/category/adventures"
                  data-i18n="nav.adventures"
                >
                  <img
                    src="/images/category-icons/adventures-icon.svg"
                    height="25"
                    className="mb-0 icon"
                    alt=""
                  />{" "}
                  {t.nav.adventures}
                </a>
              </li>

              <li className="nav-item">
                <a
                  className="nav-link"
                  href="/category/arcade"
                  data-i18n="nav.arcade"
                >
                  <img
                    src="/images/category-icons/arcade-icon.svg"
                    height="25"
                    className="mb-0 icon"
                    alt=""
                  />{" "}
                  {t.nav.arcade}
                </a>
              </li>

              <li className="nav-item">
                <a
                  className="nav-link"
                  href="/category/strategy"
                  data-i18n="nav.strategy"
                >
                  <img
                    src="/images/category-icons/strategy-icon.svg"
                    height="25"
                    className="mb-0 icon"
                    alt=""
                  />{" "}
                  {t.nav.strategy}
                </a>
              </li>

              <li className="nav-item">
                <a
                  className="nav-link"
                  href="/category/braintraining"
                  data-i18n="nav.braintraining"
                >
                  <img
                    src="/images/category-icons/brainstraining-icon.svg"
                    height="25"
                    className="mb-0 icon"
                    alt=""
                  />{" "}
                  {t.nav.braintraining}
                </a>
              </li>

              <li className="nav-item">
                <a
                  className="nav-link"
                  href="/category/sports"
                  data-i18n="nav.sports"
                >
                  <img
                    src="/images/category-icons/sports-icon.svg"
                    height="25"
                    className="mb-0 icon"
                    alt=""
                  />{" "}
                  {t.nav.sports}
                </a>
              </li>
            </ul>
          </div>

          {/* Desktop My Account */}
          <a
            href="/login"
            className="desktop-myaccount btn btn-rounded ml-lg-3 mr-lg-0 ml-auto d-none d-xl-inline-block mt-0"
          >
            <span className="icon-account mr-xl-2" aria-hidden="true" />
            <span className="mr-xl-2" data-i18n="nav.my_account">
              {t.myAccount}
            </span>
          </a>

          {/* Desktop Language Selector */}
          <LanguageMenu mobile={false} />
        </nav>
      </div>
    </header>
  );
}
// src/app/tyc/page.tsx
import LegacyScripts from "@/components/LegacyScripts";

export default function TermsPage() {
  return (
    <>
      <div>
        <header className="sticky-top header-white">
          <div className="container">
            <nav
              id="navbar"
              className="navbar navbar-expand-xl navbar-dark pt-xl-3 pb-xl-3 pt-2 pb-2 mt-xl-3 mb-xl-3"
            >
              <a href="/" className="logo">
                <img
                  src="/images/logo-header.png"
                  width="120"
                  className="img-fluid"
                  alt="Gamesbeat"
                />
              </a>

              {/* Mobile Language Selector */}
              <div className="language-selector-mobile d-inline-block d-xl-none ml-2">
                <div className="dropdown">
                  <button
                    className="btn language-btn-mobile dropdown-toggle"
                    type="button"
                    id="languageDropdownMobile"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                    data-lang-name="English"
                  >
                    <span className="language-flag" id="currentFlagMobile">
                      🇬🇧
                    </span>
                  </button>

                  <div
                    className="dropdown-menu dropdown-menu-right language-dropdown"
                    aria-labelledby="languageDropdownMobile"
                  >
                    <a
                      className="dropdown-item language-option active"
                      href="/"
                      data-lang="en"
                      data-flag="🇬🇧"
                    >
                      <span className="language-flag">🇬🇧</span>
                      <span className="language-name">English</span>
                    </a>
                    <a
                      className="dropdown-item language-option"
                      href="/fr.gamesbeat.top/"
                      data-lang="fr"
                      data-flag="🇫🇷"
                    >
                      <span className="language-flag">🇫🇷</span>
                      <span className="language-name">Français</span>
                    </a>
                    <a
                      className="dropdown-item language-option"
                      href="/pl.gamesbeat.top/"
                      data-lang="pl"
                      data-flag="🇵🇱"
                    >
                      <span className="language-flag">🇵🇱</span>
                      <span className="language-name">Polski</span>
                    </a>
                    <a
                      className="dropdown-item language-option"
                      href="/ro.gamesbeat.top/"
                      data-lang="ro"
                      data-flag="🇷🇴"
                    >
                      <span className="language-flag">🇷🇴</span>
                      <span className="language-name">Română</span>
                    </a>
                    <a
                      className="dropdown-item language-option"
                      href="/bd.gamesbeat.top/"
                      data-lang="bn"
                      data-flag="🇧🇩"
                    >
                      <span className="language-flag">🇧🇩</span>
                      <span className="language-name">বাংলা</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* legacy points to login.html; project uses account-redirect.php elsewhere */}
              <a
                href="/account-redirect.php"
                className="mobile-myaccount btn btn-rounded btn-outline-light ml-auto mr-lg-0 ml-auto d-inline-block d-xl-none"
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
                aria-label="cerrar navegación"
                id="menu-principal"
              >
                <span className="navbar-toggler-icon" />
                <span className="navbar-toggler-icon" />
                <span className="navbar-toggler-icon" />
              </button>

              <div className="navbar-collapse collapse ml-lg-auto" id="principal">
                <ul className="navbar-nav ml-auto mt-lg-0 mt-3 mb-3 mb-lg-0 flex-lg-row justify-content-lg-center">
                  <li className="nav-item">
                    <a className="nav-link" href="/adventures">
                      <img
                        src="/images/category-icons/adventures-icon.svg"
                        height="25"
                        className="mb-0 icon"
                        alt=""
                      />{" "}
                      Adventures
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/arcade">
                      <img
                        src="/images/category-icons/arcade-icon.svg"
                        height="25"
                        className="mb-0 icon"
                        alt=""
                      />{" "}
                      Arcade
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/braintraining">
                      <img
                        src="/images/category-icons/brainstraining-icon.svg"
                        height="25"
                        className="mb-0 icon"
                        alt=""
                      />{" "}
                      Braintraining
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/sports">
                      <img
                        src="/images/category-icons/sports-icon.svg"
                        height="25"
                        className="mb-0 icon"
                        alt=""
                      />{" "}
                      Sports
                    </a>
                  </li>
                </ul>
              </div>

              <a
                href="/account-redirect.php"
                className="desktop-myaccount btn btn-rounded ml-lg-3 mr-lg-0 ml-auto d-none d-xl-inline-block"
              >
                <span className="icon-account mr-xl-2" aria-hidden="true" />
                <span className="mr-xl-2">My account</span>
              </a>

              {/* Desktop Language Selector */}
              <div className="language-selector d-none d-xl-inline-block">
                <div className="dropdown">
                  <button
                    className="btn language-btn dropdown-toggle"
                    type="button"
                    id="languageDropdown"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                    data-lang-name="English"
                  >
                    <span className="language-flag" id="currentFlag">
                      🇬🇧
                    </span>
                  </button>

                  <div
                    className="dropdown-menu dropdown-menu-right language-dropdown"
                    aria-labelledby="languageDropdown"
                  >
                    <a
                      className="dropdown-item language-option active"
                      href="/"
                      data-lang="en"
                      data-flag="🇬🇧"
                    >
                      <span className="language-flag">🇬🇧</span>
                      <span className="language-name">English</span>
                    </a>
                    <a
                      className="dropdown-item language-option"
                      href="/fr.gamesbeat.top/"
                      data-lang="fr"
                      data-flag="🇫🇷"
                    >
                      <span className="language-flag">🇫🇷</span>
                      <span className="language-name">Français</span>
                    </a>
                    <a
                      className="dropdown-item language-option"
                      href="/pl.gamesbeat.top/"
                      data-lang="pl"
                      data-flag="🇵🇱"
                    >
                      <span className="language-flag">🇵🇱</span>
                      <span className="language-name">Polski</span>
                    </a>
                    <a
                      className="dropdown-item language-option"
                      href="/ro.gamesbeat.top/"
                      data-lang="ro"
                      data-flag="🇷🇴"
                    >
                      <span className="language-flag">🇷🇴</span>
                      <span className="language-name">Română</span>
                    </a>
                    <a
                      className="dropdown-item language-option"
                      href="/bd.gamesbeat.top/"
                      data-lang="bn"
                      data-flag="🇧🇩"
                    >
                      <span className="language-flag">🇧🇩</span>
                      <span className="language-name">বাংলা</span>
                    </a>
                  </div>
                </div>
              </div>
            </nav>
          </div>
        </header>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-12 pt-lg-5 pt-3">
            <h1 className="h1 green">
              <strong>Terms and Conditions</strong>
            </h1>
          </div>
        </div>

        <div className="row">
          <div className="col-12 pt-lg-5 pt-3">
            <p />
            Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex
            sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus
            duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus
            fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada
            lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti
            sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.

            <p>
              Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus
              ex sapien vitae pellentesque sem placerat. In id cursus mi pretium
              tellus duis convallis. Tempus leo eu aenean sed diam urna tempor.
              Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis
              massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper
              vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra
              inceptos himenaeos.
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus
              ex sapien vitae pellentesque sem placerat. In id cursus mi pretium
              tellus duis convallis. Tempus leo eu aenean sed diam urna tempor.
              Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis
              massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper
              vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra
              inceptos himenaeos.
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus
              ex sapien vitae pellentesque sem placerat. In id cursus mi pretium
              tellus duis convallis. Tempus leo eu aenean sed diam urna tempor.
              Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis
              massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper
              vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra
              inceptos himenaeos.
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus
              ex sapien vitae pellentesque sem placerat. In id cursus mi pretium
              tellus duis convallis. Tempus leo eu aenean sed diam urna tempor.
              Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis
              massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper
              vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra
              inceptos himenaeos.
            </p>
          </div>
        </div>
      </div>

      <footer className="container-fluid text-white content pt-3 pb-3">
        <div className="container">
          <div className="row">
            <div className="col-md-6 order-md-2">
              <img src="/images/logo-footer.png" alt="Gamesbeat" />
            </div>

            <div className="col-md-3 order-md-1">
              <ul>
                <li>
                  <a href="/adventures">ADVENTURES</a>
                </li>
                <li>
                  <a href="/arcade">ARCADE</a>
                </li>
                <li>
                  <a href="/strategy">STRATEGY</a>
                </li>
                <li>
                  <a href="/braintraining">BRAINTRAINING</a>
                </li>
                <li>
                  <a href="/sports">SPORTS</a>
                </li>
              </ul>
            </div>

            <div className="col-md-3 order-md-1" />
          </div>
        </div>
      </footer>

      <div className="container">
        <div className="row">
          <p className="mb-0 text-center">© Copyright 2025 - All Rights Reserved</p>
          <a
            href="/tyc"
            className="text-center"
            style={{ color: "#666" }}
          >
            Terms &amp; Conditions
          </a>
        </div>
      </div>

      <LegacyScripts />
    </>
  );
}

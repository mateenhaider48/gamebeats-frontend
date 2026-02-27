// src/app/page.tsx
import AppShell from "@/components/AppShell";
import { cookies } from "next/headers";

const SUPPORTED_LOCALES = ["en", "fr", "pl", "ro", "bd"] as const;
type Locale = (typeof SUPPORTED_LOCALES)[number];

async function getLocaleFromCookie(): Promise<Locale> {
  const jar = await cookies();
  const v = jar.get("gb_locale")?.value;
  if (v && SUPPORTED_LOCALES.includes(v as Locale)) return v as Locale;
  return "en";
}

const HOME_I18N: Record<
  Locale,
  {
    hero_title: string;
    hero_subtitle: string;
    top_games: string;
    most_played: string;
    new_games: string;
    recommendations: string;
    see_all: string;
    prev: string;
    next: string;
  }
> = {
  en: {
    hero_title: "Play new games",
    hero_subtitle: "Every Week",
    top_games: "TOP GAMES OF THE WEEK",
    most_played: "THE MOST PLAYED",
    new_games: "NEW GAMES",
    recommendations: "RECOMMENDATIONS",
    see_all: "See all",
    prev: "Previous",
    next: "Next",
  },
  fr: {
    hero_title: "Jouez à de nouveaux jeux",
    hero_subtitle: "Chaque semaine",
    top_games: "LES MEILLEURS JEUX DE LA SEMAINE",
    most_played: "LES PLUS JOUÉS",
    new_games: "NOUVEAUX JEUX",
    recommendations: "RECOMMANDATIONS",
    see_all: "Voir tout",
    prev: "Précédent",
    next: "Suivant",
  },
  pl: {
    hero_title: "Graj w nowe gry",
    hero_subtitle: "Co tydzień",
    top_games: "TOP GRY TYGODNIA",
    most_played: "NAJCZĘŚCIEJ GRANE",
    new_games: "NOWE GRY",
    recommendations: "POLECANE",
    see_all: "Zobacz wszystkie",
    prev: "Poprzedni",
    next: "Następny",
  },
  ro: {
    hero_title: "Joacă jocuri noi",
    hero_subtitle: "În fiecare săptămână",
    top_games: "CELE MAI BUNE JOCURI ALE SĂPTĂMÂNII",
    most_played: "CELE MAI JUCATE",
    new_games: "JOCURI NOI",
    recommendations: "RECOMANDĂRI",
    see_all: "Vezi toate",
    prev: "Anterior",
    next: "Următor",
  },
  bd: {
    hero_title: "নতুন গেম খেলুন",
    hero_subtitle: "প্রতি সপ্তাহে",
    top_games: "সপ্তাহের সেরা গেম",
    most_played: "সবচেয়ে বেশি খেলা",
    new_games: "নতুন গেম",
    recommendations: "সুপারিশ",
    see_all: "সব দেখুন",
    prev: "আগেরটি",
    next: "পরেরটি",
  },
};

export default async function HomePage() {
  const locale = await getLocaleFromCookie();
  const t = HOME_I18N[locale];

  return (
    <AppShell>
      <div className="top-page">
        {/* Carousel */}
        <div
          id="carousel-home"
          className="carousel slide"
          data-ride="carousel"
          data-interval="5000"
        >
          <ol className="carousel-indicators">
            <li data-target="#carousel-home" data-slide-to="0" className="active" />
            <li data-target="#carousel-home" data-slide-to="1" />
            <li data-target="#carousel-home" data-slide-to="2" />
            <li data-target="#carousel-home" data-slide-to="3" />
          </ol>

          <div className="carousel-inner">
            <div className="carousel-item active">
              <a
                href="https://play.forestrygames.com/star-wars-rebels-special-ops"
                target="_blank"
                rel="noreferrer"
                data-game-link="true"
              >
                <img
                  className="d-none d-lg-block w-100"
                  src="https://gamesbeat.top/Games/Marketing-Images/Screenshot/star-wars-rebels-special-ops.png"
                  alt="Game Title"
                />
                <img
                  className="d-block d-lg-none w-100"
                  src="https://gamesbeat.top/Games/Marketing-Images/Screenshot/star-wars-rebels-special-ops.png"
                  alt="Game Title"
                />
              </a>
            </div>

            <div className="carousel-item">
              <a
                href="https://gameddiction-demo.ilfis.io/games/kingdom-wars/html/index.html"
                target="_blank"
                rel="noreferrer"
                data-game-link="true"
              >
                <img
                  className="d-none d-lg-block w-100"
                  src="/images/slides/slide2.jpg"
                  alt="Game Title"
                />
                <img
                  className="d-block d-lg-none w-100"
                  src="/images/slides/slide2-mobile.jpg"
                  alt="Game Title"
                />
              </a>
            </div>

            <div className="carousel-item">
              <div className="text-center carousel-caption">
                <h1 className="white-text" data-i18n="home.hero_title">
                  {t.hero_title}
                </h1>
                <h2 className="white-text" data-i18n="home.hero_subtitle">
                  {t.hero_subtitle}
                </h2>
              </div>
              <img
                className="d-none d-lg-block w-100"
                src="/images/slides/slide-text.jpg"
                alt="Game Title"
              />
              <img
                className="d-block d-lg-none w-100"
                src="/images/slides/slide-text-mobile.jpg"
                alt="Game Title"
              />
            </div>

            <div className="carousel-item">
              <a
                href="https://gameddiction-demo.ilfis.io/games/danger-clifft/html/index.html"
                target="_blank"
                rel="noreferrer"
                data-game-link="true"
              >
                <img
                  className="d-none d-lg-block w-100"
                  src="/images/slides/slide4.jpg"
                  alt="Game Title"
                />
                <img
                  className="d-block d-lg-none w-100"
                  src="/images/slides/slide4-mobile.jpg"
                  alt="Game Title"
                />
              </a>
            </div>
          </div>

          <a
            className="carousel-control-prev"
            href="#carousel-home"
            role="button"
            data-slide="prev"
          >
            <span className="carousel-control-prev-icon" aria-hidden="true" />
            <span className="sr-only">{t.prev}</span>
          </a>

          <a
            className="carousel-control-next"
            href="#carousel-home"
            role="button"
            data-slide="next"
          >
            <span className="carousel-control-next-icon" aria-hidden="true" />
            <span className="sr-only">{t.next}</span>
          </a>
        </div>
      </div>

      {/* TOP GAMES OF THE WEEK */}
      <div className="pills-container">
        <div className="dotted-wave" />

        <div className="container">
          <div className="row">
            <div className="col-lg-11 pt-lg-5 pt-3 mb-lg-4 d-flex align-items-center">
              <div>
                <h3
                  className="h1 title mb-0 d-flex align-items-center white-text"
                  data-i18n="home.top_games"
                >
                  {t.top_games}
                </h3>
              </div>
              <div className="ml-auto">
                <a href="/ranking" className="see-all" data-i18n="common.see_all">
                  {t.see_all}
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="parent pt-4 pb-4 pb-lg-6">
          <a
            href="https://gameddiction-demo.ilfis.io/games/air-race/html/index.html"
            target="_blank"
            rel="noreferrer"
            data-game-link="true"
          >
            <span className="star-badge">
              <span className="icon-star mr-1" />
              4.3
            </span>
            <img src="/images/games/adventures1.jpg" className="img-fluid" alt="Game Title" />
            <div className="name">Air Race</div>
          </a>

          <a
            href="https://gameddiction-demo.ilfis.io/games/creepy-flappy/html/index.html"
            target="_blank"
            rel="noreferrer"
            data-game-link="true"
          >
            <span className="star-badge">
              <span className="icon-star mr-1" />
              4.4
            </span>
            <img src="/images/games/adventures5.jpg" className="img-fluid" alt="Game Title" />
            <div className="name">Creepy Flappy</div>
          </a>

          <a
            href="https://gameddiction-demo.ilfis.io/games/cyberman-v/html/index.html"
            target="_blank"
            rel="noreferrer"
            data-game-link="true"
          >
            <span className="star-badge">
              <span className="icon-star mr-1" />
              4.0
            </span>
            <img src="/images/games/adventures7.jpg" className="img-fluid" alt="Game Title" />
            <div className="name">Cyberman V</div>
          </a>

          <a
            href="https://gameddiction-demo.ilfis.io/games/danger-clifft/html/index.html"
            target="_blank"
            rel="noreferrer"
            data-game-link="true"
          >
            <span className="star-badge">
              <span className="icon-star mr-1" />
              4.4
            </span>
            <img src="/images/games/adventures8.jpg" className="img-fluid" alt="Game Title" />
            <div className="name">Danger Cliff</div>
          </a>

          <a
            href="https://gameddiction-demo.ilfis.io/games/doodle-jump-extra/html/index.html"
            target="_blank"
            rel="noreferrer"
            data-game-link="true"
          >
            <span className="star-badge">
              <span className="icon-star mr-1" />
              4.5
            </span>
            <img src="/images/games/adventures9.jpg" className="img-fluid" alt="Game Title" />
            <div className="name">Doodle Extra Jump</div>
          </a>

          <a
            href="https://gameddiction-demo.ilfis.io/games/nave-x-racer/html/index.html"
            target="_blank"
            rel="noreferrer"
            data-game-link="true"
          >
            <span className="star-badge">
              <span className="icon-star mr-1" />
              4.5
            </span>
            <img
              src="https://gameddiction-demo.ilfis.io/images/thumbs/small/66.jpg"
              className="img-fluid"
              alt="Game Title"
            />
            <div className="name">Nave X Racer</div>
          </a>
        </div>
      </div>

      {/* MOST PLAYED */}
      <div className="bg-arcade">
        <div className="container">
          <div className="row">
            <div className="col-lg-11 pt-lg-5 pt-3 mb-lg-4 d-flex align-items-center">
              <div>
                <h3
                  className="h1 title mb-0 d-flex align-items-center white-text"
                  data-i18n="home.most_played"
                >
                  {t.most_played}
                </h3>
              </div>
              <div className="ml-auto">
                <a href="/ranking" className="see-all" data-i18n="common.see_all">
                  {t.see_all}
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="parent pt-4 pb-4 pb-lg-6">
          <a href="https://play.forestrygames.com/broom-riders" target="_blank" rel="noreferrer" data-game-link="true">
            <span className="star-badge"><span className="icon-star mr-1" />4.4</span>
            <img src="https://gameddiction-demo.ilfis.io/images/miniaturas/Miniaturas_Tom&Jerry-Broom-Riders.jpg" className="img-fluid" alt="Game Title" />
            <div className="name">Tom &amp; Jerry Broom Riders</div>
          </a>

          <a href="https://play.forestrygames.com/battlerungame" target="_blank" rel="noreferrer" data-game-link="true">
            <span className="star-badge"><span className="icon-star mr-1" />4.4</span>
            <img src="https://gameddiction-demo.ilfis.io/images/miniaturas/Miniaturas_BattleRun.jpg" className="img-fluid" alt="Game Title" />
            <div className="name">StarWars Battlerun</div>
          </a>

          <a href="https://play.forestrygames.com/barbie-make-up" target="_blank" rel="noreferrer" data-game-link="true">
            <span className="star-badge"><span className="icon-star mr-1" />4.0</span>
            <img src="https://gameddiction-demo.ilfis.io/images/miniaturas/Miniaturas_Barbie-10.jpg" className="img-fluid" alt="Game Title" />
            <div className="name">Barbie Make Up</div>
          </a>

          <a href="https://play.forestrygames.com/spider-man-mysterio-rush-game" target="_blank" rel="noreferrer" data-game-link="true">
            <span className="star-badge"><span className="icon-star mr-1" />4.4</span>
            <img src="https://gameddiction-demo.ilfis.io/images/miniaturas/Miniaturas_Spiderman.jpg" className="img-fluid" alt="Game Title" />
            <div className="name">Spiderman Mysterio Rush</div>
          </a>

          <a href="https://play.forestrygames.com/star-wars-rebels-special-ops" target="_blank" rel="noreferrer" data-game-link="true">
            <span className="star-badge"><span className="icon-star mr-1" />4.5</span>
            <img src="https://gameddiction-demo.ilfis.io/images/miniaturas/Miniaturas_Star-Wars-Rebels-Special-Ops.jpg" className="img-fluid" alt="Game Title" />
            <div className="name">Star Wars Rebels</div>
          </a>

          <a href="https://play.forestrygames.com/kungfu-pawsome" target="_blank" rel="noreferrer" data-game-link="true">
            <span className="star-badge"><span className="icon-star mr-1" />4.4</span>
            <img src="https://gameddiction-demo.ilfis.io/images/miniaturas/Miniaturas_PawSomePanda.jpg" className="img-fluid" alt="Game Title" />
            <div className="name">Kunfu Panda Paw Some</div>
          </a>
        </div>
      </div>

      {/* NEW GAMES */}
      <div className="bg-strategy">
        <div className="container">
          <div className="row">
            <div className="col-lg-11 pt-lg-5 pt-3 mb-lg-4 d-flex align-items-center">
              <div>
                <h3
                  className="h1 title mb-0 d-flex align-items-center white-text"
                  data-i18n="home.new_games"
                >
                  {t.new_games}
                </h3>
              </div>
              <div className="ml-auto">
                <a href="/ranking" className="see-all" data-i18n="common.see_all">
                  {t.see_all}
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="parent pt-4 pb-4 pb-lg-6">
          <a href="https://production-preview.forestrygames.com/ben-10-escape-route" target="_blank" rel="noreferrer" data-game-link="true">
            <span className="star-badge"><span className="icon-star mr-1" />4.3</span>
            <img src="https://gameddiction-demo.ilfis.io/images/miniaturas/Miniaturas_Ben-10-Escape-Route.jpg" className="img-fluid" alt="Game Title" />
            <div className="name">Ben10 Escape Route</div>
          </a>

          <a href="https://play.forestrygames.com/frozen-rush" target="_blank" rel="noreferrer" data-game-link="true">
            <span className="star-badge"><span className="icon-star mr-1" />4.4</span>
            <img src="https://gameddiction-demo.ilfis.io/images/miniaturas/Miniaturas_Frozen.jpg" className="img-fluid" alt="Game Title" />
            <div className="name">Frozen Rush</div>
          </a>

          <a href="https://play.forestrygames.com/gothamcityspeed" target="_blank" rel="noreferrer" data-game-link="true">
            <span className="star-badge"><span className="icon-star mr-1" />4.0</span>
            <img src="https://gameddiction-demo.ilfis.io/images/miniaturas/Miniaturas_Batman.jpg" className="img-fluid" alt="Game Title" />
            <div className="name">Speed Gotham City</div>
          </a>

          <a href="https://play.forestrygames.com/mr-bean-matching-pairs" target="_blank" rel="noreferrer" data-game-link="true">
            <span className="star-badge"><span className="icon-star mr-1" />4.4</span>
            <img src="https://gameddiction-demo.ilfis.io/images/miniaturas/Miniaturas_Mr-Bean.jpg" className="img-fluid" alt="Game Title" />
            <div className="name">Mr. Bean Matching Pais</div>
          </a>

          <a href="https://play.forestrygames.com/photo_booth" target="_blank" rel="noreferrer" data-game-link="true">
            <span className="star-badge"><span className="icon-star mr-1" />4.5</span>
            <img src="https://gameddiction-demo.ilfis.io/images/miniaturas/Miniaturas_Barbie-38.jpg" className="img-fluid" alt="Game Title" />
            <div className="name">You can be anything</div>
          </a>

          <a href="https://play.forestrygames.com/x-wing-fighter" target="_blank" rel="noreferrer" data-game-link="true">
            <span className="star-badge"><span className="icon-star mr-1" />4.4</span>
            <img src="https://gameddiction-demo.ilfis.io/images/miniaturas/Miniaturas_XWingFighter.jpg" className="img-fluid" alt="Game Title" />
            <div className="name">X-Wing Fighter</div>
          </a>
        </div>
      </div>

      {/* RECOMMENDATIONS */}
      <div className="bg-braintraining">
        <div className="container">
          <div className="row">
            <div className="col-lg-11 pt-lg-5 pt-3 mb-lg-4 d-flex align-items-center">
              <div>
                <h3
                  className="h1 title mb-0 d-flex align-items-center white-text"
                  data-i18n="home.recommendations"
                >
                  {t.recommendations}
                </h3>
              </div>
              <div className="ml-auto">
                <a href="/ranking" className="see-all" data-i18n="common.see_all">
                  {t.see_all}
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="parent pt-4 pb-4 pb-lg-6">
          <a href="https://gameddiction-demo.ilfis.io/games/8-ball-pool/html/index.html" target="_blank" rel="noreferrer" data-game-link="true">
            <span className="star-badge"><span className="icon-star mr-1" />4.3</span>
            <img src="https://gameddiction-demo.ilfis.io/images/thumbs/small/14.jpg" className="img-fluid" alt="8 Ball Pool" />
            <div className="name">8 Ball Pool</div>
          </a>

          <a href="https://gameddiction-demo.ilfis.io/games/cricket-world-cup/html/index.html" target="_blank" rel="noreferrer" data-game-link="true">
            <span className="star-badge"><span className="icon-star mr-1" />4.4</span>
            <img src="https://gameddiction-demo.ilfis.io/images/thumbs/small/61.jpg" className="img-fluid" alt="Cricket World Cup" />
            <div className="name">Cricket World Cup</div>
          </a>

          <a href="https://gameddiction-demo.ilfis.io/games/formula-rush/html/index.html" target="_blank" rel="noreferrer" data-game-link="true">
            <span className="star-badge"><span className="icon-star mr-1" />4.0</span>
            <img src="https://gameddiction-demo.ilfis.io/images/thumbs/small/6.jpg" className="img-fluid" alt="Formula Rush" />
            <div className="name">Formula Rush</div>
          </a>

          <a href="https://gameddiction-demo.ilfis.io/games/kick-the-soccer-ball/html/index.html" target="_blank" rel="noreferrer" data-game-link="true">
            <span className="star-badge"><span className="icon-star mr-1" />4.4</span>
            <img src="https://gameddiction-demo.ilfis.io/images/thumbs/small/13.jpg" className="img-fluid" alt="Kick the soccer ball" />
            <div className="name">Kick the soccer ball</div>
          </a>

          <a href="https://gameddiction-demo.ilfis.io/games/tiny-race/html/index.html" target="_blank" rel="noreferrer" data-game-link="true">
            <span className="star-badge"><span className="icon-star mr-1" />4.5</span>
            <img src="https://gameddiction-demo.ilfis.io/images/thumbs/small/26.jpg" className="img-fluid" alt="Tiny Race" />
            <div className="name">Tiny Race</div>
          </a>

          <a href="https://gameddiction-demo.ilfis.io/games/tourung-cars/html/index.html" target="_blank" rel="noreferrer" data-game-link="true">
            <span className="star-badge"><span className="icon-star mr-1" />4.5</span>
            <img src="https://gameddiction-demo.ilfis.io/images/thumbs/small/27.jpg" className="img-fluid" alt="Tourung Cars" />
            <div className="name">Tourung Cars</div>
          </a>
        </div>
      </div>
    </AppShell>
  );
}

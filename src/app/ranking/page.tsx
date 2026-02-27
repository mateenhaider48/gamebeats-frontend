// src/app/ranking/page.tsx
import AppShell from "@/components/AppShell";
import { getDict, SUPPORTED_LOCALES, type Locale } from "@/i18n/dict";
import { cookies } from "next/headers";

type Game = {
  name: string;
  rating: string;
  href: string;
  img: string;
  alt: string;
};

const RANKING_GAMES: Game[] = [
  {
    name: "Air Race",
    rating: "4.3",
    href: "https://gameddiction-demo.ilfis.io/games/air-race/html/index.html",
    img: "/images/games/adventures1.jpg",
    alt: "Air Race",
  },
  {
    name: "Creepy Flappy",
    rating: "4.4",
    href: "https://gameddiction-demo.ilfis.io/games/creepy-flappy/html/index.html",
    img: "/images/games/adventures5.jpg",
    alt: "Creepy Flappy",
  },
  {
    name: "Cyberman V",
    rating: "4.0",
    href: "https://gameddiction-demo.ilfis.io/games/cyberman-v/html/index.html",
    img: "/images/games/adventures7.jpg",
    alt: "Cyberman V",
  },
  {
    name: "Danger Cliff",
    rating: "4.4",
    href: "https://gameddiction-demo.ilfis.io/games/danger-clifft/html/index.html",
    img: "/images/games/adventures8.jpg",
    alt: "Danger Cliff",
  },
  {
    name: "Doodle Extra Jump",
    rating: "4.5",
    href: "https://gameddiction-demo.ilfis.io/games/doodle-jump-extra/html/index.html",
    img: "/images/games/adventures9.jpg",
    alt: "Doodle Extra Jump",
  },
  {
    name: "Nave X Racer",
    rating: "4.5",
    href: "https://gameddiction-demo.ilfis.io/games/nave-x-racer/html/index.html",
    img: "https://gameddiction-demo.ilfis.io/images/thumbs/small/66.jpg",
    alt: "Nave X Racer",
  },
];

async function readLocaleFromCookie(): Promise<Locale> {
  const jar = await cookies();
  const v = jar.get("gb_locale")?.value;

  if (v && (SUPPORTED_LOCALES as readonly string[]).includes(v)) {
    return v as Locale;
  }
  return "en";
}

export default async function RankingPage() {
  const locale = await readLocaleFromCookie();
  const t = getDict(locale);

  return (
    <AppShell>
      {/* Keep legacy wrapper for spacing/background */}
      <div className="top-page" />

      <div className="mt-0">
        <div className="pills-container page-title">
          <div className="dotted-wave" />

          <div className="container">
            <div className="row mb-4 pl-md-4">
              <h1 className="h1 title mt-4 ml-4 d-flex align-items-center white-text">
                {t.page.ranking}
              </h1>
            </div>
          </div>

          <div className="overlay" />
        </div>

        <div className="parent pt-4 pb-4 pb-lg-6">
          {RANKING_GAMES.map((g) => (
            <a
              key={g.href}
              href={g.href}
              target="_blank"
              rel="noreferrer"
              data-game-link="true"
            >
              <span className="star-badge">
                <span className="icon-star mr-1" />
                {g.rating}
              </span>

              <img src={g.img} className="img-fluid" alt={g.alt} />
              <div className="name">{g.name}</div>
            </a>
          ))}
        </div>
      </div>
    </AppShell>
  );
}

// src/app/category/[slug]/page.tsx
import AppShell from "@/components/AppShell";
import { getDict, SUPPORTED_LOCALES, type Locale } from "@/i18n/dict";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";

type Params = { slug: string };

type Game = {
  name: string;
  rating: string; // keep as string to match legacy
  href: string;
  img: string;
  alt: string;
};

type CategoryDef = {
  bgClass: string;
  pageKey: keyof ReturnType<typeof getDict>["page"]; // "adventures" | ...
  games: Game[];
};

const CATEGORY_CONFIG: Record<string, CategoryDef> = {
  adventures: {
    bgClass: "bg-adventures",
    pageKey: "adventures",
    games: [
      {
        name: "Air Race",
        rating: "4.3",
        href: "https://gameddiction-demo.ilfis.io/games/air-race/html/index.html",
        img: "https://gameddiction-demo.ilfis.io/images/thumbs/small/1.jpg",
        alt: "Air Race",
      },
      {
        name: "Brave Warriors",
        rating: "4.4",
        href: "https://gameddiction-demo.ilfis.io/games/brave-warriors/html/index.html",
        img: "https://gameddiction-demo.ilfis.io/images/thumbs/small/95.jpg",
        alt: "Brave Warriors",
      },
      {
        name: "Creepy Flappy",
        rating: "4.0",
        href: "https://gameddiction-demo.ilfis.io/games/creepy-flappy/html/index.html",
        img: "https://gameddiction-demo.ilfis.io/images/thumbs/small/5.jpg",
        alt: "Creepy Flappy",
      },
      {
        name: "Cyberman V",
        rating: "4.4",
        href: "https://gameddiction-demo.ilfis.io/games/cyberman-v/html/index.html",
        img: "https://gameddiction-demo.ilfis.io/images/thumbs/small/7.jpg",
        alt: "Cyberman V",
      },
      {
        name: "Danger Clifft",
        rating: "4.5",
        href: "https://gameddiction-demo.ilfis.io/games/danger-clifft/html/index.html",
        img: "https://gameddiction-demo.ilfis.io/images/thumbs/small/8.jpg",
        alt: "Danger Clifft",
      },
      {
        name: "Doodle Jump Extra",
        rating: "4.5",
        href: "https://gameddiction-demo.ilfis.io/games/doodle-jump-extra/html/index.html",
        img: "https://gameddiction-demo.ilfis.io/images/thumbs/small/9.jpg",
        alt: "Doodle Jump Extra",
      },
    ],
  },

  arcade: {
    bgClass: "bg-arcade",
    pageKey: "arcade",
    games: [
      {
        name: "Bird Trap",
        rating: "4.3",
        href: "https://gameddiction-demo.ilfis.io/games/bird-trap/html/index.html",
        img: "https://gameddiction-demo.ilfis.io/images/thumbs/small/2.jpg",
        alt: "Bird Trap",
      },
      {
        name: "Birdify",
        rating: "4.4",
        href: "https://gameddiction-demo.ilfis.io/games/birdify/html/index.html",
        img: "https://gameddiction-demo.ilfis.io/images/thumbs/small/75.jpg",
        alt: "Birdify",
      },
      {
        name: "Cat and Ghosts",
        rating: "4.0",
        href: "https://gameddiction-demo.ilfis.io/games/cat-and-ghosts/html/index.html",
        img: "https://gameddiction-demo.ilfis.io/images/thumbs/small/3.jpg",
        alt: "Cat and Ghosts",
      },
      {
        name: "Christmas Gravity Runner",
        rating: "4.4",
        href: "https://gameddiction-demo.ilfis.io/games/christmas-gravity-runner/html/index.html",
        img: "https://gameddiction-demo.ilfis.io/images/thumbs/small/4.jpg",
        alt: "Christmas Gravity Runner",
      },
      {
        name: "Flappy Ball",
        rating: "4.5",
        href: "https://gameddiction-demo.ilfis.io/games/flappy-ball/html/index.html",
        img: "https://gameddiction-demo.ilfis.io/images/thumbs/small/57.jpg",
        alt: "Flappy Ball",
      },
      {
        name: "Flappy the pipes areback",
        rating: "4.5",
        href: "https://gameddiction-demo.ilfis.io/games/flappy-the-pipes-are-back/html/index.html",
        img: "https://gameddiction-demo.ilfis.io/images/thumbs/small/10.jpg",
        alt: "Flappy the pipes areback",
      },
    ],
  },

  braintraining: {
    bgClass: "bg-braintraining",
    pageKey: "braintraining",
    games: [
      {
        name: "Hangman",
        rating: "4.3",
        href: "https://gameddiction-demo.ilfis.io/games/hangman/html/index.html",
        img: "https://gameddiction-demo.ilfis.io/images/thumbs/small/54.jpg",
        alt: "Hangman",
      },
      {
        name: "Match Emoji",
        rating: "4.4",
        href: "https://gameddiction-demo.ilfis.io/games/match-emoji/html/index.html",
        img: "https://gameddiction-demo.ilfis.io/images/thumbs/small/93.jpg",
        alt: "Match Emoji",
      },
      {
        name: "Math Game",
        rating: "4.0",
        href: "https://gameddiction-demo.ilfis.io/games/math-game/html/index.html",
        img: "https://gameddiction-demo.ilfis.io/images/thumbs/small/52.jpg",
        alt: "Math Game",
      },
      {
        name: "Math Game for Kids",
        rating: "4.4",
        href: "https://gameddiction-demo.ilfis.io/games/math-game-for-kids/html/index.html",
        img: "https://gameddiction-demo.ilfis.io/images/thumbs/small/73.jpg",
        alt: "Math Game for Kids",
      },
      {
        name: "Memory Matching",
        rating: "4.5",
        href: "https://gameddiction-demo.ilfis.io/games/memory-matching/html/index.html",
        img: "https://gameddiction-demo.ilfis.io/images/thumbs/small/55.jpg",
        alt: "Memory Matching",
      },
      {
        name: "Quick Math",
        rating: "4.5",
        href: "https://gameddiction-demo.ilfis.io/games/quick-math/html/index.html",
        img: "https://gameddiction-demo.ilfis.io/images/thumbs/small/85.jpg",
        alt: "Quick Math",
      },
    ],
  },

  sports: {
    bgClass: "bg-sports",
    pageKey: "sports",
    games: [
      {
        name: "8 Ball Pool",
        rating: "4.3",
        href: "https://gameddiction-demo.ilfis.io/games/8-ball-pool/html/index.html",
        img: "https://gameddiction-demo.ilfis.io/images/thumbs/small/14.jpg",
        alt: "8 Ball Pool",
      },
      {
        name: "Cricket World Cup",
        rating: "4.4",
        href: "https://gameddiction-demo.ilfis.io/games/cricket-world-cup/html/index.html",
        img: "https://gameddiction-demo.ilfis.io/images/thumbs/small/61.jpg",
        alt: "Cricket World Cup",
      },
      {
        name: "Formula Rush",
        rating: "4.0",
        href: "https://gameddiction-demo.ilfis.io/games/formula-rush/html/index.html",
        img: "https://gameddiction-demo.ilfis.io/images/thumbs/small/6.jpg",
        alt: "Formula Rush",
      },
      {
        name: "Kick the soccer ball",
        rating: "4.4",
        href: "https://gameddiction-demo.ilfis.io/games/kick-the-soccer-ball/html/index.html",
        img: "https://gameddiction-demo.ilfis.io/images/thumbs/small/13.jpg",
        alt: "Kick the soccer ball",
      },
      {
        name: "Tiny Race",
        rating: "4.5",
        href: "https://gameddiction-demo.ilfis.io/games/tiny-race/html/index.html",
        img: "https://gameddiction-demo.ilfis.io/images/thumbs/small/26.jpg",
        alt: "Tiny Race",
      },
      {
        name: "Tourung Cars",
        rating: "4.5",
        href: "https://gameddiction-demo.ilfis.io/games/tourung-cars/html/index.html",
        img: "https://gameddiction-demo.ilfis.io/images/thumbs/small/27.jpg",
        alt: "Tourung Cars",
      },
    ],
  },

  strategy: {
    bgClass: "bg-strategy",
    pageKey: "strategy",
    games: [
      {
        name: "Box Tower",
        rating: "4.3",
        href: "https://gameddiction-demo.ilfis.io/games/box-tower/html/index.html",
        img: "https://gameddiction-demo.ilfis.io/images/thumbs/small/59.jpg",
        alt: "Box Tower",
      },
      {
        name: "Bus Parking",
        rating: "4.4",
        href: "https://gameddiction-demo.ilfis.io/games/bus-parking/html/index.html",
        img: "https://gameddiction-demo.ilfis.io/images/thumbs/small/29.jpg",
        alt: "Bus Parking",
      },
      {
        name: "Defense Battle",
        rating: "4.0",
        href: "https://gameddiction-demo.ilfis.io/games/defense-battle/html/index.html",
        img: "https://gameddiction-demo.ilfis.io/images/thumbs/small/70.jpg",
        alt: "Defense Battle",
      },
      {
        name: "Emoji Pop",
        rating: "4.4",
        href: "https://gameddiction-demo.ilfis.io/games/emoji-pop/html/index.html",
        img: "https://gameddiction-demo.ilfis.io/images/thumbs/small/81.jpg",
        alt: "Emoji Pop",
      },
      {
        name: "Escape Blocky",
        rating: "4.5",
        href: "https://gameddiction-demo.ilfis.io/games/escape-blocky/html/index.html",
        img: "https://gameddiction-demo.ilfis.io/images/thumbs/small/82.jpg",
        alt: "Escape Blocky",
      },
      {
        name: "Flappy Bounce",
        rating: "4.5",
        href: "https://gameddiction-demo.ilfis.io/games/flappy-bounce/html/index.html",
        img: "https://gameddiction-demo.ilfis.io/images/thumbs/small/60.jpg",
        alt: "Flappy Bounce",
      },
    ],
  },
};

async function getLocaleFromCookie(): Promise<Locale> {
  const jar = await cookies();
  const v = jar.get("gb_locale")?.value;
  if (v && (SUPPORTED_LOCALES as unknown as string[]).includes(v)) return v as Locale;
  return "en";
}

export default async function CategorySlugPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;

  const category = CATEGORY_CONFIG[slug];
  if (!category) return notFound();

  const locale = await getLocaleFromCookie();
  const t = getDict(locale);

  const title = t.page[category.pageKey];

  return (
    <AppShell>
      <div className="mt-0">
        <div className={`${category.bgClass} page-title`}>
          <div className="container">
            <div className="row pt-4 pl-md-4">
              <h1
                className="h1 title mt-4 ml-4 d-flex align-items-center white-text"
                data-i18n={`page.${category.pageKey}`}
              >
                {title}
              </h1>
            </div>
          </div>
          <div className="overlay" />
        </div>

        <div className="parent pt-4 pb-4 pb-lg-6">
          {category.games.map((g) => (
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


// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // legacy category shortcuts
      { source: "/adventures", destination: "/category/adventures", permanent: true },
      { source: "/arcade", destination: "/category/arcade", permanent: true },
      { source: "/strategy", destination: "/category/strategy", permanent: true },
      { source: "/braintraining", destination: "/category/braintraining", permanent: true },
      { source: "/sports", destination: "/category/sports", permanent: true },

      // ✅ legacy PHP route -> Next route
      // choose one:
      { source: "/account-redirect.php", destination: "/login", permanent: false },
      // or if you want it to go straight to the page:
      // { source: "/account-redirect.php", destination: "/my-account", permanent: false },
    ];
  },
};

export default nextConfig;

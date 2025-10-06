import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/submit", 
        destination: "https://script.google.com/macros/s/AKfycbw1pMqrIaXMkr-gLtCZWwNZeTfObXqeAt066k0KBbNdAcxYbfJtHMueBGoKtE_lGODd/exec", 
      },
    ];
  },
};

export default nextConfig;
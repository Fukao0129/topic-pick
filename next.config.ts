import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    APP_NAME: "TopicPick",
  },
  // githubのユーザーアイコンを許可
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
    ],
  },
};

export default nextConfig;

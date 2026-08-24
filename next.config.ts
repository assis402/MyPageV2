import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/lib/i18n/request.ts");

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn-images-1.medium.com", pathname: "/**" },
      { protocol: "https", hostname: "cdn-images-2.medium.com", pathname: "/**" },
      { protocol: "https", hostname: "miro.medium.com", pathname: "/**" },
    ],
  },
};

export default withNextIntl(nextConfig);

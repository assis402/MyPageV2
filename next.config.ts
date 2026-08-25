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
  // Legacy ASP.NET bookmarks always land on the default locale (en-US), not the NEXT_LOCALE cookie.
  async redirects() {
    return [
      { source: "/Projects", destination: "/en-US/projects", permanent: true },
      { source: "/projects", destination: "/en-US/projects", permanent: true },
      { source: "/Courses", destination: "/en-US", permanent: true },
      { source: "/courses", destination: "/en-US", permanent: true },
      { source: "/Admin", destination: "/en-US/admin", permanent: true },
      { source: "/admin", destination: "/en-US/admin", permanent: true },
    ];
  },
};

export default withNextIntl(nextConfig);

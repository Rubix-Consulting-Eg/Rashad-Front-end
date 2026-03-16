import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const API_PROXY_PATH = "/api";
const REMOTE_API =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://rashad.runasp.net/api";

const nextConfig: NextConfig = {
  async rewrites() {
    // In development, proxy API calls to avoid CORS (browser → same origin → Next rewrites to API)
    if (process.env.NODE_ENV === "development" && REMOTE_API) {
      return [
        {
          source: `${API_PROXY_PATH}/:path*`,
          destination: `${REMOTE_API}/:path*`,
        },
      ];
    }
    return [];
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);

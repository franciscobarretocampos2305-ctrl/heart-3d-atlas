import type { NextConfig } from "next";

// prefixo do GitHub Pages (definido no deploy.yml)
const base = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  basePath: base,
};

export default nextConfig;

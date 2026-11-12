import type { NextConfig } from "next";

// No GitHub Pages o site fica em usuario.github.io/NOME-DO-REPO, então precisa de um prefixo.
// O workflow (.github/workflows/deploy.yml) define NEXT_PUBLIC_BASE_PATH sozinho.
const base = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "export", // gera uma pasta "out" com o site pronto, sem servidor
  trailingSlash: true,
  images: { unoptimized: true },
  basePath: base,
};

export default nextConfig;

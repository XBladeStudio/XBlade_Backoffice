/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  webpack: (config) => {
    // Ignore wagmi connector optional dependencies
    config.resolve.fallback = {
      ...config.resolve.fallback,
      "@coinbase/wallet-sdk": false,
      "@walletconnect/ethereum-provider": false,
      "@metamask/sdk": false,
      "@safe-global/safe-apps-sdk": false,
      "@safe-global/safe-apps-provider": false,
      "@gemini-wallet/core": false,
      "@base-org/account": false,
      "porto": false,
      "porto/internal": false,
    };
    config.externals.push("pino-pretty", "lokijs", "encoding");
    return config;
  },
}

export default nextConfig

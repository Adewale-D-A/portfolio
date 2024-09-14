/** @type {import('next').NextConfig} */

const nextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "adewaleportfolio.blob.core.windows.net",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  sassOptions: {
    silenceDeprecations: ["legacy-js-api"],
  },
  images: {
    remotePatterns: [{ hostname: "xxdefault.s3.ap-southeast-1.amazonaws.com" }],
  },
};

export default nextConfig;

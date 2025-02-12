/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.pixabay.com", // Replace with your hostname
      },
    ],
  },
};

export default nextConfig;

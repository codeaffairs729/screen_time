/** @type {import('next').NextConfig} */
const nextConfig = {
    pageExtensions: ["page.ts", "page.tsx"],
    reactStrictMode: true,
    images: {
        domains: ["epsilon1-dev-001.s3.amazonaws.com"],
    },
};

module.exports = nextConfig;

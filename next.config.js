/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com', 'source.unsplash.com', 'api.unsplash.com', 'randomuser.me'],
  },
}

module.exports = nextConfig

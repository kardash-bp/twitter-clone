/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com', 'source.unsplash.com', 'api.unsplash.com', 'randomuser.me', 'lh3.googleusercontent.com'],
  },
}

module.exports = nextConfig

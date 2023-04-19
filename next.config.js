/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['firebasestorage.googleapis.com', 'randomuser.me', 'lh3.googleusercontent.com'],
  },
}

module.exports = nextConfig

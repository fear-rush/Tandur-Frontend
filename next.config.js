/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    OPENWEATHER_KEY: process.env.OPENWEATHER_KEY,
    SOLCAST_KEY: process.env.SOLCAST_KEY,
    VISUALCROSSING_KEY: process.env.VISUALCROSSING_KEY,
  }
}

module.exports = nextConfig

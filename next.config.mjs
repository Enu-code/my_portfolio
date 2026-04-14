/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/webp'],
    remotePatterns: [],
  },
  sassOptions: {
    // Makes `@use 'variables' as *` work in any SCSS module without relative paths
    includePaths: ['./styles'],
  },
}

export default nextConfig

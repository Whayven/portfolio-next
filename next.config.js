/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    loader:'imgix',
    path: '/',
    domains: ['localhost', 'cw-cdk-stack-cloudwaybucketdb51c266-dyy61jgjmzcb.s3.amazonaws.com'],
    formats: ['image/avif', 'image/webp'],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840]
  }
}

module.exports = nextConfig;

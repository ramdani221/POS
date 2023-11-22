/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'source.unsplash.com',
                port: '',
                pathname: '/Mv9hjnEUHR4/60x60',
            },
        ],
    },
    reactStrictMode: true,
}

module.exports = nextConfig

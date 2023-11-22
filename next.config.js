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
    serverRuntimeConfig: {
        dbConfig: {
            user: 'Ramdani',
            host: 'localhost',
            database: 'posdb',
            password: '12345',
            port: 5432,
        },
        secret: 'Rubicam@B37'
    },
}

module.exports = nextConfig

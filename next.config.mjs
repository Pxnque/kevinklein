/** @type {import('next').NextConfig} */
const nextConfig = {
  // ...
  images: {
    remotePatterns: [{
      protocol: 'https',
      hostname: 'kevinklein.pockethost.io',
      port: '',
      pathname: '/api/files/**'
    }]
  },
  eslint: {
    ignoreDuringBuilds: true,
},
  // ...

};

export default nextConfig;

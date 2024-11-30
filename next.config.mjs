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
  // ...

  // export: {
  //   async rewrites() {
  //     return [
  //       {
  //         source: '/api/:path*',
  //         destination: 'https://kevinklein.pockethost.io/api/:path*',
  //       },
  //     ];
  //   },
  // },

};

export default nextConfig;

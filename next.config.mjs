/** @type {import('next').NextConfig} */
const nextConfig = {

    export : {
        images: {
            remotePatterns: [
                {
                    protocol: 'https',
                    hostname: 'kevinklein.pockethost.io', // Reemplaza con el dominio de PocketBase
                    port: '',
                    pathname: '/api/files/**', // Ruta de las imágenes
                },
            ],
        },
    }


};

export default nextConfig;

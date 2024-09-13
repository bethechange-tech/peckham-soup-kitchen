import { withPayload } from "@payloadcms/next/withPayload";
/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'images.unsplash.com',
            port: '',
            pathname: '/**',
          },
          {
            protocol: 'https',
            hostname: 'res.cloudinary.com',
            port: '',
            pathname: '/**',
          },
          {
            protocol: "https",
            hostname: "example.com",
            port: "",
            pathname: "/**",
          },
          {
            protocol: 'https',
            hostname: 'via.placeholder.com',
            port: '',
            pathname: '/**',
          },
          {
            protocol: 'https',
            hostname: 'image.shutterstock.com',
            port: '',
            pathname: '/**',
          },
          {
            protocol: "https",
            hostname: "giszpmycryxolyqvmwam.supabase.co",
            port: "",
            pathname: "/**",
        },
        ],
      },
};

export default withPayload(nextConfig);

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Set the correct root directory
  outputFileTracingRoot: path.join(__dirname, './'),
  
  // Remove turbo from experimental
  experimental: {
    // Keep other experimental options if you have them
    // serverActions: true, // etc.
  },
  
  // Your other Next.js config options
  images: {
    domains: [], // your image domains
  },
  // etc.
};

export default nextConfig;
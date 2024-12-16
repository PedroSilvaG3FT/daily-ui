/** @type {import('next').NextConfig} */

import { fileURLToPath } from "url";
import { dirname, join } from "path";
import createNextIntlPlugin from "next-intl/plugin";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const withNextIntl = createNextIntlPlugin();

export default withNextIntl({
  images: {
    domains: [
      "api.microlink.io",
      "images.unsplash.com",
      "images.remotePatterns",
      "assets.aceternity.com",
      "firebasestorage.googleapis.com",
    ],
  },
  sassOptions: {
    includePaths: [join(__dirname, "styles")],
  },
});

import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "HelpNexus Eugene",
    short_name: "HelpNexus",
    description:
      "Find the right mental health, crisis, housing, and community support — three quick questions, real resources in Eugene & Lane County, Oregon.",
    start_url: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#1A3D28",
    theme_color: "#1A3D28",
    categories: ["health", "medical"],
    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-512-maskable.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}

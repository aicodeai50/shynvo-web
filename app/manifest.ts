import type { MetadataRoute } from "next";
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Shynvo",
    short_name: "Shynvo",
    description: "One platform for learning, building, and AI-guided work.",
    start_url: "/",
    display: "standalone",
    background_color: "#020508",
    theme_color: "#020508",
    orientation: "portrait-primary",
    scope: "/",
    lang: "en",
    categories: ["education", "productivity", "utilities"],
    icons: [
      { src: "/icons/icon-192.png",          sizes: "192x192", type: "image/png" },
      { src: "/icons/icon-512.png",          sizes: "512x512", type: "image/png" },
      { src: "/icons/icon-192-maskable.png", sizes: "192x192", type: "image/png", purpose: "maskable" },
      { src: "/icons/icon-512-maskable.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
    shortcuts: [
      { name: "Robot",      short_name: "Robot",      url: "/robot",      icons: [{ src: "/icons/icon-192.png", sizes: "192x192" }] },
      { name: "University", short_name: "University", url: "/university", icons: [{ src: "/icons/icon-192.png", sizes: "192x192" }] },
      { name: "Frontier",   short_name: "Frontier",   url: "/frontier",  icons: [{ src: "/icons/icon-192.png", sizes: "192x192" }] },
    ],
  };
}

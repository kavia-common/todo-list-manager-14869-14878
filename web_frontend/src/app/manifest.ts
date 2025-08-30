import type { MetadataRoute } from "next";

// PUBLIC_INTERFACE
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Todo List Manager",
    short_name: "Todos",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#2563eb",
    icons: [],
  };
}

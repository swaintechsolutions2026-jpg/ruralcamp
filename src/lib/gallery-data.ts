import { DESTINATIONS } from "@/lib/catalog";
import { IMG } from "@/lib/site";

const stay = import.meta.glob<{ url: string }>("@/assets/gallery/camp-stay-*.jpg.asset.json", { eager: true, import: "default" });
import v1 from "@/assets/gallery/campfire-night-1.mp4.asset.json";
import v1p from "@/assets/gallery/campfire-night-1-poster.jpg.asset.json";
import v2 from "@/assets/gallery/campfire-night-2.mp4.asset.json";
import v2p from "@/assets/gallery/campfire-night-2-poster.jpg.asset.json";

export type GalleryItem = { type: "photo" | "video"; src: string; poster?: string; alt: string };

export const STAY_PHOTOS: GalleryItem[] = Object.keys(stay)
  .sort((a, b) => Number(a.match(/(\d+)\.jpg/)?.[1]) - Number(b.match(/(\d+)\.jpg/)?.[1]))
  .map((k) => ({ type: "photo", src: stay[k]!.url, alt: "Rural Camps stay" }));

export const GALLERY_VIDEOS: GalleryItem[] = [
  { type: "video", src: v1.url, poster: v1p.url, alt: "Campfire night at the camp" },
  { type: "video", src: v2.url, poster: v2p.url, alt: "Dancing around the campfire" },
];

export const PLACE_PHOTOS: GalleryItem[] = [
  ...DESTINATIONS.map((d) => ({ type: "photo" as const, src: d.image, alt: d.name })),
  { type: "photo", src: IMG.rural, alt: "Rural stay near Deomali" },
];

export const ALL_GALLERY_ITEMS = [...GALLERY_VIDEOS, ...STAY_PHOTOS, ...PLACE_PHOTOS];

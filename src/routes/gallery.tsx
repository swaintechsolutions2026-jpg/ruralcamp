import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Play, X } from "lucide-react";
import { IMG } from "@/lib/site";
import { ALL_GALLERY_ITEMS, GALLERY_VIDEOS, PLACE_PHOTOS, STAY_PHOTOS, type GalleryItem } from "@/lib/gallery-data";
import { PageHero } from "@/components/site/ui";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Koraput Travel Photos | Rural Camps" },
      { name: "description", content: "Photos and videos from our camp stays, campfire nights and Koraput journeys." },
      { property: "og:title", content: "Gallery — Rural Camps" },
      { property: "og:description", content: "Camp cottages, campfire nights and real places from our Koraput journeys." },
    ],
  }),
  component: Page,
});

const TABS = [
  { id: "all", label: "All", items: ALL_GALLERY_ITEMS },
  { id: "camp", label: "Camp stays", items: STAY_PHOTOS },
  { id: "videos", label: "Videos", items: GALLERY_VIDEOS },
  { id: "places", label: "Places", items: PLACE_PHOTOS },
] as const;

function Page() {
  const [tab, setTab] = useState<(typeof TABS)[number]["id"]>("all");
  const [open, setOpen] = useState<GalleryItem | null>(null);
  const items = TABS.find((t) => t.id === tab)!.items;

  return (
    <>
      <PageHero image={IMG.talamali} eyebrow="Travel memories" title="Gallery" />
      <section className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-20">
        <div className="mb-10 flex flex-wrap justify-center gap-2">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`rounded-full border px-5 py-2 text-sm font-semibold transition ${
                tab === t.id ? "border-primary bg-primary text-primary-foreground" : "border-border hover:border-primary"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
        <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
          {items.map((p) => (
            <button key={p.src} onClick={() => setOpen(p)} className="group relative mb-4 block w-full break-inside-avoid overflow-hidden rounded-xl text-left">
              <img src={p.poster ?? p.src} alt={p.alt} loading="lazy" className="w-full transition duration-700 group-hover:scale-105" />
              {p.type === "video" && (
                <span className="absolute inset-0 grid place-items-center bg-forest-deep/30">
                  <span className="grid h-16 w-16 place-items-center rounded-full bg-gold text-accent-foreground shadow-lg transition group-hover:scale-110">
                    <Play className="ml-1" />
                  </span>
                </span>
              )}
            </button>
          ))}
        </div>
      </section>
      {open && (
        <div role="dialog" aria-modal="true" aria-label={open.alt} className="fixed inset-0 z-[60] grid place-items-center bg-forest-deep/95 p-4" onClick={() => setOpen(null)}>
          <button aria-label="Close" className="absolute right-4 top-4 grid h-12 w-12 place-items-center text-forest-foreground"><X /></button>
          {open.type === "video" ? (
            <video src={open.src} poster={open.poster} controls autoPlay playsInline onClick={(e) => e.stopPropagation()} className="max-h-[85vh] max-w-full rounded-lg" />
          ) : (
            <img src={open.src} alt={open.alt} className="max-h-[85vh] max-w-full rounded-lg object-contain" />
          )}
        </div>
      )}
    </>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { X } from "lucide-react";
import { DESTINATIONS } from "@/lib/catalog";
import { IMG } from "@/lib/site";
import { PageHero } from "@/components/site/ui";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Koraput Travel Photos | Rural Camps" },
      { name: "description", content: "Photographs from Koraput, Deomali, Talamali, Duduma and our rural stays." },
      { property: "og:title", content: "Gallery — Rural Camps" },
      { property: "og:description", content: "Real places from our Koraput journeys." },
    ],
  }),
  component: Page,
});

const PHOTOS = [...DESTINATIONS.map((d) => ({ src: d.image, alt: d.name })), { src: IMG.rural, alt: "Rural stay near Deomali" }];

function Page() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <>
      <PageHero image={IMG.talamali} eyebrow="Travel memories" title="Gallery" />
      <section className="mx-auto max-w-7xl px-5 py-20 md:px-8">
        <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
          {PHOTOS.map((p, i) => (
            <button key={p.src} onClick={() => setOpen(i)} className="group mb-4 block w-full overflow-hidden rounded-xl text-left">
              <img src={p.src} alt={p.alt} loading="lazy" className="w-full transition duration-700 group-hover:scale-105" />
              <span className="mt-2 block text-sm text-muted-foreground">{p.alt}</span>
            </button>
          ))}
        </div>
        <p className="mt-10 text-center text-sm text-muted-foreground">Traveller photos and videos will be added here soon.</p>
      </section>
      {open != null && (
        <div role="dialog" aria-modal="true" aria-label={PHOTOS[open].alt} className="fixed inset-0 z-[60] grid place-items-center bg-forest-deep/95 p-4" onClick={() => setOpen(null)}>
          <button aria-label="Close" className="absolute right-4 top-4 grid h-12 w-12 place-items-center text-forest-foreground"><X /></button>
          <img src={PHOTOS[open].src} alt={PHOTOS[open].alt} className="max-h-[85vh] max-w-full rounded-lg object-contain" />
        </div>
      )}
    </>
  );
}

import { Link } from "@tanstack/react-router";
import { Check, ChevronDown, MapPin, CalendarDays } from "lucide-react";
import type { ReactNode } from "react";
import { formatINR, startingPrice, type ItineraryDay, type Product } from "@/lib/catalog";

export function PageHero({ image, eyebrow, title, children }: { image: string; eyebrow: string; title: string; children?: ReactNode }) {
  return (
    <section className="relative flex min-h-[62vh] items-end overflow-hidden bg-forest-deep text-forest-foreground">
      <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover animate-slowzoom" />
      <div className="absolute inset-0 bg-hero-overlay" />
      <div className="relative mx-auto w-full max-w-7xl px-5 pb-14 pt-32 md:px-8 md:pb-20">
        <p className="eyebrow text-gold animate-rise">{eyebrow}</p>
        <h1 className="mt-4 max-w-4xl text-5xl leading-[1.02] animate-rise md:text-7xl">{title}</h1>
        {children && <div className="mt-6 max-w-2xl text-lg text-forest-foreground/85 animate-rise">{children}</div>}
      </div>
    </section>
  );
}

export function SectionHead({ eyebrow, title, children, light }: { eyebrow: string; title: string; children?: ReactNode; light?: boolean }) {
  return (
    <div className="max-w-3xl">
      <p className={`eyebrow ${light ? "text-gold" : "text-earth"}`}>{eyebrow}</p>
      <h2 className="mt-3 text-4xl leading-tight md:text-6xl">{title}</h2>
      {children && <p className={`mt-5 text-lg ${light ? "text-forest-foreground/75" : "text-muted-foreground"}`}>{children}</p>}
    </div>
  );
}

export function productHref(p: Product) {
  if (p.type === "stay") return { to: "/camping/$slug" as const, params: { slug: p.slug } };
  if (p.type === "group-tour") return { to: "/tours/$slug" as const, params: { slug: p.slug } };
  return { to: "/private-tours/$slug" as const, params: { slug: p.slug } };
}

export function TourCard({ tour }: { tour: Product }) {
  const from = startingPrice(tour);
  const href = productHref(tour);
  return (
    <article className="group flex flex-col overflow-hidden rounded-xl bg-card shadow-soft">
      <Link {...href} className="relative block aspect-[4/3] overflow-hidden">
        <img src={tour.image} alt={tour.title} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
        <span className="absolute left-4 top-4 rounded-full bg-forest-deep/80 px-3 py-1 text-xs font-semibold text-forest-foreground">{tour.category}</span>
        <span className="absolute right-4 top-4 rounded-full bg-gold px-3 py-1 text-xs font-bold text-accent-foreground">Booking open</span>
      </Link>
      <div className="flex flex-1 flex-col p-6">
        <p className="flex items-center gap-2 text-sm font-semibold text-earth"><CalendarDays size={15} /> {tour.dateLabel}</p>
        <h3 className="mt-2 text-2xl">{tour.title}</h3>
        {tour.duration && <p className="mt-1 text-sm text-muted-foreground">{tour.duration}</p>}
        <p className="mt-3 text-sm text-muted-foreground">Pickup: {tour.options.map((o) => o.label.split(" · ")[0]).filter((v, i, a) => a.indexOf(v) === i).join(" / ")}</p>
        <div className="mt-auto flex items-end justify-between gap-4 pt-6">
          <div>
            <p className="text-xs text-muted-foreground">From</p>
            <p className="font-display text-3xl text-primary">{from != null ? formatINR(from) : "On request"}<span className="font-sans text-sm text-muted-foreground"> /person</span></p>
          </div>
          <div className="flex gap-2">
            <Link {...href} className="rounded-full border border-foreground/20 px-4 py-2.5 text-sm font-semibold hover:border-primary hover:text-primary">Itinerary</Link>
            <Link {...href} hash="book" className="rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:brightness-110">Book Now</Link>
          </div>
        </div>
      </div>
    </article>
  );
}

export function ImageTile({ product, className = "" }: { product: Product; className?: string }) {
  const from = startingPrice(product);
  return (
    <Link {...productHref(product)} className={`group relative block overflow-hidden rounded-xl text-forest-foreground ${className}`}>
      <img src={product.image} alt={product.title} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" />
      <div className="absolute inset-0 bg-card-overlay" />
      <div className="absolute inset-x-0 bottom-0 p-6">
        <p className="eyebrow text-gold">{product.kicker}</p>
        <h3 className="mt-2 text-3xl leading-tight">{product.title}</h3>
        <p className="mt-2 flex items-center gap-1 text-sm text-forest-foreground/80"><MapPin size={14} /> {product.location}{from != null && <> · from {formatINR(from)}/{product.options[0]?.unit}</>}</p>
      </div>
    </Link>
  );
}

export function Itinerary({ days }: { days: ItineraryDay[] }) {
  return (
    <div className="divide-y divide-border border-y border-border">
      {days.map((d, i) => (
        <details key={d.day} open={i < 2} className="group py-5">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
            <span className="flex items-baseline gap-4">
              <span className="eyebrow w-16 shrink-0 text-earth">{d.day}</span>
              <span className="font-display text-2xl">{d.title}</span>
            </span>
            <ChevronDown className="shrink-0 transition group-open:rotate-180" size={18} />
          </summary>
          <ul className="mt-4 grid gap-2 pl-20 text-muted-foreground sm:grid-cols-2">
            {d.items.map((it) => <li key={it} className="flex gap-2"><span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-earth" />{it}</li>)}
          </ul>
        </details>
      ))}
    </div>
  );
}

export function CheckList({ items, muted }: { items: string[]; muted?: boolean }) {
  return (
    <ul className="space-y-2.5">
      {items.map((i) => (
        <li key={i} className={`flex gap-3 ${muted ? "text-muted-foreground" : ""}`}>
          <Check size={18} className="mt-0.5 shrink-0 text-primary" /> {i}
        </li>
      ))}
    </ul>
  );
}

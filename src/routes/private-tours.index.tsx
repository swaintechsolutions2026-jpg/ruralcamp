import { createFileRoute, Link } from "@tanstack/react-router";
import { PRIVATE_TOURS, formatINR } from "@/lib/catalog";
import { IMG } from "@/lib/site";
import { PageHero, SectionHead, Itinerary } from "@/components/site/ui";
import { EnquiryForm } from "@/components/site/forms";

export const Route = createFileRoute("/private-tours/")({
  head: () => ({
    meta: [
      { title: "Private Koraput Tours — Group-Size Pricing | Rural Camps" },
      { name: "description", content: "2-day private Koraput tours from ₹3,000/person, plus a 3-state Odisha–Andhra–Chhattisgarh adventure. Get a custom quote." },
      { property: "og:title", content: "Private Koraput Tours — Rural Camps" },
      { property: "og:description", content: "Your people, your pace: private Koraput tours and custom trips." },
    ],
  }),
  component: Page,
});

const MATRIX = [
  ["Standard", 300000, 350000],
  ["Deluxe", 350000, 400000],
] as const;

function Page() {
  const two = PRIVATE_TOURS[0]!;
  const three = PRIVATE_TOURS[1]!;
  return (
    <>
      <PageHero image={IMG.koraputRoad} eyebrow="Private tours" title="Your People. Your Pace. Your Koraput." />
      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-20 md:px-8 lg:grid-cols-[1.3fr_1fr]">
        <div>
          <SectionHead eyebrow={two.duration!} title={two.title}>{two.summary}</SectionHead>
          <div className="mt-10 overflow-hidden rounded-xl border border-border">
            <table className="w-full text-left">
              <thead className="bg-forest text-forest-foreground">
                <tr><th className="p-4 font-semibold">Per person</th><th className="p-4 font-semibold">Group of 8+</th><th className="p-4 font-semibold">Group of 4–7</th></tr>
              </thead>
              <tbody>
                {MATRIX.map(([k, a, b]) => (
                  <tr key={k} className="border-t border-border"><td className="p-4 font-semibold">{k}</td><td className="p-4 font-display text-2xl text-primary">{formatINR(a)}</td><td className="p-4 font-display text-2xl text-primary">{formatINR(b)}</td></tr>
                ))}
                <tr className="border-t border-border"><td className="p-4 font-semibold">Couple / 2–3</td><td colSpan={2} className="p-4 text-muted-foreground">Price on request</td></tr>
              </tbody>
            </table>
          </div>
          <div className="mt-12"><Itinerary days={two.itinerary!} /></div>
          <Link to="/private-tours/$slug" params={{ slug: two.slug }} hash="book" className="mt-8 inline-block rounded-full bg-primary px-7 py-4 font-bold text-primary-foreground">Book this private tour</Link>
        </div>
        <aside className="lg:sticky lg:top-28 lg:self-start"><EnquiryForm defaultCategory="Private tour" /></aside>
      </section>
      <section className="relative overflow-hidden bg-forest text-forest-foreground">
        <img src={three.image} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-35" />
        <div className="relative mx-auto max-w-7xl px-5 py-24 md:px-8">
          <SectionHead light eyebrow={three.duration!} title={three.title}>{three.summary} From {formatINR(750000)}/person, based on four travellers.</SectionHead>
          <Link to="/private-tours/$slug" params={{ slug: three.slug }} className="mt-8 inline-block rounded-full bg-gold px-7 py-4 font-bold text-accent-foreground">See the 4-day itinerary</Link>
        </div>
      </section>
    </>
  );
}

import { MapPin, CalendarDays, Clock } from "lucide-react";
import { formatINR, isUpcoming, type Product } from "@/lib/catalog";
import { PageHero, Itinerary, CheckList } from "./ui";
import { BookingForm, EnquiryForm } from "./forms";

export function ProductDetail({ product }: { product: Product }) {
  const closed = product.type === "group-tour" && !isUpcoming(product);
  return (
    <>
      <PageHero image={product.image} eyebrow={product.kicker} title={product.title}>
        {product.summary}
      </PageHero>
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 md:px-8 lg:grid-cols-[1.4fr_1fr] lg:py-24">
        <div className="space-y-14">
          <div className="flex flex-wrap gap-x-8 gap-y-3 text-sm font-semibold">
            <span className="flex items-center gap-2"><MapPin size={16} className="text-earth" /> {product.location}</span>
            {product.dateLabel && <span className="flex items-center gap-2"><CalendarDays size={16} className="text-earth" /> {product.dateLabel}</span>}
            {product.duration && <span className="flex items-center gap-2"><Clock size={16} className="text-earth" /> {product.duration}</span>}
          </div>

          {product.options.length > 0 && (
            <div>
              <h2 className="text-3xl">Prices</h2>
              <ul className="mt-5 divide-y divide-border border-y border-border">
                {product.options.map((o) => (
                  <li key={o.id} className="flex items-baseline justify-between gap-4 py-4">
                    <span>{o.label}</span>
                    <span className="font-display text-2xl text-primary">{o.pricePaise != null ? <>{formatINR(o.pricePaise)}<span className="font-sans text-sm text-muted-foreground">/{o.unit}</span></> : <span className="text-lg">Price on request</span>}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-sm text-muted-foreground">Book with a 30% advance of the confirmed total.</p>
            </div>
          )}

          {product.itinerary && (
            <div>
              <h2 className="mb-5 text-3xl">Itinerary</h2>
              <Itinerary days={product.itinerary} />
            </div>
          )}

          {(product.facilities || product.inclusions || product.exclusions) && (
            <div className="grid gap-10 sm:grid-cols-2">
              {(product.facilities || product.inclusions) && (
                <div>
                  <h2 className="text-3xl">{product.facilities ? "Facilities" : "Included"}</h2>
                  <div className="mt-5"><CheckList items={product.facilities ?? product.inclusions!} /></div>
                </div>
              )}
              {product.exclusions && (
                <div>
                  <h2 className="text-3xl">Not included</h2>
                  <ul className="mt-5 space-y-2.5 text-muted-foreground">{product.exclusions.map((e) => <li key={e}>— {e}</li>)}</ul>
                </div>
              )}
            </div>
          )}

          {product.notes && (
            <div className="rounded-xl border-l-4 border-gold bg-secondary p-6 text-sm">
              {product.notes.map((n) => <p key={n} className="mt-1 first:mt-0">{n}</p>)}
            </div>
          )}
        </div>
        <aside id="book" className="scroll-mt-24 lg:sticky lg:top-28 lg:self-start">
          {closed ? <EnquiryForm title="This departure is closed — ask about the next one" defaultCategory="Custom tour" /> : product.options.length ? <BookingForm product={product} /> : <EnquiryForm />}
        </aside>
      </div>
    </>
  );
}

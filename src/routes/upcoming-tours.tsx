import { createFileRoute, Link } from "@tanstack/react-router";
import { pastTours, upcomingTours } from "@/lib/catalog";
import { IMG } from "@/lib/site";
import { PageHero, SectionHead, TourCard, CheckList } from "@/components/site/ui";

export const Route = createFileRoute("/upcoming-tours")({
  head: () => ({
    meta: [
      { title: "Upcoming Koraput Group Tours 2026 — Rural Camps" },
      { name: "description", content: "Scheduled Standard and Deluxe group departures to Koraput from Bhubaneswar and Koraput. See dates, prices and itineraries." },
      { property: "og:title", content: "Upcoming Koraput Group Tours — Rural Camps" },
      { property: "og:description", content: "Join a scheduled Standard or Deluxe group tour to Koraput, Odisha." },
    ],
  }),
  component: Page,
});

function Page() {
  const up = upcomingTours();
  const past = pastTours();
  return (
    <>
      <PageHero image={IMG.koraputRoad} eyebrow="Scheduled group departures" title="Upcoming Group Tours">
        Travel with a small community of explorers — train, hotel, meals, guide and sightseeing handled for you.
      </PageHero>
      <section className="mx-auto max-w-7xl px-5 py-20 md:px-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {up.map((t) => <TourCard key={t.slug} tour={t} />)}
        </div>
        {!up.length && <p className="text-muted-foreground">No departures open right now. <Link to="/contact" className="text-primary underline">Enquire</Link> for the next date.</p>}
      </section>
      <section className="bg-secondary py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 md:grid-cols-2 md:px-8">
          <SectionHead eyebrow="Standard vs Deluxe" title="Two ways to travel.">
            The difference is in hotel category, room facilities and transportation. Exact hotels are shared when your booking is confirmed.
          </SectionHead>
          <div>
            <p className="eyebrow text-earth">Typically included</p>
            <div className="mt-4"><CheckList items={["Train tickets (Ex-Bhubaneswar options)", "Hotel accommodation", "Breakfast and dinner", "Sightseeing transport", "Dedicated guide", "Photography and videography"]} /></div>
            <p className="mt-6 text-sm text-muted-foreground">Inclusions can vary by pickup option — each departure page lists the details.</p>
          </div>
        </div>
      </section>
      {past.length > 0 && (
        <section className="mx-auto max-w-7xl px-5 py-16 md:px-8">
          <p className="eyebrow text-stone">Past departures</p>
          <ul className="mt-4 divide-y divide-border border-y border-border">
            {past.map((t) => (
              <li key={t.slug} className="flex justify-between gap-4 py-4 text-muted-foreground">
                <span>{t.title}</span><span>{t.dateLabel} · Completed</span>
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  );
}

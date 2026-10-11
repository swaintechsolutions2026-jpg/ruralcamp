import { createFileRoute, Link } from "@tanstack/react-router";
import { DESTINATIONS } from "@/lib/catalog";
import { IMG } from "@/lib/site";
import { PageHero } from "@/components/site/ui";

export const Route = createFileRoute("/destinations")({
  head: () => ({
    meta: [
      { title: "Koraput Destinations — Deomali, Duduma, Gupteswar & more | Rural Camps" },
      { name: "description", content: "Explore Deomali Hill Top, Talamali Valley, Duduma Waterfall, Gupteswar Cave Temple, Kolab Dam and Sabara Srikhetra." },
      { property: "og:title", content: "Discover Koraput — Rural Camps" },
      { property: "og:description", content: "The hills, waterfalls and temples of Koraput, Odisha." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHero image={IMG.duduma} eyebrow="Discover Koraput" title="Where the hills meet the clouds." />
      <section className="mx-auto max-w-7xl space-y-20 px-5 py-20 md:px-8 md:space-y-28">
        {DESTINATIONS.map((d, i) => (
          <article key={d.name} className={`grid items-center gap-8 md:grid-cols-2 md:gap-16 ${i % 2 ? "md:[&>img]:order-2" : ""}`}>
            <img src={d.image} alt={d.name} loading="lazy" className={`aspect-[4/3] w-full object-cover shadow-soft ${i % 2 ? "rounded-[2rem_8rem_2rem_2rem]" : "rounded-[8rem_2rem_2rem_2rem]"}`} />
            <div>
              <p className="eyebrow text-earth">{String(i + 1).padStart(2, "0")} · Koraput</p>
              <h2 className="mt-3 text-4xl md:text-5xl">{d.name}</h2>
              <p className="mt-4 text-lg text-muted-foreground">{d.note}.</p>
            </div>
          </article>
        ))}
        <div className="text-center">
          <Link to="/upcoming-tours" className="inline-block rounded-full bg-primary px-7 py-4 font-bold text-primary-foreground">See tours that visit these places</Link>
        </div>
      </section>
    </>
  );
}

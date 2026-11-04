import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowDown, Bed, Flame, Lamp, Mountain, Play, Tent, UserRound, MessageCircle } from "lucide-react";
import { DESTINATIONS, PRIVATE_TOURS, STAYS, formatINR, upcomingTours, findProduct } from "@/lib/catalog";
import { GALLERY_VIDEOS, STAY_PHOTOS } from "@/lib/gallery-data";
import { IMG, CONTACT } from "@/lib/site";
import { ImageTile, SectionHead, TourCard } from "@/components/site/ui";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Rural Camps — Explore the Real Odisha | Koraput Tours & Camping" },
      { name: "description", content: "Group tours, private Koraput trips, Deomali camping and rural stays. Misty mountains, waterfalls and authentic village life with Rural Camps." },
      { property: "og:title", content: "Rural Camps — Explore the Real Odisha" },
      { property: "og:description", content: "Camp beyond the ordinary in Koraput: group tours, private trips, camping and rural stays." },
    ],
  }),
  component: Home,
});

const FAQ = [
  ["How do I book?", "Choose a tour or stay and send a booking request, or WhatsApp us. We confirm availability and then share advance payment details."],
  ["How much advance payment is required?", "A 30% advance of the confirmed booking total secures your place. The remaining 70% is paid as agreed before or during the trip."],
  ["What is included?", "Inclusions differ by package — each tour and stay page lists exactly what's included and excluded."],
  ["Do you offer private tours?", "Yes. Our 2-Day Private Koraput Tour is priced by group size, and we plan fully custom trips on request."],
  ["Can couples and families book?", "Absolutely. Couple and small-group private tours are priced on request; families are welcome on group tours and camps."],
  ["What should I carry for camping?", "Warm layers, a torch, comfortable shoes, personal medicines, and a rain jacket in the monsoon season."],
  ["Can dates change due to weather?", "Hill roads and waterfalls depend on weather. We may adjust timing or sequence for safety and will always tell you in advance."],
  ["How does cancellation work?", "Cancellation terms are shared with you before you pay the advance."],
];

function Home() {
  const tours = upcomingTours();
  const priv = PRIVATE_TOURS[0]!;
  const three = PRIVATE_TOURS[1]!;
  const deomali = findProduct("deomali-camping")!;
  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[100svh] items-end overflow-hidden bg-forest-deep text-forest-foreground">
        <img src={IMG.deomali} alt="Winding road over misty Deomali ridges" className="absolute inset-0 h-full w-full object-cover object-[60%_center] animate-slowzoom" />
        <div className="absolute inset-0 bg-hero-overlay" />
        <div className="relative mx-auto w-full max-w-7xl px-5 pb-28 pt-28 md:px-8 md:pb-24">
          <p className="eyebrow text-gold animate-rise">Koraput • Odisha • India</p>
          <h1 className="mt-5 max-w-5xl text-[3.2rem] leading-[0.95] animate-rise sm:text-7xl md:text-8xl lg:text-[8.5rem]">
            Explore the<br />Real Odisha
          </h1>
          <p className="mt-5 font-display text-2xl italic text-gold animate-rise md:text-3xl">Camp Beyond the Ordinary.</p>
          <p className="mt-4 max-w-xl text-base text-forest-foreground/85 animate-rise md:text-lg">
            Discover Koraput's misty mountains, breathtaking waterfalls, hidden valleys and authentic rural experiences with Rural Camps.
          </p>
          <div className="mt-8 flex flex-col gap-3 animate-rise sm:flex-row">
            <Link to="/upcoming-tours" className="rounded-full bg-gold px-7 py-4 text-center font-bold text-accent-foreground hover:brightness-105">Explore Upcoming Tours</Link>
            <Link to="/private-tours" className="rounded-full border border-forest-foreground/40 px-7 py-4 text-center font-semibold backdrop-blur hover:border-gold hover:text-gold">Plan a Private Trip</Link>
          </div>
        </div>
        <a href="#next" aria-label="Scroll to upcoming tours" className="absolute bottom-24 right-6 hidden animate-bounce text-forest-foreground/70 md:bottom-10 md:block"><ArrowDown /></a>
      </section>

      {/* Upcoming */}
      <section id="next" className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHead eyebrow="Upcoming group departures" title="Your Next Adventure Is Waiting." />
          <Link to="/upcoming-tours" className="font-semibold text-primary underline-offset-4 hover:underline">All departures →</Link>
        </div>
        {tours.length ? (
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {tours.map((t) => <TourCard key={t.slug} tour={t} />)}
          </div>
        ) : (
          <p className="mt-10 text-muted-foreground">New departures are being planned. <Link to="/contact" className="text-primary underline">Ask us</Link> about the next one.</p>
        )}
      </section>

      {/* Travel your way */}
      <section className="bg-secondary py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionHead eyebrow="Choose your experience" title="Travel Your Way." />
          <div className="mt-12 grid auto-rows-[260px] gap-4 md:grid-cols-6 md:auto-rows-[220px]">
            <ImageTile product={priv} className="md:col-span-4 md:row-span-2" />
            <ImageTile product={deomali} className="md:col-span-2 md:row-span-2" />
            {STAYS.slice(1).map((s) => <ImageTile key={s.slug} product={s} className="md:col-span-2 md:row-span-1" />)}
          </div>
        </div>
      </section>

      {/* Signature Deomali */}
      <section className="relative overflow-hidden bg-forest text-forest-foreground">
        <img src={IMG.koraputRoad} alt="" className="absolute inset-0 h-full w-full object-cover opacity-35" loading="lazy" />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-5 py-24 md:grid-cols-2 md:px-8 md:py-32">
          <div>
            <p className="eyebrow text-gold">Our signature camping experience</p>
            <h2 className="mt-4 text-5xl leading-[1.02] md:text-7xl">Sleep Under the Stars. Wake Up Above the Clouds.</h2>
            <p className="mt-6 font-display text-3xl text-gold">Deomali Camping from {formatINR(40000)} per person</p>
            <Link to="/camping/$slug" params={{ slug: "deomali-camping" }} className="mt-8 inline-block rounded-full bg-gold px-7 py-4 font-bold text-accent-foreground">Book Deomali Camping</Link>
          </div>
          <ul className="grid grid-cols-2 gap-px self-end overflow-hidden rounded-xl bg-forest-foreground/15">
            {[[Tent, "Tent / base camp"], [Bed, "Mattress, pillow & blanket"], [Lamp, "Chair & light"], [UserRound, "Dedicated caretaker"], [Flame, "Next-day freshen-up"], [Mountain, "Deomali hilltop views"]].map(([Icon, label]) => {
              const I = Icon as typeof Tent;
              return <li key={label as string} className="flex flex-col gap-3 bg-forest/90 p-6"><I className="text-gold" /><span className="text-sm">{label as string}</span></li>;
            })}
          </ul>
        </div>
      </section>

      {/* Private */}
      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-20 md:grid-cols-[1.1fr_1fr] md:px-8 md:py-28">
        <div>
          <SectionHead eyebrow="Private Koraput journeys" title="Your People. Your Pace. Your Koraput.">
            From {formatINR(300000)} per person — Standard tier, minimum 8 travellers. Smaller groups have their own rates.
          </SectionHead>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {priv.itinerary!.map((d) => (
              <div key={d.day} className="border-t-2 border-earth pt-4">
                <p className="eyebrow text-earth">{d.day}</p>
                <p className="mt-2 font-display text-2xl">{d.title}</p>
                <p className="mt-2 text-sm text-muted-foreground">{d.items.slice(1, -1).join(" · ")}</p>
              </div>
            ))}
          </div>
          <Link to="/private-tours" className="mt-10 inline-block rounded-full bg-primary px-7 py-4 font-bold text-primary-foreground">Customize Your Trip</Link>
        </div>
        <div className="relative min-h-[420px] overflow-hidden rounded-[2rem_2rem_10rem_2rem]">
          <img src={IMG.koraputRoad} alt="Valley road through green Koraput hills" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
        </div>
      </section>

      {/* Discover Koraput */}
      <section className="bg-forest-deep py-20 text-forest-foreground md:py-28">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionHead light eyebrow="Discover Koraput" title="Mountains, waterfalls & ancient temples." />
          <div className="mt-12 flex snap-x gap-4 overflow-x-auto pb-4 md:grid md:grid-cols-4 md:overflow-visible">
            {DESTINATIONS.map((d, i) => (
              <figure key={d.name} className={`relative w-[78%] shrink-0 snap-start overflow-hidden rounded-xl md:w-auto ${i % 3 === 0 ? "md:row-span-2 aspect-[3/4] md:aspect-auto" : "aspect-[3/4] md:aspect-square"}`}>
                <img src={d.image} alt={d.name} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
                <div className="absolute inset-0 bg-card-overlay" />
                <figcaption className="absolute inset-x-0 bottom-0 p-5">
                  <p className="font-display text-2xl">{d.name}</p>
                  <p className="text-sm text-forest-foreground/75">{d.note}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHead eyebrow="Travel memories" title="Moments From Our Camps." />
          <Link to="/gallery" className="font-semibold text-primary underline-offset-4 hover:underline">View full gallery →</Link>
        </div>
        <div className="mt-12 grid auto-rows-[180px] grid-cols-2 gap-4 md:auto-rows-[220px] md:grid-cols-4">
          <Link to="/gallery" className="group relative col-span-2 row-span-2 overflow-hidden rounded-xl">
            <img src={GALLERY_VIDEOS[0]!.poster} alt={GALLERY_VIDEOS[0]!.alt} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" />
            <span className="absolute inset-0 grid place-items-center bg-forest-deep/30">
              <span className="grid h-16 w-16 place-items-center rounded-full bg-gold text-accent-foreground shadow-lg transition group-hover:scale-110"><Play className="ml-1" /></span>
            </span>
          </Link>
          {STAY_PHOTOS.slice(0, 4).map((p, i) => (
            <Link key={p.src} to="/gallery" className={`group relative overflow-hidden rounded-xl ${i === 1 ? "row-span-2" : ""}`}>
              <img src={p.src} alt={p.alt} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" />
            </Link>
          ))}
          <Link to="/gallery" className="group relative overflow-hidden rounded-xl">
            <img src={GALLERY_VIDEOS[1]!.poster} alt={GALLERY_VIDEOS[1]!.alt} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" />
            <span className="absolute inset-0 grid place-items-center bg-forest-deep/30">
              <span className="grid h-12 w-12 place-items-center rounded-full bg-gold text-accent-foreground shadow-lg transition group-hover:scale-110"><Play className="ml-0.5" size={20} /></span>
            </span>
          </Link>
        </div>
      </section>

      {/* Rural living */}
      <section className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 md:grid-cols-2 md:px-8 md:py-28">
        <img src={IMG.rural} alt="Tiled-roof rural cottages near Deomali" loading="lazy" className="aspect-[4/3] w-full rounded-[10rem_2rem_2rem_2rem] object-cover shadow-soft" />
        <div>
          <SectionHead eyebrow="Rural Stay Near Deomali" title="Stay Close to Nature. Feel Close to Home.">
            Simple village cottages with a room, bathroom and home-cooked food available. From {formatINR(40000)} per person.
          </SectionHead>
          <Link to="/camping/$slug" params={{ slug: "rural-stay-deomali" }} className="mt-8 inline-block rounded-full bg-primary px-7 py-4 font-bold text-primary-foreground">View Rural Stay</Link>
        </div>
      </section>

      {/* Beyond Odisha */}
      <section className="relative overflow-hidden bg-forest text-forest-foreground">
        <img src={IMG.duduma} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-40" />
        <div className="relative mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32">
          <p className="eyebrow text-gold">Beyond Odisha · {three.duration}</p>
          <h2 className="mt-4 max-w-3xl text-5xl leading-[1.02] md:text-7xl">Three States. Four Days. Countless Memories.</h2>
          <p className="mt-6 max-w-xl text-lg text-forest-foreground/85">Koraput, Araku Valley &amp; Borra Caves, then Chitrakoot and Tirathgarh falls. From {formatINR(750000)}/person, based on four travellers.</p>
          <Link to="/private-tours/$slug" params={{ slug: three.slug }} className="mt-8 inline-block rounded-full bg-gold px-7 py-4 font-bold text-accent-foreground">See the Itinerary</Link>
        </div>
      </section>

      {/* Why */}
      <section className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
        <SectionHead eyebrow="Why Rural Camps" title="Local hands. Real journeys." />
        <div className="mt-12 grid gap-px overflow-hidden rounded-xl bg-border sm:grid-cols-2 lg:grid-cols-4">
          {["Local guided experiences", "Packages for every group size", "Camping & rural accommodation", "Guided sightseeing", "Transport options", "Real travel experiences", "Dedicated camp caretaker", "Custom experiences & events"].map((t, i) => (
            <div key={t} className="bg-background p-7">
              <p className="font-display text-3xl text-earth">{String(i + 1).padStart(2, "0")}</p>
              <p className="mt-3 font-semibold">{t}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-secondary py-20 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 md:grid-cols-[1fr_1.4fr] md:px-8">
          <SectionHead eyebrow="Good to know" title="Questions, answered." />
          <div className="divide-y divide-border border-y border-border">
            {FAQ.map(([q, a]) => (
              <details key={q} className="group py-5">
                <summary className="flex cursor-pointer list-none justify-between gap-4 text-lg font-semibold">{q}<span className="text-earth transition group-open:rotate-45">+</span></summary>
                <p className="mt-3 text-muted-foreground">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative overflow-hidden bg-forest-deep text-center text-forest-foreground">
        <img src={IMG.koraputRoad} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-45" />
        <div className="relative mx-auto max-w-4xl px-5 py-28 md:py-40">
          <h2 className="text-5xl leading-[1.02] md:text-7xl">Your Next Story Begins in Koraput.</h2>
          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <Link to="/upcoming-tours" className="rounded-full bg-gold px-7 py-4 font-bold text-accent-foreground">Explore Tours</Link>
            <a href={CONTACT.whatsapp} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full border border-forest-foreground/40 px-7 py-4 font-semibold hover:border-gold hover:text-gold"><MessageCircle size={18} /> WhatsApp Rural Camps</a>
          </div>
        </div>
      </section>
    </>
  );
}

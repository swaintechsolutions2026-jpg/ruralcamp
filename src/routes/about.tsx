import { createFileRoute, Link } from "@tanstack/react-router";
import { IMG } from "@/lib/site";
import { PageHero, CheckList } from "@/components/site/ui";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Rural Camps — Odisha Camping & Tour Operator" },
      { name: "description", content: "Rural Camps is a Bhubaneswar-based camping, rural stay and tour operator focused on Koraput and beyond." },
      { property: "og:title", content: "About Rural Camps" },
      { property: "og:description", content: "Let's Camp, Let's Explore! Who we are and how we travel." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHero image={IMG.rural} eyebrow="About us" title="Let's Camp, Let's Explore!" />
      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-20 md:grid-cols-2 md:px-8">
        <div className="space-y-5 text-lg text-muted-foreground">
          <p>Rural Camps is an Odisha-based camping, rural accommodation and tour business, part of the same family as Adventure Holiday.</p>
          <p>We run group departures and private trips across Koraput — Deomali, Talamali, Duduma, Gupteswar and more — alongside camps in Deomali, Talamali Valley and Ramachandi near the Puri–Konark Marine Drive.</p>
          <p>Our longer journeys extend into Andhra Pradesh and Chhattisgarh. Wherever we go, the idea is the same: less network, more connection.</p>
        </div>
        <div>
          <CheckList items={["Local guided experiences", "Packages for different group sizes", "Camping and rural accommodation", "Guided sightseeing and transport", "Custom experiences and group events"]} />
          <Link to="/contact" className="mt-8 inline-block rounded-full bg-primary px-7 py-4 font-bold text-primary-foreground">Talk to us</Link>
        </div>
      </section>
    </>
  );
}

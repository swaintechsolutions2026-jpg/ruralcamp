import { createFileRoute } from "@tanstack/react-router";
import { STAYS } from "@/lib/catalog";
import { IMG } from "@/lib/site";
import { PageHero, ImageTile, SectionHead } from "@/components/site/ui";
import { EnquiryForm } from "@/components/site/forms";

export const Route = createFileRoute("/camping/")({
  head: () => ({
    meta: [
      { title: "Camping & Rural Stays in Odisha — Deomali, Talamali, Ramachandi | Rural Camps" },
      { name: "description", content: "Deomali and Talamali camping from ₹400/person, rural cottages near Deomali, and Ramachandi beach camps at ₹600 per camp." },
      { property: "og:title", content: "Camping & Rural Stays — Rural Camps" },
      { property: "og:description", content: "Hilltop camps, valley camps, village cottages and beach camping in Odisha." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHero image={IMG.deomali} eyebrow="Camping & rural stays" title="Less Network. More Connection." />
      <section className="mx-auto max-w-7xl px-5 py-20 md:px-8">
        <div className="grid auto-rows-[340px] gap-5 md:grid-cols-2 md:auto-rows-[420px]">
          {STAYS.map((s) => <ImageTile key={s.slug} product={s} />)}
        </div>
      </section>
      <section className="bg-secondary py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 md:grid-cols-2 md:px-8">
          <SectionHead eyebrow="Custom experiences" title="Birthdays, couples, college & corporate groups.">
            Tell us what you're celebrating and we'll plan the camp around it.
          </SectionHead>
          <EnquiryForm defaultCategory="Birthday camping" title="Plan a custom camp" />
        </div>
      </section>
    </>
  );
}

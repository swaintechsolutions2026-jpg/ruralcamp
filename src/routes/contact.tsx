import { createFileRoute } from "@tanstack/react-router";
import { MapPin, MessageCircle, Phone, Instagram, Facebook } from "lucide-react";
import { CONTACT, IMG } from "@/lib/site";
import { PageHero } from "@/components/site/ui";
import { EnquiryForm } from "@/components/site/forms";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Rural Camps — Call or WhatsApp +91 6371211372" },
      { name: "description", content: "Enquire about Koraput tours, camping and rural stays. Rural Camps, Dumuduma, Bhubaneswar, Odisha." },
      { property: "og:title", content: "Contact Rural Camps" },
      { property: "og:description", content: "Plan your trip — call, WhatsApp or send an enquiry." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHero image={IMG.kolab} eyebrow="Contact" title="Let's plan your trip." />
      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-20 md:px-8 lg:grid-cols-[1fr_1.3fr]">
        <div className="space-y-8">
          <a href={CONTACT.tel} className="flex items-start gap-4"><Phone className="mt-1 text-earth" /><span><span className="eyebrow block text-muted-foreground">Call</span><span className="font-display text-3xl">{CONTACT.phone}</span></span></a>
          <a href={CONTACT.whatsapp} target="_blank" rel="noreferrer" className="flex items-start gap-4"><MessageCircle className="mt-1 text-earth" /><span><span className="eyebrow block text-muted-foreground">WhatsApp</span><span className="font-display text-3xl">Chat with us</span></span></a>
          <div className="flex items-start gap-4"><MapPin className="mt-1 text-earth" /><address className="not-italic"><span className="eyebrow block text-muted-foreground">Office</span>{CONTACT.address[0]}<br />{CONTACT.address[1]}</address></div>
          <div className="flex gap-4">
            <a href={CONTACT.instagram} target="_blank" rel="noreferrer" className="flex items-center gap-2 font-semibold text-primary"><Instagram size={18} /> Instagram</a>
            <a href={CONTACT.facebook} target="_blank" rel="noreferrer" className="flex items-center gap-2 font-semibold text-primary"><Facebook size={18} /> Facebook</a>
          </div>
        </div>
        <EnquiryForm title="Send an enquiry" />
      </section>
    </>
  );
}

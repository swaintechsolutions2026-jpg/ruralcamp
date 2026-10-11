import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, MessageCircle, Phone } from "lucide-react";
import { CONTACT } from "@/lib/site";
import { Wordmark } from "./SiteHeader";

export function SiteFooter() {
  return (
    <footer className="bg-forest-deep pb-28 pt-16 text-forest-foreground md:pb-12">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 md:grid-cols-4 md:px-8">
        <div className="md:col-span-2">
          <Wordmark />
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-forest-foreground/70">
            Camping, rural stays and guided tours across Koraput, Deomali, Talamali and Ramachandi — and beyond into
            Andhra Pradesh and Chhattisgarh. Less network. More connection.
          </p>
          <div className="mt-6 flex gap-3">
            <a href={CONTACT.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="grid h-10 w-10 place-items-center rounded-full border border-forest-foreground/20 hover:border-gold hover:text-gold"><Instagram size={18} /></a>
            <a href={CONTACT.facebook} target="_blank" rel="noreferrer" aria-label="Facebook" className="grid h-10 w-10 place-items-center rounded-full border border-forest-foreground/20 hover:border-gold hover:text-gold"><Facebook size={18} /></a>
            <a href={CONTACT.whatsapp} target="_blank" rel="noreferrer" aria-label="WhatsApp" className="grid h-10 w-10 place-items-center rounded-full border border-forest-foreground/20 hover:border-gold hover:text-gold"><MessageCircle size={18} /></a>
          </div>
        </div>
        <div>
          <p className="eyebrow text-gold">Explore</p>
          <ul className="mt-4 space-y-2 text-sm text-forest-foreground/75">
            <li><Link to="/upcoming-tours" className="hover:text-gold">Upcoming group tours</Link></li>
            <li><Link to="/private-tours" className="hover:text-gold">Private tours</Link></li>
            <li><Link to="/camping" className="hover:text-gold">Camping & rural stays</Link></li>
            <li><Link to="/destinations" className="hover:text-gold">Destinations</Link></li>
            <li><Link to="/gallery" className="hover:text-gold">Gallery</Link></li>
            <li><Link to="/about" className="hover:text-gold">About us</Link></li>
          </ul>
        </div>
        <div>
          <p className="eyebrow text-gold">Contact</p>
          <address className="mt-4 space-y-2 text-sm not-italic text-forest-foreground/75">
            <p>{CONTACT.address[0]}<br />{CONTACT.address[1]}</p>
            <a href={CONTACT.tel} className="flex items-center gap-2 hover:text-gold"><Phone size={14} /> {CONTACT.phone}</a>
            <Link to="/contact" className="block hover:text-gold">Send an enquiry →</Link>
          </address>
        </div>
      </div>
      <div className="mx-auto mt-14 max-w-7xl px-5 text-xs text-forest-foreground/50 md:px-8">
        © {new Date().getFullYear()} Rural Camps. All rights reserved.
      </div>
    </footer>
  );
}

export function MobileActionBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 border-t border-forest-foreground/10 bg-forest-deep/95 pb-[env(safe-area-inset-bottom)] text-forest-foreground backdrop-blur md:hidden">
      <a href={CONTACT.tel} className="flex h-14 items-center justify-center gap-2 text-sm font-semibold"><Phone size={16} /> Call</a>
      <a href={CONTACT.whatsapp} target="_blank" rel="noreferrer" className="flex h-14 items-center justify-center gap-2 border-x border-forest-foreground/10 text-sm font-semibold"><MessageCircle size={16} /> WhatsApp</a>
      <Link to="/upcoming-tours" className="flex h-14 items-center justify-center bg-gold text-sm font-bold text-accent-foreground">Book Now</Link>
    </div>
  );
}

import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { CONTACT } from "@/lib/site";

const NAV = [
  { to: "/upcoming-tours", label: "Group Tours" },
  { to: "/private-tours", label: "Private Tours" },
  { to: "/camping", label: "Camping & Stays" },
  { to: "/destinations", label: "Destinations" },
  { to: "/gallery", label: "Gallery" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`flex flex-col leading-none ${className}`}>
      <span className="font-display text-2xl tracking-wide">RURAL CAMPS</span>
      <span className="eyebrow mt-1 text-[0.55rem] text-gold">Let's Camp, Let's Explore!</span>
    </span>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 text-forest-foreground transition-colors duration-300 ${
        scrolled || open ? "bg-forest-deep/95 backdrop-blur" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-5 md:h-20 md:px-8">
        <Link to="/" onClick={() => setOpen(false)} aria-label="Rural Camps home">
          <Wordmark />
        </Link>
        <nav className="hidden items-center gap-6 lg:flex">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="text-sm font-medium text-forest-foreground/80 transition-colors hover:text-gold"
              activeProps={{ className: "text-gold" }}
            >
              {n.label}
            </Link>
          ))}
          <a
            href={CONTACT.whatsapp}
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-accent-foreground transition hover:brightness-105"
          >
            WhatsApp Us
          </a>
        </nav>
        <button
          className="grid h-11 w-11 place-items-center lg:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <nav className="h-[calc(100dvh-4rem)] overflow-y-auto border-t border-forest-foreground/10 px-5 pb-28 pt-4 lg:hidden">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              onClick={() => setOpen(false)}
              className="block border-b border-forest-foreground/10 py-4 font-display text-3xl"
              activeProps={{ className: "text-gold" }}
            >
              {n.label}
            </Link>
          ))}
          <p className="mt-8 text-sm text-forest-foreground/60">Call or WhatsApp {CONTACT.phone}</p>
        </nav>
      )}
    </header>
  );
}

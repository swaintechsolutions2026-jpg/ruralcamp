// Product catalog for phase 1. Prices are integer paise. Shared by browser and server;
// the server recomputes every booking total from this file, never from the browser.
import { IMG } from "./site";

export type ProductType = "group-tour" | "private-tour" | "package" | "stay";

export type PriceOption = {
  id: string;
  label: string;
  pricePaise: number | null; // null = price on request
  unit: "person" | "camp";
  personsPerUnit?: number;
  minTravellers?: number; // tier only applies from this group size
  maxTravellers?: number;
};

export type ItineraryDay = { day: string; title: string; items: string[] };

export type Product = {
  type: ProductType;
  slug: string;
  title: string;
  kicker: string;
  summary: string;
  image: string;
  location: string;
  startDate?: string; // YYYY-MM-DD, Asia/Kolkata
  endDate?: string;
  dateLabel?: string;
  duration?: string;
  category?: "Standard" | "Deluxe";
  status?: "open" | "completed";
  options: PriceOption[];
  itinerary?: ItineraryDay[];
  inclusions?: string[];
  exclusions?: string[];
  facilities?: string[];
  notes?: string[];
};

const rs = (n: number) => n * 100;

const GROUP_INCLUSIONS = [
  "Train tickets (Ex-Bhubaneswar options)",
  "Hotel accommodation",
  "Breakfast and dinner",
  "Sightseeing transport",
  "Dedicated guide",
  "Photography and videography",
];

export const GROUP_TOURS: Product[] = [
  {
    type: "group-tour",
    slug: "koraput-deluxe-16-oct-2026",
    title: "Koraput Deluxe Group Tour",
    kicker: "Deluxe departure",
    summary: "A deluxe group departure into the hills of Koraput, with pickup from Bhubaneswar or Koraput.",
    image: IMG.deomali,
    location: "Koraput, Odisha",
    startDate: "2026-10-16",
    endDate: "2026-10-16",
    dateLabel: "Departs 16 October 2026",
    category: "Deluxe",
    status: "open",
    options: [
      { id: "ex-bbsr", label: "Ex-Bhubaneswar", pricePaise: rs(6500), unit: "person" },
      { id: "ex-koraput", label: "Ex-Koraput", pricePaise: rs(4500), unit: "person" },
    ],
    inclusions: GROUP_INCLUSIONS,
    notes: ["Exact duration and day-wise plan for this departure will be confirmed by our team."],
  },
  {
    type: "group-tour",
    slug: "koraput-standard-30-oct-2026",
    title: "Koraput Standard Group Tour",
    kicker: "Standard departure",
    summary: "Four days by overnight train into Koraput — viewpoints, waterfalls, cave temples and coffee country.",
    image: IMG.koraputRoad,
    location: "Koraput, Odisha",
    startDate: "2026-10-30",
    endDate: "2026-11-02",
    dateLabel: "30 Oct – 2 Nov 2026",
    duration: "4 days incl. overnight train",
    category: "Standard",
    status: "open",
    options: [
      { id: "ex-bbsr-ac", label: "Ex-Bhubaneswar · AC train", pricePaise: rs(5500), unit: "person" },
      { id: "ex-bbsr-nonac", label: "Ex-Bhubaneswar · Non-AC train", pricePaise: rs(4500), unit: "person" },
      { id: "ex-koraput", label: "Ex-Koraput", pricePaise: rs(3500), unit: "person" },
    ],
    itinerary: [
      { day: "30 Oct", title: "Departure", items: ["Train from Bhubaneswar", "Overnight journey"] },
      { day: "31 Oct", title: "Koraput hills", items: ["Arrival & hotel check-in", "Deomali", "Talamali", "Coffee Garden", "Sai Temple", "Kanta Baunsuni Temple", "Hanuman attraction"] },
      { day: "1 Nov", title: "Waterfalls & temples", items: ["Duduma Waterfall", "Gupteswar Cave Temple", "Sabara Srikhetra", "Return journey"] },
      { day: "2 Nov", title: "Home", items: ["Arrival in Bhubaneswar"] },
    ],
    inclusions: GROUP_INCLUSIONS,
  },
  {
    type: "group-tour",
    slug: "koraput-deluxe-13-nov-2026",
    title: "Koraput Deluxe Group Tour",
    kicker: "2-Star Deluxe package",
    summary: "Deluxe stay in Semiliguda with two full days across Koraput's finest hills, falls and temples.",
    image: IMG.duduma,
    location: "Koraput, Odisha",
    startDate: "2026-11-13",
    endDate: "2026-11-16",
    dateLabel: "13 – 16 Nov 2026",
    duration: "4 days incl. overnight trains",
    category: "Deluxe",
    status: "open",
    options: [
      { id: "ex-bbsr", label: "Ex-Bhubaneswar", pricePaise: rs(6500), unit: "person" },
      { id: "ex-koraput", label: "Ex-Koraput", pricePaise: rs(4500), unit: "person" },
    ],
    itinerary: [
      { day: "13 Nov", title: "Departure", items: ["Bhubaneswar to Koraput by train", "Overnight journey"] },
      { day: "14 Nov", title: "Koraput hills", items: ["Arrival, hotel transfer & breakfast", "Deomali", "Talamali", "Coffee Garden", "Sai Temple", "Kanta Baunsuni Temple", "Hanuman attraction", "Dinner & night stay in Semiliguda"] },
      { day: "15 Nov", title: "Waterfalls & temples", items: ["Breakfast & checkout", "Duduma Waterfall", "Gupteswar Cave Temple", "Kolab Dam", "Sabara Srikhetra", "Evening train"] },
      { day: "16 Nov", title: "Home", items: ["Arrival at Bhubaneswar"] },
    ],
    inclusions: GROUP_INCLUSIONS,
  },
  {
    type: "group-tour",
    slug: "strangers-tour-9-oct-2026",
    title: "Strangers Tour",
    kicker: "Completed",
    summary: "Our 9–12 October 2026 Strangers Tour has been completed.",
    image: IMG.talamali,
    location: "Koraput, Odisha",
    startDate: "2026-10-09",
    endDate: "2026-10-12",
    dateLabel: "9 – 12 Oct 2026",
    status: "completed",
    options: [],
  },
];

export const PRIVATE_TOURS: Product[] = [
  {
    type: "private-tour",
    slug: "koraput-2-day-private",
    title: "2-Day Private Koraput Tour",
    kicker: "Your people. Your pace.",
    summary: "A private two-day circuit of Koraput with hotel stay, sightseeing vehicle, and pickup and drop.",
    image: IMG.koraputRoad,
    location: "Koraput, Odisha",
    duration: "2 days / 1 night",
    options: [
      { id: "std-8", label: "Standard · group of 8+", pricePaise: rs(3000), unit: "person", minTravellers: 8 },
      { id: "std-4", label: "Standard · group of 4–7", pricePaise: rs(3500), unit: "person", minTravellers: 4, maxTravellers: 7 },
      { id: "dlx-8", label: "Deluxe · group of 8+", pricePaise: rs(3500), unit: "person", minTravellers: 8 },
      { id: "dlx-4", label: "Deluxe · group of 4–7", pricePaise: rs(4000), unit: "person", minTravellers: 4, maxTravellers: 7 },
      { id: "couple", label: "Couple / 2–3 people", pricePaise: null, unit: "person", minTravellers: 2, maxTravellers: 3 },
    ],
    itinerary: [
      { day: "Day 1", title: "Hills & viewpoints", items: ["Pickup from Koraput Railway Station or Bus Stop", "Hotel check-in", "Damanjodi Township", "Kanta Baunsuni Temple", "Sai Temple", "108 Ft Hanuman", "Talamali Valley", "Deomali Hill Top", "Hotel night stay"] },
      { day: "Day 2", title: "Falls, caves & dams", items: ["Hotel checkout", "Sabara Srikhetra", "Duduma Waterfall", "Gupteswar Cave Temple", "Machhakund Hydro Project", "Kolab Dam", "Railway Station / Bus Stop drop"] },
    ],
    inclusions: ["Standard / Deluxe hotel stay", "Shared accommodation as per package", "Sightseeing vehicle", "Pickup and drop as per package"],
    exclusions: ["Meals, unless added to a custom package", "Sightseeing entry tickets, unless included"],
    notes: ["Sequence and timing may change for weather, road or safety reasons."],
  },
  {
    type: "package",
    slug: "three-state-adventure",
    title: "Odisha · Andhra · Chhattisgarh Adventure",
    kicker: "Three states. Four days.",
    summary: "Koraput's hills, Araku's coffee valleys and Borra Caves, and the great falls of Chhattisgarh.",
    image: IMG.deomali,
    location: "Odisha, Andhra Pradesh, Chhattisgarh",
    duration: "3 nights / 4 days",
    options: [
      { id: "group-4", label: "Based on 4 travellers", pricePaise: rs(7500), unit: "person", minTravellers: 4 },
      { id: "smaller", label: "Fewer than 4 travellers", pricePaise: null, unit: "person", maxTravellers: 3 },
    ],
    itinerary: [
      { day: "Day 1", title: "Koraput", items: ["Deomali", "Talamali", "Coffee Garden", "Kanta Baunsuni", "Sai Temple", "Hanuman attraction"] },
      { day: "Day 2", title: "Andhra Pradesh", items: ["Araku Valley", "Coffee Plantations", "Borra Caves", "Sabara Srikhetra"] },
      { day: "Day 3", title: "Chhattisgarh", items: ["Chitrakoot Waterfalls", "Tirathgarh Waterfalls"] },
      { day: "Day 4", title: "Koraput", items: ["Gupteswar", "Duduma Waterfall", "Kolab Dam"] },
    ],
    inclusions: ["Vehicle", "Driver-cum-guide", "Accommodation", "Railway Station / Bus Stop pickup and drop", "Food", "Entry tickets"],
  },
];

export const STAYS: Product[] = [
  {
    type: "stay",
    slug: "deomali-camping",
    title: "Deomali Camping",
    kicker: "Our signature camp",
    summary: "Sleep under the stars. Wake up above the clouds.",
    image: IMG.deomali,
    location: "Deomali, Koraput",
    options: [{ id: "per-person", label: "Per person", pricePaise: rs(400), unit: "person" }],
    facilities: ["Tent / base camp", "Mattress", "Pillow", "Blanket", "Chair", "Light", "Dedicated caretaker", "Next-day bathroom / freshen-up"],
    notes: ["Food, parking and pickup details are confirmed with you when we review your booking."],
  },
  {
    type: "stay",
    slug: "talamali-valley-camping",
    title: "Talamali Valley Camping",
    kicker: "Open valley camping",
    summary: "Pitch up among the rolling grasslands of Talamali Valley.",
    image: IMG.talamali,
    location: "Talamali Valley, Koraput",
    options: [{ id: "per-person", label: "Per person", pricePaise: rs(400), unit: "person" }],
    notes: ["Facilities are shared with you when we confirm your booking."],
  },
  {
    type: "stay",
    slug: "rural-stay-deomali",
    title: "Rural Stay Near Deomali",
    kicker: "Stay close to nature",
    summary: "Tiled-roof village cottages near Deomali — simple rooms, home food, open skies.",
    image: IMG.rural,
    location: "Near Deomali, Koraput",
    options: [{ id: "per-person", label: "Per person (from)", pricePaise: rs(400), unit: "person" }],
    facilities: ["Rural accommodation", "Room", "Bathroom", "Food available"],
  },
  {
    type: "stay",
    slug: "ramachandi-camping",
    title: "Ramachandi Camping",
    kicker: "By the Marine Drive",
    summary: "Beach-side camping near the Puri–Konark Marine Drive for couples, friends and small parties.",
    image: IMG.kolab,
    location: "Ramachandi, Puri–Konark Marine Drive",
    options: [{ id: "per-camp", label: "Per camp (2 persons)", pricePaise: rs(600), unit: "camp", personsPerUnit: 2 }],
    facilities: ["Camp / tent", "Foam mattress", "Bedsheet", "Pillow", "Blanket", "Disco lighting in party area", "Music facilities", "Firewood & cooking utensils at no extra charge"],
    notes: ["Advance reservation required.", "Ideal for couples, friends, small parties and special occasions."],
  },
];

export const ALL_PRODUCTS = [...GROUP_TOURS, ...PRIVATE_TOURS, ...STAYS];

export const findProduct = (slug: string) => ALL_PRODUCTS.find((p) => p.slug === slug);

export function todayInKolkata(now = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Kolkata" }).format(now);
}

/** A departure is upcoming only while open and its start date has not passed. */
export function isUpcoming(p: Product, today = todayInKolkata()): boolean {
  return p.status === "open" && !!p.startDate && p.startDate >= today;
}

export const upcomingTours = (today?: string) => GROUP_TOURS.filter((t) => isUpcoming(t, today));
export const pastTours = (today?: string) => GROUP_TOURS.filter((t) => !isUpcoming(t, today));

export const startingPrice = (p: Product) => {
  const prices = p.options.map((o) => o.pricePaise).filter((n): n is number => n != null);
  return prices.length ? Math.min(...prices) : null;
};

export const formatINR = (paise: number) =>
  "₹" + (paise / 100).toLocaleString("en-IN", { maximumFractionDigits: 0 });

export const DESTINATIONS = [
  { name: "Deomali Hill Top", note: "Odisha's highest peak, wrapped in cloud", image: IMG.deomali },
  { name: "Talamali Valley", note: "Open grasslands and big skies", image: IMG.talamali },
  { name: "Duduma Waterfall", note: "A sheer drop through granite walls", image: IMG.duduma },
  { name: "Gupteswar Cave Temple", note: "An ancient Shiva shrine in limestone", image: IMG.gupteswar },
  { name: "Kolab Dam", note: "A vast reservoir ringed by hills", image: IMG.kolab },
  { name: "Sabara Srikhetra", note: "Koraput's gleaming white Jagannath temple", image: IMG.sabara },
  { name: "Kanta Baunsuni Temple", note: "A colourful hillside shrine", image: IMG.kanta },
  { name: "Koraput Roads", note: "Valley drives past paddy and grazing herds", image: IMG.koraputRoad },
];

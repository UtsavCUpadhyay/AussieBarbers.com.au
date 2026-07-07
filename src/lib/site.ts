// Central content model for AussieBarbers.
// Pricing researched against Brisbane mobile-barber market (2025-26):
// shop cuts ~$35-55; mobile/premium carries a convenience premium.

export const SITE = {
  name: "AussieBarbers",
  domain: "aussiebarbers.com.au",
  phone: "1300 000 000",
  email: "hello@aussiebarbers.com.au",
  city: "Brisbane",
  tagline: "Premium mobile barbers, at your door.",
};

export function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/\(.*?\)/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export type Service = {
  name: string;
  price: string;
  duration: string;
  description: string;
  popular?: boolean;
};

export const SERVICES: Service[] = [
  {
    name: "Signature Cut",
    price: "$55",
    duration: "45 min",
    description: "A tailored scissor or clipper cut, styled and finished. Our most-booked service.",
    popular: true,
  },
  {
    name: "Skin Fade",
    price: "$60",
    duration: "45 min",
    description: "Precision fade blended to the skin, sharp lines and a clean finish.",
  },
  {
    name: "Cut + Beard",
    price: "$80",
    duration: "60 min",
    description: "Full haircut paired with a hot-towel beard sculpt. The complete reset.",
    popular: true,
  },
  {
    name: "Beard Sculpt",
    price: "$40",
    duration: "30 min",
    description: "Shape, line-up and hot-towel finish for a crisp, defined beard.",
  },
  {
    name: "Buzz Cut",
    price: "$40",
    duration: "25 min",
    description: "Single-guard all over, tidy neckline. Fast and fuss-free.",
  },
  {
    name: "Kids Cut (u12)",
    price: "$45",
    duration: "30 min",
    description: "Patient, friendly cuts for kids — done at home where they're comfortable.",
  },
  {
    name: "Seniors Cut",
    price: "$45",
    duration: "30 min",
    description: "Comfortable, unhurried grooming at home. NDIS & aged-care friendly.",
  },
  {
    name: "The Groom (VIP)",
    price: "$120",
    duration: "90 min",
    description: "Cut, beard, hot towel, styling and a drink. The full flagship experience.",
  },
];

export const BENEFITS = [
  {
    title: "They come to you",
    body: "Home, office, hotel or on-set. Skip the wait — your barber arrives on time with everything they need.",
    icon: "pin",
  },
  {
    title: "Verified & insured",
    body: "Every barber is ID-checked, qualification-verified, police-checked and fully insured before their first booking.",
    icon: "shield",
  },
  {
    title: "Book in 60 seconds",
    body: "Pick a service, a time and a barber. Pay securely in-app. Get reminders and live arrival tracking.",
    icon: "bolt",
  },
  {
    title: "Consistent, premium quality",
    body: "Rated barbers, transparent pricing and a 100% satisfaction guarantee on every single cut.",
    icon: "star",
  },
];

export const STEPS = [
  {
    n: "01",
    title: "Choose your service",
    body: "Cut, fade, beard or the full VIP groom — pick what you need and see the price upfront.",
  },
  {
    n: "02",
    title: "Pick time & barber",
    body: "Choose a barber near you and a time that suits. Same-day slots are often available.",
  },
  {
    n: "03",
    title: "Relax — they come to you",
    body: "Track your barber's arrival in real time. They set up, cut, and clean up. You do nothing.",
  },
  {
    n: "04",
    title: "Pay & rate",
    body: "Payment is secure and cashless. Rate your barber and earn loyalty points toward your next cut.",
  },
];

export const AREAS = [
  "Brisbane CBD",
  "New Farm",
  "Fortitude Valley",
  "West End",
  "Paddington",
  "Newstead",
  "Teneriffe",
  "Hamilton",
  "Bulimba",
  "Ascot",
  "Toowong",
  "South Brisbane",
  "Kangaroo Point",
  "Spring Hill",
  "Chermside",
  "Carindale",
];

export const SOLUTIONS = [
  {
    title: "Weddings",
    body: "Groom and groomsmen styled on the morning, at your venue. Relaxed, sharp, photo-ready.",
  },
  {
    title: "Corporate & offices",
    body: "On-site grooming days for your team. A standout perk that staff genuinely love.",
  },
  {
    title: "Hotels & concierge",
    body: "In-room barbering for guests. Add a premium amenity with zero overhead.",
  },
  {
    title: "Events & film",
    body: "On-call grooming for shoots, launches and functions. Reliable and on schedule.",
  },
];

export const FAQS = [
  {
    q: "What areas do you cover?",
    a: "We're launching across Greater Brisbane, with Gold Coast and Sunshine Coast next. Enter your suburb at checkout to see available barbers near you.",
  },
  {
    q: "How much is the call-out fee?",
    a: "Prices shown are all-inclusive within our core service zones — no surprise travel fees. A small travel surcharge may apply for outer suburbs, always shown before you pay.",
  },
  {
    q: "Are your barbers qualified and insured?",
    a: "Yes. Every barber is qualification-verified, ID and police-checked, and carries public liability insurance before they take a single booking.",
  },
  {
    q: "What do you need at my place?",
    a: "Just a bit of space and a power point. Your barber brings the chair, tools, capes and cleans up completely afterwards.",
  },
  {
    q: "How do I pay?",
    a: "Securely in-app via card or Apple/Google Pay — completely cashless. You're only charged once your booking is confirmed.",
  },
  {
    q: "Can I request the same barber again?",
    a: "Absolutely. Favourite any barber and rebook them in a couple of taps. Members get priority access to their preferred barber.",
  },
];

export const STATS = [
  { value: "60s", label: "Average booking time" },
  { value: "100%", label: "Satisfaction guarantee" },
  { value: "4.9★", label: "Average barber rating" },
  { value: "7 days", label: "Same-week availability" },
];

// Suburbs we build dedicated local-SEO landing pages for.
// Each becomes /mobile-barber/<slug> targeting "mobile barber <suburb>".
export const SUBURBS = [
  "New Farm",
  "Fortitude Valley",
  "West End",
  "Paddington",
  "Newstead",
  "Teneriffe",
  "Hamilton",
  "Bulimba",
  "Ascot",
  "Toowong",
  "South Brisbane",
  "Kangaroo Point",
  "Spring Hill",
  "Chermside",
  "Carindale",
  "Brisbane City",
];

export type SuburbPage = {
  suburb: string;
  slug: string;
};

export function getSuburbPages(): SuburbPage[] {
  return SUBURBS.map((s) => ({ suburb: s, slug: slugify(s) }));
}

export function getSuburbBySlug(slug: string): SuburbPage | undefined {
  return getSuburbPages().find((s) => s.slug === slug);
}

export function getServiceBySlug(slug: string): Service | undefined {
  return SERVICES.find((s) => slugify(s.name) === slug);
}

// ---- Barber roster (sample profiles for launch; real barbers replace these) ----
export type Barber = {
  name: string;
  slug: string;
  initials: string;
  rating: number;
  reviews: number;
  cuts: string;
  years: number;
  suburb: string;
  specialties: string[];
  bio: string;
};

export const BARBERS: Barber[] = [
  {
    name: "Marco Rossi",
    slug: "marco-rossi",
    initials: "MR",
    rating: 4.9,
    reviews: 214,
    cuts: "1,800+",
    years: 9,
    suburb: "New Farm",
    specialties: ["Skin fades", "Beard sculpts", "Classic cuts"],
    bio: "Nine years behind the chair, from Sydney's east to Brisbane's inner north. Marco is known for razor-sharp fades and a calm, unhurried chair-side manner.",
  },
  {
    name: "Jayden Cole",
    slug: "jayden-cole",
    initials: "JC",
    rating: 4.9,
    reviews: 176,
    cuts: "1,400+",
    years: 7,
    suburb: "West End",
    specialties: ["Textured crops", "Scissor work", "Kids cuts"],
    bio: "A West End local with a light touch and an eye for modern, textured styles. Jayden's patient, friendly approach makes him a favourite for families.",
  },
  {
    name: "Sam Whitfield",
    slug: "sam-whitfield",
    initials: "SW",
    rating: 5.0,
    reviews: 132,
    cuts: "1,100+",
    years: 11,
    suburb: "Ascot",
    specialties: ["Wedding grooming", "Hot-towel shaves", "Executive cuts"],
    bio: "Eleven years of craft, specialising in weddings and the full VIP groom. Sam brings a polished, five-star experience to every appointment.",
  },
  {
    name: "Leo Nguyen",
    slug: "leo-nguyen",
    initials: "LN",
    rating: 4.8,
    reviews: 158,
    cuts: "1,300+",
    years: 6,
    suburb: "Fortitude Valley",
    specialties: ["Fades", "Line-ups", "Colour"],
    bio: "Fast, precise and always on trend. Leo is the go-to for crisp line-ups and bold, contemporary looks around the Valley and CBD.",
  },
];

export function getBarberBySlug(slug: string): Barber | undefined {
  return BARBERS.find((b) => b.slug === slug);
}

// ---- Reviews ----
export type Review = {
  name: string;
  suburb: string;
  rating: number;
  text: string;
  service: string;
};

export const REVIEWS: Review[] = [
  {
    name: "Daniel K.",
    suburb: "Teneriffe",
    rating: 5,
    text: "Booked a cut + beard for 7am before work — barber turned up early, setup took two minutes and the fade was the best I've had in Brisbane. Game changer.",
    service: "Cut + Beard",
  },
  {
    name: "Priya S.",
    suburb: "Paddington",
    rating: 5,
    text: "Got my two boys done at home on a Sunday. No meltdowns, no waiting room, both cuts spot on. Will absolutely rebook.",
    service: "Kids Cut",
  },
  {
    name: "Tom R.",
    suburb: "Ascot",
    rating: 5,
    text: "Had Sam do the groomsmen on my wedding morning. Professional, punctual, and everyone looked sharp in the photos. Cannot recommend enough.",
    service: "Wedding grooming",
  },
  {
    name: "Michael O.",
    suburb: "Brisbane City",
    rating: 5,
    text: "The convenience is unreal. Booking took under a minute, tracked his arrival like an Uber, paid in the app. This is how barbering should work.",
    service: "Signature Cut",
  },
  {
    name: "James L.",
    suburb: "Bulimba",
    rating: 4,
    text: "Great cut and lovely bloke. Ran ten minutes late but messaged ahead, so no drama. Quality was well worth it.",
    service: "Skin Fade",
  },
  {
    name: "Anh T.",
    suburb: "West End",
    rating: 5,
    text: "Signed up for the monthly membership after my first cut. Always sharp, never have to think about it. Best subscription I have.",
    service: "The Groom (VIP)",
  },
];

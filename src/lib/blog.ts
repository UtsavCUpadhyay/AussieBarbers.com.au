// Editorial content for SEO. Each post targets a real search intent.

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  date: string; // ISO
  readMins: number;
  tag: string;
  sections: { h?: string; p: string }[];
};

export const POSTS: Post[] = [
  {
    slug: "how-much-does-a-mobile-barber-cost-brisbane",
    title: "How much does a mobile barber cost in Brisbane?",
    excerpt:
      "A straight-talking guide to mobile barber pricing in Brisbane — what you'll pay, what's included, and how it compares to a shop.",
    date: "2026-06-20",
    readMins: 4,
    tag: "Pricing",
    sections: [
      {
        p: "If you're thinking about booking a barber to come to you, the first question is usually the same: what does it actually cost? Here's an honest breakdown for Brisbane in 2026.",
      },
      {
        h: "The short answer",
        p: "A mobile haircut in Brisbane typically ranges from $40 for a simple buzz cut to $80 for a full cut-and-beard, with a premium VIP groom around $120. At AussieBarbers, prices are all-inclusive within our core service zones — there's no separate call-out fee bolted on at the end.",
      },
      {
        h: "Why is it a little more than a shop?",
        p: "A walk-in shop cut in Brisbane runs roughly $35–$55. Mobile carries a small premium because the barber travels to you, brings all their own equipment, and gives you a private, one-on-one appointment with zero waiting. For most people, the time saved — no travel, no queue — is worth more than the difference.",
      },
      {
        h: "What's included in the price",
        p: "Every AussieBarbers booking includes a consultation, the cut or service itself, all tools, capes and premium products, and a complete clean-up afterwards. Payment is cashless and secure, and you're only charged once your barber is confirmed.",
      },
      {
        h: "Ways to pay less",
        p: "Students and seniors get a discount, families and groups can book together at a better rate, and our monthly membership works out cheaper per cut if you're getting a regular trim. If you're overdue every few weeks, the membership is usually the smartest option.",
      },
    ],
  },
  {
    slug: "mobile-barber-vs-barbershop",
    title: "Mobile barber vs barbershop: which is right for you?",
    excerpt:
      "Convenience, price, quality and experience — how a mobile barber stacks up against a traditional barbershop.",
    date: "2026-06-28",
    readMins: 5,
    tag: "Guides",
    sections: [
      {
        p: "Barbershops aren't going anywhere — but for a lot of people, having a barber come to them has quietly become the better option. Here's how the two compare.",
      },
      {
        h: "Convenience",
        p: "This is the big one. With a mobile barber there's no travel, no parking, and no waiting room. You book a time, the barber arrives, and you're fresh in under an hour — often before work or after the kids are down. For busy professionals, parents and anyone who values their time, it's hard to beat.",
      },
      {
        h: "Quality",
        p: "A common myth is that mobile means lower quality. In reality, the barbers are the same professionals you'd find in a good shop — the only difference is where the chair is. Because appointments are one-on-one and unhurried, many people find the cut is actually more considered.",
      },
      {
        h: "Experience",
        p: "A shop has atmosphere and walk-in spontaneity. A mobile cut is private and relaxed — your space, your music, your coffee. Neither is 'better'; it depends on what you want from the half hour.",
      },
      {
        h: "The verdict",
        p: "If you value time and convenience, go mobile. If you love the ritual of the shop, keep it. Plenty of people do both — a shop cut when they're out, and a mobile barber when life's busy.",
      },
    ],
  },
  {
    slug: "wedding-grooming-checklist-groom",
    title: "The groom's grooming checklist for the wedding morning",
    excerpt:
      "From when to book your barber to how to keep the whole party sharp — a simple grooming plan for your big day.",
    date: "2026-07-02",
    readMins: 4,
    tag: "Weddings",
    sections: [
      {
        p: "Wedding photos last forever, and grooming is one of the easiest things to get right with a little planning. Here's a simple checklist for the groom and the party.",
      },
      {
        h: "Two weeks out: the shape-up cut",
        p: "Get a haircut about 10–14 days before the wedding, not the day before. This lets a fresh cut settle so it looks natural — not just-out-of-the-chair sharp — in your photos.",
      },
      {
        h: "The morning of: book a mobile barber",
        p: "Having a barber come to your venue or hotel on the morning is the move. The groom and groomsmen get styled together, on schedule, without anyone leaving to find a shop. It keeps the morning calm and everyone photo-ready at the same time.",
      },
      {
        h: "Don't forget the beard",
        p: "A hot-towel beard sculpt on the morning makes a huge difference in close-up photos. If you don't have a beard, a clean neck and cheek line-up gives that crisp, intentional finish.",
      },
      {
        h: "Book early",
        p: "Wedding-morning slots go fast, especially in peak season. Lock in your barber as soon as you have a date and venue confirmed — the same way you'd book any other key supplier.",
      },
    ],
  },
];

export function getPostBySlug(slug: string): Post | undefined {
  return POSTS.find((p) => p.slug === slug);
}

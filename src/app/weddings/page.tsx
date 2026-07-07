import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Icon } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Wedding barber Brisbane — groom & groomsmen grooming",
  description:
    "Get the groom and groomsmen wedding-ready without leaving the venue. AussieBarbers brings hot-towel grooming to your Brisbane wedding morning. Enquire now.",
  alternates: { canonical: "https://aussiebarbers.com.au/weddings" },
};

const INCLUDES = [
  "Groom & groomsmen styled together on the morning",
  "Cuts, line-ups and hot-towel beard sculpts",
  "At your venue, hotel or Airbnb — no travel",
  "On schedule, photo-ready before the photographer arrives",
  "Calm, relaxed setup so the morning stays stress-free",
];

export default function WeddingsPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <section className="section-glow container-x py-16 md:py-24">
          <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <span className="eyebrow">Wedding grooming</span>
              <h1 className="mt-4 font-display text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
                Sharp for the <span className="text-gradient-gold">big day</span>.
              </h1>
              <p className="mt-5 max-w-lg text-lg leading-relaxed text-muted">
                Your wedding photos last forever. We bring premium barbering to
                your Brisbane wedding morning so the groom and the whole party
                look their best — without anyone leaving the venue.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/book" className="btn-gold">
                  Enquire about your date <Icon name="arrow" width={18} height={18} />
                </Link>
                <Link href="/blog/wedding-grooming-checklist-groom" className="btn-ghost">
                  Read the checklist
                </Link>
              </div>
            </div>

            <div className="glass rounded-[1.5rem] p-8">
              <h2 className="font-display text-xl font-semibold">What&apos;s included</h2>
              <ul className="mt-5 space-y-3">
                {INCLUDES.map((i) => (
                  <li key={i} className="flex items-start gap-3 text-sm">
                    <Icon name="check" width={18} height={18} className="mt-0.5 shrink-0 text-gold" />
                    <span className="text-cream/90">{i}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 rounded-xl border border-gold/20 bg-gold-soft/40 p-4 text-sm text-muted">
                Wedding-morning slots book out fast in peak season — lock in your
                barber as soon as your date is set.
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

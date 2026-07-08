import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Icon } from "@/components/Icons";

export const metadata: Metadata = {
  title: "The Members Club — a monthly barber subscription",
  description:
    "Always sharp for $89/month. One premium cut a month, priority booking, member pricing and your preferred barber, guaranteed. Cancel anytime.",
  alternates: { canonical: "https://aussiebarbers.com.au/membership" },
};

const TIERS = [
  {
    name: "Casual",
    price: "$0",
    cadence: "pay as you go",
    features: ["Book any barber, any time", "Standard pricing", "No commitment"],
    cta: "Book a one-off",
  },
  {
    name: "Members Club",
    price: "$89",
    cadence: "per month",
    featured: true,
    features: [
      "One premium cut every month",
      "Priority same-day booking",
      "Locked-in member pricing",
      "Free beard tidy between cuts",
      "Your preferred barber, guaranteed",
      "Cancel anytime",
    ],
    cta: "Join the club",
  },
  {
    name: "Family",
    price: "$149",
    cadence: "per month",
    features: ["Up to 3 people", "One cut each per month", "Best per-cut value", "Priority booking for all"],
    cta: "Start family plan",
  },
];

export default function MembershipPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <section className="section-glow container-x py-16 md:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow">The Members Club</span>
            <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
              Never look <span className="text-gradient-gold">overdue</span> again.
            </h1>
            <p className="mt-4 text-muted">
              A cut arrives at your door every month like clockwork. Priority
              access, member pricing, your favourite barber. Cancel anytime.
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-5xl gap-5 lg:grid-cols-3">
            {TIERS.map((t) => (
              <div
                key={t.name}
                className={`card flex flex-col p-7 ${t.featured ? "border-gold/50! ring-1 ring-gold/30" : ""}`}
              >
                {t.featured && (
                  <span className="mb-3 w-fit rounded-full bg-gold-soft px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-wider text-gold">
                    Most popular
                  </span>
                )}
                <h2 className="font-display text-xl font-semibold">{t.name}</h2>
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="font-display text-4xl font-semibold text-gradient-gold">{t.price}</span>
                  <span className="text-sm text-muted-2">{t.cadence}</span>
                </div>
                <ul className="mt-6 flex-1 space-y-2.5">
                  {t.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm">
                      <Icon name="check" width={16} height={16} className="mt-0.5 shrink-0 text-gold" />
                      <span className="text-cream/90">{f}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/book"
                  className={`mt-6 ${t.featured ? "btn-gold" : "btn-ghost"} w-full`}
                >
                  {t.cta}
                </Link>
              </div>
            ))}
          </div>
          <div className="glass mx-auto mt-12 max-w-3xl rounded-2xl p-6 text-center sm:p-8">
            <span className="eyebrow">Rewards for everyone</span>
            <h2 className="mt-3 font-display text-2xl font-semibold sm:text-3xl">
              Earn points on every cut
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-muted">
              Member or not, every haircut earns you 5 points — hit 20 and your
              next cut is free. Track it all in your member portal.
            </p>
            <Link href="/portal" className="btn-ghost mt-6">
              Open the member portal <Icon name="arrow" width={16} height={16} />
            </Link>
          </div>

          <p className="mt-8 text-center text-sm text-muted-2">
            Unused monthly cuts roll over for 60 days · Pause anytime · No lock-in contract
          </p>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

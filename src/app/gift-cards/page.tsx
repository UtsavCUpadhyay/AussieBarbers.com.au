import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Icon } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Gift cards — the perfect present for any bloke",
  description:
    "Give the gift of a premium mobile barber. AussieBarbers gift cards are delivered instantly by email and redeemable on any service in Brisbane.",
  alternates: { canonical: "https://aussiebarbers.com.au/gift-cards" },
};

const AMOUNTS = ["$55", "$80", "$120", "$200"];

export default function GiftCardsPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <section className="section-glow container-x py-16 md:py-24">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <span className="eyebrow">Gift cards</span>
              <h1 className="mt-4 font-display text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
                The gift of <span className="text-gradient-gold">looking sharp</span>.
              </h1>
              <p className="mt-5 max-w-lg text-lg leading-relaxed text-muted">
                Stuck for a present? Give a premium cut delivered to their door.
                Delivered instantly by email, redeemable on any service, and it
                never expires within legal limits.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                {AMOUNTS.map((a) => (
                  <span key={a} className="rounded-xl border border-line bg-surface px-5 py-3 font-display text-lg font-semibold text-gradient-gold">
                    {a}
                  </span>
                ))}
              </div>
              <div className="mt-8">
                <Link href="/book" className="btn-gold">
                  Buy a gift card <Icon name="arrow" width={18} height={18} />
                </Link>
              </div>
            </div>

            <div className="glass rounded-[1.5rem] p-8">
              <div className="rounded-2xl border border-gold/25 bg-gradient-to-br from-surface to-ink-2 p-6">
                <div className="flex items-center justify-between">
                  <span className="font-display text-lg font-semibold">
                    Aussie<span className="text-gradient-gold">Barbers</span>
                  </span>
                  <span className="text-xs uppercase tracking-wider text-muted-2">Gift card</span>
                </div>
                <p className="mt-10 font-display text-4xl font-semibold text-gradient-gold">$80</p>
                <p className="mt-1 text-sm text-muted">Redeemable on any service</p>
                <div className="mt-6 flex items-center justify-between text-xs text-muted-2">
                  <span>To: A legend</span>
                  <span>No expiry*</span>
                </div>
              </div>
              <ul className="mt-6 space-y-2.5 text-sm">
                {["Delivered instantly by email", "Redeemable on any service or membership", "Add a personal message"].map((t) => (
                  <li key={t} className="flex items-center gap-2.5">
                    <Icon name="check" width={16} height={16} className="text-gold" />
                    <span className="text-cream/90">{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Icon } from "@/components/Icons";
import { STATS } from "@/lib/site";

export const metadata: Metadata = {
  title: "About us",
  description:
    "AussieBarbers is building Australia's premium mobile barber platform — verified, insured barbers to your door. Australian owned and operated.",
  alternates: { canonical: "https://aussiebarbers.com.au/about" },
};

const VALUES = [
  { title: "Convenience without compromise", body: "Salon-grade grooming at your door, on your schedule — never a trade-off on quality." },
  { title: "Trust, built in", body: "Every barber is verified, insured and rated. No surprises, transparent pricing, always." },
  { title: "Backing local barbers", body: "We give skilled barbers the tools, clients and brand to build their own business." },
];

export default function AboutPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <section className="section-glow container-x py-16 md:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow">Our story</span>
            <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
              The future of barbering, <span className="text-gradient-gold">delivered</span>.
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-muted">
              We started AussieBarbers with a simple frustration: getting a great
              cut shouldn&apos;t mean waiting rooms, parking and wasted time. So we
              flipped it — the barber comes to you. Verified, insured, and rated by
              locals. We&apos;re proudly Australian owned, starting in Brisbane and
              the Gold Coast, and building the platform the whole country will use.
            </p>
          </div>

          <div className="mx-auto mt-14 grid max-w-4xl grid-cols-2 gap-4 lg:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label} className="card p-5 text-center">
                <p className="font-display text-2xl font-semibold text-gradient-gold">{s.value}</p>
                <p className="mt-1 text-xs text-muted">{s.label}</p>
              </div>
            ))}
          </div>

          <div className="mx-auto mt-14 grid max-w-4xl gap-5 sm:grid-cols-3">
            {VALUES.map((v) => (
              <div key={v.title} className="card p-6">
                <h3 className="font-display text-lg font-semibold">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{v.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-14 text-center">
            <Link href="/book" className="btn-gold">
              Book your first cut <Icon name="arrow" width={18} height={18} />
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

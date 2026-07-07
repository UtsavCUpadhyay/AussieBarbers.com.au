import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Icon } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Corporate barber & on-site grooming days for Brisbane teams",
  description:
    "Treat your team to on-site grooming. AussieBarbers brings professional barbers to your Brisbane office — a standout perk staff actually love. Get a quote.",
  alternates: { canonical: "https://aussiebarbers.com.au/corporate" },
};

const BENEFITS = [
  { title: "A perk people remember", body: "A fresh cut at the desk beats another fruit bowl. It's the kind of benefit staff talk about and recruits notice." },
  { title: "Zero admin for you", body: "We handle scheduling, sign-ups and reminders. You pick a date and point us at a spare meeting room." },
  { title: "Flexible & scalable", body: "From a 10-person startup to a whole floor — we bring the right number of barbers to fit your day." },
  { title: "Fully insured & vetted", body: "Every barber is police-checked, qualified and carries public liability insurance. Compliance sorted." },
];

const STEPS = [
  { n: "01", t: "Tell us your team size & date", b: "A quick form and we'll recommend a setup." },
  { n: "02", t: "We schedule your team in", b: "Staff book their own slots via a simple link." },
  { n: "03", t: "We arrive & set up", b: "Barbers turn up with everything — you just provide space." },
  { n: "04", t: "Everyone leaves sharp", b: "A happy, fresh-looking team. Invoiced simply to the business." },
];

export default function CorporatePage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <section className="section-glow container-x py-16 md:py-24">
          <div className="max-w-2xl">
            <span className="eyebrow">Corporate grooming</span>
            <h1 className="mt-4 font-display text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
              On-site grooming days your <span className="text-gradient-gold">team will love</span>.
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-muted">
              Bring premium barbering to your Brisbane office. A standout staff
              perk, a memorable client event, or a morale boost before the
              holidays — we handle everything.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/book" className="btn-gold">
                Get a corporate quote <Icon name="arrow" width={18} height={18} />
              </Link>
              <Link href="/services" className="btn-ghost">See services</Link>
            </div>
          </div>

          <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {BENEFITS.map((b) => (
              <div key={b.title} className="card p-6">
                <h3 className="font-display text-lg font-semibold">{b.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{b.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="border-y border-line bg-ink-2 py-16 md:py-20">
          <div className="container-x">
            <h2 className="font-display text-2xl font-semibold sm:text-3xl">How a corporate day works</h2>
            <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {STEPS.map((s) => (
                <div key={s.n} className="card p-6">
                  <span className="font-display text-2xl font-semibold text-gold/40">{s.n}</span>
                  <h3 className="mt-2 font-display text-base font-semibold">{s.t}</h3>
                  <p className="mt-1.5 text-sm text-muted">{s.b}</p>
                </div>
              ))}
            </div>
            <div className="mt-10">
              <Link href="/book" className="btn-gold">Book a corporate day <Icon name="arrow" width={18} height={18} /></Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

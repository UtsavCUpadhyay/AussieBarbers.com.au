import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Icon } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Become a barber",
  description:
    "Join AussieBarbers and grow your own mobile barbering business. Set your rates, own your schedule, keep the majority of every booking.",
};

const PERKS = [
  {
    title: "Own your schedule",
    body: "Work when you want. Set your radius, hours and holiday mode — you're in control.",
  },
  {
    title: "Keep the lion's share",
    body: "Industry-low commission. Transparent payouts to your account, weekly.",
  },
  {
    title: "We bring the clients",
    body: "Our marketing fills your calendar. You focus on cutting, we handle demand.",
  },
  {
    title: "Tools that run the business",
    body: "Bookings, payments, reminders, reviews and tax summaries — all in one app.",
  },
];

export default function BarbersPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <section className="section-glow container-x py-16 md:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow">For barbers</span>
            <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
              Build your own <span className="text-gradient-gold">book</span>.
            </h1>
            <p className="mt-4 text-muted">
              Join Australia&apos;s premium mobile barber platform. Bring your
              skills — we&apos;ll bring the clients, the tools and the brand.
            </p>
            <div className="mt-8 flex justify-center">
              <Link href="/book" className="btn-gold">
                Apply to join <Icon name="arrow" width={18} height={18} />
              </Link>
            </div>
          </div>

          <div className="mx-auto mt-14 grid max-w-4xl gap-5 sm:grid-cols-2">
            {PERKS.map((p) => (
              <div key={p.title} className="card p-6">
                <h3 className="font-display text-lg font-semibold">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{p.body}</p>
              </div>
            ))}
          </div>

          <p className="mx-auto mt-10 max-w-xl text-center text-sm text-muted-2">
            All barbers are ID-verified, qualification-checked, police-checked and
            insured. We&apos;re building a roster we&apos;re proud of.
          </p>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

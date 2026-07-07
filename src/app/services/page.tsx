import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Icon } from "@/components/Icons";
import { SERVICES, slugify } from "@/lib/site";

export const metadata: Metadata = {
  title: "Mobile barber services & pricing in Brisbane",
  description:
    "Haircuts, skin fades, beard sculpts and the VIP groom — delivered to your door in Brisbane. Transparent, all-inclusive pricing.",
  alternates: { canonical: "https://aussiebarbers.com.au/services" },
};

export default function ServicesIndex() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <section className="section-glow container-x py-16 md:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow">Services & pricing</span>
            <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
              Every cut, <span className="text-gradient-gold">at your door</span>.
            </h1>
            <p className="mt-4 text-muted">
              All-inclusive Brisbane pricing — no surprise call-out fees. Tap any
              service for details and to book.
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s) => (
              <Link key={s.name} href={`/services/${slugify(s.name)}`} className="card flex flex-col p-6">
                {s.popular && (
                  <span className="mb-3 w-fit rounded-full bg-gold-soft px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-wider text-gold">
                    Popular
                  </span>
                )}
                <h2 className="font-display text-lg font-semibold">{s.name}</h2>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="font-display text-2xl font-semibold text-gradient-gold">{s.price}</span>
                  <span className="text-xs text-muted-2">· {s.duration}</span>
                </div>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{s.description}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-gold">
                  View & book <Icon name="arrow" width={15} height={15} />
                </span>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

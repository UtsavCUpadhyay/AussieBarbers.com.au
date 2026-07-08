import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Icon } from "@/components/Icons";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact us",
  description:
    "Get in touch with AussieBarbers — bookings, corporate enquiries, barber applications and support.",
  alternates: { canonical: "https://aussiebarbers.com.au/contact" },
};

export default function ContactPage() {
  const channels = [
    { icon: "bolt", title: "Book a cut", body: "The fastest way to get sharp.", href: "/book", cta: "Start booking" },
    { icon: "scissors", title: "Become a barber", body: "Grow your own book with us.", href: "/barbers", cta: "Apply now" },
    { icon: "star", title: "Corporate & events", body: "On-site grooming for teams.", href: "/corporate", cta: "Get a quote" },
  ];

  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <section className="section-glow container-x py-16 md:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow">Contact</span>
            <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
              We&apos;re here to <span className="text-gradient-gold">help</span>.
            </h1>
            <p className="mt-4 text-muted">
              The quickest answers are below. For anything else, email us and we&apos;ll
              get back to you within one business day.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <a href={`mailto:${SITE.email}`} className="btn-gold">
                <Icon name="arrow" width={16} height={16} /> {SITE.email}
              </a>
              <a href={`tel:${SITE.phone.replace(/\s/g, "")}`} className="btn-ghost">
                {SITE.phone}
              </a>
            </div>
          </div>

          <div className="mx-auto mt-14 grid max-w-4xl gap-5 sm:grid-cols-3">
            {channels.map((c) => (
              <Link key={c.title} href={c.href} className="card flex flex-col p-6">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-gold-soft text-gold">
                  <Icon name={c.icon} width={22} height={22} />
                </span>
                <h3 className="mt-4 font-display text-lg font-semibold">{c.title}</h3>
                <p className="mt-2 flex-1 text-sm text-muted">{c.body}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-gold">
                  {c.cta} <Icon name="arrow" width={15} height={15} />
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

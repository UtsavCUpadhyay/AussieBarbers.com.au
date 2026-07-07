import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Icon } from "@/components/Icons";
import { SERVICES, SUBURBS, slugify, getServiceBySlug, SITE } from "@/lib/site";

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: slugify(s.name) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};
  const title = `${service.name} in Brisbane — ${service.price} mobile barber`;
  return {
    title,
    description: `${service.description} Book a ${service.name.toLowerCase()} to your door in Brisbane from ${service.price}. Verified, insured barbers.`,
    alternates: { canonical: `https://aussiebarbers.com.au/services/${slug}` },
    openGraph: { title, type: "website" },
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const others = SERVICES.filter((s) => s.name !== service.name).slice(0, 3);
  const includes = [
    "Professional consultation before we start",
    "Premium tools, capes and products — we bring everything",
    "Complete clean-up afterwards",
    "Cashless, secure payment",
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    serviceType: "Mobile barber",
    provider: { "@type": "LocalBusiness", name: SITE.name },
    areaServed: "Brisbane, QLD, Australia",
    offers: {
      "@type": "Offer",
      price: service.price.replace("$", ""),
      priceCurrency: "AUD",
    },
  };

  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <section className="section-glow container-x py-16 md:py-24">
          <nav className="mb-6 text-sm text-muted-2">
            <Link href="/services" className="hover:text-cream">Services</Link>
            <span className="mx-2">/</span>
            <span className="text-muted">{service.name}</span>
          </nav>

          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            <div>
              {service.popular && (
                <span className="mb-4 inline-block rounded-full bg-gold-soft px-3 py-1 text-xs font-semibold uppercase tracking-wider text-gold">
                  Most popular
                </span>
              )}
              <h1 className="font-display text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
                {service.name} <span className="text-gradient-gold">in Brisbane</span>
              </h1>
              <div className="mt-4 flex items-baseline gap-3">
                <span className="font-display text-3xl font-semibold text-gradient-gold">{service.price}</span>
                <span className="flex items-center gap-1 text-sm text-muted-2">
                  <Icon name="clock" width={15} height={15} /> {service.duration}
                </span>
              </div>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">{service.description}</p>

              <h2 className="mt-10 font-display text-xl font-semibold">What&apos;s included</h2>
              <ul className="mt-4 space-y-2.5">
                {includes.map((i) => (
                  <li key={i} className="flex items-start gap-3 text-sm">
                    <Icon name="check" width={18} height={18} className="mt-0.5 shrink-0 text-gold" />
                    <span className="text-cream/90">{i}</span>
                  </li>
                ))}
              </ul>

              <h2 className="mt-10 font-display text-xl font-semibold">Available across Brisbane</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {SUBURBS.slice(0, 10).map((s) => (
                  <Link
                    key={s}
                    href={`/mobile-barber/${slugify(s)}`}
                    className="rounded-full border border-line px-3 py-1.5 text-xs text-muted transition-colors hover:border-gold/50 hover:text-cream"
                  >
                    {s}
                  </Link>
                ))}
              </div>
            </div>

            {/* Booking card */}
            <aside className="lg:sticky lg:top-24">
              <div className="glass rounded-2xl p-6 sm:p-8">
                <p className="text-sm text-muted">Book your</p>
                <p className="font-display text-2xl font-semibold">{service.name}</p>
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="font-display text-4xl font-semibold text-gradient-gold">{service.price}</span>
                  <span className="text-sm text-muted-2">/ {service.duration}</span>
                </div>
                <Link
                  href={`/book?service=${encodeURIComponent(service.name)}`}
                  className="btn-gold mt-6 w-full"
                >
                  Book this now <Icon name="arrow" width={18} height={18} />
                </Link>
                <p className="mt-3 text-center text-xs text-muted-2">
                  No payment until your barber is confirmed
                </p>
              </div>

              <div className="mt-5">
                <p className="mb-3 text-sm font-medium text-muted">Other services</p>
                <div className="space-y-2">
                  {others.map((o) => (
                    <Link
                      key={o.name}
                      href={`/services/${slugify(o.name)}`}
                      className="flex items-center justify-between rounded-xl border border-line bg-surface px-4 py-3 text-sm transition-colors hover:border-gold/40"
                    >
                      <span className="text-cream">{o.name}</span>
                      <span className="text-gold">{o.price}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </section>
      </main>
      <SiteFooter />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Icon } from "@/components/Icons";
import {
  SERVICES,
  STEPS,
  slugify,
  getSuburbPages,
  getSuburbBySlug,
  SITE,
} from "@/lib/site";

export function generateStaticParams() {
  return getSuburbPages().map((s) => ({ suburb: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ suburb: string }>;
}): Promise<Metadata> {
  const { suburb } = await params;
  const page = getSuburbBySlug(suburb);
  if (!page) return {};
  const title = `Mobile Barber ${page.suburb} — Haircuts & Fades to Your Door`;
  return {
    title,
    description: `Book a verified mobile barber in ${page.suburb}, ${page.region}. Sharp cuts, skin fades and beard trims at your home or office — from $40. Same-day slots available.`,
    alternates: { canonical: `https://aussiebarbers.com.au/mobile-barber/${suburb}` },
    openGraph: { title, type: "website" },
  };
}

export default async function SuburbPage({
  params,
}: {
  params: Promise<{ suburb: string }>;
}) {
  const { suburb } = await params;
  const page = getSuburbBySlug(suburb);
  if (!page) notFound();

  const nearby = getSuburbPages()
    .filter((s) => s.regionSlug === page.regionSlug && s.slug !== page.slug)
    .slice(0, 10);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: `${SITE.name} — ${page.suburb}`,
    description: `Mobile barber serving ${page.suburb}, ${page.region}. Verified, insured barbers to your door.`,
    areaServed: { "@type": "Place", name: `${page.suburb}, ${page.region}, QLD` },
    url: `https://aussiebarbers.com.au/mobile-barber/${suburb}`,
    priceRange: "$$",
  };

  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        {/* Hero */}
        <section className="section-glow container-x py-16 md:py-24">
          <nav className="mb-6 text-sm text-muted-2">
            <Link href="/" className="hover:text-cream">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-muted">Mobile Barber {page.suburb}</span>
          </nav>
          <span className="eyebrow">
            <span className="h-px w-6 bg-gold" /> Serving {page.suburb}
          </span>
          <h1 className="mt-5 max-w-3xl font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
            Mobile barber in{" "}
            <span className="text-gradient-gold">{page.suburb}</span>, at your door.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
            Skip the queue. Book a verified, insured barber to your home or office
            in {page.suburb} — a sharp cut, fade or beard trim without leaving the
            house. Same-day slots often available.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/book" className="btn-gold">
              Book in {page.suburb} <Icon name="arrow" width={18} height={18} />
            </Link>
            <Link href="/services" className="btn-ghost">
              See services & pricing
            </Link>
          </div>
        </section>

        {/* Services */}
        <section className="border-y border-line bg-ink-2 py-16 md:py-20">
          <div className="container-x">
            <h2 className="font-display text-2xl font-semibold sm:text-3xl">
              Popular services in {page.suburb}
            </h2>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {SERVICES.slice(0, 4).map((s) => (
                <Link key={s.name} href={`/services/${slugify(s.name)}`} className="card p-6">
                  <h3 className="font-display text-lg font-semibold">{s.name}</h3>
                  <p className="mt-2 font-display text-2xl font-semibold text-gradient-gold">{s.price}</p>
                  <p className="mt-2 text-sm text-muted">{s.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="container-x py-16 md:py-20">
          <h2 className="font-display text-2xl font-semibold sm:text-3xl">
            How it works in {page.suburb}
          </h2>
          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s) => (
              <div key={s.n} className="card p-6">
                <span className="font-display text-2xl font-semibold text-gold/40">{s.n}</span>
                <h3 className="mt-2 font-display text-base font-semibold">{s.title}</h3>
                <p className="mt-1.5 text-sm text-muted">{s.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Nearby */}
        <section className="border-t border-line bg-ink-2 py-16 md:py-20">
          <div className="container-x">
            <h2 className="font-display text-2xl font-semibold sm:text-3xl">Nearby {page.region} areas we cover</h2>
            <div className="mt-6 flex flex-wrap gap-2.5">
              {nearby.map((s) => (
                <Link
                  key={s.slug}
                  href={`/mobile-barber/${s.slug}`}
                  className="rounded-full border border-line bg-surface px-4 py-2 text-sm text-muted transition-colors hover:border-gold/40 hover:text-cream"
                >
                  {s.suburb}
                </Link>
              ))}
            </div>
            <div className="mt-10">
              <Link href="/book" className="btn-gold">
                Book your {page.suburb} barber <Icon name="arrow" width={18} height={18} />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}

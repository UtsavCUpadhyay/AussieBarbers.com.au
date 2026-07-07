import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Icon } from "@/components/Icons";
import { Avatar, Stars } from "@/components/Bits";
import { BARBERS, REVIEWS, getBarberBySlug, SITE } from "@/lib/site";

export function generateStaticParams() {
  return BARBERS.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const barber = getBarberBySlug(slug);
  if (!barber) return {};
  const title = `${barber.name} — Mobile Barber in ${barber.suburb}, Brisbane`;
  return {
    title,
    description: `Book ${barber.name}, a ${barber.rating}★ mobile barber in ${barber.suburb}. ${barber.specialties.join(", ")}. ${barber.reviews} reviews.`,
    alternates: { canonical: `https://aussiebarbers.com.au/barber/${slug}` },
  };
}

export default async function BarberPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const barber = getBarberBySlug(slug);
  if (!barber) notFound();

  const barberReviews = REVIEWS.slice(0, 3);
  const others = BARBERS.filter((b) => b.slug !== barber.slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: barber.name,
    jobTitle: "Mobile Barber",
    worksFor: { "@type": "LocalBusiness", name: SITE.name },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: barber.rating,
      reviewCount: barber.reviews,
    },
  };

  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <section className="section-glow container-x py-16 md:py-20">
          <nav className="mb-6 text-sm text-muted-2">
            <Link href="/#barbers" className="hover:text-cream">Barbers</Link>
            <span className="mx-2">/</span>
            <span className="text-muted">{barber.name}</span>
          </nav>

          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            <div>
              <div className="flex items-center gap-5">
                <Avatar initials={barber.initials} size={80} />
                <div>
                  <h1 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
                    {barber.name}
                  </h1>
                  <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-muted">
                    <span className="flex items-center gap-1.5">
                      <Stars rating={barber.rating} /> {barber.rating}
                    </span>
                    <span>·</span>
                    <span>{barber.reviews} reviews</span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <Icon name="pin" width={14} height={14} className="text-gold" /> {barber.suburb}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-8 grid grid-cols-3 gap-4">
                <Stat value={barber.cuts} label="Cuts done" />
                <Stat value={`${barber.years} yrs`} label="Experience" />
                <Stat value={`${barber.rating}★`} label="Rating" />
              </div>

              <h2 className="mt-10 font-display text-xl font-semibold">About {barber.name.split(" ")[0]}</h2>
              <p className="mt-3 max-w-xl leading-relaxed text-muted">{barber.bio}</p>

              <h2 className="mt-8 font-display text-xl font-semibold">Specialties</h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {barber.specialties.map((s) => (
                  <span key={s} className="rounded-full border border-line bg-surface px-4 py-2 text-sm text-cream">
                    {s}
                  </span>
                ))}
              </div>

              <h2 className="mt-10 font-display text-xl font-semibold">Recent reviews</h2>
              <div className="mt-4 space-y-4">
                {barberReviews.map((r) => (
                  <div key={r.name} className="card p-5">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-cream">{r.name}</span>
                      <Stars rating={r.rating} />
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{r.text}</p>
                  </div>
                ))}
              </div>
            </div>

            <aside className="lg:sticky lg:top-24">
              <div className="glass rounded-2xl p-6 sm:p-8">
                <p className="text-sm text-muted">Book with</p>
                <p className="font-display text-2xl font-semibold">{barber.name}</p>
                <p className="mt-1 flex items-center gap-1.5 text-sm text-muted">
                  <Stars rating={barber.rating} /> {barber.rating} · {barber.reviews} reviews
                </p>
                <Link href="/book" className="btn-gold mt-6 w-full">
                  Book {barber.name.split(" ")[0]} <Icon name="arrow" width={18} height={18} />
                </Link>
                <p className="mt-3 text-center text-xs text-muted-2">
                  Verified · Insured · Police-checked
                </p>
              </div>

              <div className="mt-5">
                <p className="mb-3 text-sm font-medium text-muted">Other barbers</p>
                <div className="space-y-2">
                  {others.map((o) => (
                    <Link
                      key={o.slug}
                      href={`/barber/${o.slug}`}
                      className="flex items-center gap-3 rounded-xl border border-line bg-surface px-4 py-3 transition-colors hover:border-gold/40"
                    >
                      <Avatar initials={o.initials} size={36} />
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-cream">{o.name}</p>
                        <p className="text-xs text-muted-2">{o.suburb} · {o.rating}★</p>
                      </div>
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

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-xl border border-line bg-surface p-4 text-center">
      <p className="font-display text-xl font-semibold text-gradient-gold">{value}</p>
      <p className="mt-0.5 text-xs text-muted">{label}</p>
    </div>
  );
}

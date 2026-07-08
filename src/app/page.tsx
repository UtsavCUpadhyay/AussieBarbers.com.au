import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Icon } from "@/components/Icons";
import { Avatar, Stars } from "@/components/Bits";
import {
  SITE,
  SERVICES,
  BENEFITS,
  STEPS,
  SOLUTIONS,
  FAQS,
  STATS,
  BARBERS,
  REVIEWS,
  REGIONS,
  FEATURED_SUBURBS,
  slugify,
} from "@/lib/site";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <TrustBar />
        <Benefits />
        <HowItWorks />
        <Services />
        <Barbers />
        <Reviews />
        <Areas />
        <Solutions />
        <Membership />
        <Faq />
        <FinalCta />
      </main>
      <SiteFooter />
      <Schema />
    </>
  );
}

/* ---------------------------------------------------------------- Hero */
function Hero() {
  return (
    <section className="section-glow relative overflow-hidden">
      <div className="container-x grid gap-12 pb-16 pt-20 md:pt-28 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div className="animate-fade-up">
          <span className="eyebrow">
            <span className="h-px w-6 bg-gold" /> Now live in {SITE.city}
          </span>
          <h1 className="mt-5 font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
            The barber comes
            <br />
            to <span className="text-gradient-gold">you.</span>
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted">
            Book a verified, insured mobile barber to your home, office, hotel or
            event — a sharp cut in under 60 seconds. This is the future of
            barbering in Australia.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link href="/book" className="btn-gold">
              Book your cut <Icon name="arrow" width={18} height={18} />
            </Link>
            <a href="#how" className="btn-ghost">
              See how it works
            </a>
          </div>

          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
            {["Verified & insured barbers", "Cashless & secure", "100% satisfaction guarantee"].map(
              (t) => (
                <li key={t} className="flex items-center gap-2">
                  <Icon name="check" width={16} height={16} className="text-gold" />
                  {t}
                </li>
              )
            )}
          </ul>
        </div>

        {/* Booking preview card */}
        <div className="animate-fade-up [animation-delay:120ms]">
          <div className="glass rounded-[1.5rem] p-6 shadow-2xl sm:p-8">
            <div className="flex items-center justify-between">
              <span className="eyebrow">Book in 60 seconds</span>
              <span className="flex items-center gap-1.5 text-xs text-muted">
                <span className="h-2 w-2 rounded-full bg-green-400" /> 12 barbers online
              </span>
            </div>

            <div className="mt-6 space-y-3">
              <PreviewRow label="Service" value="Cut + Beard" meta="60 min · $80" />
              <PreviewRow label="Where" value="Your address, New Farm" meta="Detected" />
              <PreviewRow label="When" value="Today · 5:30 PM" meta="Same-day" />
              <PreviewRow label="Barber" value="Marco · 4.9★" meta="Nearby" />
            </div>

            <Link href="/book" className="btn-gold mt-6 w-full">
              Confirm booking <Icon name="arrow" width={18} height={18} />
            </Link>
            <p className="mt-3 text-center text-xs text-muted-2">
              No account needed to see prices · Pay only when confirmed
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function PreviewRow({ label, value, meta }: { label: string; value: string; meta: string }) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-line bg-surface/60 px-4 py-3">
      <div>
        <p className="text-[0.7rem] uppercase tracking-wider text-muted-2">{label}</p>
        <p className="mt-0.5 text-sm font-medium text-cream">{value}</p>
      </div>
      <span className="text-xs text-gold">{meta}</span>
    </div>
  );
}

/* ---------------------------------------------------------------- Trust bar */
function TrustBar() {
  return (
    <section className="border-y border-line bg-ink-2">
      <div className="container-x grid grid-cols-2 gap-6 py-8 md:grid-cols-4">
        {STATS.map((s) => (
          <div key={s.label} className="text-center">
            <p className="font-display text-3xl font-semibold text-gradient-gold">{s.value}</p>
            <p className="mt-1 text-sm text-muted">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- Benefits */
function Benefits() {
  return (
    <section className="container-x py-20 md:py-28">
      <SectionHead
        eyebrow="Why AussieBarbers"
        title="A better cut, without the barbershop"
        sub="Salon-grade grooming delivered to your door by professionals you can trust."
      />
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {BENEFITS.map((b) => (
          <div key={b.title} className="card p-6">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-gold-soft text-gold">
              <Icon name={b.icon} width={22} height={22} />
            </span>
            <h3 className="mt-5 font-display text-lg font-semibold">{b.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{b.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- How it works */
function HowItWorks() {
  return (
    <section id="how" className="section-glow border-y border-line bg-ink-2 py-20 md:py-28">
      <div className="container-x">
        <SectionHead
          eyebrow="How it works"
          title="From tap to fresh cut, in four steps"
          sub="No phone tag, no waiting rooms. Booking takes less than a minute."
        />
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s) => (
            <div key={s.n} className="card p-6">
              <span className="font-display text-3xl font-semibold text-gold/40">{s.n}</span>
              <h3 className="mt-3 font-display text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- Services */
function Services() {
  return (
    <section id="services" className="container-x py-20 md:py-28">
      <SectionHead
        eyebrow="Services & pricing"
        title="Transparent pricing, no surprises"
        sub="All-inclusive rates within our core Brisbane zones. See the price before you book."
      />
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {SERVICES.map((s) => (
          <div key={s.name} className="card relative flex flex-col p-6">
            {s.popular && (
              <span className="absolute right-4 top-4 rounded-full bg-gold-soft px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-wider text-gold">
                Popular
              </span>
            )}
            <h3 className="font-display text-lg font-semibold">{s.name}</h3>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="font-display text-3xl font-semibold text-gradient-gold">{s.price}</span>
              <span className="flex items-center gap-1 text-xs text-muted-2">
                <Icon name="clock" width={13} height={13} /> {s.duration}
              </span>
            </div>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{s.description}</p>
            <Link
              href="/book"
              className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-gold transition-colors hover:text-gold-2"
            >
              Book this <Icon name="arrow" width={15} height={15} />
            </Link>
          </div>
        ))}
      </div>
      <p className="mt-8 text-center text-sm text-muted-2">
        Student &amp; senior discounts available · Family &amp; group bookings on request
      </p>
    </section>
  );
}

/* ---------------------------------------------------------------- Barbers */
function Barbers() {
  return (
    <section id="barbers" className="border-y border-line bg-ink-2 py-20 md:py-28">
      <div className="container-x">
        <SectionHead
          eyebrow="Meet the barbers"
          title="Vetted pros you can trust"
          sub="Every barber is ID-verified, qualification-checked, police-checked and insured. Rated by real Brisbane locals."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {BARBERS.map((b) => (
            <Link key={b.slug} href={`/barber/${b.slug}`} className="card flex flex-col items-center p-6 text-center">
              <Avatar initials={b.initials} size={72} />
              <h3 className="mt-4 font-display text-lg font-semibold">{b.name}</h3>
              <p className="mt-1 flex items-center gap-1.5 text-sm text-muted">
                <Stars rating={b.rating} /> {b.rating}
              </p>
              <p className="mt-1 text-xs text-muted-2">{b.suburb} · {b.cuts} cuts</p>
              <div className="mt-3 flex flex-wrap justify-center gap-1.5">
                {b.specialties.slice(0, 2).map((s) => (
                  <span key={s} className="rounded-full bg-gold-soft px-2.5 py-1 text-[0.65rem] text-gold">
                    {s}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- Reviews */
function Reviews() {
  return (
    <section className="container-x py-20 md:py-28">
      <SectionHead
        eyebrow="Loved by locals"
        title="4.9 stars across Brisbane"
        sub="Real reviews from real customers who'll never go back to the barbershop queue."
      />
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {REVIEWS.map((r) => (
          <figure key={r.name} className="card p-6">
            <Stars rating={r.rating} size={16} />
            <blockquote className="mt-3 text-sm leading-relaxed text-cream/90">
              &ldquo;{r.text}&rdquo;
            </blockquote>
            <figcaption className="mt-4 text-sm text-muted">
              <span className="font-medium text-cream">{r.name}</span> · {r.suburb}
              <span className="mt-0.5 block text-xs text-muted-2">{r.service}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- Areas */
function Areas() {
  return (
    <section id="areas" className="border-y border-line bg-ink-2 py-20 md:py-28">
      <div className="container-x grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <SectionHead
            align="left"
            eyebrow="Service areas"
            title="Brisbane & the Gold Coast"
            sub="Barbers across 240+ suburbs — from Greater Brisbane to the Gold Coast, Coolangatta to Coomera. Find yours and book in seconds."
          />
          <div className="mt-6 flex flex-wrap gap-3">
            {REGIONS.map((r) => (
              <span
                key={r.slug}
                className="rounded-full border border-gold/30 bg-gold-soft px-4 py-2 text-sm font-medium text-gold"
              >
                {r.name} · {r.suburbs.length} suburbs
              </span>
            ))}
          </div>
          <Link href="/book" className="btn-gold mt-8">
            Check your suburb <Icon name="arrow" width={18} height={18} />
          </Link>
        </div>
        <div className="flex flex-wrap gap-2.5">
          {FEATURED_SUBURBS.map((a) => (
            <Link
              key={a}
              href={`/mobile-barber/${slugify(a)}`}
              className="rounded-full border border-line bg-surface px-4 py-2 text-sm text-muted transition-colors hover:border-gold/40 hover:text-cream"
            >
              {a}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- Solutions */
function Solutions() {
  return (
    <section id="solutions" className="container-x py-20 md:py-28">
      <SectionHead
        eyebrow="Beyond the home cut"
        title="Grooming for every occasion"
        sub="From wedding mornings to corporate perks — book AussieBarbers for your team, venue or event."
      />
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {SOLUTIONS.map((s) => (
          <div key={s.title} className="card p-6">
            <h3 className="font-display text-lg font-semibold">{s.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{s.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- Membership */
function Membership() {
  const perks = [
    "One premium cut every month",
    "Priority same-day booking",
    "Locked-in member pricing",
    "Free beard tidy between cuts",
    "Your preferred barber, guaranteed",
  ];
  return (
    <section className="section-glow border-y border-line bg-ink-2 py-20 md:py-28">
      <div className="container-x">
        <div className="glass mx-auto max-w-4xl rounded-[1.75rem] p-8 sm:p-12">
          <div className="grid gap-10 md:grid-cols-2 md:items-center">
            <div>
              <span className="eyebrow">The Members Club</span>
              <h2 className="mt-4 font-display text-3xl font-semibold leading-tight sm:text-4xl">
                Always sharp,
                <br />
                for <span className="text-gradient-gold">$89/mo</span>
              </h2>
              <p className="mt-4 text-muted">
                A monthly cut, priority access and member-only pricing. Cancel
                anytime — the effortless way to never look overdue again.
              </p>
              <Link href="/book" className="btn-gold mt-7">
                Join the club <Icon name="arrow" width={18} height={18} />
              </Link>
            </div>
            <ul className="space-y-3">
              {perks.map((p) => (
                <li key={p} className="flex items-start gap-3 text-sm">
                  <Icon name="check" width={18} height={18} className="mt-0.5 shrink-0 text-gold" />
                  <span className="text-cream/90">{p}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- FAQ */
function Faq() {
  return (
    <section id="faq" className="container-x py-20 md:py-28">
      <SectionHead eyebrow="Good to know" title="Frequently asked" />
      <div className="mx-auto mt-12 max-w-3xl divide-y divide-line rounded-2xl border border-line bg-surface">
        {FAQS.map((f) => (
          <details key={f.q} className="group px-6 py-5">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left font-medium text-cream">
              {f.q}
              <span className="text-gold transition-transform group-open:rotate-45">＋</span>
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-muted">{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- Final CTA */
function FinalCta() {
  return (
    <section className="section-glow container-x pb-8">
      <div className="relative overflow-hidden rounded-[1.75rem] border border-gold/20 bg-gradient-to-b from-surface to-ink-2 px-8 py-16 text-center sm:py-20">
        <h2 className="mx-auto max-w-2xl font-display text-3xl font-semibold leading-tight sm:text-4xl">
          Your best cut is one tap away.
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-muted">
          Join the Brisbane locals booking premium barbers to their door. Same-day
          slots available now.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/book" className="btn-gold">
            Book your cut <Icon name="arrow" width={18} height={18} />
          </Link>
          <Link href="/barbers" className="btn-ghost">
            Become a barber
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- Shared */
function SectionHead({
  eyebrow,
  title,
  sub,
  align = "center",
}: {
  eyebrow: string;
  title: string;
  sub?: string;
  align?: "center" | "left";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-xl"}>
      <span className="eyebrow">{eyebrow}</span>
      <h2 className="mt-4 font-display text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
        {title}
      </h2>
      {sub && <p className="mt-4 text-muted">{sub}</p>}
    </div>
  );
}

/* ---------------------------------------------------------------- JSON-LD */
function Schema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: SITE.name,
    description:
      "Premium mobile barber platform serving Brisbane. Verified barbers to your home, office or event.",
    url: `https://${SITE.domain}`,
    telephone: SITE.phone,
    email: SITE.email,
    areaServed: "Brisbane, Queensland, Australia",
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Brisbane",
      addressRegion: "QLD",
      addressCountry: "AU",
    },
    makesOffer: SERVICES.map((s) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: s.name },
      price: s.price.replace("$", ""),
      priceCurrency: "AUD",
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

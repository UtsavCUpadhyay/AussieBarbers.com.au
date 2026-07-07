import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Icon } from "@/components/Icons";
import { POSTS } from "@/lib/blog";

export const metadata: Metadata = {
  title: "The Chair — grooming tips & guides",
  description:
    "Barbering advice, pricing guides and grooming tips from AussieBarbers — Australia's premium mobile barber platform.",
  alternates: { canonical: "https://aussiebarbers.com.au/blog" },
};

const fmt = (d: string) =>
  new Date(d).toLocaleDateString("en-AU", { day: "numeric", month: "long", year: "numeric" });

export default function BlogIndex() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <section className="section-glow container-x py-16 md:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow">The Chair</span>
            <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
              Grooming, <span className="text-gradient-gold">decoded</span>.
            </h1>
            <p className="mt-4 text-muted">
              Straight-talking guides on cuts, pricing and looking sharp — from the
              AussieBarbers team.
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-4xl gap-5 md:grid-cols-2">
            {POSTS.map((p) => (
              <Link key={p.slug} href={`/blog/${p.slug}`} className="card flex flex-col p-6">
                <span className="w-fit rounded-full bg-gold-soft px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-wider text-gold">
                  {p.tag}
                </span>
                <h2 className="mt-4 font-display text-xl font-semibold leading-snug">{p.title}</h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{p.excerpt}</p>
                <div className="mt-4 flex items-center justify-between text-xs text-muted-2">
                  <span>{fmt(p.date)} · {p.readMins} min read</span>
                  <span className="inline-flex items-center gap-1 text-gold">
                    Read <Icon name="arrow" width={14} height={14} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

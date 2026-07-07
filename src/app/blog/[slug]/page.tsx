import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Icon } from "@/components/Icons";
import { POSTS, getPostBySlug } from "@/lib/blog";
import { SITE } from "@/lib/site";

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `https://aussiebarbers.com.au/blog/${slug}` },
    openGraph: { title: post.title, description: post.excerpt, type: "article" },
  };
}

const fmt = (d: string) =>
  new Date(d).toLocaleDateString("en-AU", { day: "numeric", month: "long", year: "numeric" });

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const more = POSTS.filter((p) => p.slug !== post.slug).slice(0, 2);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: { "@type": "Organization", name: SITE.name },
    publisher: { "@type": "Organization", name: SITE.name },
  };

  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <article className="container-x py-16 md:py-20">
          <nav className="mb-6 text-sm text-muted-2">
            <Link href="/blog" className="hover:text-cream">The Chair</Link>
            <span className="mx-2">/</span>
            <span className="text-muted">{post.tag}</span>
          </nav>

          <div className="mx-auto max-w-2xl">
            <span className="w-fit rounded-full bg-gold-soft px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-wider text-gold">
              {post.tag}
            </span>
            <h1 className="mt-4 font-display text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
              {post.title}
            </h1>
            <p className="mt-3 text-sm text-muted-2">
              {fmt(post.date)} · {post.readMins} min read
            </p>

            <div className="mt-8 space-y-6">
              {post.sections.map((s, i) => (
                <div key={i}>
                  {s.h && <h2 className="mb-2 font-display text-xl font-semibold">{s.h}</h2>}
                  <p className="leading-relaxed text-muted">{s.p}</p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="glass mt-12 rounded-2xl p-6 text-center sm:p-8">
              <h3 className="font-display text-xl font-semibold">Ready for a sharper cut?</h3>
              <p className="mt-2 text-sm text-muted">
                Book a verified mobile barber to your door in Brisbane — in under 60 seconds.
              </p>
              <Link href="/book" className="btn-gold mt-5">
                Book your cut <Icon name="arrow" width={18} height={18} />
              </Link>
            </div>
          </div>

          {more.length > 0 && (
            <div className="mx-auto mt-16 max-w-2xl">
              <h3 className="font-display text-lg font-semibold">Keep reading</h3>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {more.map((p) => (
                  <Link key={p.slug} href={`/blog/${p.slug}`} className="card p-5">
                    <span className="text-[0.65rem] font-semibold uppercase tracking-wider text-gold">
                      {p.tag}
                    </span>
                    <p className="mt-2 font-display text-base font-semibold leading-snug">{p.title}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </article>
      </main>
      <SiteFooter />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}

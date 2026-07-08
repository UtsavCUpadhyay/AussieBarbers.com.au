import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export function LegalPage({
  title,
  updated,
  intro,
  sections,
}: {
  title: string;
  updated: string;
  intro: string;
  sections: { h: string; p: string[] }[];
}) {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <article className="container-x py-16 md:py-20">
          <div className="mx-auto max-w-2xl">
            <h1 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h1>
            <p className="mt-2 text-sm text-muted-2">Last updated {updated}</p>
            <p className="mt-6 leading-relaxed text-muted">{intro}</p>

            <div className="mt-10 space-y-8">
              {sections.map((s) => (
                <section key={s.h}>
                  <h2 className="font-display text-xl font-semibold">{s.h}</h2>
                  {s.p.map((para, i) => (
                    <p key={i} className="mt-3 leading-relaxed text-muted">{para}</p>
                  ))}
                </section>
              ))}
            </div>
          </div>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}

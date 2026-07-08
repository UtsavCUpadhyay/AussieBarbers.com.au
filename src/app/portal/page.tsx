import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Icon } from "@/components/Icons";
import { MemberPortal } from "@/components/MemberPortal";
import { LOYALTY } from "@/lib/site";

export const metadata: Metadata = {
  title: "Member portal — earn points, get free cuts",
  description:
    "Sign in to the AussieBarbers Members Club. Earn 5 points every haircut and unlock a free cut at 20 points. Track your rewards in one place.",
  alternates: { canonical: "https://aussiebarbers.com.au/portal" },
};

export default function PortalPage() {
  const rules = [
    {
      icon: "star",
      title: `Earn ${LOYALTY.pointsPerVisit} points per cut`,
      body: "Every completed haircut adds points to your account automatically — nothing to scan or remember.",
    },
    {
      icon: "check",
      title: `Free cut at ${LOYALTY.pointsForReward} points`,
      body: `Collect ${LOYALTY.pointsForReward} points — that's ${LOYALTY.paidVisitsForReward} paid cuts — and your next haircut is on us.`,
    },
    {
      icon: "shield",
      title: "Personal & non-transferable",
      body: "Rewards belong to you alone. Points can only be earned and redeemed by the member on their own visits — they can't be shared or used by anyone else.",
    },
    {
      icon: "pin",
      title: "Allocated parking preferred",
      body: "To keep appointments running on time, an allocated or off-street parking spot at the address is strongly preferred for your barber.",
    },
  ];

  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <section className="section-glow container-x py-16 md:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow">Members Club</span>
            <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
              Your rewards, <span className="text-gradient-gold">tracked</span>.
            </h1>
            <p className="mt-4 text-muted">
              Every cut gets you closer to a free one. Sign in to see your points.
            </p>
          </div>

          <div className="mt-12">
            <MemberPortal />
          </div>

          {/* How the program works */}
          <div className="mx-auto mt-16 max-w-4xl">
            <h2 className="text-center font-display text-2xl font-semibold sm:text-3xl">
              How the rewards work
            </h2>
            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              {rules.map((r) => (
                <div key={r.title} className="card flex gap-4 p-6">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gold-soft text-gold">
                    <Icon name={r.icon} width={22} height={22} />
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-semibold">{r.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted">{r.body}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="mx-auto mt-8 max-w-2xl text-center text-xs text-muted-2">
              Points are earned on completed, paid haircuts only and have no cash
              value. Free-cut rewards apply to a standard Signature Cut; premium
              services may require a top-up. Full terms apply.
            </p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Icon } from "@/components/Icons";
import { CareerForm } from "@/components/CareerForm";

export const metadata: Metadata = {
  title: "Careers — join the AussieBarbers team",
  description:
    "Apply to become an AussieBarbers barber. Upload your resume, set your areas and grow your own book with Australia's premium mobile barber platform.",
  alternates: { canonical: "https://aussiebarbers.com.au/careers" },
};

const WHY = [
  { title: "Own your schedule", body: "Set your hours, radius and holiday mode — you're in control." },
  { title: "We bring the clients", body: "Our marketing fills your calendar so you focus on cutting." },
  { title: "Keep the lion's share", body: "Industry-low commission with transparent weekly payouts." },
  { title: "Tools that run it all", body: "Bookings, payments, reminders and reviews in one app." },
];

export default function CareersPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <section className="section-glow container-x py-16 md:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow">Careers</span>
            <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
              Cut with the <span className="text-gradient-gold">best</span>.
            </h1>
            <p className="mt-4 text-muted">
              We&apos;re hiring skilled, reliable barbers across Brisbane and the
              Gold Coast. Bring your craft — we&apos;ll bring the clients, tools and
              brand. Apply below; it takes a few minutes.
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {WHY.map((w) => (
              <div key={w.title} className="card p-5">
                <span className="grid h-9 w-9 place-items-center rounded-lg bg-gold-soft text-gold">
                  <Icon name="check" width={18} height={18} />
                </span>
                <h3 className="mt-3 font-display text-base font-semibold">{w.title}</h3>
                <p className="mt-1.5 text-sm text-muted">{w.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-14">
            <h2 className="mb-6 text-center font-display text-2xl font-semibold sm:text-3xl">
              Apply to join
            </h2>
            <CareerForm />
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

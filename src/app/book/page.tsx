import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { BookingFlow } from "@/components/BookingFlow";

export const metadata: Metadata = {
  title: "Book a mobile barber",
  description:
    "Book a verified mobile barber to your door in Brisbane. Choose a service, time and barber in under 60 seconds.",
};

export default async function BookPage({
  searchParams,
}: {
  searchParams: Promise<{ service?: string }>;
}) {
  const { service } = await searchParams;

  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <section className="section-glow container-x py-16 md:py-24">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <span className="eyebrow">Book in 60 seconds</span>
            <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
              Let&apos;s get you <span className="text-gradient-gold">sharp</span>.
            </h1>
          </div>
          <BookingFlow initialService={service} />
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

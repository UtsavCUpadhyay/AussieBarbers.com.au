import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Icon } from "@/components/Icons";
import { SERVICES } from "@/lib/site";

export const metadata: Metadata = {
  title: "Book a mobile barber",
  description:
    "Book a verified mobile barber to your door in Brisbane. Choose a service, time and barber in under 60 seconds.",
};

export default function BookPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <section className="section-glow container-x py-16 md:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow">Book in 60 seconds</span>
            <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
              Let&apos;s get you <span className="text-gradient-gold">sharp</span>.
            </h1>
            <p className="mt-4 text-muted">
              Pick a service to get started. Secure checkout and live barber
              matching are rolling out now — leave your details and we&apos;ll lock
              in your slot.
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-3xl gap-4 sm:grid-cols-2">
            {SERVICES.map((s) => (
              <label
                key={s.name}
                className="card flex cursor-pointer items-center justify-between p-5"
              >
                <div>
                  <p className="font-display text-lg font-semibold">{s.name}</p>
                  <p className="mt-1 text-xs text-muted-2">{s.duration}</p>
                </div>
                <span className="font-display text-2xl font-semibold text-gradient-gold">
                  {s.price}
                </span>
              </label>
            ))}
          </div>

          <div className="glass mx-auto mt-10 max-w-xl rounded-2xl p-6 sm:p-8">
            <h2 className="font-display text-xl font-semibold">Reserve your spot</h2>
            <p className="mt-1 text-sm text-muted">
              We&apos;ll confirm your barber and time by text. No payment taken yet.
            </p>
            <form className="mt-6 space-y-4">
              <Field label="Name" placeholder="Your name" type="text" />
              <Field label="Mobile" placeholder="04xx xxx xxx" type="tel" />
              <Field label="Suburb" placeholder="e.g. New Farm" type="text" />
              <button type="button" className="btn-gold w-full">
                Request my booking <Icon name="arrow" width={18} height={18} />
              </button>
              <p className="text-center text-xs text-muted-2">
                By continuing you agree to our{" "}
                <Link href="/terms" className="text-gold hover:underline">
                  terms
                </Link>
                .
              </p>
            </form>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

function Field({
  label,
  placeholder,
  type,
}: {
  label: string;
  placeholder: string;
  type: string;
}) {
  return (
    <label className="block">
      <span className="text-xs uppercase tracking-wider text-muted-2">{label}</span>
      <input
        type={type}
        placeholder={placeholder}
        className="mt-1.5 w-full rounded-xl border border-line bg-surface-2 px-4 py-3 text-sm text-cream placeholder:text-muted-2 outline-none transition-colors focus:border-gold"
      />
    </label>
  );
}

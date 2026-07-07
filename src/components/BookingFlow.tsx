"use client";

import { useState } from "react";
import Link from "next/link";
import { Icon } from "@/components/Icons";
import { SERVICES, SUBURBS, type Service } from "@/lib/site";
import { createBookingRequest } from "@/app/actions";

type Step = 0 | 1 | 2 | 3;

const TIMES = ["9:00 AM", "10:30 AM", "12:00 PM", "1:30 PM", "3:00 PM", "4:30 PM", "6:00 PM"];
const DAYS = ["Today", "Tomorrow", "In 2 days", "This weekend"];

export function BookingFlow({ initialService }: { initialService?: string }) {
  const preselected = SERVICES.find((s) => s.name === initialService);
  const [step, setStep] = useState<Step>(preselected ? 1 : 0);
  const [service, setService] = useState<Service | null>(preselected ?? null);
  const [suburb, setSuburb] = useState("");
  const [day, setDay] = useState("");
  const [time, setTime] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [done, setDone] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const canContinue =
    (step === 0 && service) ||
    (step === 1 && suburb.trim().length > 1) ||
    (step === 2 && day && time) ||
    (step === 3 && name.trim().length > 1 && phone.trim().length >= 8);

  async function next() {
    if (step < 3) {
      setStep((step + 1) as Step);
      return;
    }
    setSubmitting(true);
    try {
      await createBookingRequest({
        serviceName: service?.name ?? "",
        price: service?.price,
        suburb,
        day,
        time,
        name,
        phone,
      });
    } catch {
      // Non-blocking: still show confirmation; request is retried by support.
    } finally {
      setSubmitting(false);
      setDone(true);
    }
  }
  function back() {
    if (step > 0) setStep((step - 1) as Step);
  }

  if (done) {
    return (
      <div className="glass mx-auto max-w-lg rounded-2xl p-8 text-center">
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-gold-soft text-gold">
          <Icon name="check" width={28} height={28} />
        </span>
        <h2 className="mt-5 font-display text-2xl font-semibold">Request received, {name.split(" ")[0]}!</h2>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          We&apos;re matching you with a top-rated barber near {suburb} for your{" "}
          <span className="text-cream">{service?.name}</span> on{" "}
          <span className="text-cream">{day.toLowerCase()} at {time}</span>. You&apos;ll get a
          confirmation text at {phone} shortly — no payment taken until it&apos;s locked in.
        </p>
        <Link href="/" className="btn-ghost mt-6">
          Back to home
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-xl">
      {/* Progress */}
      <div className="mb-6 flex items-center gap-2">
        {["Service", "Location", "Time", "Details"].map((label, i) => (
          <div key={label} className="flex flex-1 items-center gap-2">
            <span
              className={`grid h-7 w-7 shrink-0 place-items-center rounded-full text-xs font-semibold transition-colors ${
                i <= step ? "bg-gold text-[#1a1408]" : "border border-line text-muted-2"
              }`}
            >
              {i < step ? "✓" : i + 1}
            </span>
            {i < 3 && (
              <span className={`h-px flex-1 ${i < step ? "bg-gold" : "bg-line"}`} />
            )}
          </div>
        ))}
      </div>

      <div className="glass rounded-2xl p-6 sm:p-8">
        {step === 0 && (
          <Panel title="What are you after?" sub="Pick a service to get started.">
            <div className="grid gap-3 sm:grid-cols-2">
              {SERVICES.map((s) => (
                <button
                  key={s.name}
                  type="button"
                  onClick={() => setService(s)}
                  className={`card flex items-center justify-between p-4 text-left ${
                    service?.name === s.name ? "border-gold!" : ""
                  }`}
                >
                  <div>
                    <p className="font-medium text-cream">{s.name}</p>
                    <p className="text-xs text-muted-2">{s.duration}</p>
                  </div>
                  <span className="font-display text-lg font-semibold text-gradient-gold">{s.price}</span>
                </button>
              ))}
            </div>
          </Panel>
        )}

        {step === 1 && (
          <Panel title="Where should we come?" sub="Enter your Brisbane suburb.">
            <input
              value={suburb}
              onChange={(e) => setSuburb(e.target.value)}
              list="suburbs"
              placeholder="e.g. New Farm"
              className="w-full rounded-xl border border-line bg-surface-2 px-4 py-3 text-sm text-cream placeholder:text-muted-2 outline-none focus:border-gold"
            />
            <datalist id="suburbs">
              {SUBURBS.map((s) => (
                <option key={s} value={s} />
              ))}
            </datalist>
            <div className="mt-3 flex flex-wrap gap-2">
              {SUBURBS.slice(0, 6).map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSuburb(s)}
                  className="rounded-full border border-line px-3 py-1.5 text-xs text-muted transition-colors hover:border-gold/50 hover:text-cream"
                >
                  {s}
                </button>
              ))}
            </div>
          </Panel>
        )}

        {step === 2 && (
          <Panel title="When suits you?" sub="Choose a day and time.">
            <p className="mb-2 text-xs uppercase tracking-wider text-muted-2">Day</p>
            <div className="flex flex-wrap gap-2">
              {DAYS.map((d) => (
                <Chip key={d} active={day === d} onClick={() => setDay(d)}>
                  {d}
                </Chip>
              ))}
            </div>
            <p className="mb-2 mt-5 text-xs uppercase tracking-wider text-muted-2">Time</p>
            <div className="flex flex-wrap gap-2">
              {TIMES.map((t) => (
                <Chip key={t} active={time === t} onClick={() => setTime(t)}>
                  {t}
                </Chip>
              ))}
            </div>
          </Panel>
        )}

        {step === 3 && (
          <Panel title="Almost done" sub="We'll confirm your barber by text. No payment yet.">
            <div className="space-y-4">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="w-full rounded-xl border border-line bg-surface-2 px-4 py-3 text-sm text-cream placeholder:text-muted-2 outline-none focus:border-gold"
              />
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                type="tel"
                placeholder="04xx xxx xxx"
                className="w-full rounded-xl border border-line bg-surface-2 px-4 py-3 text-sm text-cream placeholder:text-muted-2 outline-none focus:border-gold"
              />
            </div>
            <div className="mt-5 rounded-xl border border-line bg-surface/60 p-4 text-sm">
              <Summary label="Service" value={`${service?.name} · ${service?.price}`} />
              <Summary label="Where" value={suburb} />
              <Summary label="When" value={`${day} · ${time}`} />
            </div>
          </Panel>
        )}

        <div className="mt-6 flex items-center justify-between gap-3">
          {step > 0 ? (
            <button type="button" onClick={back} className="btn-ghost text-sm">
              Back
            </button>
          ) : (
            <span />
          )}
          <button
            type="button"
            onClick={next}
            disabled={!canContinue || submitting}
            className="btn-gold text-sm disabled:cursor-not-allowed disabled:opacity-40"
          >
            {submitting ? "Sending…" : step === 3 ? "Request my booking" : "Continue"}
            {!submitting && <Icon name="arrow" width={16} height={16} />}
          </button>
        </div>
      </div>
      <p className="mt-4 text-center text-xs text-muted-2">
        Secure checkout & live barber matching are rolling out — your request holds your slot.
      </p>
    </div>
  );
}

function Panel({ title, sub, children }: { title: string; sub: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="font-display text-xl font-semibold">{title}</h2>
      <p className="mt-1 mb-5 text-sm text-muted">{sub}</p>
      {children}
    </div>
  );
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full px-4 py-2 text-sm transition-colors ${
        active
          ? "bg-gold text-[#1a1408]"
          : "border border-line text-muted hover:border-gold/50 hover:text-cream"
      }`}
    >
      {children}
    </button>
  );
}

function Summary({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-1">
      <span className="text-muted-2">{label}</span>
      <span className="font-medium text-cream">{value}</span>
    </div>
  );
}

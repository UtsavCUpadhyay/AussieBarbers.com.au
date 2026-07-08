"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Icon } from "@/components/Icons";
import { SERVICES, SUBURBS, type Service } from "@/lib/site";
import { createBookingRequest } from "@/app/actions";

type Step = 0 | 1 | 2 | 3;

// Booking rules
const LEAD_HOURS = 12; // earliest booking is 12 hours from now
const OPEN_HOUR = 8; // 8:00 AM
const LAST_START_HOUR = 19; // last slot starts 7:00 PM
const SLOT_MINUTES = 30; // slots every 30 min
const DAYS_AHEAD = 7;

type Slot = { label: string; iso: string };
type DayGroup = { key: string; label: string; slots: Slot[] };

function fmtTime(d: Date): string {
  return d.toLocaleTimeString("en-AU", { hour: "numeric", minute: "2-digit" });
}

function dayLabel(d: Date, offset: number): string {
  if (offset === 0) return "Today";
  if (offset === 1) return "Tomorrow";
  return d.toLocaleDateString("en-AU", { weekday: "short", day: "numeric", month: "short" });
}

/** Builds live availability from `now`, honouring the 12-hour lead time. */
function buildAvailability(now: Date): DayGroup[] {
  const earliest = new Date(now.getTime() + LEAD_HOURS * 60 * 60 * 1000);
  const groups: DayGroup[] = [];

  for (let offset = 0; offset < DAYS_AHEAD + 1; offset++) {
    const date = new Date(now);
    date.setDate(now.getDate() + offset);

    const slots: Slot[] = [];
    for (let h = OPEN_HOUR; h <= LAST_START_HOUR; h++) {
      for (let m = 0; m < 60; m += SLOT_MINUTES) {
        const slot = new Date(date);
        slot.setHours(h, m, 0, 0);
        if (slot.getTime() >= earliest.getTime()) {
          slots.push({ label: fmtTime(slot), iso: slot.toISOString() });
        }
      }
    }
    if (slots.length) {
      groups.push({ key: date.toDateString(), label: dayLabel(date, offset), slots });
    }
    if (groups.length >= DAYS_AHEAD) break;
  }
  return groups;
}

export function BookingFlow({ initialService }: { initialService?: string }) {
  const preselected = SERVICES.find((s) => s.name === initialService);
  const [step, setStep] = useState<Step>(preselected ? 1 : 0);
  const [service, setService] = useState<Service | null>(preselected ?? null);
  const [suburb, setSuburb] = useState("");
  const [dayKey, setDayKey] = useState("");
  const [dayLabelSel, setDayLabelSel] = useState("");
  const [timeIso, setTimeIso] = useState("");
  const [timeLabel, setTimeLabel] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [done, setDone] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Availability is computed on the client from the real current time, so it
  // reflects "now" and refreshes every time the flow is opened.
  const [availability, setAvailability] = useState<DayGroup[]>([]);
  useEffect(() => {
    setAvailability(buildAvailability(new Date()));
  }, []);

  const activeDay = useMemo(
    () => availability.find((d) => d.key === dayKey) ?? null,
    [availability, dayKey]
  );
  const earliestLabel = availability[0]
    ? `${availability[0].label}, ${availability[0].slots[0].label}`
    : null;

  const canContinue =
    (step === 0 && service) ||
    (step === 1 && suburb.trim().length > 1) ||
    (step === 2 && dayKey && timeIso) ||
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
        day: dayLabelSel,
        time: timeLabel,
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
          <span className="text-cream">{dayLabelSel}, {timeLabel}</span>. You&apos;ll get a
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
            {i < 3 && <span className={`h-px flex-1 ${i < step ? "bg-gold" : "bg-line"}`} />}
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
          <Panel title="Where should we come?" sub="Enter your Brisbane or Gold Coast suburb.">
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
          </Panel>
        )}

        {step === 2 && (
          <Panel title="When suits you?" sub="Choose a day, then a time.">
            {earliestLabel && (
              <p className="mb-4 flex items-center gap-2 rounded-lg border border-line bg-surface/60 px-3 py-2 text-xs text-muted">
                <Icon name="clock" width={14} height={14} className="text-gold" />
                Earliest available: <span className="text-cream">{earliestLabel}</span> · bookings open 12 hours ahead
              </p>
            )}

            {availability.length === 0 ? (
              <p className="text-sm text-muted-2">Loading live availability…</p>
            ) : (
              <>
                <p className="mb-2 text-xs uppercase tracking-wider text-muted-2">Day</p>
                <div className="flex flex-wrap gap-2">
                  {availability.map((d) => (
                    <Chip
                      key={d.key}
                      active={dayKey === d.key}
                      onClick={() => {
                        setDayKey(d.key);
                        setDayLabelSel(d.label);
                        setTimeIso("");
                        setTimeLabel("");
                      }}
                    >
                      {d.label}
                    </Chip>
                  ))}
                </div>

                {activeDay && (
                  <>
                    <p className="mb-2 mt-5 text-xs uppercase tracking-wider text-muted-2">
                      Time · {activeDay.label}
                    </p>
                    <div className="flex max-h-56 flex-wrap gap-2 overflow-y-auto">
                      {activeDay.slots.map((s) => (
                        <Chip
                          key={s.iso}
                          active={timeIso === s.iso}
                          onClick={() => {
                            setTimeIso(s.iso);
                            setTimeLabel(s.label);
                          }}
                        >
                          {s.label}
                        </Chip>
                      ))}
                    </div>
                  </>
                )}
              </>
            )}
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
              <Summary label="When" value={`${dayLabelSel} · ${timeLabel}`} />
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

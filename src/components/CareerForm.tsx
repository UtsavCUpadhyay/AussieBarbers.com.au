"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { Icon } from "@/components/Icons";
import { submitApplication } from "@/app/careers/actions";

export function CareerForm() {
  const [pending, setPending] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);
    setError(null);
    try {
      const fd = new FormData(e.currentTarget);
      const res = await submitApplication(fd);
      if (res.ok) setDone(true);
      else setError(res.error ?? "Something went wrong. Please try again.");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setPending(false);
    }
  }

  if (done) {
    return (
      <div className="glass mx-auto max-w-lg rounded-2xl p-8 text-center">
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-gold-soft text-gold">
          <Icon name="check" width={28} height={28} />
        </span>
        <h2 className="mt-5 font-display text-2xl font-semibold">Application received!</h2>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          Thanks for applying to AussieBarbers. Our team will review your details and
          be in touch within a few business days. Keep an eye on your inbox.
        </p>
        <Link href="/" className="btn-ghost mt-6">Back to home</Link>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="glass mx-auto max-w-2xl rounded-2xl p-6 sm:p-8">
      <Group title="About you">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field name="fullName" label="Full name" required />
          <Field name="email" label="Email" type="email" required />
          <Field name="phone" label="Mobile" type="tel" required />
          <Select name="region" label="Region" options={["Brisbane", "Gold Coast", "Other"]} />
        </div>
        <Field name="suburbs" label="Suburbs you can service" placeholder="e.g. Inner north, New Farm, Newstead…" />
      </Group>

      <Group title="Your experience">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field name="years" label="Years of experience" type="number" placeholder="e.g. 5" />
          <Field name="qualification" label="Qualification" placeholder="e.g. Certificate III in Barbering" />
        </div>
        <Field name="specialties" label="Specialties" placeholder="Fades, beard sculpts, scissor work… (comma separated)" />
        <Field name="portfolio" label="Portfolio / Instagram" type="url" placeholder="https://instagram.com/…" />
        <Field name="availability" label="Availability" placeholder="e.g. Weekdays after 3pm, weekends" />
      </Group>

      <Group title="Working with us">
        <Select
          name="insurance"
          label="Public liability insurance"
          options={["I have it", "Willing to obtain it", "Not yet"]}
        />
        <div className="mt-2 grid gap-2 sm:grid-cols-2">
          <Check name="rightToWork" label="I have the right to work in Australia" />
          <Check name="hasAbn" label="I have (or can get) an ABN" />
          <Check name="ownTools" label="I have my own tools & kit" />
          <Check name="ownTransport" label="I have reliable transport" />
          <Check name="policeCheck" label="I consent to a police / background check" />
        </div>
      </Group>

      <Group title="Resume & note">
        <label className="block">
          <span className="text-xs uppercase tracking-wider text-muted-2">Upload resume (PDF or Word, max 8MB)</span>
          <input
            type="file"
            name="resume"
            accept=".pdf,.doc,.docx"
            className="mt-1.5 block w-full text-sm text-muted file:mr-4 file:rounded-full file:border-0 file:bg-gold-soft file:px-4 file:py-2 file:text-sm file:font-medium file:text-gold hover:file:brightness-110"
          />
        </label>
        <label className="mt-4 block">
          <span className="text-xs uppercase tracking-wider text-muted-2">Anything else? (optional)</span>
          <textarea
            name="coverNote"
            rows={3}
            placeholder="Tell us a bit about yourself and why you'd like to join."
            className="mt-1.5 w-full rounded-xl border border-line bg-surface-2 px-4 py-3 text-sm text-cream placeholder:text-muted-2 outline-none focus:border-gold"
          />
        </label>
      </Group>

      {error && <p className="mt-4 text-sm text-red-400">{error}</p>}

      <button type="submit" disabled={pending} className="btn-gold mt-6 w-full disabled:opacity-40">
        {pending ? "Submitting…" : "Submit application"}
        {!pending && <Icon name="arrow" width={18} height={18} />}
      </button>
      <p className="mt-3 text-center text-xs text-muted-2">
        By applying you consent to us handling your information per our{" "}
        <Link href="/privacy" className="text-gold hover:underline">privacy policy</Link>.
      </p>
    </form>
  );
}

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <fieldset className="mb-6 border-b border-line pb-6 last:mb-0 last:border-0 last:pb-0">
      <legend className="mb-4 font-display text-lg font-semibold">{title}</legend>
      {children}
    </fieldset>
  );
}

function Field({
  name,
  label,
  type = "text",
  placeholder,
  required,
}: {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <label className="mt-4 block first:mt-0">
      <span className="text-xs uppercase tracking-wider text-muted-2">
        {label}{required && <span className="text-gold"> *</span>}
      </span>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="mt-1.5 w-full rounded-xl border border-line bg-surface-2 px-4 py-3 text-sm text-cream placeholder:text-muted-2 outline-none focus:border-gold"
      />
    </label>
  );
}

function Select({ name, label, options }: { name: string; label: string; options: string[] }) {
  return (
    <label className="mt-4 block first:mt-0">
      <span className="text-xs uppercase tracking-wider text-muted-2">{label}</span>
      <select
        name={name}
        defaultValue={options[0]}
        className="mt-1.5 w-full rounded-xl border border-line bg-surface-2 px-4 py-3 text-sm text-cream outline-none focus:border-gold"
      >
        {options.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
    </label>
  );
}

function Check({ name, label }: { name: string; label: string }) {
  return (
    <label className="flex items-center gap-2.5 rounded-xl border border-line bg-surface/50 px-4 py-3 text-sm">
      <input type="checkbox" name={name} className="h-4 w-4 accent-[#c9a24b]" />
      <span className="text-cream/90">{label}</span>
    </label>
  );
}

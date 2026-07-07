import type { Metadata } from "next";
import { isUnlocked } from "@/lib/adminAuth";
import { PasscodeGate, DashboardHeader } from "@/components/AdminShell";
import { getBookings } from "@/lib/data";
import { Avatar, Stars } from "@/components/Bits";
import { Icon } from "@/components/Icons";
import { BARBERS } from "@/lib/site";

export const metadata: Metadata = {
  title: "Barber dashboard",
  robots: { index: false, follow: false },
};

const TABS = [
  { href: "/admin", label: "Overview" },
  { href: "/dashboard", label: "Barber view" },
];

export default async function BarberDashboard({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  if (!(await isUnlocked())) {
    return <PasscodeGate redirectTo="/dashboard" hasError={error === "1"} />;
  }

  const me = BARBERS[0]; // demo: first barber acts as the signed-in barber
  const bookings = await getBookings(20);
  const rows = bookings ?? [];
  const connected = bookings !== null;

  const upcoming = rows.filter((r) => r.status === "requested" || r.status === "confirmed");
  const monthEarnings = rows
    .filter((r) => r.status === "completed")
    .reduce((sum, r) => sum + Number(r.price_aud ?? 0), 0);

  return (
    <div className="min-h-screen bg-ink">
      <DashboardHeader title="Barber" tabs={TABS} active="/dashboard" />
      <main className="container-x py-10">
        {/* Profile row */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Avatar initials={me.initials} size={64} />
            <div>
              <h1 className="font-display text-2xl font-semibold">Welcome back, {me.name.split(" ")[0]}</h1>
              <p className="mt-1 flex items-center gap-1.5 text-sm text-muted">
                <Stars rating={me.rating} /> {me.rating} · {me.suburb}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-green-500/30 bg-green-500/10 px-4 py-2 text-sm text-green-300">
            <span className="h-2 w-2 rounded-full bg-green-400" /> Available for bookings
          </div>
        </div>

        {!connected && (
          <p className="mt-6 rounded-xl border border-line bg-surface px-4 py-3 text-sm text-muted">
            Not connected to Supabase yet — figures below are empty until your database is live.
          </p>
        )}

        {/* Stats */}
        <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
          <Tile label="Upcoming" value={String(upcoming.length)} icon="clock" />
          <Tile label="This month" value={`$${monthEarnings}`} icon="star" />
          <Tile label="Rating" value={`${me.rating}★`} icon="star" />
          <Tile label="Total cuts" value={me.cuts} icon="scissors" />
        </div>

        {/* Upcoming bookings */}
        <section className="mt-10 grid gap-8 lg:grid-cols-[1.5fr_1fr]">
          <div>
            <h2 className="font-display text-lg font-semibold">Upcoming bookings</h2>
            <div className="mt-4 space-y-3">
              {upcoming.length === 0 ? (
                <div className="card p-6 text-sm text-muted-2">
                  {connected ? "No upcoming bookings right now." : "Bookings will show here once Supabase is connected."}
                </div>
              ) : (
                upcoming.map((r) => (
                  <div key={r.id} className="card flex items-center justify-between p-5">
                    <div>
                      <p className="font-medium text-cream">{r.service_name}</p>
                      <p className="text-xs text-muted-2">
                        {r.customer_name} · {r.suburb}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gold">{[r.preferred_day, r.preferred_time].filter(Boolean).join(" · ") || "TBC"}</p>
                      <p className="text-xs text-muted-2 capitalize">{r.status}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Side: quick tools */}
          <div>
            <h2 className="font-display text-lg font-semibold">Quick tools</h2>
            <div className="mt-4 space-y-3">
              {[
                { icon: "clock", label: "Set availability", note: "Manage your calendar & hours" },
                { icon: "pin", label: "Service radius", note: `Currently around ${me.suburb}` },
                { icon: "star", label: "Reviews", note: `${me.reviews} reviews · ${me.rating}★` },
                { icon: "bolt", label: "Earnings & payouts", note: "Weekly to your account" },
              ].map((t) => (
                <div key={t.label} className="card flex items-center gap-4 p-4">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-gold-soft text-gold">
                    <Icon name={t.icon} width={18} height={18} />
                  </span>
                  <div>
                    <p className="text-sm font-medium text-cream">{t.label}</p>
                    <p className="text-xs text-muted-2">{t.note}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-3 text-xs text-muted-2">
              Availability, payouts and chat become interactive once auth + Stripe Connect are wired in.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}

function Tile({ label, value, icon }: { label: string; value: string; icon: string }) {
  return (
    <div className="rounded-2xl border border-line bg-surface p-5">
      <span className="grid h-9 w-9 place-items-center rounded-lg bg-gold-soft text-gold">
        <Icon name={icon} width={18} height={18} />
      </span>
      <p className="mt-3 text-xs uppercase tracking-wider text-muted-2">{label}</p>
      <p className="mt-1 font-display text-2xl font-semibold text-cream">{value}</p>
    </div>
  );
}

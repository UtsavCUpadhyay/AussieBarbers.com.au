import type { Metadata } from "next";
import { isUnlocked } from "@/lib/adminAuth";
import { PasscodeGate, DashboardHeader } from "@/components/AdminShell";
import { getBookings, computeStats } from "@/lib/data";
import { BARBERS } from "@/lib/site";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

const TABS = [
  { href: "/admin", label: "Overview" },
  { href: "/dashboard", label: "Barber view" },
];

const fmtMoney = (n: number) =>
  new Intl.NumberFormat("en-AU", { style: "currency", currency: "AUD", maximumFractionDigits: 0 }).format(n);

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  if (!(await isUnlocked())) {
    return <PasscodeGate redirectTo="/admin" hasError={error === "1"} />;
  }

  const bookings = await getBookings(50);
  const rows = bookings ?? [];
  const stats = computeStats(rows);
  const connected = bookings !== null;

  return (
    <div className="min-h-screen bg-ink">
      <DashboardHeader title="Admin" tabs={TABS} active="/admin" />
      <main className="container-x py-10">
        <h1 className="font-display text-2xl font-semibold">Business overview</h1>
        <p className="mt-1 text-sm text-muted">
          {connected
            ? "Live data from your Supabase database."
            : "Not connected to Supabase yet — showing an empty state. Add your keys in Vercel to go live."}
        </p>

        {/* Stat tiles */}
        <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
          <Tile label="Total bookings" value={String(stats.total)} />
          <Tile label="New requests" value={String(stats.requested)} accent />
          <Tile label="Confirmed" value={String(stats.confirmed)} />
          <Tile label="Revenue (completed)" value={fmtMoney(stats.revenue)} />
        </div>

        {/* Bookings table */}
        <section className="mt-10">
          <h2 className="font-display text-lg font-semibold">Recent bookings</h2>
          <div className="mt-4 overflow-x-auto rounded-2xl border border-line">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead className="bg-ink-2 text-xs uppercase tracking-wider text-muted-2">
                <tr>
                  <Th>When booked</Th>
                  <Th>Customer</Th>
                  <Th>Service</Th>
                  <Th>Suburb</Th>
                  <Th>Requested slot</Th>
                  <Th>Status</Th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {rows.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-4 py-10 text-center text-muted-2">
                      {connected
                        ? "No bookings yet. They'll appear here the moment a customer books."
                        : "Connect Supabase to see live bookings here."}
                    </td>
                  </tr>
                ) : (
                  rows.map((r) => (
                    <tr key={r.id} className="hover:bg-surface/40">
                      <Td>{new Date(r.created_at).toLocaleString("en-AU", { dateStyle: "medium", timeStyle: "short" })}</Td>
                      <Td>
                        <span className="text-cream">{r.customer_name}</span>
                        <span className="block text-xs text-muted-2">{r.customer_phone}</span>
                      </Td>
                      <Td>{r.service_name}{r.price_aud ? ` · $${r.price_aud}` : ""}</Td>
                      <Td>{r.suburb}</Td>
                      <Td>{[r.preferred_day, r.preferred_time].filter(Boolean).join(" · ") || "—"}</Td>
                      <Td><StatusBadge status={r.status} /></Td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* Barbers */}
        <section className="mt-10">
          <h2 className="font-display text-lg font-semibold">Barbers</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {BARBERS.map((b) => (
              <div key={b.slug} className="card p-5">
                <p className="font-medium text-cream">{b.name}</p>
                <p className="text-xs text-muted-2">{b.suburb}</p>
                <p className="mt-2 text-sm text-muted">{b.rating}★ · {b.reviews} reviews</p>
              </div>
            ))}
          </div>
          <p className="mt-3 text-xs text-muted-2">
            Roster is seeded from code today; it moves to the database once barbers self-onboard.
          </p>
        </section>
      </main>
    </div>
  );
}

function Tile({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className={`rounded-2xl border p-5 ${accent ? "border-gold/40 bg-gold-soft/30" : "border-line bg-surface"}`}>
      <p className="text-xs uppercase tracking-wider text-muted-2">{label}</p>
      <p className="mt-2 font-display text-3xl font-semibold text-cream">{value}</p>
    </div>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return <th className="px-4 py-3 font-medium">{children}</th>;
}
function Td({ children }: { children: React.ReactNode }) {
  return <td className="px-4 py-3 text-muted">{children}</td>;
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    requested: "bg-gold-soft text-gold",
    confirmed: "bg-blue-500/15 text-blue-300",
    completed: "bg-green-500/15 text-green-300",
    cancelled: "bg-red-500/15 text-red-300",
  };
  return (
    <span className={`rounded-full px-2.5 py-1 text-xs capitalize ${map[status] ?? "bg-surface-2 text-muted"}`}>
      {status}
    </span>
  );
}

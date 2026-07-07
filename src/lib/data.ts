import { getSupabaseAdmin } from "@/lib/supabase";

export type BookingRow = {
  id: string;
  status: string;
  service_name: string;
  price_aud: number | null;
  suburb: string;
  preferred_day: string | null;
  preferred_time: string | null;
  customer_name: string;
  customer_phone: string;
  created_at: string;
};

export type Stats = {
  total: number;
  requested: number;
  confirmed: number;
  completed: number;
  revenue: number;
};

/** Recent bookings, or null when Supabase isn't configured yet. */
export async function getBookings(limit = 50): Promise<BookingRow[] | null> {
  const db = getSupabaseAdmin();
  if (!db) return null;
  const { data, error } = await db
    .from("bookings")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(limit);
  if (error) {
    console.error("[data] getBookings:", error.message);
    return [];
  }
  return (data ?? []) as BookingRow[];
}

export function computeStats(rows: BookingRow[]): Stats {
  const stats: Stats = { total: rows.length, requested: 0, confirmed: 0, completed: 0, revenue: 0 };
  for (const r of rows) {
    if (r.status === "requested") stats.requested++;
    if (r.status === "confirmed") stats.confirmed++;
    if (r.status === "completed") {
      stats.completed++;
      stats.revenue += Number(r.price_aud ?? 0);
    }
  }
  return stats;
}

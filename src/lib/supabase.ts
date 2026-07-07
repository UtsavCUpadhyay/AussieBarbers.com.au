import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

/** True once the Supabase env vars are configured (in Vercel or .env.local). */
export const isSupabaseConfigured = Boolean(url && anonKey);

/**
 * Browser/anon client — respects Row Level Security. Returns null until the
 * project is configured, so the app builds and runs before Supabase exists.
 */
export function getSupabaseBrowser(): SupabaseClient | null {
  if (!url || !anonKey) return null;
  return createClient(url, anonKey);
}

/**
 * Server client using the service-role key — bypasses RLS. Use ONLY in
 * server actions / route handlers, never in client components.
 */
export function getSupabaseAdmin(): SupabaseClient | null {
  if (!url || !serviceKey) return null;
  return createClient(url, serviceKey, {
    auth: { persistSession: false },
  });
}

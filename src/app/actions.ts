"use server";

import { getSupabaseAdmin } from "@/lib/supabase";

export type BookingInput = {
  serviceName: string;
  price?: string;
  suburb: string;
  day: string;
  time: string;
  name: string;
  phone: string;
  email?: string;
};

export type BookingResult = { ok: boolean; id?: string; stored: boolean };

/**
 * Creates a booking request. If Supabase is configured it's persisted;
 * otherwise it's logged server-side so the flow still works pre-backend.
 */
export async function createBookingRequest(input: BookingInput): Promise<BookingResult> {
  const priceNumber = input.price ? Number(input.price.replace(/[^0-9.]/g, "")) : null;

  const admin = getSupabaseAdmin();
  if (!admin) {
    console.info("[booking] (no Supabase configured yet) request:", {
      service: input.serviceName,
      suburb: input.suburb,
      when: `${input.day} ${input.time}`,
    });
    return { ok: true, stored: false };
  }

  const { data, error } = await admin
    .from("bookings")
    .insert({
      service_name: input.serviceName,
      price_aud: priceNumber,
      suburb: input.suburb,
      preferred_day: input.day,
      preferred_time: input.time,
      customer_name: input.name,
      customer_phone: input.phone,
      customer_email: input.email ?? null,
    })
    .select("id")
    .single();

  if (error) {
    console.error("[booking] insert failed:", error.message);
    return { ok: false, stored: false };
  }

  return { ok: true, id: data.id as string, stored: true };
}

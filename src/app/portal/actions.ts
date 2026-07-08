"use server";

import { getSupabaseAdmin } from "@/lib/supabase";
import { LOYALTY } from "@/lib/site";

export type Member = {
  name: string;
  email: string;
  points: number;
  visits: number;
  rewardsAvailable: number;
  isDemo: boolean;
};

/**
 * Looks up a member by email. With Supabase configured this reads/creates the
 * real member; otherwise it returns a demo member so the portal is viewable
 * before the backend is connected.
 */
export async function lookupMember(emailRaw: string): Promise<Member | null> {
  const email = emailRaw.trim().toLowerCase();
  if (!email || !email.includes("@")) return null;

  const db = getSupabaseAdmin();
  if (!db) {
    // Demo member: shows a member mid-way to their free cut.
    return {
      name: "Guest",
      email,
      points: 15,
      visits: 3,
      rewardsAvailable: 0,
      isDemo: true,
    };
  }

  const { data: existing } = await db
    .from("members")
    .select("name,email,points,visits,rewards_earned,rewards_used")
    .eq("email", email)
    .maybeSingle();

  if (existing) {
    return {
      name: existing.name,
      email: existing.email,
      points: existing.points ?? 0,
      visits: existing.visits ?? 0,
      rewardsAvailable: (existing.rewards_earned ?? 0) - (existing.rewards_used ?? 0),
      isDemo: false,
    };
  }

  // First time we've seen this email — create the member with a signup bonus row.
  const { data: created, error } = await db
    .from("members")
    .insert({ name: "New member", email })
    .select("name,email,points,visits,rewards_earned,rewards_used")
    .single();

  if (error || !created) return null;

  return {
    name: created.name,
    email: created.email,
    points: created.points ?? 0,
    visits: created.visits ?? 0,
    rewardsAvailable: 0,
    isDemo: false,
  };
}

export const LOYALTY_RULES = LOYALTY;

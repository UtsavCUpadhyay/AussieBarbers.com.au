"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ADMIN_COOKIE } from "@/lib/adminAuth";

export async function unlockAdmin(formData: FormData): Promise<void> {
  const entered = String(formData.get("passcode") ?? "");
  const passcode = process.env.ADMIN_PASSCODE;
  const redirectTo = String(formData.get("redirectTo") ?? "/admin");

  if (passcode && entered === passcode) {
    const jar = await cookies();
    jar.set(ADMIN_COOKIE, entered, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 12, // 12 hours
    });
    redirect(redirectTo);
  }
  redirect(`${redirectTo}?error=1`);
}

export async function lockAdmin(): Promise<void> {
  const jar = await cookies();
  jar.delete(ADMIN_COOKIE);
  redirect("/admin");
}

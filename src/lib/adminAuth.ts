import { cookies } from "next/headers";

const COOKIE = "ab_admin";

/** True when an ADMIN_PASSCODE has been configured in the environment. */
export function isAdminConfigured(): boolean {
  return Boolean(process.env.ADMIN_PASSCODE);
}

/** True when the current request holds a cookie matching the passcode. */
export async function isUnlocked(): Promise<boolean> {
  const passcode = process.env.ADMIN_PASSCODE;
  if (!passcode) return false;
  const jar = await cookies();
  return jar.get(COOKIE)?.value === passcode;
}

export const ADMIN_COOKIE = COOKIE;

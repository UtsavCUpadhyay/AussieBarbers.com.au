import Link from "next/link";
import { unlockAdmin, lockAdmin } from "@/app/admin/actions";
import { isAdminConfigured } from "@/lib/adminAuth";

/** Passcode screen shown when the visitor isn't unlocked. */
export function PasscodeGate({
  redirectTo,
  hasError,
}: {
  redirectTo: string;
  hasError?: boolean;
}) {
  const configured = isAdminConfigured();
  return (
    <div className="grid min-h-screen place-items-center bg-ink px-6">
      <div className="w-full max-w-sm text-center">
        <Link href="/" className="font-display text-xl font-semibold">
          Aussie<span className="text-gradient-gold">Barbers</span>
        </Link>
        <div className="glass mt-6 rounded-2xl p-8 text-left">
          <h1 className="font-display text-xl font-semibold">Staff access</h1>
          {configured ? (
            <>
              <p className="mt-1 text-sm text-muted">Enter the passcode to continue.</p>
              <form action={unlockAdmin} className="mt-5 space-y-3">
                <input type="hidden" name="redirectTo" value={redirectTo} />
                <input
                  type="password"
                  name="passcode"
                  placeholder="Passcode"
                  autoFocus
                  className="w-full rounded-xl border border-line bg-surface-2 px-4 py-3 text-sm text-cream outline-none focus:border-gold"
                />
                {hasError && (
                  <p className="text-xs text-red-400">Incorrect passcode. Try again.</p>
                )}
                <button type="submit" className="btn-gold w-full text-sm">
                  Unlock
                </button>
              </form>
            </>
          ) : (
            <p className="mt-2 text-sm leading-relaxed text-muted">
              This area is locked. Set an{" "}
              <code className="rounded bg-surface-2 px-1.5 py-0.5 text-gold">ADMIN_PASSCODE</code>{" "}
              environment variable in Vercel and redeploy to enable staff access.
            </p>
          )}
        </div>
        <Link href="/" className="mt-6 inline-block text-sm text-muted hover:text-cream">
          ← Back to site
        </Link>
      </div>
    </div>
  );
}

/** Top bar for the authenticated dashboard/admin views. */
export function DashboardHeader({
  title,
  tabs,
  active,
}: {
  title: string;
  tabs: { href: string; label: string }[];
  active: string;
}) {
  return (
    <header className="border-b border-line bg-ink-2">
      <div className="container-x flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="font-display text-lg font-semibold">
            Aussie<span className="text-gradient-gold">Barbers</span>
          </Link>
          <span className="hidden text-sm text-muted-2 sm:block">{title}</span>
        </div>
        <div className="flex items-center gap-4">
          <nav className="hidden gap-4 sm:flex">
            {tabs.map((t) => (
              <Link
                key={t.href}
                href={t.href}
                className={`text-sm ${active === t.href ? "text-gold" : "text-muted hover:text-cream"}`}
              >
                {t.label}
              </Link>
            ))}
          </nav>
          <form action={lockAdmin}>
            <button type="submit" className="text-sm text-muted hover:text-cream">
              Sign out
            </button>
          </form>
        </div>
      </div>
    </header>
  );
}

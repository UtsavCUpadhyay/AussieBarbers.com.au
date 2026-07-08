"use client";

import { useState } from "react";
import Link from "next/link";
import { Icon } from "@/components/Icons";
import { lookupMember, type Member } from "@/app/portal/actions";
import { LOYALTY } from "@/lib/site";

export function MemberPortal() {
  const [email, setEmail] = useState("");
  const [member, setMember] = useState<Member | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  async function signIn() {
    setLoading(true);
    setError(false);
    try {
      const m = await lookupMember(email);
      if (m) setMember(m);
      else setError(true);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  if (member) return <MemberCard member={member} onSignOut={() => setMember(null)} />;

  return (
    <div className="glass mx-auto max-w-md rounded-2xl p-8">
      <h2 className="font-display text-xl font-semibold">Sign in to your rewards</h2>
      <p className="mt-1 text-sm text-muted">
        Enter the email on your membership to see your points and free-cut progress.
      </p>
      <div className="mt-6 space-y-3">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && signIn()}
          placeholder="you@email.com"
          className="w-full rounded-xl border border-line bg-surface-2 px-4 py-3 text-sm text-cream placeholder:text-muted-2 outline-none focus:border-gold"
        />
        {error && <p className="text-xs text-red-400">Enter a valid email to continue.</p>}
        <button
          onClick={signIn}
          disabled={loading}
          className="btn-gold w-full text-sm disabled:opacity-40"
        >
          {loading ? "Checking…" : "View my rewards"}
          {!loading && <Icon name="arrow" width={16} height={16} />}
        </button>
      </div>
      <p className="mt-4 text-center text-xs text-muted-2">
        Secure magic-link sign-in is rolling out. Rewards are personal and
        non-transferable — only you can redeem your own points.
      </p>
    </div>
  );
}

function MemberCard({ member, onSignOut }: { member: Member; onSignOut: () => void }) {
  const toNext = Math.max(LOYALTY.pointsForReward - member.points, 0);
  const pct = Math.min((member.points / LOYALTY.pointsForReward) * 100, 100);
  const cutsToGo = Math.ceil(toNext / LOYALTY.pointsPerVisit);

  return (
    <div className="mx-auto max-w-lg">
      {member.isDemo && (
        <p className="mb-4 rounded-xl border border-line bg-surface px-4 py-3 text-center text-xs text-muted">
          Preview mode — connect the database to show real member balances.
        </p>
      )}

      <div className="glass rounded-2xl p-8">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted">Members Club</p>
            <p className="font-display text-xl font-semibold">{member.name}</p>
            <p className="text-xs text-muted-2">{member.email}</p>
          </div>
          <span className="grid h-12 w-12 place-items-center rounded-full border border-gold/30 bg-gold-soft text-gold">
            <Icon name="star" width={22} height={22} />
          </span>
        </div>

        {/* Reward available */}
        {member.rewardsAvailable > 0 && (
          <div className="mt-6 rounded-xl border border-gold/40 bg-gold-soft/40 p-4 text-center">
            <p className="font-display text-lg font-semibold text-gold">
              🎉 {member.rewardsAvailable} free {member.rewardsAvailable > 1 ? "cuts" : "cut"} ready!
            </p>
            <p className="mt-1 text-xs text-muted">Applied automatically at your next booking.</p>
          </div>
        )}

        {/* Progress */}
        <div className="mt-6">
          <div className="flex items-end justify-between">
            <span className="font-display text-4xl font-semibold text-gradient-gold">
              {member.points}
              <span className="text-lg text-muted-2"> / {LOYALTY.pointsForReward} pts</span>
            </span>
            <span className="text-sm text-muted">{member.visits} visits</span>
          </div>
          <div className="mt-3 h-3 overflow-hidden rounded-full bg-surface-2">
            <div className="h-full rounded-full bg-gradient-to-r from-gold to-gold-2" style={{ width: `${pct}%` }} />
          </div>
          <p className="mt-2 text-sm text-muted">
            {toNext === 0
              ? "You've hit a free cut — enjoy!"
              : `${toNext} points to go — that's ${cutsToGo} more ${cutsToGo > 1 ? "cuts" : "cut"} until your next free one.`}
          </p>
        </div>

        {/* Stamp row */}
        <div className="mt-6 flex justify-between gap-2">
          {Array.from({ length: LOYALTY.paidVisitsForReward + 1 }).map((_, i) => {
            const isReward = i === LOYALTY.paidVisitsForReward;
            const earned = member.points >= i * LOYALTY.pointsPerVisit;
            return (
              <div
                key={i}
                className={`grid h-12 flex-1 place-items-center rounded-xl border text-xs ${
                  earned ? "border-gold/50 bg-gold-soft text-gold" : "border-line text-muted-2"
                }`}
              >
                {isReward ? "FREE" : earned ? "✓" : i + 1}
              </div>
            );
          })}
        </div>

        <Link href="/book" className="btn-gold mt-7 w-full">
          Book & earn {LOYALTY.pointsPerVisit} points <Icon name="arrow" width={18} height={18} />
        </Link>
      </div>

      <button onClick={onSignOut} className="mt-4 block w-full text-center text-sm text-muted hover:text-cream">
        Sign out
      </button>
    </div>
  );
}

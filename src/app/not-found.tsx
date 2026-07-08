import Link from "next/link";
import { Icon } from "@/components/Icons";

export default function NotFound() {
  return (
    <div className="section-glow grid min-h-screen place-items-center bg-ink px-6 text-center">
      <div>
        <Link href="/" className="font-display text-xl font-semibold">
          Aussie<span className="text-gradient-gold">Barbers</span>
        </Link>
        <p className="mt-10 font-display text-6xl font-semibold text-gradient-gold">404</p>
        <h1 className="mt-4 font-display text-2xl font-semibold">This page took a day off.</h1>
        <p className="mx-auto mt-3 max-w-sm text-muted">
          We couldn&apos;t find what you were after — but your next sharp cut is
          only a tap away.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/book" className="btn-gold">
            Book a cut <Icon name="arrow" width={18} height={18} />
          </Link>
          <Link href="/" className="btn-ghost">
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}

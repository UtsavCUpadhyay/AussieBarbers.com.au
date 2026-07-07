import Link from "next/link";
import { SITE } from "@/lib/site";

const NAV = [
  { href: "#how", label: "How it works" },
  { href: "#services", label: "Services" },
  { href: "#areas", label: "Areas" },
  { href: "#solutions", label: "Business" },
  { href: "#faq", label: "FAQ" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-line/60 glass">
      <div className="container-x flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center rounded-full border border-gold/40 text-gold">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <circle cx="6" cy="6" r="2.4" />
              <circle cx="6" cy="18" r="2.4" />
              <path d="M20 4 8.5 15.5M14.5 12.5 20 20M8 8l6 6" />
            </svg>
          </span>
          <span className="font-display text-lg font-semibold tracking-tight">
            Aussie<span className="text-gradient-gold">Barbers</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="text-sm text-muted transition-colors hover:text-cream"
            >
              {n.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={`tel:${SITE.phone.replace(/\s/g, "")}`}
            className="hidden text-sm text-muted transition-colors hover:text-cream sm:block"
          >
            {SITE.phone}
          </a>
          <Link href="/book" className="btn-gold text-sm">
            Book now
          </Link>
        </div>
      </div>
    </header>
  );
}

import Link from "next/link";
import { SITE } from "@/lib/site";

export function SiteFooter() {
  const cols = [
    {
      title: "Services",
      links: [
        ["Signature cut", "#services"],
        ["Skin fade", "#services"],
        ["Beard sculpt", "#services"],
        ["VIP groom", "#services"],
      ],
    },
    {
      title: "Explore",
      links: [
        ["Membership", "/membership"],
        ["Gift cards", "/gift-cards"],
        ["Corporate", "/corporate"],
        ["Weddings", "/weddings"],
      ],
    },
    {
      title: "Company",
      links: [
        ["Become a barber", "/barbers"],
        ["The Chair (blog)", "/blog"],
        ["Service areas", "/#areas"],
        ["Contact", `mailto:${SITE.email}`],
      ],
    },
  ];

  return (
    <footer className="mt-24 border-t border-line bg-ink-2">
      <div className="container-x py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <span className="font-display text-lg font-semibold">
              Aussie<span className="text-gradient-gold">Barbers</span>
            </span>
            <p className="mt-3 max-w-xs text-sm text-muted">
              Australia&apos;s premium mobile barber platform. Verified barbers,
              at your door — starting in {SITE.city}.
            </p>
            <p className="mt-4 text-xs text-muted-2">
              Proudly Australian owned &amp; operated.
            </p>
          </div>

          {cols.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-semibold text-cream">{col.title}</h4>
              <ul className="mt-4 space-y-2.5">
                {col.links.map(([label, href]) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="text-sm text-muted transition-colors hover:text-gold"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-line pt-6 text-xs text-muted-2 sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} {SITE.name}. All rights reserved.</p>
          <div className="flex gap-5">
            <Link href="/privacy" className="hover:text-cream">Privacy</Link>
            <Link href="/terms" className="hover:text-cream">Terms</Link>
            <Link href="/book" className="hover:text-cream">Book now</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

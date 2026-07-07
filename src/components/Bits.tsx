export function Avatar({ initials, size = 48 }: { initials: string; size?: number }) {
  return (
    <span
      className="grid shrink-0 place-items-center rounded-full border border-gold/30 bg-gold-soft font-display font-semibold text-gold"
      style={{ width: size, height: size, fontSize: size * 0.36 }}
      aria-hidden
    >
      {initials}
    </span>
  );
}

export function Stars({ rating, size = 14 }: { rating: number; size?: number }) {
  const full = Math.round(rating);
  return (
    <span className="inline-flex items-center gap-0.5 text-gold" aria-label={`${rating} out of 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill={i < full ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth="1.5"
          aria-hidden
        >
          <path d="m12 3.5 2.5 5 5.5.8-4 3.9.95 5.5L12 22l-4.9-2.6.95-5.5-4-3.9 5.5-.8L12 3.5Z" />
        </svg>
      ))}
    </span>
  );
}

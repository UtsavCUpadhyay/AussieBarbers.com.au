import type { SVGProps } from "react";

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  viewBox: "0 0 24 24",
};

export function Icon({ name, ...props }: { name: string } & SVGProps<SVGSVGElement>) {
  const paths: Record<string, React.ReactNode> = {
    pin: (
      <>
        <path d="M12 21s-6-5.2-6-10a6 6 0 1 1 12 0c0 4.8-6 10-6 10Z" />
        <circle cx="12" cy="11" r="2.2" />
      </>
    ),
    shield: (
      <>
        <path d="M12 3 5 6v5c0 4.4 3 7.6 7 9 4-1.4 7-4.6 7-9V6l-7-3Z" />
        <path d="m9.2 11.6 1.9 1.9 3.7-3.9" />
      </>
    ),
    bolt: <path d="M13 3 5 13h5l-1 8 8-11h-5l1-7Z" />,
    star: (
      <path d="m12 3.5 2.5 5 5.5.8-4 3.9.95 5.5L12 22l-4.9-2.6.95-5.5-4-3.9 5.5-.8L12 3.5Z" />
    ),
    scissors: (
      <>
        <circle cx="6" cy="6" r="2.4" />
        <circle cx="6" cy="18" r="2.4" />
        <path d="M20 4 8.5 15.5M14.5 12.5 20 20M8 8l6 6" />
      </>
    ),
    check: <path d="m5 12 4.5 4.5L19 7" />,
    arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
    clock: (
      <>
        <circle cx="12" cy="12" r="8.5" />
        <path d="M12 7.5V12l3 1.8" />
      </>
    ),
  };
  return (
    <svg {...base} width="24" height="24" aria-hidden {...props}>
      {paths[name] ?? paths.star}
    </svg>
  );
}

import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

export function ChevronDownIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 18 18" fill="none" aria-hidden="true" {...props}>
      <path
        d="M13.5 6.75004C13.5 6.75004 10.1858 11.25 9 11.25C7.8141 11.25 4.5 6.75 4.5 6.75"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.125"
      />
    </svg>
  );
}

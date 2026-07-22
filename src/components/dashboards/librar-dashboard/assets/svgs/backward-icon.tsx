import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

export function BackwardIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden="true" {...props}>
      <path
        d="M39 9L24 24L39 39"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="4"
      />
      <path
        d="M24 9L9 24L24 39"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="4"
      />
    </svg>
  );
}

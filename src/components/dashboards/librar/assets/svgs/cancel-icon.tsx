import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

export function CancelIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" {...props}>
      <path
        d="M15 5L5.00068 14.9993M14.9993 15L5 5.00071"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

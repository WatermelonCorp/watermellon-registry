import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

export function ArrowDownIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}>
      <path
        d="M12 6C12 6 9.05407 10 8 10C6.94587 10 4 6 4 6"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

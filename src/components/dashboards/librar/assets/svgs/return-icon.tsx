import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

export function ReturnIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 20.5333 20.5333"
      fill="none"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M9.41128 5.13327H13.2613C15.3876 5.13327 17.1113 6.85697 17.1113 8.98327C17.1113 11.1096 15.3876 12.8333 13.2613 12.8333H3.4224"
        stroke="currentColor"
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.98905 10.2666C5.98905 10.2666 3.4224 12.157 3.4224 12.8333C3.42239 13.5097 5.98906 15.3999 5.98906 15.3999"
        stroke="currentColor"
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

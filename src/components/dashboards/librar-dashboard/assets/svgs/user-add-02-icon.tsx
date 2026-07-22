import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

export function UserAdd02Icon(props: IconProps) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" {...props}>
      <path
        d="M11.6667 7.08333C11.6667 4.78215 9.80117 2.91667 7.5 2.91667C5.19882 2.91667 3.33333 4.78215 3.33333 7.08333C3.33333 9.3845 5.19882 11.25 7.5 11.25C9.80117 11.25 11.6667 9.3845 11.6667 7.08333Z"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.3333 17.0833C13.3333 13.8617 10.7217 11.25 7.5 11.25C4.27834 11.25 1.66667 13.8617 1.66667 17.0833"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.8333 7.5V12.5M18.3333 10H13.3333"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

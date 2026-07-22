import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

export function Alert02Icon(props: IconProps) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" {...props}>
      <path
        d="M11.604 17.5H8.396C4.5373 17.5 2.60796 17.5 1.89697 16.2449C1.18598 14.9899 2.1728 13.3262 4.14645 9.99875L5.75048 7.29444C7.64633 4.09815 8.59425 2.5 10 2.5C11.4058 2.5 12.3537 4.09814 14.2495 7.29443L15.8536 9.99875C17.8272 13.3262 18.814 14.9899 18.103 16.2449C17.392 17.5 15.4627 17.5 11.604 17.5Z"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 7.5V11.25"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 14.1602V14.1685"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

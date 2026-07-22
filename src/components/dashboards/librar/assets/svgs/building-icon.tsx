import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

export function BuildingIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M2 22H22"
        stroke="white"
        strokeLinecap="round"
        strokeWidth="1.5"
      />
      <path
        d="M18 9H14C11.518 9 11 9.518 11 12V22H21V12C21 9.518 20.482 9 18 9Z"
        stroke="white"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <path
        d="M15 22H3V5C3 2.518 3.518 2 6 2H12C14.482 2 15 2.518 15 5V9"
        stroke="white"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <path
        d="M3 6H6M3 10H6M3 14H6"
        stroke="white"
        strokeLinecap="round"
        strokeWidth="1.5"
      />
      <path
        d="M15 13H17M15 16H17"
        stroke="white"
        strokeLinecap="round"
        strokeWidth="1.5"
      />
      <path
        d="M16 22V19"
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
}

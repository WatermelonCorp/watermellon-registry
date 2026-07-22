import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

export function BookPlusIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" {...props}>
      <path
        d="M16.25 15C16.25 15 15.4167 15.6357 15.4167 16.6667C15.4167 17.6977 16.25 18.3333 16.25 18.3333"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 5.41667V11.25M12.9215 8.32848H7.08822"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.6667 18.3333H5C4.07952 18.3333 3.33333 17.5872 3.33333 16.6667M3.33333 16.6667C3.33333 15.7462 4.07952 15 5 15H16.6667V5C16.6667 3.42865 16.6667 2.64297 16.1785 2.15482C15.6903 1.66667 14.9047 1.66667 13.3333 1.66667H8.33333C5.97631 1.66667 4.7978 1.66667 4.06557 2.3989C3.33333 3.13113 3.33333 4.30964 3.33333 6.66667V16.6667Z"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

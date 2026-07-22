import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

export function MembersIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" {...props}>
      <path
        d="M10.8333 9.16668C10.8333 7.32573 9.34088 5.83334 7.49996 5.83334C5.65901 5.83334 4.16663 7.32573 4.16663 9.16668C4.16663 11.0076 5.65901 12.5 7.49996 12.5C9.34088 12.5 10.8333 11.0076 10.8333 9.16668Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.25"
      />
      <path
        d="M9.19879 6.29811C9.17754 6.14623 9.16663 5.99106 9.16663 5.83333C9.16663 3.99238 10.659 2.5 12.5 2.5C14.3409 2.5 15.8333 3.99238 15.8333 5.83333C15.8333 7.67428 14.3409 9.16667 12.5 9.16667C11.8795 9.16667 11.2986 8.99717 10.8011 8.70192"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.25"
      />
      <path
        d="M12.5 17.5C12.5 14.7386 10.2614 12.5 7.5 12.5C4.73857 12.5 2.5 14.7386 2.5 17.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.25"
      />
      <path
        d="M17.5 14.1667C17.5 11.4052 15.2614 9.16666 12.5 9.16666"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.25"
      />
    </svg>
  );
}

import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

export function DashboardIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" {...props}>
      <path
        d="M2.5 9.99131V12.0833C2.5 14.8331 2.5 16.2081 3.35427 17.0624C4.20854 17.9166 5.58347 17.9166 8.33333 17.9166H11.6667C14.4165 17.9166 15.7914 17.9166 16.6457 17.0624C17.5 16.2081 17.5 14.8331 17.5 12.0833V9.99131C17.5 8.59023 17.5 7.88975 17.2034 7.28335C16.9068 6.67695 16.3539 6.24688 15.248 5.38674L13.5813 4.09044C11.8609 2.75235 11.0007 2.08331 10 2.08331C8.99925 2.08331 8.13908 2.75235 6.41868 4.09044L4.75201 5.38674C3.64611 6.24688 3.09316 6.67695 2.79658 7.28335C2.5 7.88975 2.5 8.59023 2.5 9.99131Z"
        fill="currentColor"
      />
      <path
        d="M13.3333 14.1667H6.66663"
        stroke="var(--sidebar)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.25"
      />
    </svg>
  );
}

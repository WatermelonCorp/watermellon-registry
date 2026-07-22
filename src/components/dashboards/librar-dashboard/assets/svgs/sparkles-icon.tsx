import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

export function SparklesIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" {...props}>
      <path
        d="M12.5 1.66667L12.9489 3.65964C13.3298 5.35013 14.6498 6.67026 16.3403 7.05106L18.3333 7.5L16.3403 7.94894C14.6498 8.32974 13.3298 9.64983 12.9489 11.3403L12.5 13.3333L12.0511 11.3403C11.6703 9.64983 10.3502 8.32974 8.65967 7.94894L6.66667 7.5L8.65967 7.05106C10.3501 6.67026 11.6703 5.35013 12.0511 3.65965L12.5 1.66667Z"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinejoin="round"
      />
      <path
        d="M5.83333 10L6.15401 11.4236C6.42601 12.631 7.36896 13.574 8.57642 13.846L10 14.1667L8.57642 14.4873C7.36896 14.7593 6.42601 15.7023 6.15401 16.9098L5.83333 18.3333L5.51266 16.9098C5.24066 15.7023 4.29771 14.7593 3.09022 14.4873L1.66667 14.1667L3.09022 13.846C4.29771 13.574 5.24066 12.6311 5.51266 11.4236L5.83333 10Z"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinejoin="round"
      />
    </svg>
  );
}

import type { SVGProps } from "react";
import { cn } from "@/lib/utils";

export function AstrixLogo({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="46"
      height="40"
      viewBox="0 0 46 40"
      fill="none"
      className={cn("h-5 w-auto", className)}
      aria-hidden
      {...props}
    >
      <path
        d="M0 33L4.60606 25H12.2448C17.2569 25 21.4947 28.7103 22.1571 33.6784L23 40H13L11.5585 36.6365C10.613 34.4304 8.44379 33 6.04362 33H0Z"
        fill="var(--primary)"
      />
      <path
        d="M46 33L41.3939 25H33.7552C28.7431 25 24.5053 28.7103 23.8429 33.6784L23 40H33L34.4415 36.6365C35.387 34.4304 37.5562 33 39.9564 33H46Z"
        fill="var(--primary)"
      />
      <path
        d="M4.60608 25L18.9999 0H23L22.6032 9.52405C22.2608 17.7406 15.7455 24.3596 7.53539 24.8316L4.60608 25Z"
        fill="var(--primary)"
      />
      <path
        d="M41.3939 25L27.0001 0H23L23.3968 9.52405C23.7392 17.7406 30.2545 24.3596 38.4646 24.8316L41.3939 25Z"
        fill="var(--primary)"
      />
    </svg>
  );
}

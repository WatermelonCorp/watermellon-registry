import type { SVGProps } from 'react';

export function DemostackLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 512 512"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M256 512C397.385 512 512 397.385 512 256C512 114.615 397.385 0 256 0C114.615 0 0 114.615 0 256C0 397.385 114.615 512 256 512ZM335.863 119.256C339.751 105.447 326.35 97.2811 314.112 106L143.272 227.707C129.999 237.162 132.087 256 146.408 256H191.394V255.651H279.072L207.631 280.859L176.137 392.745C172.249 406.553 185.649 414.719 197.888 405.999L368.728 284.295C382.001 274.839 379.912 256 365.592 256H297.371L335.863 119.256Z"
        fill="#4338CB"
      />
    </svg>
  );
}

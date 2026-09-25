import { useId, type SVGProps } from 'react'

export function BionisLogo({ className, ...props }: SVGProps<SVGSVGElement>) {
  const reactId = useId().replace(/:/g, '')
  const gradientA = `bionis-logo-a-${reactId}`
  const gradientB = `bionis-logo-b-${reactId}`

  return (
    <svg
      viewBox="0 0 1024 1024"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path
        d="M904.886 439.002c43.208-45.218-30.146-116.562-78.379-74.359l-85.413 76.369-75.364-85.413-89.432 79.384 94.456 105.51c35.17 32.155 85.413 34.165 127.617 0z"
        fill={`url(#${gradientA})`}
      />
      <path
        d="m487.643 675.145-103.5-72.35-76.369 101.491-181.879 133.645c-52.253 41.199 8.041 127.617 71.345 92.447l189.917-127.617c16.078-11.053 28.136-25.121 37.18-38.184z"
        fill={`url(#${gradientB})`}
      />
      <path
        d="M220.581 366.654c-31.152 47.228 50.241 113.549 94.457 53.257l60.291-77.373 92.446 31.15-83.402 114.554c-36.177 53.257-32.158 103.5 6.029 138.67l170.825 125.606-95.461 149.724c-29.143 48.233 53.255 112.548 98.476 63.306l128.621-171.83c29.139-41.199 21.1-99.481-12.058-128.622L555.198 570.64l96.466-128.622c40.193-61.296 22.105-164.796-106.515-188.913L389.397 222.96c-38.186-5.025-70.342 8.039-86.418 30.145z"
        fill="#0886fd"
      />
      <circle cx="692.861" cy="148.601" r="108.524" fill="#0886fd" />
      <defs>
        <linearGradient
          id={gradientA}
          x1="733.055"
          y1="471.159"
          x2="576.298"
          y2="446.038"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#0886fd" />
          <stop offset="1" stopColor="#00509b" />
        </linearGradient>
        <linearGradient
          id={gradientB}
          x1="354.225"
          y1="747.494"
          x2="446.671"
          y2="621.887"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#0886fd" />
          <stop offset="1" stopColor="#00509b" />
        </linearGradient>
      </defs>
    </svg>
  )
}

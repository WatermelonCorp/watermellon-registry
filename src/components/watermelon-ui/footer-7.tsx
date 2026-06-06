import { type ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export interface Footer7Link {
  label: string;
  href: string;
}

export interface Footer7LinkGroup {
  title: string;
  links: Footer7Link[];
}

export interface Footer7Props {
  logo?: ReactNode;
  brandName?: string;
  badgeText?: string;
  headline?: string;
  inputPlaceholder?: string;
  buttonText?: string;
  buttonIcon?: ReactNode;
  backgroundImage?: string;
  centerIcon?: ReactNode;
  linkGroups?: Footer7LinkGroup[];
  brandWatermark?: string;
}

export function Footer7({
  logo,
  brandName = 'Watermelon',
  badgeText = 'Loved by Creators',
  headline = 'Fresh insights, tutorials, and updates delivered to your inbox.',
  inputPlaceholder = 'Enter your email',
  buttonText = 'Stay Updated',
  buttonIcon,
  backgroundImage,
  linkGroups = [],
  brandWatermark,
}: Footer7Props) {
  return (
    <footer className="relative w-full overflow-hidden ">
      {backgroundImage && (
        <img
          src={backgroundImage}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full object-cover select-none"
        />
      )}

      <div className="relative z-10">
        <div className="mx-auto max-w-7xl px-6 sm:px-12">
          <div className="flex flex-col gap-8 pt-6 pb-10 lg:flex-row lg:items-end lg:justify-between lg:pt-10 lg:pb-14">
            <div className="flex max-w-xl flex-col gap-5">
              {badgeText && (
                <div className="flex items-center gap-2.5">
                  <span className="relative flex h-2 w-2 shrink-0">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#FF4202] opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-[#FF4202]" />
                  </span>
                  <span className="text-sm font-medium text-white">
                    {badgeText}
                  </span>
                </div>
              )}
              <h2 className="text-white text-3xl leading-tight font-light tracking-tight sm:text-4xl lg:text-5xl">
                {headline}
              </h2>
            </div>
            <form
              className="flex w-full max-w-sm shrink-0 items-center gap-2"
              onSubmit={(e) => e.preventDefault()}
            >
              <Input
                type="email"
                placeholder={inputPlaceholder}
                className="border-white/5 bg-white/10  h-12 min-h-12 flex-1 rounded-none border px-4 text-sm text-white placeholder:text-white/70  focus-visible:border-orange-600/50 focus-visible:ring-orange-600/30"
              />
              <Button
                type="submit"
                className="text-primary-foreground group flex h-12 shrink-0 cursor-pointer items-center gap-2 rounded-none bg-[#FF4202] px-5 font-semibold shadow-[inset_0_0_8px_0.5px_rgba(255,255,255,0.3)] transition-all"
              >
                <span>{buttonText}</span>
                {buttonIcon && (
                  <span className="flex h-4 w-4 items-center justify-center transition-transform duration-300 group-hover:translate-x-0.5 [&>svg]:h-full [&>svg]:w-full">
                    {buttonIcon}
                  </span>
                )}
              </Button>
            </form>
          </div>

          <div className="flex flex-col gap-10 pb-6 lg:flex-row lg:items-start lg:gap-8">
            <div className="flex flex-1 items-center gap-3 lg:pt-1">
              {logo && (
                <div className="text-white flex h-6 w-6 shrink-0 items-center justify-center [&>svg]:h-full [&>svg]:w-full">
                  {logo}
                </div>
              )}
              <span className="text-white text-base font-medium tracking-tight">
                {brandName}
              </span>
            </div>

            {linkGroups.length > 0 && (
              <div className="grid grid-cols-2 gap-x-12 gap-y-8 sm:grid-cols-3 lg:gap-x-16">
                {linkGroups.map((group, groupIndex) => (
                  <div key={groupIndex} className="flex flex-col gap-4">
                    <span className="text-sm font-medium tracking-wide text-white/90 uppercase">
                      {group.title}
                    </span>
                    <ul className="flex flex-col gap-3">
                      {group.links.map((link, linkIndex) => (
                        <li key={linkIndex}>
                          <a
                            href={link.href}
                            className="hover:text-white text-sm text-white/70 transition-colors"
                          >
                            {link.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {brandWatermark && (
          <div className="flex w-full items-center justify-center">
            <svg
              className="h-auto w-full  transition-colors duration-300 select-none"
              viewBox={`0 0 ${Math.max(brandWatermark.length * 90, 400)} 110`}
              preserveAspectRatio="xMidYMid meet"
              aria-label={brandWatermark}
            >
              <text
                x="50%"
                y="105"
                dominantBaseline="alphabetic"
                textAnchor="middle"
                textLength="90%"
                lengthAdjust="spacing"
                className="fill-white/30 font-sans font-bold tracking-tighter"
                fontSize="160"
              >
                {brandWatermark}
              </text>
            </svg>
          </div>
        )}
      </div>
    </footer>
  );
}

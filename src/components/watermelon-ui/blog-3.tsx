import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Blog3Post {
  image: string;
  imageAlt: string;
  readingTime: string;
  title: string;
  description: string;
  cardCtaLabel: string;
  href?: string;
}

interface Blog3Header {
  badge: string;
  badgeIcon?: React.ReactNode;
  heading: string;
  description: string;
}

interface Blog3Footer {
  ctaText: string;
  ctaHref: string;
}

interface Blog3Props {
  header: Blog3Header;
  posts: Blog3Post[];
  footer: Blog3Footer;
  className?: string;
  cardClassName?: string;
  /** Render override for the footer CTA link */
  renderCtaLink?: (props: {
    href: string;
    children: React.ReactNode;
  }) => React.ReactNode;
  /** Render override for individual card links */
  renderCardLink?: (props: {
    href: string;
    children: React.ReactNode;
  }) => React.ReactNode;
}

export default function Blog3({
  header,
  posts,
  footer,
  className,
  cardClassName,
  renderCtaLink,
  renderCardLink,
}: Blog3Props) {
  const ctaContent = (
    <span className="group/cta text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 text-sm font-medium transition-colors">
      {footer.ctaText}
      <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5" />
    </span>
  );

  return (
    <section
      className={cn(
        'bg-background  w-full px-4 py-16 sm:px-6 md:py-24',
        className,
      )}
    >
      <div className="mx-auto  flex max-w-2xl flex-col items-center gap-10 md:gap-14">
        <div className="flex flex-col items-center gap-3 text-center">
          <h2 className="text-foreground max-w-xl text-[1.75rem] leading-tight font-semibold tracking-tight sm:text-3xl md:text-4xl">
            {header.heading}
          </h2>

          <p className="text-muted-foreground max-w-md text-sm leading-relaxed">
            {header.description}
          </p>
        </div>

        <div className="flex w-full flex-col gap-3">
          {posts.map((post, index) => {
            const card = (
              <article
                key={index}
                className={cn(
                  'group flex flex-col gap-2 overflow-hidden  transition-colors duration-300 sm:flex-row',
                  cardClassName,
                )}
              >
                <div className="bg-muted rounded-4xl flex flex-1 flex-col gap-2 px-5 py-5 sm:py-6">
                  <span className="text-primary/80 text-sm font-medium">
                    {post.readingTime}
                  </span>

                  <h3 className="text-foreground text-lg leading-snug font-semibold">
                    {post.title}
                  </h3>

                  <p className="text-muted-foreground text-sm leading-normal text-pretty">
                    {post.description}
                  </p>

                  <div className="border-border mt-auto flex size-fit items-center rounded-4xl gap-1 border bg-white p-1 px-2 dark:bg-black">
                    <span className="text-foreground text-sm font-medium">
                      {post.cardCtaLabel}
                    </span>
                    <ArrowRight className="text-foreground size-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                  </div>
                </div>
                <div className=" relative sm:aspect-auto sm:w-44 md:w-48 rounded-4xl border border-border ">
                  <img
                    src={post.image}
                    alt={post.imageAlt}
                    className="size-full object-cover shadow-lg rounded-4xl"
                    loading="lazy"
                  />
                </div>
              </article>
            );

            if (renderCardLink && post.href) {
              return (
                <div key={index}>
                  {renderCardLink({
                    href: post.href,
                    children: card,
                  })}
                </div>
              );
            }

            if (post.href) {
              return (
                <a
                  key={index}
                  href={post.href}
                  className="focus-visible:ring-primary rounded-2xl focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
                >
                  {card}
                </a>
              );
            }

            return card;
          })}
        </div>
        <div className="flex items-center justify-center pt-2">
          {renderCtaLink ? (
            renderCtaLink({ href: footer.ctaHref, children: ctaContent })
          ) : (
            <a href={footer.ctaHref}>{ctaContent}</a>
          )}
        </div>
      </div>
    </section>
  );
}

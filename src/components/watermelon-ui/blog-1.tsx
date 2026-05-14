import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BlogPostAuthor {
  name: string;
  role: string;
}

interface BlogPost {
  date: string;
  title: string;
  author: BlogPostAuthor;
  href?: string;
}

interface BlogSectionHeader {
  badge: string;
  heading: string;
  description: string;
  ctaText: string;
  ctaHref: string;
}

interface Blog1Props {
  header: BlogSectionHeader;
  posts: BlogPost[];
  className?: string;
  /** Optional render override for the CTA link */
  renderCtaLink?: (props: { href: string; children: React.ReactNode }) => React.ReactNode;
  /** Optional render override for individual card links */
  renderCardLink?: (props: { href: string; children: React.ReactNode }) => React.ReactNode;
}

export default function Blog1({
  header,
  posts,
  className,
  renderCtaLink,
  renderCardLink,
}: Blog1Props) {
  const ctaContent = (
    <span className="group/cta inline-flex items-center gap-1.5 text-sm font-semibold text-foreground transition-colors hover:text-primary">
      {header.ctaText}
      <ArrowUpRight className="size-4 transition-transform group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5" />
    </span>
  );

  return (
    <section
      className={cn(
        'w-full bg-background px-4 py-16 sm:px-6 md:py-24',
        className,
      )}
    >
      <div className=" max-w-6xl">
        <div className="mb-10 flex flex-col gap-6 md:mb-14 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl space-y-3">

            <h2 className="text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl md:text-[2.75rem]">
              {header.heading}
            </h2>
          </div>

          <div className="flex shrink-0 flex-col items-start gap-3 md:items-end md:text-right">
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground md:text-[0.9375rem]">
              {header.description}
            </p>

            {renderCtaLink ? (
              renderCtaLink({ href: header.ctaHref, children: ctaContent })
            ) : (
              <a href={header.ctaHref}>{ctaContent}</a>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, index) => {
            const card = (
              <div
                key={index}
                className={cn(
                  'group bg-muted/50 relative flex flex-col justify-between rounded-none p-6 shadow-[inset_0_0_2px_2px_rgba(255,255,255,1),inset_0_0_0_1px_rgba(0,0,0,0.2),0px_0px_0px_1px_rgba(0,0,0,0.08),0px_1px_2px_-1px_rgba(0,0,0,0.08),0px_2px_4px_0px_rgba(0,0,0,0.06)] duration-300 dark:shadow-[inset_0_0_2px_2px_rgba(255,255,255,0.04),inset_0_0_0_1px_rgba(255,255,255,0.08),0px_0px_0px_1px_rgba(255,255,255,0.06),0px_1px_2px_-1px_rgba(0,0,0,0.5),0px_2px_4px_0px_rgba(0,0,0,0.4)]',
                  'min-h-[220px] sm:min-h-[240px]',
                )}
              >
                <span className="text-muted-foreground/70 text-sm font-medium">
                  {post.date}
                </span>

                <h3 className="text-foreground mt-6 text-base leading-snug font-medium sm:text-lg">
                  {post.title}
                </h3>

                <div className="mt-auto flex items-end justify-between pt-8">
                  <div className="leading-tight">
                    <p className="text-primary text-md font-medium">
                      {post.author.name}
                    </p>
                    <p className="text-muted-foreground text-sm">
                      {post.author.role}
                    </p>
                  </div>

                  <div className="border-border bg-background text-muted-foreground group-hover:border-foreground/20 group-hover:text-foreground flex size-8 shrink-0 items-center justify-center rounded-none border transition-colors">
                    <ArrowUpRight className="size-3.5" />
                  </div>
                </div>
              </div>
            );

            if (renderCardLink && post.href) {
              return renderCardLink({
                href: post.href,
                children: card,
              });
            }

            if (post.href) {
              return (
                <a key={index} href={post.href} className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-2xl">
                  {card}
                </a>
              );
            }

            return card;
          })}
        </div>
      </div>
    </section>
  );
}

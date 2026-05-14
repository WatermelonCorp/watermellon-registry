import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';

import { FaBookmark } from 'react-icons/fa6';

interface BlogAuthor {
  name: string;
  role: string;
  avatar: string;
}

interface BlogCardItem {
  meta: string;
  title: string;
  author: BlogAuthor;
  href?: string;
}

interface Blog2Header {
  heading: string;
  description: string;
  ctaText: string;
  ctaHref: string;
}

interface Blog2Props {
  header: Blog2Header;
  posts: BlogCardItem[];
  className?: string;
  renderCtaLink?: (props: {
    href: string;
    children: React.ReactNode;
  }) => React.ReactNode;
  renderCardLink?: (props: {
    href: string;
    children: React.ReactNode;
  }) => React.ReactNode;
}

const colorVariants = [
  "bg-violet-400/60 hover:bg-violet-400/40 dark:bg-violet-400/50 dark:hover:bg-violet-400/40",
  "bg-amber-400/60 hover:bg-amber-400/40 dark:bg-amber-400/50 dark:hover:bg-amber-400/40",
  "bg-emerald-400/60 hover:bg-emerald-400/40 dark:bg-emerald-400/50 dark:hover:bg-emerald-400/40",
  "bg-orange-400/60 hover:bg-orange-400/40 dark:bg-orange-400/50 dark:hover:bg-orange-400/40",
  "bg-blue-400/60 hover:bg-blue-400/40 dark:bg-blue-400/50 dark:hover:bg-blue-400/40",
  "bg-rose-400/60 hover:bg-rose-400/40 dark:bg-rose-400/50 dark:hover:bg-rose-400/40",
];

export default function Blog2({
  header,
  posts,
  className,
  renderCtaLink,
  renderCardLink,
}: Blog2Props) {
  const ctaContent = (
    <span className="group/cta text-primary hover:text-primary/80 inline-flex items-center gap-1.5 text-sm font-semibold transition-colors">
      {header.ctaText}
      <ArrowUpRight className="size-4 transition-transform group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5" />
    </span>
  );

  return (
    <section
      className={cn(
        'bg-background w-full  px-4 py-16 sm:px-6 md:py-24',
        className,
      )}
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 flex flex-col items-center gap-4 text-center md:mb-16">
          <h2 className="text-foreground max-w-2xl text-3xl leading-tight font-semibold tracking-tight sm:text-4xl md:text-[2.75rem]">
            {header.heading}
          </h2>

          <p className="text-muted-foreground max-w-lg text-sm leading-relaxed sm:text-base">
            {header.description}
          </p>

          {renderCtaLink ? (
            renderCtaLink({ href: header.ctaHref, children: ctaContent })
          ) : (
            <a href={header.ctaHref}>{ctaContent}</a>
          )}
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, index) => {
            const card = (
              <article
                key={index}
                className={cn(
                  'group relative flex min-h-[360px] flex-col justify-between rounded-4xl p-6 transition-colors duration-300 sm:p-7',
                  colorVariants[index % colorVariants.length],
                )}
              >
                <div className="flex flex-1 flex-col">
                  <div className="flex items-center justify-between">
                    <span className="text-foreground/80 text-md font-bold">
                      {post.meta}
                    </span>
                    <div className="text-foreground/50 hover:text-foreground/90 transition-colors">
                      <FaBookmark className="size-5" strokeWidth={1.5} />
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col justify-center py-6">
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="text-foreground line-clamp-3 text-4xl leading-[1.2] font-medium tracking-tight">
                        {post.title}
                      </h3>
                      <ArrowRight
                        className="text-foreground group-hover:text-foreground/80 mt-10 size-5 shrink-0 transition-all duration-300 group-hover:translate-x-1"
                        strokeWidth={3}
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <div className="mt-auto flex items-center gap-3">
                      <div className="bg-background flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-lg">
                        {post.author.avatar.startsWith('<svg') ||
                        post.author.avatar.startsWith('http') ? (
                          <img
                            src={post.author.avatar}
                            alt={post.author.name}
                            className="size-full rounded-lg object-contain"
                          />
                        ) : (
                          <div className="bg-muted flex size-full items-center justify-center rounded-full text-xs font-medium">
                            {post.author.name.charAt(0)}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-foreground text-sm leading-tight font-medium">
                        {post.author.name}
                      </span>
                      <span className="text-foreground/70 text-xs leading-tight font-medium">
                        {post.author.role}
                      </span>
                    </div>
                    <div className="ml-auto flex items-center justify-center rounded-md border border-white/30 bg-background/20 dark:bg-white/20 backdrop-blur-sm px-4 py-1.5 text-xs font-semibold text-zinc-50 transition-transform duration-300">
                      Read
                    </div>
                  </div>
                </div>
              </article>
            );

            if (renderCardLink && post.href) {
              return renderCardLink({
                href: post.href,
                children: card,
              });
            }

            if (post.href) {
              return (
                <a
                  key={index}
                  href={post.href}
                  className="block focus-visible:ring-primary rounded-[1.5rem] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
                >
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

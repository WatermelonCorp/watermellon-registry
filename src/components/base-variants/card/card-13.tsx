import { StarIcon } from 'lucide-react';

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from '@/components/ui/card';

type Testimonial = {
  avatarAlt: string;
  avatarSrc: string;
  fallback: string;
  handle: string;
  highlightedText: string;
  name: string;
  quoteEnd: string;
  quoteStart: string;
  rating: number;
};

const testimonial: Testimonial = {
  avatarAlt: 'Sara Gomez',
  avatarSrc: 'https://i.pravatar.cc/160?img=32',
  fallback: 'SG',
  handle: '@sarag.design',
  highlightedText:
    'easy to adapt, clean to extend, and reliable inside real product work',
  name: 'Sara Gomez',
  quoteEnd:
    'That combination made it much easier to move from idea to implementation without reworking everything later.',
  quoteStart:
    'This component set feels thoughtful from the start. The pieces are',
  rating: 4,
};

const Card13 = () => {
  return (
    <Card className="border-border/70 bg-background max-w-md rounded-none shadow-sm">
      <CardContent className="leading-7">
        <p>
          {testimonial.quoteStart}{' '}
          <span className="border border-dashed border-neutral-300 bg-neutral-50 px-1.5 py-0.5 dark:border-neutral-800 dark:bg-neutral-950/30">
            {testimonial.highlightedText}
          </span>
          . {testimonial.quoteEnd}
        </p>
      </CardContent>
      <CardFooter className="border-border/60 rounded-none justify-between gap-3 border-t pt-5 max-sm:flex-col max-sm:items-stretch">
        <div className="flex items-center gap-3">
          <Avatar className="ring-ring ring-2">
            <AvatarImage
              src={testimonial.avatarSrc}
              alt={testimonial.avatarAlt}
            />
            <AvatarFallback className="text-xs">
              {testimonial.fallback}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-0.5">
            <CardTitle className="text-sm">{testimonial.name}</CardTitle>
            <CardDescription>{testimonial.handle}</CardDescription>
          </div>
        </div>
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }, (_, index) => {
            const filled = index < testimonial.rating;

            return (
              <StarIcon
                key={index}
                className={
                  filled
                    ? 'size-5 fill-amber-500 stroke-amber-500 dark:fill-amber-400 dark:stroke-amber-400'
                    : 'size-5 stroke-amber-500 dark:stroke-amber-400'
                }
              />
            );
          })}
        </div>
      </CardFooter>
    </Card>
  );
};

export default Card13;

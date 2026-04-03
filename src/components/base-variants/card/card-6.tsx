import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

type MediaCard = {
  ctaLabel: string;
  description: string;
  imageAlt: string;
  imageSrc: string;
  title: string;
};

const mediaCard: MediaCard = {
  ctaLabel: 'Open Collection',
  description:
    'A pastel gradient study with softer transitions and a cleaner editorial feel.',
  imageAlt: 'Abstract pastel composition',
  imageSrc: 'https://picsum.photos/seed/pastel-motion-field/1200/900',
  title: 'Pastel Motion Field',
};

const Card6 = () => {
  return (
    <Card className="border-border/70 max-w-lg overflow-hidden py-0 shadow-sm sm:flex-row sm:gap-0">
      <CardContent className="grow px-0">
        <img
          src={mediaCard.imageSrc}
          alt={mediaCard.imageAlt}
          className="size-full object-cover sm:min-h-full sm:rounded-l-xl"
        />
      </CardContent>
      <div className="sm:min-w-60">
        <CardHeader className="space-y-1 py-6">
          <CardTitle>{mediaCard.title}</CardTitle>
          <CardDescription className="leading-6">
            {mediaCard.description}
          </CardDescription>
        </CardHeader>
        <CardFooter className="gap-3 py-4 rounded-none">
          <Button className="bg-sky-600 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.35),inset_0_-2px_4px_rgba(0,0,0,0.18),0_6px_14px_rgba(14,165,233,0.22)] hover:bg-sky-700 dark:bg-sky-500 dark:hover:bg-sky-400">
            {mediaCard.ctaLabel}
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
};

export default Card6;

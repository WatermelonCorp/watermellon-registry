export type Demostack = {
  id: string;
  title: string;
  author: string;
  avatar: string;
  image: string;
};

export const demostacks: Demostack[] = [
  {
    id: 'monitor-demo-performance',
    title: 'Stockroom Inventory Onboarding',
    author: 'Abiola Ahmed',
    avatar:
      'https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&q=80&w=96&h=96',
    image: 'https://assets.watermelon.sh/components/stockroom-tour.png',
  },
  {
    id: 'introduction-to-app',
    title: 'Gridwise Platform Tour',
    author: 'Vansh P.',
    avatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=96&h=96',
    image: 'https://assets.watermelon.sh/components/gridwise-tour.png',
  },
  {
    id: 'monitor-detail-performance',
    title: 'Resolve a Support Request',
    author: 'Ava C',
    avatar:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=96&h=96',
    image:
      'https://assets.watermelon.sh/components/support-request-tour.png',
  },
];

'use client';

import { useState, type FC } from 'react';
import {
  motion,
  AnimatePresence,
  MotionConfig,
  type Transition,
} from 'motion/react';
import { ChevronRight, X, Coffee } from 'lucide-react';
import { FaCarrot, FaGraduationCap, FaPills, FaPlug } from 'react-icons/fa';
import { TbHomeFilled, TbPlayerPlayFilled } from 'react-icons/tb';
import { FaBottleWater } from 'react-icons/fa6';
import { MdWifi } from 'react-icons/md';
import { BsFillMouse2Fill } from 'react-icons/bs';
import { IoGameController } from 'react-icons/io5';
import useMeasure from 'react-use-measure';
import type { IconType } from 'react-icons';

export interface CollectionItem {
  id: string;
  name: string;
  price: number;
  icon: IconType;
}

export interface Collection {
  id: string;
  name: string;
  items: CollectionItem[];
}

interface DisclosureCardProps {
  collections?: Collection[];
}

const DEFAULT_COLLECTIONS: Collection[] = [
  {
    id: 'utilities',
    name: 'Utilities',
    items: [
      {
        id: 'u-1',
        name: 'Electricity',
        price: 150,
        icon: FaPlug,
      },
      {
        id: 'u-2',
        name: 'Water',
        price: 50,
        icon: FaBottleWater,
      },
      {
        id: 'u-3',
        name: 'Internet',
        price: 100,
        icon: MdWifi,
      },
    ],
  },
  {
    id: 'subscriptions',
    name: 'Subscriptions',
    items: [
      {
        id: 's-1',
        name: 'Streaming',
        price: 80,
        icon: TbPlayerPlayFilled,
      },
      {
        id: 's-2',
        name: 'Courses',
        price: 100,
        icon: FaGraduationCap,
      },
      {
        id: 's-3',
        name: 'Software & Apps',
        price: 120,
        icon: BsFillMouse2Fill,
      },
      {
        id: 's-4',
        name: 'Games',
        price: 50,
        icon: IoGameController,
      },
    ],
  },
  {
    id: 'daily-needs',
    name: 'Daily Needs',
    items: [
      {
        id: 'dn-1',
        name: 'Groceries',
        price: 500.56,
        icon: FaCarrot,
      },
      {
        id: 'dn-2',
        name: 'Snacks',
        price: 45.2,
        icon: Coffee,
      },
      {
        id: 'dn-3',
        name: 'Essentials',
        price: 120.34,
        icon: TbHomeFilled,
      },
      {
        id: 'dn-4',
        name: 'Health',
        price: 75.8,
        icon: FaPills,
      },
    ],
  },
];

const springConfig: Transition = {
  type: 'spring',
  stiffness: 200,
  damping: 20,
  mass: 1.1,
};

export const DisclosureCard: FC<DisclosureCardProps> = ({
  collections = DEFAULT_COLLECTIONS,
}) => {
  return (
    <div className="theme-injected flex w-full items-center justify-center font-sans">
      <motion.div
        className="flex flex-col gap-2 will-change-transform"
        layout="position"
        transition={springConfig}
      >
        {collections.map((collection) => (
          <GridContainer
            key={collection.id}
            title={collection.name}
            items={collection.items}
          />
        ))}
      </motion.div>
    </div>
  );
};

const GridContainer = ({
  items,
  title,
}: {
  items: CollectionItem[];
  title: string;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [ref, bounds] = useMeasure({ offsetSize: true });

  return (
    <MotionConfig transition={springConfig}>
      <motion.div
        className="w-75 cursor-pointer overflow-hidden rounded-lg border border-border bg-card"
        animate={{
          height: bounds.height > 0 ? bounds.height : 'auto',
        }}
      >
        <div className="p-2" ref={ref}>
          <AnimatePresence
            mode="popLayout"
            key={isExpanded ? 'expanded' : 'collapsed'}
            propagate
          >
            {!isExpanded ? (
              <motion.div
                key={'collapsed'}
                className="flex w-full items-center space-x-2"
                onClick={() => setIsExpanded(true)}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.1, ease: 'easeOut' }}
              >
                <div className="grid grid-cols-2 gap-1">
                  {items.map((item, index) => (
                    <motion.div
                      className="relative flex size-6 items-center justify-center rounded-4xl bg-primary p-1"
                      key={`${item.name}-${index}`}
                      layoutId={`${item.name}`}
                      transition={{ ...springConfig, delay: 0.01 }}
                    >
                      <item.icon className="size-4 fill-current text-primary-foreground" />
                    </motion.div>
                  ))}
                </div>

                <div className="ml-2 flex flex-1 flex-col items-start justify-center">
                  <motion.span
                    layoutId={`title-${title}`}
                    layout="position"
                    className="font-sans text-lg text-foreground"
                  >
                    {title}
                  </motion.span>
                  <span className="font-sans text-sm text-muted-foreground">
                    {items.length} Items
                  </span>
                </div>

                <div>
                  <ChevronRight className="size-6 text-muted-foreground" />
                </div>
              </motion.div>
            ) : (
              <motion.div
                key={'expanded'}
                className="flex w-full flex-col gap-3"
                exit={{ opacity: 0 }}
                transition={{ duration: 0.01, ease: 'easeOut' }}
              >
                <motion.div className="flex items-center px-1" layout>
                  <motion.span
                    className="flex-1 font-sans text-lg text-foreground"
                    layoutId={`title-${title}`}
                    layout="position"
                  >
                    {title}
                  </motion.span>
                  <div
                    className="flex items-center justify-center rounded-4xl bg-input p-1 text-muted-foreground transition-colors hover:text-foreground"
                    onClick={() => setIsExpanded(false)}
                  >
                    <X className="size-4 text-current" />
                  </div>
                </motion.div>

                <div className="flex flex-col gap-3">
                  <AnimatePresence mode="popLayout">
                    {items.map((item) => (
                      <div
                        className="flex items-center justify-center gap-2"
                        key={item.id}
                      >
                        <motion.div
                          className="flex size-10 items-center justify-center rounded-4xl bg-primary"
                          layoutId={`${item.name}`}
                        >
                          <item.icon className="size-6 fill-current text-primary-foreground" />
                        </motion.div>
                        <motion.div
                          className="mt-2 flex flex-1 flex-col items-start justify-center gap-2 leading-0"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                        >
                          <motion.p className="font-sans text-md text-foreground">
                            {item.name}
                          </motion.p>
                          <div className="flex gap-1 text-muted-foreground">
                            <div className="flex items-start justify-center gap-1">
                              <p className="font-sans text-sm">${item.price}</p>
                            </div>
                          </div>
                        </motion.div>
                        <div>
                          <ChevronRight className="mr-1 size-6 text-muted-foreground" />
                        </div>
                      </div>
                    ))}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </MotionConfig>
  );
};

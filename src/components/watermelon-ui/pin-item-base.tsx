"use client";

import React, { useState } from "react";
import {
  motion,
  AnimatePresence,
  MotionConfig,
  type Transition,
} from "motion/react";
import { Pin } from "lucide-react";
import { IoFastFood } from "react-icons/io5";
import {
  FaChargingStation,
  FaPills,
  FaSailboat,
  FaUtensils,
} from "react-icons/fa6";

export type PlaceItem = {
  id: number;
  name: string;
  type: string;
  status: string;
  icon: React.ComponentType<{ size?: number }>;
  pinned?: boolean;
};

const INITIAL_PLACES: PlaceItem[] = [
  {
    id: 1,
    name: "Harbor Bay Marina",
    type: "Marina",
    status: "Closes 7:00 PM",
    icon: IoFastFood,
    pinned: false,
  },
  {
    id: 2,
    name: "Mocha Brew",
    type: "Cafe",
    status: "Closes 9:00 PM",
    icon: FaSailboat,
    pinned: false,
  },
  {
    id: 3,
    name: "Olive Bistro",
    type: "Restaurant",
    status: "Closes 11:00 PM",
    icon: FaUtensils,
    pinned: false,
  },
  {
    id: 4,
    name: "GreenVolt Hub",
    type: "EV Charger",
    status: "Open 24 hours",
    icon: FaChargingStation,
    pinned: false,
  },
  {
    id: 5,
    name: "CarePlus Pharmacy",
    type: "Pharmacy",
    status: "Open 24 hours",
    icon: FaPills,
    pinned: false,
  },
];

const springConfig: Transition = {
  type: "spring",
  stiffness: 400,
  damping: 40,
};

type PinItemComponentProps = {
  items?: PlaceItem[];
};

export const PinItemComponent = ({
  items = INITIAL_PLACES,
}: PinItemComponentProps) => {
  const [places, setPlaces] = useState<PlaceItem[]>(
    items.map((p) => ({ ...p, pinned: p.pinned ?? false }))
  );

  const togglePin = (id: number) => {
    setPlaces((prev) =>
      prev.map((place) =>
        place.id === id ? { ...place, pinned: !place.pinned } : place
      )
    );
  };

  const pinnedPlaces = places.filter((p) => p.pinned);
  const unpinnedPlaces = places.filter((p) => !p.pinned);

  return (
    <div className="theme-injected w-full max-w-[355px] space-y-6">
      <MotionConfig transition={springConfig}>
        <AnimatePresence mode="popLayout" initial={false}>
          {pinnedPlaces.length > 0 && (
            <motion.div
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-3"
            >
              <motion.h3
                layout
                className="text-muted-foreground ml-1 text-[14px] font-semibold tracking-wider"
              >
                Pinned Places
              </motion.h3>
              <div className="space-y-2">
                {pinnedPlaces.map((place) => (
                  <PlaceCard
                    key={place.id}
                    place={place}
                    onToggle={togglePin}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div layout className="space-y-3">
          <motion.h3
            layout
            className="text-muted-foreground ml-1 text-[14px] font-semibold tracking-wider"
          >
            All Places
          </motion.h3>
          <div className="space-y-3">
            {unpinnedPlaces.map((place) => (
              <PlaceCard key={place.id} place={place} onToggle={togglePin} />
            ))}
          </div>
        </motion.div>
      </MotionConfig>
    </div>
  );
};

const PlaceCard = ({
  place,
  onToggle,
}: {
  place: PlaceItem;
  onToggle: (id: number) => void;
}) => {
  const Icon = place.icon;

  return (
    <motion.div
      layoutId={`card-${place.id}`}
      transition={springConfig}
      className="group border-border bg-muted relative flex cursor-default items-center justify-between gap-2.5 rounded-lg border p-2.5 shadow-sm transition-shadow hover:shadow sm:p-3"
    >
      <div className="flex items-center gap-3">
        <motion.div
          layout
          className="bg-background text-muted-foreground flex h-10 w-10 items-center justify-center rounded-lg"
        >
          <Icon size={22} />
        </motion.div>

        <motion.div layout>
          <h4 className="text-foreground text-base leading-tight font-bold">
            {place.name}
          </h4>
          <p className="text-muted-foreground mt-0.5 max-w-[180px] truncate text-[14px] font-semibold sm:max-w-none">
            {place.type} • {place.status}
          </p>
        </motion.div>
      </div>

      <motion.button
        layout
        onClick={() => onToggle(place.id)}
        className={`relative z-10 flex h-8 w-8 items-center justify-center rounded-lg transition-all duration-300 ${
          place.pinned
            ? "bg-primary text-primary-foreground opacity-100"
            : "bg-muted text-muted-foreground opacity-0 group-hover:opacity-100"
        }`}
      >
        <Pin size={16} className="fill-current" />
      </motion.button>
    </motion.div>
  );
};

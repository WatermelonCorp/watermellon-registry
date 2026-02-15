import React, { useState } from "react";
import { motion, AnimatePresence, LayoutGroup } from "motion/react";
import { Pin } from "lucide-react";
import { IoFastFood } from "react-icons/io5";
import {
  FaChargingStation,
  FaPills,
  FaSailboat,
  FaUtensils,
} from "react-icons/fa6";

/* ================= Types ================= */

export type PlaceItem = {
  id: number;
  name: string;
  type: string;
  status: string;
  icon: React.ComponentType<{ size?: number }>;
  pinned?: boolean;
};

/* ================= Default / Fallback Data ================= */

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

const springConfig = {
  type: "spring",
  stiffness: 300,
  damping: 30,
} as const;

/* ================= Component ================= */

type PinItemComponentProps = {
  items?: PlaceItem[];
};

export const PinItemComponent = ({
  items = INITIAL_PLACES,
}: PinItemComponentProps) => {
  const [places, setPlaces] = useState<PlaceItem[]>(
    items.map((p) => ({ ...p, pinned: p.pinned ?? false })),
  );

  const togglePin = (id: number) => {
    setPlaces((prev) =>
      prev.map((place) =>
        place.id === id ? { ...place, pinned: !place.pinned } : place,
      ),
    );
  };

  const pinnedPlaces = places.filter((p) => p.pinned);
  const unpinnedPlaces = places.filter((p) => !p.pinned);

  return (
    <div className="w-full max-w-[355px] space-y-6">
      <LayoutGroup>
        {/* Pinned Section */}
        <AnimatePresence>
          {pinnedPlaces.length > 0 && (
            <motion.div
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-3"
            >
              <h3 className="text-[#ADACB8] dark:text-zinc-500 text-[14px] font-semibold ml-1 tracking-wider">
                Pinned Places
              </h3>
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

        {/* All Places */}
        <motion.div layout className="space-y-3">
          <h3 className="text-[#ADACB8] dark:text-zinc-500 text-[14px] font-semibold ml-1 tracking-wider">
            All Places
          </h3>
          <div className="space-y-3">
            {unpinnedPlaces.map((place) => (
              <PlaceCard key={place.id} place={place} onToggle={togglePin} />
            ))}
          </div>
        </motion.div>
      </LayoutGroup>
    </div>
  );
};

/* ================= Helpers ================= */

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
      className="group relative flex items-center justify-between bg-[#F6F5FA] dark:bg-zinc-900 p-2.5 sm:p-3 rounded-2xl border border-gray-100 dark:border-zinc-800 shadow-xs hover:shadow-sm transition-shadow cursor-default gap-2.5"
    >
      <div className="flex items-center gap-3">
        <motion.div
          layout
          className="w-10 h-10 flex items-center justify-center bg-[#FEFEFE] dark:bg-zinc-800 rounded-xl text-[#AEADB9] dark:text-zinc-400"
        >
          <Icon size={22} />
        </motion.div>

        <motion.div layout>
          <h4 className="font-bold text-[#27272B] dark:text-zinc-100 text-base leading-tight">
            {place.name}
          </h4>
          <p className="text-[#87868D] dark:text-zinc-400 font-semibold text-[14px] mt-0.5 truncate max-w-[180px] sm:max-w-none">
            {place.type} • {place.status}
          </p>
        </motion.div>
      </div>

      <motion.button
        layout
        onClick={() => onToggle(place.id)}
        className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
          place.pinned
            ? "bg-yellow-400 text-white opacity-100"
            : "bg-[#CDCCD5] dark:bg-zinc-700 text-[#fefefe] dark:text-zinc-400 opacity-0 group-hover:opacity-100"
        }`}
      >
        <Pin size={16} className="fill-white" />
      </motion.button>
    </motion.div>
  );
};

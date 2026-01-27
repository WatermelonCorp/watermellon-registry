import React, { useState } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
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

export const PinItemComponent = ({ items = INITIAL_PLACES }: PinItemComponentProps) => {
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#fcfcfc] py-8 px-4 select-none">
      <div className="w-full max-w-[350px] space-y-6">
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
                <h3 className="text-[#ADACB8] text-[14px] font-semibold ml-1 tracking-wider">
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
            <h3 className="text-[#ADACB8] text-[14px] font-semibold ml-1 tracking-wider">
              All Places
            </h3>
            <div className="space-y-3">
              {unpinnedPlaces.map((place) => (
                <PlaceCard
                  key={place.id}
                  place={place}
                  onToggle={togglePin}
                />
              ))}
            </div>
          </motion.div>
        </LayoutGroup>
      </div>
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
      className="group relative flex items-center justify-between bg-[#F6F5FA] p-3 rounded-2xl border border-gray-100 shadow-xs hover:shadow-sm transition-shadow cursor-default"
    >
      <div className="flex items-center gap-3">
        <motion.div
          layout
          className="w-10 h-10 flex items-center justify-center bg-[#FEFEFE] rounded-xl text-[#AEADB9]"
        >
          <Icon size={22} />
        </motion.div>

        <motion.div layout>
          <h4 className="font-bold text-[#27272B] text-base leading-tight">
            {place.name}
          </h4>
          <p className="text-[#87868D] font-semibold text-[14px] mt-0.5">
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
            : "bg-[#CDCCD5] text-[#fefefe] opacity-0 group-hover:opacity-100"
        }`}
      >
        <Pin size={16} className="fill-white" />
      </motion.button>
    </motion.div>
  );
};

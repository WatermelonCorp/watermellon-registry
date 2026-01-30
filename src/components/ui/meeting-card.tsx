import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronUp,
  Calendar,
  Clock,
  Bell,
  Video,
  Users,
  Link as LinkIcon,
  MoreHorizontal,
  Moon,
  Sun
} from 'lucide-react';

interface Participant {
  name: string;
  avatar: string;
}

interface MeetingCardProps {
  title: string;
  date: string;
  time: string;
  duration: string;
  meetingLink: string;
  notification: string;
  participants: Participant[];
  description: string;
}

export const MeetingCard: React.FC<MeetingCardProps> = ({
  title,
  date,
  time,
  duration,
  meetingLink,
  notification,
  participants,
  description
}) => {
  const [expanded, setExpanded] = useState(true);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [isRecording, setIsRecording] = useState(true);
const [isAiEnabled, setIsAiEnabled] = useState(true);

  const spring = { type: 'spring', stiffness: 300, damping: 30 } as const;

  return (
    <div
      className="transition-all duration-500 min-h-screen w-full flex flex-col items-center justify-center p-10 relative overflow-hidden"
      style={{
        filter: theme === 'dark' ? 'invert(0.9) hue-rotate(180deg)' : 'none',
        backgroundColor: theme === 'dark' ? '#000' : 'transparent'
      }}
    >
      {/* Background Pattern */}
      <div className="fixed inset-0 pointer-events-none z-[-1] bg-[#FBFBFC] overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.4]"
          style={{
            backgroundImage: `repeating-linear-gradient(
              -45deg,
              #E5E7EB 0px,
              #E5E7EB 1px,
              transparent 1px,
              transparent 10px
            )`
          }}
        />

        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(to right, #D1D5DB 1px, transparent 1px)`,
            backgroundSize: '240px 100%',
            maskImage: 'linear-gradient(to bottom, black 5px, transparent 5px)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 5px, transparent 5px)',
            maskSize: '100% 10px',
            WebkitMaskSize: '100% 10px'
          }}
        />

        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(to bottom, #D1D5DB 1px, transparent 1px)`,
            backgroundSize: '100% 180px',
            maskImage: 'linear-gradient(to right, black 5px, transparent 5px)',
            WebkitMaskImage: 'linear-gradient(to right, black 5px, transparent 5px)',
            maskSize: '10px 100%',
            WebkitMaskSize: '10px 100%'
          }}
        />
      </div>

      {/* Theme Toggle */}
      <button
        onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        className="absolute top-10 right-10 p-2 rounded-full border border-gray-300 bg-white shadow-sm z-50"
        style={{ filter: theme === 'dark' ? 'invert(1) hue-rotate(180deg)' : 'none' }}
      >
        {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
      </button>

      {/* Main Card */}
      <motion.div
        layout
        transition={spring}
        className="w-full max-w-[380px] bg-[#F5F5F7] border border-[#E5E5E5] rounded-[16px] shadow-lg overflow-hidden relative z-10"
      >
        {/* Header */}
        <div
          className="flex items-center justify-between bg-[#F5F5F7] p-4 cursor-pointer"
          onClick={() => setExpanded(!expanded)}
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-[#BB89FA] rounded-[10px] flex items-center justify-center">
              <Calendar size={18} className="text-white" />
            </div>
            <div>
              <p className="font-bold text-[14px] text-[#1A1A1A]">{title}</p>
              <p className="text-[11px] text-[#6B7280]">Today, {time}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              {participants.slice(0, 3).map((p, i) => (
                <img
                  key={i}
                  src={p.avatar}
                  className="w-6 h-6 rounded-full border-2 border-white object-cover"
                  alt={p.name}
                />
              ))}
            </div>

            <motion.div
              animate={{ rotate: expanded ? 0 : 180 }}
              className="w-8 h-8 rounded-lg border border-[#E5E5E5] flex items-center justify-center text-[#9CA3AF]"
            >
              <ChevronUp size={18} />
            </motion.div>
          </div>
        </div>

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={spring}
                className=" "
            >
              <div className="p-4 space-y-4 text-[13px] text-[#555D6B] border-[1.4px] border-[#E9E8EF] bg-white rounded-[24px] ">
                <Row icon={<Calendar size={15} />} label="Date">
                  <Tag>{date}</Tag>
                </Row>

                <Row icon={<Clock size={15} />} label="Time">
                  <Tag>{time}  </Tag><span className='m-1.5 mx-1'>to</span>
                  <Tag>{duration}</Tag> <span className='mt-1.5 ml-1'>(30m)</span>
                </Row>

                <Row icon={<Video size={15} />} label="Link">
                  <Tag>
                    <LinkIcon size={12} /> {meetingLink}
                  </Tag>
                </Row>

                <Row icon={<Bell size={15} />} label="Notification">
                  <Tag>{notification}</Tag>
                </Row>

                <Row icon={<Video size={15} />} label="Recording">
                  <Toggle active={isRecording} onChange={setIsRecording} />
                </Row>

                <Row icon={<Users size={15} />} label="AI notetaking">
                 <Toggle active={isAiEnabled} onChange={setIsAiEnabled} />
                </Row>

                {/* Participants */}
                <div className="pt-3 border-t border-[#EFEFEF] space-y-2">
                  <p className="text-[12px] font-medium text-[#6B7280]">Participants</p>
                  <div className="flex items-center gap-2 flex-wrap">
                    {participants.map((p, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 px-2 py-1 bg-[#F5F5F7] border border-[#E5E5E5] rounded-full"
                      >
                        <img src={p.avatar} className="w-5 h-5 rounded-full" alt="" />
                        <span className="text-[12px] font-medium text-[#1A1A1A]">{p.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Description */}
                <div className="pt-3 border-t border-[#EFEFEF]">
                  <p className="text-[12px] font-medium text-[#6B7280] mb-1">Description</p>
                  <p className="text-[12px] text-[#4B5563] leading-relaxed">{description}</p>
                </div>

              </div>
                {/* Footer */}
                <div className="p-3 flex items-center justify-between bg-[#F5F5F7]">
                  <p className="text-[13px] text-[#6B7280]">Going?</p>
                  <div className="flex items-center gap-2">
                    {['Yes', 'No', 'Maybe'].map((opt) => (
                      <motion.button
                        key={opt}
                        className="px-3 py-1 rounded-full border border-[#E5E5E5] text-[12px] font-medium text-[#374151] hover:bg-[#e6e7e9]"
                      >
                        {opt}
                      </motion.button>
                    ))}
                    <MoreHorizontal size={16} className="text-[#9CA3AF]" />
                  </div>
                </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

/*  helpers  */

const Row = ({
  icon,
  label,
  children
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) => (
  <div className="flex items-center justify-between">
    <div className="flex items-center gap-2 text-[#6B7280]">
      {icon}
      <span className="text-[12px] font-medium">{label}</span>
    </div>
    <div className="w-[190px] flex justify-start">{children}</div>
  </div>
);

const Tag = ({ children }: { children: React.ReactNode }) => (
  <div className="flex items-center gap-1 px-2 py-1 rounded-full border border-[#E5E5E5] text-[12px] text-[#374151] bg-[#FAFAFA]">
    {children}
  </div>
);

const Toggle = ({
  active,
  onChange
}: {
  active: boolean;
  onChange: (v: boolean) => void;
}) => {
  return (
    <div
      onClick={() => onChange(!active)}
      // Humne flex alignment ko toggle kiya hai: active par 'justify-end' aur inactive par 'justify-start'
      className={`w-9 h-5 rounded-full px-1 flex items-center cursor-pointer transition-colors duration-200 ${
        active ? "bg-[#EAF7EA] justify-end" : "bg-[#F3F4F6] justify-start"
      }`}
    >
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        // Active hone par Green color, varna Grey color
        className={`w-3.5 h-3.5 rounded-full shadow-sm ${
          active ? "bg-[#22C55E]" : "bg-[#9CA3AF]"
        }`}
      />
    </div>
  );
};

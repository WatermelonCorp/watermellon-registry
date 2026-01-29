import React, { useState } from 'react';
import { motion, AnimatePresence, type PanInfo } from 'motion/react';
import { FaArrowUp } from 'react-icons/fa6';

export interface FundItem {
    id: string;
    label: string;
    value: string;
    change: string;
    layout: 'top' | 'bottom';
}

interface FundWidgetProps {
    data?: FundItem[];
    initialIndex?: number;
}

/* Default Data  */
const DEFAULT_DATA: FundItem[] = [
    { id: 'stocks', label: 'Stocks', value: '2.7Cr', change: '12% ', layout: 'top' },
    { id: 'funds', label: 'Funds', value: '3.5Cr', change: '8% ', layout: 'top' },
    { id: 'deposits', label: 'Deposits', value: '1.2Cr', change: '6% ', layout: 'bottom' },
];

export const FundWidget: React.FC<FundWidgetProps> = ({
    data = DEFAULT_DATA,
    initialIndex = 1,
}) => {
    const [index, setIndex] = useState(initialIndex);

    const updateIndex = (newIndex: number) => {
        if (newIndex >= 0 && newIndex < data.length) {
            setIndex(newIndex);
        } else if (newIndex < 0) {
            setIndex(data.length - 1);
        } else {
            setIndex(0);
        }
    };

    const onDragEnd = (_: any, info: PanInfo) => {
        const swipeThreshold = 30;
        if (info.offset.y < -swipeThreshold) {
            updateIndex((index + 1) % data.length);
        } else if (info.offset.y > swipeThreshold) {
            updateIndex((index - 1 + data.length) % data.length);
        }
    };

    const activeItem = data[index];

    return (
        <div className='dark:invert dark:hue-rotate-180'>
            <div className="relative flex items-center justify-center min-h-screen bg-[#F9F5EF]">

                <div className="flex items-center justify-center min-h-screen bg-[#F9F5EF]">
                    <div className="relative overflow-visible">

                        <div className="relative z-0 overflow-visible">
                            <div
                                className="absolute -bottom-[332px] w-[90%] left-[18px] right-[18px] h-20 bg-[#F2F1EC]
                rounded-[44px] z-[-1] border-2 border-[#E0DEDA] shadow-[0_4px_20px_rgba(0,0,0,0.03)]"
                            />
                        </div>

                        <div className="relative w-[320px] h-[320px] bg-[#FBFCF9] rounded-[48px] shadow-md border-2 border-[#E0DEDA] overflow-hidden select-none">
                            <motion.div
                                drag="y"
                                dragConstraints={{ top: 0, bottom: 0 }}
                                dragElastic={0.15}
                                onDragEnd={onDragEnd}
                                className="w-full h-full p-10 flex flex-col cursor-grab active:cursor-grabbing"
                            >
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={activeItem.id}
                                        initial={{ y: 30, opacity: 0, filter: 'blur(12px)' }}
                                        animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                                        exit={{ y: -30, opacity: 0, filter: 'blur(12px)' }}
                                        transition={{ duration: 0.45, ease: [0.19, 1, 0.22, 1] }}
                                        className={`flex flex-col h-full ${activeItem.layout === 'bottom'
                                                ? 'justify-end'
                                                : 'justify-start '
                                            }`}
                                    >
                                        {activeItem.layout === 'top' && (
                                            <>
                                                <h2 className="text-[60px] font-bold text-[#282825] leading-none">
                                                    {activeItem.value}
                                                </h2>
                                                <p className="text-[#8C8A86] text-[32px] font-bold mt-4 flex items-center gap-2">
                                                    {activeItem.change} <FaArrowUp className="text-2xl" />
                                                </p>
                                                <h3 className="text-[40px] font-bold text-[#575754] mt-12">
                                                    {activeItem.label}
                                                </h3>
                                            </>
                                        )}

                                        {activeItem.layout === 'bottom' && (
                                            <div>
                                                <h2 className="text-[60px] font-bold text-[#1A1A1A] leading-none tracking-tighter">
                                                    {activeItem.value}
                                                </h2>
                                                <p className="text-[#8C8A86] text-[32px] font-bold mt-4 flex items-center gap-2">
                                                    {activeItem.change} <FaArrowUp className="text-2xl" />
                                                </p>
                                                <h3 className="text-[40px] font-bold text-[#575754] mt-12">
                                                    {activeItem.label}
                                                </h3>
                                            </div>
                                        )}
                                    </motion.div>
                                </AnimatePresence>
                            </motion.div>

                            <div className="absolute right-7 top-1/2 -translate-y-1/2 flex flex-col z-20">
                                {data.map((_, i) => (
                                    <button
                                        key={i}
                                        title="slider"
                                        onClick={() => setIndex(i)}
                                        className="focus:outline-none py-1"
                                    >
                                        <motion.div
                                            animate={{
                                                height: i === index ? 42 : 10,
                                                backgroundColor: i === index ? '#585652' : '#D3D3D3',
                                            }}
                                            transition={{ duration: 0.3 }}
                                            className="w-[8px] rounded-full"
                                        />
                                    </button>
                                ))}
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

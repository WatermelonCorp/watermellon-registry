import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Loader2 } from 'lucide-react'; 
import { FaMap } from 'react-icons/fa6';

interface ViewOnMapProps {
    locationName?: string;
    address?: string;
    mapImageUrl?: string;
    className?: string;
}

export const ViewOnMap: React.FC<ViewOnMapProps> = ({
    address = "Boston Public Garden",
    mapImageUrl = "https://images.unsplash.com/photo-1526778548025-fa2f459cd5ce?q=80&w=2000&auto=format&fit=crop",
    className = ""
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isMapLoaded, setIsMapLoaded] = useState(false);
    const [isDark] = useState(false); 

    const toggleOpen = () => {
        setIsOpen(!isOpen);
        if (isOpen) setIsMapLoaded(false);
    };

    const springConfig = { type: "spring" as const, stiffness: 400, damping: 30, mass: 0.8 };

    const publicMapUrl = `https://maps.google.com/maps?q=${encodeURIComponent(address)}&t=&z=16&ie=UTF8&iwloc=&output=embed`;

    return (
    <div className={` transition-colors duration-500`}>
        <div className={`flex flex-col min-h-full w-full items-center justify-center bg-transparent px-4`}>

            <div className={`relative flex items-center justify-center w-full ${className}`}>
                <AnimatePresence mode="popLayout">
                    {!isOpen ? (
                        /* --- PILL BUTTON --- */
                        <motion.div
                            key="button"
                            layoutId="map-container"
                            onClick={toggleOpen}
                            className="group relative cursor-pointer overflow-hidden flex items-center justify-center shadow-sm transition-colors duration-300 bg-[#E5E4EE] dark:bg-[#1C1C1E]"
                         
                            style={{ width: 180, height: 52, borderRadius: 26 }}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={springConfig}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <motion.div
                                layoutId="map-bg"
                                className="absolute inset-0 grayscale transition-opacity opacity-20 brightness-110 dark:opacity-10 dark:brightness-50"
                                style={{
                                    backgroundImage: `url(${mapImageUrl})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                }}
                            />

                            <motion.div className="relative z-10 flex items-center space-x-3 px-4 py-4">
                                <FaMap className="w-5 h-5 transition-colors text-[#6A6973] dark:text-white/60" />
                                <span className="text-[18px] font-semibold tracking-tight transition-colors text-[#3D3C43] dark:text-white">
                                    View on Map
                                </span>
                            </motion.div>
                        </motion.div>
                    ) : (
                        /* --- EXPANDED MAP --- */
                        <motion.div
                            key="map"
                            layoutId="map-container"
                            className="relative overflow-hidden shadow-lg transition-colors duration-300 bg-[#DEDEDE] dark:bg-[#141414] w-[92vw] max-w-95 aspect-square"
                            
                            style={{ borderRadius: 48 }}
                            transition={springConfig}
                        >
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.15 }}
                                className="absolute inset-0 w-full h-full grayscale-[0.9] contrast-[1.05] brightness-[1.02] sepia-[0.1] saturate-[0.8]"
                            >
                                <iframe
                                    title="Google Map"
                                    width="100%"
                                    height="100%"
                                    style={{ 
                                        border: 0, 
                                        filter: isDark ? 'invert(90%) hue-rotate(180deg)' : 'invert(15%) hue-rotate(180deg)' 
                                    }}
                                    src={publicMapUrl}
                                    allowFullScreen
                                    onLoad={() => setIsMapLoaded(true)}
                                    className={`transition-opacity duration-700 ${isMapLoaded ? 'opacity-100' : 'opacity-0'}`}
                                />
                            </motion.div>

                            {!isMapLoaded && (
                                <div className="absolute inset-0 flex items-center justify-center transition-colors bg-[#E5E5E7] dark:bg-[#1C1C1E]">
                                    <Loader2 className="w-8 h-8 text-gray-400 animate-spin" />
                                </div>
                            )}

                            {/* CLOSE BUTTON  */}
                            <motion.button
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                onClick={toggleOpen}
                                className="absolute top-4 right-4 sm:top-6 sm:right-6 w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center rounded-full shadow-lg active:scale-90 transition-all z-50 bg-white text-[#85848B] hover:bg-gray-50 dark:bg-[#2A2A2D] dark:text-white dark:hover:bg-[#3A3A3D]"
                            >
                                <X className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={3} />
                            </motion.button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    </div>
    );
};
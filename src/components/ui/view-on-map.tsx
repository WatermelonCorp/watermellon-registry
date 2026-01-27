import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Loader2, Sun, Moon } from 'lucide-react'; // Added Sun/Moon
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
    const [isDark, setIsDark] = useState(false); // New theme state

    const toggleOpen = () => {
        setIsOpen(!isOpen);
        if (isOpen) setIsMapLoaded(false);
    };

    const springConfig = { type: "spring" as const, stiffness: 400, damping: 30, mass: 0.8 };

    const publicMapUrl = `https://maps.google.com/maps?q=${encodeURIComponent(address)}&t=&z=16&ie=UTF8&iwloc=&output=embed`;

    return (
    <div className={`flex flex-col h-screen w-full items-center justify-center transition-colors duration-500 ${isDark ? 'bg-[#0A0A0A]' : 'bg-[#FEFEFE]'}`}>
        
        {/* Theme Toggle Button */}
        <button 
            onClick={() => setIsDark(!isDark)}
            className={`mb-12 p-3 rounded-full transition-all active:scale-95 border ${
                isDark ? 'bg-[#1C1C1E] border-white/10 text-yellow-400' : 'bg-white border-black/5 text-gray-400 shadow-sm'
            }`}
        >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        <div className={`relative flex items-center justify-center ${className}`}>
            <AnimatePresence mode="popLayout">
                {!isOpen ? (
                    /* --- PILL BUTTON --- */
                    <motion.div
                        key="button"
                        layoutId="map-container"
                        onClick={toggleOpen}
                        className={`group relative cursor-pointer overflow-hidden flex items-center justify-center shadow-sm transition-colors duration-300 ${
                            isDark ? 'bg-[#1C1C1E]' : 'bg-[#E5E4EE]'
                        }`}
                        style={{ width: 180, height: 52, borderRadius: 26 }}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={springConfig}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        {/* Background Texture */}
                        <motion.div
                            layoutId="map-bg"
                            className={`absolute inset-0 grayscale transition-opacity ${isDark ? 'opacity-10 brightness-50' : 'opacity-20 brightness-110'}`}
                            style={{
                                backgroundImage: `url(${mapImageUrl})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                            }}
                        />

                        <motion.div className="relative z-10 flex items-center space-x-3 px-4 py-4">
                            <FaMap className={`w-5 h-5 transition-colors ${isDark ? 'text-white/60' : 'text-[#6A6973]'}`} />
                            <span className={`text-[18px] font-semibold tracking-tight transition-colors ${
                                isDark ? 'text-white' : 'text-[#3D3C43]'
                            }`}>
                                View on Map
                            </span>
                        </motion.div>
                    </motion.div>
                ) : (
                    /* --- EXPANDED MAP --- */
                    <motion.div
                        key="map"
                        layoutId="map-container"
                        className={`relative overflow-hidden shadow-lg transition-colors duration-300 ${
                            isDark ? 'bg-[#141414]' : 'bg-[#DEDEDE]'
                        }`}
                        style={{ width: 380, height: 380, borderRadius: 48 }}
                        transition={springConfig}
                    >
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.15 }}
                            className={`absolute inset-0 w-full h-full grayscale-[0.9] contrast-[1.05] brightness-[1.02] sepia-[0.1] saturate-[0.8]`}
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
                            <div className={`absolute inset-0 flex items-center justify-center transition-colors ${
                                isDark ? 'bg-[#1C1C1E]' : 'bg-[#E5E5E7]'
                            }`}>
                                <Loader2 className="w-8 h-8 text-gray-400 animate-spin" />
                            </div>
                        )}

                        {/* CLOSE BUTTON (X) */}
                        <motion.button
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            onClick={toggleOpen}
                            className={`absolute top-6 right-6 w-11 h-11 flex items-center justify-center rounded-full shadow-lg active:scale-90 transition-all z-50 ${
                                isDark ? 'bg-[#2A2A2D] text-white hover:bg-[#3A3A3D]' : 'bg-white text-[#85848B] hover:bg-gray-50'
                            }`}
                        >
                            <X className="w-6 h-6" strokeWidth={3} />
                        </motion.button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    </div>
    );
};
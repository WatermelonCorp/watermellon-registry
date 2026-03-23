import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Pencil, Clock, ChevronDown } from 'lucide-react';

export interface ProfileData {
    fullName: string;
    email: string;
    timezone: string;
    workingHours: string;
    title: string;
    avatarUrl: string;
    lastUpdated: string;
}

interface EditProfileProps {
    isOpen: boolean;
    onClose: () => void;
    initialData: ProfileData;
    onSave: (data: ProfileData) => void;
}

export const EditProfile: React.FC<EditProfileProps> = ({
    isOpen,
    onClose,
    initialData,
    onSave
}) => {
    const [formData, setFormData] = useState<ProfileData>(initialData);

    useEffect(() => {
        if (isOpen) {
            requestAnimationFrame(() => setFormData(initialData));
        }
    }, [isOpen, initialData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-100 flex items-center justify-center p-4 overflow-y-auto theme-injected font-sans">
                    {/* Backdrop Overlay */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 backdrop-blur-sm bg-background/30"
                    />

                    {/* Modal Container */}
                    <div className="relative w-full max-w-180 z-101 my-auto pointer-events-none">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            transition={{ type: "spring", damping: 20, stiffness: 300, mass: 0.8 }}
                            className="pointer-events-auto w-full rounded-xl shadow-lg border border-border overflow-hidden 
                                     bg-card"
                        >
                            {/* Header */}
                            <div className="flex items-center justify-between px-6 py-4 md:px-8">
                                <h2 className="text-lg font-semibold text-foreground">Edit your profile</h2>
                                <button title='close' onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors p-1">
                                    <X size={20} />
                                </button>
                            </div>

                            {/* Body */}
                            <div className="flex flex-col md:flex-row border-t border-b border-border
                                          bg-background">

                                {/* Form Section */}
                                <div className="flex-1 p-6 space-y-4">
                                    <div className="space-y-1.5">
                                        <label className="text-sm font-medium text-muted-foreground">Full name</label>
                                        <input title='fullname'
                                            name="fullName"
                                            value={formData.fullName}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2.5 rounded-lg border border-2 outline-none transition-all text-base font-semibold
                                                     bg-background border-input text-foreground focus:border-ring focus:border-input"
                                        />
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="text-sm font-medium text-muted-foreground">Email</label>
                                        <input title='email'
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2.5 rounded-lg border-2 outline-none font-semibold transition-all text-base
                                                     bg-background border-input text-foreground focus:border-input focus:ring-ring/50"
                                        />
                                    </div>

                                    <div className="flex flex-col sm:flex-row gap-4">
                                        <div className="flex-1 space-y-1.5">
                                            <label className="text-sm font-medium text-muted-foreground">Timezone</label>
                                            <div className="relative">
                                                <select title='timezone'
                                                    name="timezone"
                                                    value={formData.timezone}
                                                    onChange={handleChange}
                                                    className="w-full px-4 py-2.5 rounded-lg border-2 appearance-none outline-none text-base font-semibold
                                                             bg-background border-input text-foreground focus:border-input focus:ring-ring/50"
                                                >
                                                    <option>GMT-8</option>
                                                    <option>GMT+5</option>
                                                </select>
                                                <ChevronDown size={20} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-foreground/40" />
                                            </div>
                                        </div>
                                        <div className="flex-1 space-y-1.5">
                                            <label className="text-sm font-medium text-muted-foreground">Working hours</label>
                                            <div className="relative">
                                                <input title='workingHours'
                                                    name="workingHours"
                                                    value={formData.workingHours}
                                                    onChange={handleChange}
                                                    className="w-full px-4 py-2.5 rounded-lg border-2 outline-none text-sm font-semibold
                                                             bg-background border-input text-foreground focus:border-input focus:ring-ring/50"
                                                />
                                                <Clock size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/40" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="text-sm font-medium text-muted-foreground">Title</label>
                                        <input title='title'
                                            name="title"
                                            value={formData.title}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2.5 rounded-lg border-2 outline-none transition-all text-sm font-semibold
                                                     bg-background border-input text-foreground focus:border-input focus:ring-ring/50"
                                        />
                                    </div>
                                </div>

                                {/* Divider */}
                                 <div className="w-full h-[1.6px] md:h-auto md:w-[1.6px] border-t md:border-t-0 md:border-l border-dashed border-[#E9E8EB] dark:border-[#48484A]" />

                                {/* Preview Section */}
                                <div className="flex-1 p-8 px-6 flex flex-col items-center justify-center">
                                    <span className="text-sm font-medium mb-4 text-muted-foreground">Preview</span>
                                    <div className="relative mb-4">
                                        <img
                                            src={formData.avatarUrl}
                                            alt="Avatar"
                                            className="w-32 h-32 rounded-full object-cover object-top shadow-sm ring-1 ring-border"
                                        />
                                        <button title='edit' className="absolute bottom-0 right-0 p-2 rounded-full shadow-md border 
                                                                     bg-card border-border text-muted-foreground
                                                                     hover:text-foreground">
                                            <Pencil size={20} />
                                        </button>
                                    </div>
                                    <h3 className="text-lg font-bold text-foreground text-center">{formData.fullName}</h3>
                                    <p className="text-sm mb-4 text-muted-foreground text-center">{formData.title}</p>
                                    <div className="flex items-center gap-2 px-3 shadow-sm py-1 rounded-full text-xs font-medium 
                                                 bg-muted text-muted-foreground">
                                        <Clock size={12} className="text-muted-foreground" />
                                        <span>{formData.workingHours}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="px-6 py-5 md:px-8 flex flex-col-reverse sm:flex-row items-center justify-between gap-4 bg-muted">
                                <span className="text-xs text-muted-foreground">
                                    Last updated: <span className="font-medium">{formData.lastUpdated}</span>
                                </span>
                                <div className="flex gap-3 w-full sm:w-auto">
                                    <button
                                        onClick={onClose}
                                        className="flex-1 sm:flex-none px-5 py-2 rounded-full text-sm border-2 font-bold transition-colors
                                                 bg-muted border-border text-foreground hover:bg-muted/80"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={() => onSave(formData)}
                                        className="flex-1 sm:flex-none px-5 py-2 rounded-full text-sm font-bold transition-colors shadow-lg
                                                 bg-foreground text-background hover:bg-foreground/90"
                                    >
                                        Save changes
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            )}
        </AnimatePresence>
    );
};
import React, { useState } from 'react';
import { motion, type Variants } from 'framer-motion';
import {
    Plus,
    Calendar,
    MoreVertical,
    Upload,
    RotateCw,
    Search,
    Sparkles,
    Sun,
    Moon
} from 'lucide-react';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    ResponsiveContainer
} from 'recharts';

export interface ChartDataPoint {
    date: string;
    value: number;
}

export interface Asset {
    id: string;
    name: string;
    symbol: string;
    icon: string;
    price: number;
    holdingsValue: number;
    holdingsAmount: number;
    allocation: number;
    plValue: number;
    plPercentage: number;
    color: string;
}

export interface PortfolioData {
    totalBalance: number;
    totalPlValue: number;
    totalPlPercentage: number;
    riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
    chartData: ChartDataPoint[];
    assets: Asset[];
}

interface PortfolioComponentProps {
    data: PortfolioData;
}

const timeframeOptions = ['24H', '7D', '30D', '90D', 'All'];

export const PortfolioDashboard: React.FC<PortfolioComponentProps> = ({ data }) => {
    const [selectedTimeframe, setSelectedTimeframe] = useState('7D');
    const [theme, setTheme] = useState<'dark' | 'light'>('dark');

    const containerVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: 'spring',
                damping: 25,
                stiffness: 150,
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 10 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { type: 'spring', damping: 20, stiffness: 200 }
        }
    };

    return (
        <div 
            className="min-h-screen flex flex-col items-center justify-center p-4 transition-colors duration-500 relative"
            style={{ backgroundColor: theme === 'dark' ? '#0a0a0a' : '#f4f4f5' }}
        >
            {/* Theme Toggle Button */}
            <button 
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className={`absolute top-8 right-8 p-2.5 rounded-xl border transition-all duration-300 z-50 ${
                    theme === 'dark' ? 'bg-[#0f0f0f] border-[#1e1e1e] text-yellow-500' : 'bg-white border-gray-200 text-slate-800 shadow-lg'
                }`}
            >
                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="max-w-xl mx-auto bg-[#0f0f0f] border border-[#1e1e1e] rounded-[28px] overflow-hidden shadow-2xl transition-all duration-500"
                style={{
                    filter: theme === 'light' ? 'invert(0.94) hue-rotate(180deg)' : 'none'
                }}
            >
                {/* Top Header  */}
                <div className="flex justify-between items-center px-5 bg-[#0f0f0f] py-4">
                    <div className="flex items-center gap-2">
                        <span className="text-white font-medium text-base">Portfolio</span>
                        <span className="text-[#666666] text-[10px] font-bold tracking-widest uppercase">/ RISK: {data.riskLevel}</span>
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-[#FF6B2B] hover:bg-[#ff7b42] text-black px-3.5 py-1.5 rounded-full flex items-center gap-1.5 text-xs font-bold transition-colors shadow-lg shadow-orange-950/20"
                    >
                        <Plus size={16} />
                        Fund
                    </motion.button>
                </div>

                <div className="p-5 border-t-[1.6px] border-b-[1.6px] border-[#1D1D1D] bg-[#171717] rounded-xl">
                    {/* Balance & Chart Filters */}
                    <div className="flex justify-between items-start mb-2">
                        <div>
                            <motion.h1
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="text-white text-3xl font-bold tracking-tight mb-1"
                            >
                                ${data.totalBalance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                            </motion.h1>
                            <div className="flex items-center gap-2">
                                <span className="text-[#14E62B] text-xs font-bold">
                                    +${data.totalPlValue.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                </span>
                                <span className="bg-[#172C19] text-[#14E62B] text-[10px] px-1.5 py-0.5 rounded-full font-bold">
                                    +{data.totalPlPercentage}%
                                </span>
                            </div>
                        </div>

                        <div className="flex items-center bg-[#1a1a1a] rounded-full p-0.5 border border-[#2a2a2a]">
                            {timeframeOptions.map((tf) => (
                                <button
                                    key={tf}
                                    onClick={() => setSelectedTimeframe(tf)}
                                    className={`relative px-2.5 py-1 text-[10px] font-bold rounded-full transition-colors duration-200 ${selectedTimeframe === tf ? 'text-[#BF5527]' : 'text-[#555] hover:text-[#888]'
                                        }`}
                                >
                                    {selectedTimeframe === tf && (
                                        <motion.div
                                            layoutId="activeTab"
                                            className="absolute inset-0 bg-[#32211A] border-[#BF5527]/20 border rounded-full z-0"
                                            transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                                        />
                                    )}
                                    <span className="relative z-10">{tf}</span>
                                </button>
                            ))}
                            <button title='schedule' className="p-1.5 text-[#555] hover:text-[#ffffff] transition-colors">
                                <Calendar size={12} />
                            </button>
                        </div>
                    </div>

                    {/* Line Chart  */}
                    <div className="h-[160px] w-full mb-3  mt-2">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={data.chartData}>
                                <defs>
                                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#FF6B2B" stopOpacity={0.15} />
                                        <stop offset="95%" stopColor="#FF6B2B" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#1f1f1f" />
                                <XAxis
                                    dataKey="date"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#444', fontSize: 9, fontWeight: 600 }}
                                    dy={8}
                                />
                                <YAxis hide domain={['auto', 'auto']} />
                                <Area
                                    type="monotone"
                                    dataKey="value"
                                    stroke="#FF6B2B"
                                    strokeWidth={2.5}
                                    fillOpacity={1}
                                    fill="url(#colorValue)"
                                    animationDuration={1500}
                                    dot={false}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>

                    <div className='border-t-[1.7px] border-dashed border-[#f1f1f1]/5 py-2.5'/>

                    {/* Assets Section Header */}
                    <div className="flex justify-between items-center mb-3">
                        <h2 className="text-white text-base font-semibold">{data.assets.length} Assets</h2>
                        <button className="text-[#666] text-[10px] font-bold bg-[#1a1a1a] px-2.5 py-1 rounded-full border border-[#2a2a2a] hover:text-white transition-colors">
                            View all
                        </button>
                    </div>

                    {/* Allocation Bar */}
                    <div className="flex h-1.5 w-full rounded-full overflow-hidden mb-6 bg-[#1a1a1a]">
                        {data.assets.map((asset) => (
                            <motion.div
                                key={asset.id}
                                initial={{ width: 0 }}
                                animate={{ width: `${asset.allocation}%` }}
                                transition={{ duration: 1, ease: "easeOut" }}
                                style={{ backgroundColor: asset.color }}
                                className="h-full opacity-90 rounded-sm"
                            />
                        ))}
                    </div>

                    {/* Assets Table */}
                    <div className="space-y-3">
                        <div className="grid grid-cols-5 text-[#444] text-[9px] font-bold uppercase tracking-widest px-2 ">
                            <span className="col-span-1">Name</span>
                            <span className="text-right">Price</span>
                            <span className="text-right">Holdings</span>
                            <span className="text-right">Allocation</span>
                            <span className="text-right">P/L</span>
                        </div>

                        <div className="space-y-1">
                            {data.assets.map((asset) => (
                                <motion.div
                                    key={asset.id}
                                    variants={itemVariants}
                                    whileHover={{ backgroundColor: 'rgba(255,255,255,0.03)' }}
                                    className="grid grid-cols-5 items-center p-2 rounded-xl transition-colors cursor-pointer group"
                                >
                                    <div className="col-span-1 flex items-center gap-2.5">
                                        <div className="w-0.5 h-5 rounded-full" style={{ backgroundColor: asset.color }} />
                                        <div className="w-7 h-7 rounded-full bg-[#1a1a1a] flex items-center justify-center overflow-hidden border border-[#2a2a2a]">
                                            <img src={asset.icon} alt={asset.name} className="w-4 h-4 object-contain" />
                                        </div>
                                        <span className="text-white font-bold text-xs">{asset.name}</span>
                                    </div>

                                    <span className="text-right text-[#777] text-[11px] font-medium">
                                        ${asset.price.toLocaleString()}
                                    </span>

                                    <div className="text-right flex flex-col">
                                        <span className="text-white text-[11px] font-bold">${asset.holdingsValue.toLocaleString()}</span>
                                        <span className="text-[#555] text-[9px] font-medium">{asset.holdingsAmount} {asset.symbol}</span>
                                    </div>

                                    <span className="text-right text-[#777] text-[11px] font-semibold">
                                        {asset.allocation}%
                                    </span>

                                    <div className="text-right flex flex-col">
                                        <span className={`text-[11px] font-bold ${asset.plValue >= 0 ? 'text-[#14E62B]' : 'text-[#A5343E]'}`}>
                                            {asset.plValue >= 0 ? '+' : ''}${Math.abs(asset.plValue).toLocaleString()}
                                        </span>
                                        <span className={`text-[9px] font-bold ${asset.plPercentage >= 0 ? 'text-[#14E62B]' : 'text-[#A5343E]'}`}>
                                            {asset.plPercentage >= 0 ? '+' : ''}{asset.plPercentage}%
                                        </span>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom Bar  */}
                <div className="bg-[#0d0d0d] px-5 py-3.5 flex justify-between items-center">
                    <div className="flex items-center gap-3.5 text-[#555]">
                        <MoreVertical size={16} className="hover:text-white cursor-pointer" />
                        <Upload size={16} className="hover:text-white cursor-pointer" />
                        <RotateCw size={16} className="hover:text-white cursor-pointer" />
                        <Search size={16} className="hover:text-white cursor-pointer" />
                    </div>

                    <div className="flex items-center gap-2">
                        <div className="flex -space-x-1">
                            <img src={data.assets[0].icon} className="w-3.5 h-3.5 rounded-full border border-black" alt="btc" />
                            <img src={data.assets[1].icon} className="w-3.5 h-3.5 rounded-full border border-black" alt="eth" />
                        </div>
                        <span className="text-[8px] font-bold text-[#666] tracking-tighter uppercase whitespace-nowrap">BTC & ETH DRIVE 71% OF GAINS</span>
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="bg-transparent border border-[#2a2a2a] text-white px-3 py-1 rounded-full flex items-center gap-1.5 text-[10px] font-bold hover:bg-[#1a1a1a] transition-all"
                    >
                        <Sparkles size={12} className="text-[#A17DFF]" />
                        Rebalance
                    </motion.button>
                </div>
            </motion.div>
        </div>
    );
};
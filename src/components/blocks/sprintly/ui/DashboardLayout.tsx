import React from 'react';
import { motion } from 'framer-motion';
import {images_asset_base_url} from "@/static-assets/Static-Assets";
const StatCard = ({ title, value, change }:any) => (
  <div className="border rounded-lg p-4 flex flex-col justify-between">
    <div className="flex justify-between items-center">
      <h3 className="text-sm font-medium">{title}</h3>
      <span>↗</span>
    </div>
    <p className="text-3xl font-bold mt-2">{value}</p>
    <p className="text-xs mt-1">{change}</p>
  </div>
);

const DashboardLayout = () => {
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: 0.4,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className=" rounded-xl  overflow-hidden mt-10 lg:mt-4 px-6 "
    >
      <div className="flex shadow-neutral-800/50 shadow-xl">
       <img src={`${images_asset_base_url}/sprintlydashboard.svg`} alt="" className=''/>
      </div>
    </motion.div>
  );
};

export default DashboardLayout;
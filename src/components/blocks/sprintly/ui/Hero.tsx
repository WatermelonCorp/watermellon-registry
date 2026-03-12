import { motion } from 'motion/react'
import {images_asset_base_url} from "@/static-assets/Static-Assets"

const Hero = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="text-center px-6  mt-40 md:mt-10 md:py-32"
    >
      <h1 className="text-4xl md:text-6xl font-bold max-w-4xl mx-auto leading-tight ">
        Prioritize tasks, maximize your productivity
      </h1>
      <p className="max-w-2xl mx-auto mt-6 text-md text-neutral-700">
        Stay on track with seamless task management designed to keep you clear
        and productive all day.
      </p>
      <div className="flex justify-center flex-col items-center gap-4 md:flex-row  mt-10 text-sm">
        <button className="px-6 py-3 rounded-lg font-semibold text-white bg-gradient-to-b from-neutral-700 to bg-neutral-950 inline-flex justify-center items-center  shadow-lg shadow-neutral-950/30">
          <span><img src={`${images_asset_base_url}/sprintlyappleLogo.svg`} alt="apple icon" /></span>
          <span>Download For Mac</span>
        </button>
        <button className="px-6 py-4 rounded-lg font-semibold bg-white shadow-lg shadow-neutral-950/30">
          Book a Demo
        </button>
      </div>
    </motion.section>
  );
};

export default Hero;
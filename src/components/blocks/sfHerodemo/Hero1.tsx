import React from "react";
import Header from "./ui/Header";
import Hero from "./ui/Hero";

export const Hero1: React.FC = () => {
  return (
    <div className="min-h-screen antialiased bg-[#111216] font-[Poppins]">
      <div className="  text-neutral-50 ">
        <Header />
        <main className="overflow-hidden">
          <Hero />
        </main>
      </div>
    </div>
  );
};

export default Hero1;

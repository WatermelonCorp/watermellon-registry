import Header from "./ui/Header";
import Hero from "./ui/Hero";
import DashboardLayout from "./ui/DashboardLayout";
import {images_asset_base_url} from "@/static-assets/Static-Assets";

const Index = () => {
  return (
    <div className="min-h-screen antialiased">
      <div 
        className="bg-no-repeat bg-center bg-cover flex flex-col justify-center items-center font-[Poppins] overflow-hidden"
        style={{ backgroundImage: `url(${images_asset_base_url}/sprintlybg.svg)` }}
      >
        <Header />
        <div className="border-x border-white max-w-4xl flex flex-col justify-center items-center">
          <Hero />
          <DashboardLayout />
        </div>
      </div>
    </div>
  );
};

export default Index;

import React from "react";
import { memberImg } from '../assets/images';

const PlanExperience = () => {
  return (
    <div className="w-full min-h-screen flex flex-col">
      {/* Hero Section */}
      <div className="relative">
        <img className="w-full h-fit object-cover" src={memberImg} alt="Hero" />
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <p className="absolute text-white font-bold top-[45%] text-center text-xl w-full md:text-6xl">
          Plan Your Experience
        </p>
      </div>
      
      <p className="mt-4 md:text-4xl text-lg text-midnightblue text-center font-semibold">
        Select One to Continue
      </p>

      <div className="flex-grow w-full p-4">
        <iframe
          className="w-full h-[800px] mx-auto"
          src="https://fareharbor.com/embeds/book/kokomocharters/?full-items=yes&flow=1257684"
          title="FareHarbor Item Grid"
          allowFullScreen
          sandbox="allow-scripts allow-same-origin allow-forms allow-top-navigation-by-user-activation"
        />
      </div>
    </div>
  );
};

export default PlanExperience;
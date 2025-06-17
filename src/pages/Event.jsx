import React from "react";
import { events_hero,img0,img1,img2 } from "../assets/images";

const Event = () => {
  return (
    <div>
      {/* Hero section */}
      <div
        className="relative w-full h-[50vh] xl:h-[100vh] bg-cover bg-center"
        style={{
          backgroundImage: `url(${events_hero})`,
        }}
      >
        {/* Centered Text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-xl font-bold md:text-3xl xl:text-5xl text-white text-center drop-shadow-md">
            EVENTS AT KOKOMO YACHT CLUB
          </p>
        </div>

        {/* Bottom Wave Divider */}
        <div class="custom-shape-divider-bottom-1750074161">
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
              class="shape-fill"
            ></path>
          </svg>
        </div>
      </div>
      {/* Section 1 */}
      <div className="grid grid-cols-1">
        <div className="relative w-fit mx-auto">
          {/* Main Image */}
          <img src={img0} alt="Main" className="rounded-xl w-[600px]" />

          {/* Top Left Image */}
          <img
            src={img1}
            alt="Top Left"
            className="absolute top-[-20px] left-[-20px] w-[150px] rounded-lg shadow-lg"
          />

          {/* Bottom Right Image */}
          <img
            src={img2}
            alt="Bottom Right"
            className="absolute bottom-[-20px] right-[-20px] w-[150px] rounded-lg shadow-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default Event;

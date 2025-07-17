import React from "react";
import { pvt_din_hero } from "../assets/images";

const PrivateDinning = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      {/* Hero section */}
      <div
        className="relative w-full h-[85vh] bg-cover bg-center "
        style={{ backgroundImage: `url(${pvt_din_hero})` }}
      >
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50"></div>
        {/* Title */}
        <p className="absolute top-[40%] md:top=[45%] left-1/2 transform -translate-x-1/2 text-3xl w-[90%] md:text-5xl xl:text-7xl text-white text-center drop-shadow-md">
          PRIVATE DINING EXPERIENCE
        </p>
        <p className="absolute top-[53%] md: left-1/2 transform -translate-x-1/2 md:text-xl xl:text-2xl text-white text-center drop-shadow-md">
          A Five-Star Meal with a Million-Star View
        </p>
      </div>

      {/* CTA Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 text-center text-midnightblue">
        <div>
          <p>
            Welcome aboard a dining experience unlike any other, where the sun
            melts into the Gulf and your private table floats on the calm
            waters. Kokomo Charters invites you to reimagine what dining can be:
            elevated cuisine served on open water, with the Gulf breeze as your
            backdrop and each course a celebration of craftsmanship.
          </p>
        </div>
        <div>
          <p>
            In partnership with Taste & Design Catering, this experience blends
            the artistry of fine dining with the exclusivity of your own private
            yacht. A table like no other at your service, where the view is
            ever-changing and the menu is anything but standard.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivateDinning;

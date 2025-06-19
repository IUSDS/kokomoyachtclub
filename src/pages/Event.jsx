import React from "react";
import {
  events_hero,
  img0,
  img1,
  img2,
  quay_401,
  fleet,
  building,
  sky,
  boat,
  fleet_desk,
  ocean,
  boat2, image,
} from "../assets/images";
import {
  banner,
  calender,
  champagne,
  vector,
  location,
  calendar2,
} from "../assets/icons";

const Event = () => {
  return (
    <div className="space-y-12">
      {/* Hero section */}
      <div
        className="relative w-full h-[544px] md:h-[744px] xl:h-[944px] bg-cover bg-center"
        style={{ backgroundImage: `url(${events_hero})` }}
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
          <p className="text-xl font-bold md:text-4xl xl:text-5xl text-white text-center drop-shadow-md">
            EVENTS AT KOKOMO YACHT CLUB
          </p>
          <div className="bg-midnightblue px-4 py-2 rounded-full shadow-lg">
            <p className="text-white font-semibold">RSVP Now</p>
          </div>
        </div>
        <div className="custom-shape-divider-bottom-1750074161">
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
              className="shape-fill"
            />
          </svg>
        </div>
      </div>

      {/* Section 1 */}
      <div className="flex flex-col-reverse md:flex-row items-start px-4 md:px-8 lg:px-16">
        {/* Text */}
        <div className="w-full md:w-1/2 flex flex-col space-y-3 pt-8">
          <p className="font-bold text-2xl sm:text-3xl lg:text-4xl text-center md:text-left text-midnightblue">
            The Exclusive Boat Club of Sarasota
          </p>
          <div className="mx-auto md:mx-0 w-16 sm:w-24 lg:w-32 h-1 rounded-full bg-midnightblue" />
          <p className="text-sm sm:text-base md:text-lg text-center md:text-left">
            Welcome to the inner circle of coastal sophistication. At Kokomo
            Yacht Club, our events are private gateways to a life less ordinary.
            Our curated events are designed to bring the community together in
            one of Sarasota's premier locations. With a team dedicated to
            creating an effortless and unforgettable experience, this private
            club is set to redefine luxury boating and a unique social scene.
          </p>
        </div>

        {/* Images */}
        <div className="relative w-full md:w-1/2 h-64 sm:h-80 md:h-[450px] flex items-center justify-center overflow-hidden rounded-xl">
          <img
            src={img0}
            alt="Main"
            className="w-64 sm:w-72 md:w-80 lg:w-96 rounded-xl z-10"
          />
          <img
            src={img1}
            alt="Top"
            className="absolute w-40 sm:w-40 md:w-48 top-4 sm:top-6 md:top-8 -left-6 sm:-left-8 md:-left-10 lg:left-4 xl:left-12 z-20 rounded-lg"
          />
          <img
            src={img2}
            alt="Bottom"
            className="absolute w-40 sm:w-40 md:w-48 bottom-4 sm:bottom-6 md:bottom-8 -right-6 sm:-right-8 lg:right-4 md:-right-10 xl:right-12 z-20 rounded-lg"
          />
        </div>
      </div>

      {/* Section 2 */}
      <div className="bg-midnightblue h-20 flex justify-center items-center">
        <p className="text-white text-sm md:text-xl px-4 text-center">
          This is boating the way it should be – seamless, joyful and
          hassle-free
        </p>
      </div>

      {/* Section 3 Mobile View */}
      <div className="md:hidden flex flex-col justify-center items-center space-y-4">
        {/* Img Box */}
        <div className="relative w-[320px]">
          <div className="absolute top-6 -left-3 h-10 w-4 rounded-md bg-midnightblue" />
          <img
            src={fleet}
            alt="A fleet preview"
            className="w-full rounded-lg"
          />
          <div className="absolute top-2 -left-3 flex items-center gap-2 bg-midnightblue rounded-e-xl px-4 h-12">
            <img src={calender} alt="calendar icon" className="w-6 h-6" />
            <div className="flex flex-col justify-center text-white text-xs">
              <p>UPCOMING</p>
              <p>THURSDAY, JULY 10 | 5:00 - 8:00 PM</p>
            </div>
          </div>
        </div>

        <div className="bg-midnightblue h-16 w-[320px] rounded-md flex items-center justify-center gap-2 text-white">
          <img src={champagne} alt="Champagne icon" className="w-10 h-10" />
          <p className="font-bold">Grand Opening At The Quay</p>
          <img src={champagne} alt="Champagne icon" className="w-10 h-10" />
        </div>

        <img
          src={building}
          alt="Building | Quay Commons"
          className="rounded-md w-[320px]"
        />

        <div className="rounded-md w-[320px] border-2 border-midnightblue pb-8 mb-10 space-y-8">
          <div className="relative inline-block">
            <img src={vector} alt="vector art" className="block w-full" />
            <p className="absolute inset-0 flex justify-center items-center text-white font-semibold text-center px-4">
              AN INVITATION TO THE INNER CIRCLE
            </p>
          </div>
          <p className="text-midnightblue text-center">
            You’re cordially invited to the unveiling of Kokomo Yacht Club’s new
            flagship home—a 14-acre waterfront sanctuary at Sarasota’s most
            prestigious address.
          </p>
          <div className="flex flex-col items-center justify-center">
            <img src={location} alt="location icon" className="w-12" />
            <p className="text-midnightblue text-center">
              501 Quay Commons | Sarasota, Florida
            </p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <img src={calendar2} alt="calendar icon" className="w-12" />
            <p className="text-midnightblue text-center">
              Thursday, July 10 | 5:00 - 8:00 PM
            </p>
          </div>
        </div>
      </div>

      {/* Section 3 Desktop View */}
      <div className="hidden md:grid grid-cols-3 grid-rows-[250px_150px_250px] gap-4 px-10 py-8">
        {/* 1) Hero Section - spans 2 cols */}
        <div className="col-span-2 row-start-1 relative rounded-lg">
          <img
            src={fleet_desk}
            alt="Fleet preview"
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 -left-4 bg-midnightblue text-white px-3 py-2 rounded-lg text-xs flex items-center gap-2">
            <img src={calender} alt="Calendar" className="w-4 h-4" />
            <div className="leading-tight">
              UPCOMING <br />
              Thursday, July 10
            </div>
          </div>
        </div>

        {/* 2) Top-Right Image */}
        <div className="col-start-3 row-start-1 row-span-2 rounded-lg overflow-hidden">
          <img
            src={building}
            alt="Top right"
            className="w-full h-full object-cover"
          />
        </div>

        {/* 3) Bottom-Left Image */}
        <div className="col-start-1 row-start-2 row-span-2 rounded-lg overflow-hidden">
          <img
            src={building}
            alt="Bottom left"
            className="w-full h-full object-cover"
          />
        </div>

        {/* 4) Grand Opening Header */}
        <div className="col-start-2 row-start-2 flex items-center justify-center text-center">
          <div className="bg-midnightblue h-full w-full rounded-md flex items-center justify-evenly gap-2 text-white">
            <img src={champagne} alt="Champagne icon" className="w-10 h-10" />
            <p className="font-bold">Grand Opening At The Quay</p>
            <img src={champagne} alt="Champagne icon" className="w-10 h-10" />
          </div>
        </div>

        {/* 5) Invitation Card */}
        <div className="col-start-2 col-span-2 row-start-3 flex w-full text-center">
          <div className="w-full flex flex-col border-2 border-midnightblue rounded-lg relative px-2 gap-4 ">
            {/* Tag */}
            <div className="relative flex justify-center items-center w-72 md:w-80 mx-auto">
              <img src={vector} alt="vector art" className="w-full" />
              <p className="absolute inset-0 flex justify-center items-center text-white font-semibold text-center px-4">
                AN INVITATION TO THE INNER CIRCLE
              </p>
            </div>

            {/* Description */}
            <p className="text-midnightblue text-center">
              YOU'RE CORDIALLY INVITED TO THE UNVEILING OF KOKOMO YACHT CLUB'S
              NEW FLAGSHIP HOME— A 14-ACRE WATERFRONT SANCTUARY AT SARASOTA'S
              MOST PRESTIGIOUS ADDRESS.
            </p>

            {/* Event Info */}
            <div className="flex justify-center text-midnightblue text-xs">
              <div className="flex flex-col items-center gap-2">
                <img src={location} alt="Location" className="w-5 h-5" />
                <span>501 QUAY COMMONS | SARASOTA, FLORIDA</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <img src={calendar2} alt="Time" className="w-5 h-5" />
                <span>THURSDAY, JULY 10 | 5:00 – 8:00 PM</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section 4 */}
      <div className="text-midnightblue text-center font-bold text-lg px-8 flex flex-col items-center justify-center space-y-2">
        <p>
          YOUR EXCLUSIVE INVITE TO A MEMORABLE NIGHT AT THIS PRIVATE EVENT
          SHOWCASING UNPARALLELED ATMOSPHERE, LUXURY YACHTS, A DEDICATED TEAM OF
          CAPTAINS AND CREW.
        </p>
        <div className="bg-midnightblue px-4 py-2 rounded-full shadow-lg">
          <p className="text-white font-semibold">RSVP Now</p>
        </div>
      </div>

      {/* Section 5 */}
      <div
        className="relative w-full bg-cover bg-center flex flex-col space-y-6 md:space-y-0 justify-between items-start h-[80vh] py-10 px-10 shadow-midnight"
        style={{ backgroundImage: `url(${quay_401})` }}
      >
        {/* Heading Card */}
        <div className="border-2 border-white rounded-xl w-fit py-4 sm:py-6 md:py-8 px-3 sm:px-6 md:px-8 text-white font-bold text-lg sm:text-xl md:text-2xl bg-gradient-to-r from-midnightblue to-transparent">
          EVENT HIGHLIGHTS INCLUDE
        </div>
        {/* List Card */}
        <div className="border-2 border-white rounded-xl w-fit py-4 sm:py-6 md:py-8 px-3 sm:px-6 md:px-8 text-white text-sm md:text-lg bg-gradient-to-r from-midnightblue to-transparent">
          <ul className="list-disc list-inside space-y-2">
            <li>A FIRST LOOK AT OUR NEWLY EXPANDED LUXURY FLEET</li>
            <li>ELEGANT PARK-LIKE SURROUNDINGS ALONG THE MARINA</li>
            <li>PRIVATE CLUB OFFICES WITHIN THE ICONIC BELLE HAVEN BUILDING</li>
            <li>LIVE MUSIC, CRAFT COCKTAILS, AND COASTAL CUISINE</li>
            <li>EXCLUSIVE MEMBERSHIP INCENTIVES—ONLY REVEALED TO ATTENDEES</li>
          </ul>
        </div>
      </div>

      {/* Section 6 */}
      <div className="md:pt-20 md:px-10">
        <div
          className="relative w-full h-[500px] md:h-[300px] xl:h-[400px] bg-cover bg-center text-white md:rounded-lg md:shadow-lg"
          style={{ backgroundImage: `url(${sky})` }}
        >
          {/* Text block */}
          <div className="z-10 flex flex-col justify-center h-full px-8 space-y-4 lg:px-10">
            <p className="text-2xl md:text-3xl lg:text-5xl font-bold">
              Crafted for those who belong
            </p>
            <p className="max-w-xl md:w-1/2 lg:max-w-2xl ">
              True luxury isn’t crowded, it’s curated. At Kokomo Yacht Club,
              each gathering is an intentional experience that blends fine
              hospitality with organic connection. You’re not just
              attending—you’re arriving among peers, innovators, and tastemakers
              who understand the quiet power of access.
            </p>
          </div>

          {/* Boat graphic */}
          <img
            src={boat}
            alt="boat"
            className="absolute right-0 bottom-0 w-48 md:w-96 xl:w-[480px]"
          />
        </div>
      </div>

      {/* Section 7 */}
      <div className="md:pt-24 md:px-10">
        <div
          className="relative w-full h-[500px] md:h-[300px] xl:h-[400px] bg-cover bg-center text-white md:rounded-lg md:shadow-lg"
          style={{ backgroundImage: `url(${ocean})` }}
        >
          {/* Optional dark overlay for contrast */}
          {/* <div className="absolute inset-0 bg-black bg-opacity-30" /> */}

          {/* Text */}
          <div className="relative z-10 flex flex-col justify-center items-end h-full px-10">
            <div className="w-full md:w-1/2 text-right space-y-6">
              {/* Headline + Subhead */}
              <div>
                <h2 className="text-3xl md:text-4xl font-bold">
                  Get On the List
                </h2>
                <p className="text-lg md:text-xl italic">
                  because exclusivity starts here
                </p>
              </div>
              {/* Body + Button */}
              <div className="space-y-4">
                <p className="text-base md:text-lg leading-relaxed">
                  Our invitation list is limited and intentional. Sign up to
                  receive early access to private events, seasonal gatherings,
                  and yacht previews.
                </p>
                <button className="border border-white rounded-full px-6 py-2 hover:bg-white hover:text-midnightblue transition">
                  Join our Guest List
                </button>
              </div>
            </div>
          </div>

          {/* Boat graphic */}
          <img
            src={boat2}
            alt="boat"
            className="absolute z-30 bottom-0 left-0 md:left-20 xl:left-40 w-48 md:w-80 xl:w-[380px]"
          />
        </div>
      </div>

      {/* Section 8 */}
      <div className="flex flex-col md:flex-row-reverse px-10 gap-4">
        <img src={image} alt="aerial view of fleet" className="md:w-1/2 shadow-lg" />
        <div className="flex flex-col justify-center text-center md:text-left space-y-2 xl:space-y-8 md:w-1/2">
          <p className="text-midnightblue text-xl md:text-2xl xl:text-5xl font-bold">Ready to Own the Adventure?</p>
          <button className="bg-midnightblue px-4 py-2 rounded-full text-white font-bold w-[300px]">Explore Membership</button>
          <button className="bg-midnightblue px-4 py-2 rounded-full text-white font-bold w-[300px]">Schedule a Private Tour</button>
        </div>
      </div>
    </div>
  );
};

export default Event;

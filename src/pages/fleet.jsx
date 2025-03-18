import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Vid from "../assets/videos/vid.mp4";
import ImageCarousel from "../components/ImageCarousel";
import {
  memory_maker,
  MM1,
  MM2,
  MM3,
  CY1,
  CY2,
  CY3,
  club_yacht,
  giddy_up,
  GU1,
  GU2,
  GU3,
  home4,
  GU5,
  home7,
  wl2,
  wl3,
  wl4,
  wl5,
  wl6,
  wl7,
  TS1,
  TS2,
  home5,
  home2,
  L1,
  L2,
  L3,
  home3,
  home6,
  home8,
  mnd1,
  mnd2,
  mnd3,
  mnd4,
  mnd5,
  mnd6,
  congetta1,
  congetta2,
  congetta3,
  congetta4,
  congetta5,
  outrage1,
  outrage2,
  outrage3,
  outrage4,
  outrage5,
  aviara1,
  aviara2,
  aviara3,
  aviara4,
  aviara5,
} from "../assets/images";
import { FaRegCheckCircle } from "react-icons/fa";
import ReCAPTCHA from "react-google-recaptcha";
import { useLocation, Link } from "react-router-dom";
import MembershipLevels from "../components/MembershipLevels";
import TestimonialsSection from "../components/TestimonialsSection";
import ContactForm from "../components/ContactForm";
import { h6 } from "framer-motion/client";

// Motion variants for smooth animations
const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const fleetData = [
  {
    title: "50' Memory Maker",
    points: "200-234 Mariner Points",
    id: "memorymaker",
    description:
      "Our 50' Three Bedroom, Three Story Power Catamaran perfect for half days, full days and multi-day excursions. Experience unmatched elegance with three stories of luxury, four spacious entertaining areas, and state-of-the-art amenities. Memory Maker has 3 bedrooms with ensuite bathrooms, an office, full galley and family room. Ideal for full day and half day dayboating plus amazing overnight and multi-day journeys.",
    images: [memory_maker, MM1, MM2, MM3],
    buttonText: "Become a Member to Book",
    reverse: false,
  },
  {
    title: "50' Club Yacht",
    points: "250-280 Mariner Points",
    id: "clubyacht",
    description:
      "Exclusive to Kokomo Yacht Club, our very own custom built luxury day yacht. Designed to maximize your perfect day on the water. There is nothing like it on the water! The entire vessel opens to the outdoors and provides free flowing indoor/outdoor space. The entire vessel can also or be closed with full air conditioning. The spacious front bow provides a sundeck and couch seating plus outdoor air conditioning. Plenty of conversation spaces in the bow, cockpit and cabin. Next to the helm, the lower level also features an air conditioned lounge with television, full galley and full size bathroom.",
    images: [CY1, CY2, CY3, club_yacht],
    buttonText: "Become a Member to Book",
    reverse: true,
  },
  {
    title: "50' Memories, Not Dreams",
    points: "197-219 Mariner Points",
    id: "memoriesnotdreams",
    description:
      "“Memories, Not Dreams” promises a one-of-a-kind luxury experience in St. Petersburg’s vibrant waters, where every detail caters to an unparalleled voyage. This yacht offers expansive lounge areas, cutting-edge amenities, and agile performance for an unrivaled sea adventure. With luxurious bedrooms, state-of-the-art kitchen facilities, and a plethora of entertainment options, your time at sea is transformed into an exceptional escapade.",
    images: [mnd1, mnd6, mnd2, mnd4, mnd5],
    buttonText: "Become a Member to Book",
    reverse: false,
  },
  {
    title: "47' Giddy Up",
    points: "175-207 Mariner Points",
    id: "giddyup",
    description:
      "Welcome to our amazing Cruisers Yachts GLS 42. With dual beach doors, large U-shaped main seating, galley with a raised wet bar, and a spacious open bow, the entertainment possibilities are endless. The lower cabin features an aft stateroom and U-shaped dinette that converts into a berth. A full galley and standing head with shower complete this remarkable yacht.",
    images: [giddy_up, GU1, GU2, GU3, home4, GU5],
    buttonText: "Become a Member to Book",
    reverse: true,
  },
  {
    title: "42' Wanderlust",
    points: "163-189 Mariner Points",
    id: "wanderlust",
    description:
      "She is the nicest sailing vessel in the market. Unlike traditional sailing catamarans the Bali 4.2 has a front bow that is completely solid with tons of room for seating and enjoying the day. The entire stern of the vessel opens to create a wide open flow from cabin to the cockpit. She is great for both sailing adventures as well as non sailing day boating. She is perfect for overnight and multi-night excursions with her 4 bedrooms, 4 full baths and crew quarters.",
    images: [home7, wl2, wl3, wl4, wl5, wl6, wl7],
    buttonText: "Become a Member to Book",
    reverse: false,
  },
  {
    title: "42' Congetta",
    points: "197-219 Mariner Points",
    id: "congetta",
    description:
      "Set sail on the 42’ Congetta for a luxury day on the water in St. Pete. From cruising along the Gulf Coast to docking at waterfront restaurants or lounging on secluded beaches, this power catamaran is your ticket to a customized and carefree boating experience.",
    images: [congetta1, congetta2, congetta3, congetta4, congetta5],
    buttonText: "Become a Member to Book",
    reverse: true,
  },
  {
    title: "42' Outrage",
    points: "148-165 Mariner Points",
    id: "outrage",
    description:
      "Designed for both adventure and relaxation, the 42’ Outrage offers a luxury cruising experience with the option to fish. Explore Anna Maria Island’s pristine sandbars, scenic waterways, and waterfront dining spots, or cast a line in calm coastal waters for an unforgettable day on the water.",
    images: [outrage2, outrage1, outrage3, outrage4, outrage5],
    buttonText: "Become a Member to Book",
    reverse: false,
  },
  {
    title: "38' Top Shelf",
    points: "131-144 Mariner Points",
    id: "topshelf",
    description:
      "Our 38' Open Bow Day Boat for up to 13 guests. Perfect for day trips to restaurants, sandbars or simply cruising, this open bow day boat offers ultimate comfort with spacious seating, cushioned flooring throughout, mahogany tables, shade for the entire boat, full bathroom, an advanced stereo system, water toys and twin 350’s for plenty of “Get Up and Go”.",
    images: [home5, TS1, TS2],
    buttonText: "Become a Member to Book",
    reverse: true,
  },
  {
    title: "35' Aviara",
    points: "108-120 Mariner Points",
    id: "aviara",
    description:
      "Sleek, modern, and built for both speed and comfort, the 35’ Aviara is the ultimate day yacht for those who love to cruise in style. Perfect for sandbar lounging, sunset cruising, and entertaining, this premium vessel combines cutting-edge design with effortless luxury on the water.",
    images: [aviara1, aviara2, aviara3, aviara4, aviara5],
    buttonText: "Become a Member to Book",
    reverse: false,
  },
  {
    title: "29' The Life",
    points: "115-125 Mariner Points",
    id: "thelife",
    description:
      "Ideal for small gatherings up to 6 people, this spectacular 29' open bow day boat provides luxurious appointments, a marine head and an amazing stereo system. Captain Jeff, who grew up on the waters of Sarasota Bay, always provides a memorable day on the water.",
    images: [L1, home2, L2, L3],
    buttonText: "Become a Member to Book",
    reverse: true,
  },
];

const FleetSection = ({
  title,
  points,
  id,
  description,
  images,
  buttonText,
  reverse,
}) => (
  <motion.div
    id={id}
    className={`flex flex-col ${
      reverse ? "md:flex-row-reverse" : "md:flex-row"
    } w-full xl:px-32 md:py-16 p-8 gap-8`}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.3 }}
    variants={sectionVariants}
  >
    <div className="w-full md:w-1/2">
      <ImageCarousel images={images} />
    </div>

    <div className="flex flex-col w-full md:w-1/2 space-y-6">
      <h2 className="font-normal text-midnightblue text-3xl md:text-4xl xl:text-6xl lg:text-5xl">
        {title}
      </h2>

      {id==='clubyacht' && (
        <h6 className="text-lg text-midnightblue">(Coming Spring 2026)</h6>
      )}

      <div className="flex items-center">
        <div className="w-2 h-6 rounded-full mr-2 bg-blue-500"></div>
        <p className="font-veryLight">{points}</p>
      </div>

      <p className="font-medium">{description}</p>

      <a href={`/contact`} target="_blank" rel="noopener noreferrer">
        <button className="w-fit px-6 py-3 text-sm bg-midnightblue hover:bg-opacity-90 text-white font-semibold rounded-full transition-all">
          {buttonText}
        </button>
      </a>
    </div>
  </motion.div>
);

const Fleet = () => {
  const [isVerified, setIsVerified] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState("right");

  const location = useLocation();

  useEffect(() => {
    const storedScrollPosition = sessionStorage.getItem(location.pathname);
    if (storedScrollPosition) {
      window.scrollTo(0, parseInt(storedScrollPosition, 10));
    } else {
      window.scrollTo(0, 0);
    }
    return () => {
      sessionStorage.setItem(location.pathname, window.scrollY);
    };
  }, [location]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const sectionId = location.hash;
      console.log(sectionId);

      if (sectionId) {
        const section = document.querySelector(sectionId);
        console.log(section);
        if (section) {
          section.scrollIntoView({ behavior: "smooth" });
        }
      }
    }, 100);
    return () => clearTimeout(timeoutId);
  }, [location]);

  const handleCaptcha = (value) => {
    setIsVerified(true); // Enable form submission on successful verification
  };

  return (
    <div className="overflow-hidden">
      {/* Hero Section with Motion */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
        className="relative w-full h-screen overflow-hidden"
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover z-10"
          style={{ pointerEvents: "none" }}
        >
          <source src={Vid} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* <div className="absolute top-0 left-0 w-full h-full bg-blue-900 bg-opacity-50 z-20 pointer-events-none"></div> */}

        <div className="absolute xl:w-2/3 inset-0 flex flex-col items-start lg:px-48 md:px-32 px-12 justify-center text-left text-white z-30">
          <h1 className="text-3xl md:text-6xl font-medium mb-4">Vessels</h1>
          <p className="text-sm font-normal md:text-xl mb-6">
            Take a look at the stunning boats we have available for our members
            to book. As membership grows, we continue to add new vessels to
            ensure our members have ample opportunities and options for booking.
          </p>
          <Link to={"/members"}>
            <button className="px-6 py-3 bg-midnightblue text-white font-light rounded-full">
              Become a Member
            </button>
          </Link>
        </div>
      </motion.div>

      {/* Fleet Sections with Motion */}
      {fleetData.map((fleetItem, index) => (
        <FleetSection key={index} {...fleetItem} />
      ))}

      {/* Membership Levels Section with Motion */}
      <MembershipLevels />

      {/* Testimonials Section with Motion */}
      <TestimonialsSection />

      {/* Contact Form Section with Motion */}
      <ContactForm />
    </div>
  );
};

export default Fleet;

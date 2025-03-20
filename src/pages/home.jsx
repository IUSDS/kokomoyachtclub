import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Vid from "../assets/videos/vid.mp4";
import {
  home1,
  home2,
  home3,
  home4,
  home5,
  home6,
  home7,
  home8,
  home9,
  mnd,
  congetta,
  outrage,
  aviara,
} from "../assets/images";
import homeicon from "../assets/icons/homeicon.png";
import ReCAPTCHA from "react-google-recaptcha";
import { useLocation } from "react-router-dom";
import TestimonialsSection from "../components/TestimonialsSection";
import ContactForm from "../components/ContactForm";
import Modal from "../components/Modal";

// Define motion variants
const fadeInUpVariant = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const slideInLeftVariant = {
  hidden: { opacity: 0, x: -100 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const slideInRightVariant = {
  hidden: { opacity: 0, x: 100 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const fleetItemVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const benefitsData = [
  {
    title: "Exclusive Access",
    description:
      "Our extensive approval process limits member numbers, which maximizes your ability to book what you want, when you want.",
  },
  {
    title: "Best In Class Fleet",
    description:
      "Optimize every experience on the water. Have full access to our constantly expanding fleet, including the custom Club Yachts, designed and built for KYC.",
  },
  {
    title: "5 Star Staff",
    description:
      "Our Captains and mates are the best in the business to provide a worry-free day on the water.",
  },
  {
    title: "Flexible Memberships",
    description:
      "Kokomo Yacht Club offers multiple tiers of membership, allowing you to choose a membership level that best suits your lifestyle.",
  },
];

const Home = () => {
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

  // Captcha handling
  const handleCaptcha = (value) => setIsVerified(true);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isVerified) {
      alert("Please verify that you are not a robot!");
      return;
    }
    alert("Form submitted successfully!");
  };
  const handleInquireButton = () => {
    window.open("/contact", "_blank");
  };

  const fleetImages = [
    { name: "Memory Maker", size: "50'", location: "Sarasota", img: home3 },
    {
      name: "Memories, Not Dreams",
      size: "50'",
      location: "St. Petersburg",
      img: mnd,
    },
    { name: "Club Yacht", size: "50'", location: "Sarasota", img: home6 },
    {
      name: "Congetta",
      size: "44'",
      location: "St. Petersburg",
      img: congetta,
    },
    {
      name: "Fountaine Pajot",
      size: "44'",
      location: "Tampa Bay",
      img: congetta,
    },
    { name: "Giddy Up", size: "43'", location: "Sarasota", img: home4 },
    { name: "Wanderlust", size: "42'", location: "Sarasota", img: home7 },
    { name: "Outrage", size: "42'", location: "Anna Maria", img: outrage },
    { name: "Top Shelf", size: "38'", location: "Sarasota", img: home5 },
    {
      name: "Aviara",
      size: "35'",
      location: "Sarasota & Anna Maria",
      img: aviara,
    },
    { name: "The Life", size: "29'", location: "Sarasota", img: home8 },
  ];

  // For modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Open modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-10 md:space-y-8 font-jakarta">
      {/* Hero Section */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeInUpVariant}
        className="relative w-full h-screen overflow-hidden"
      >
        {/* Background video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover z-10"
        >
          <source src={Vid} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Dark overlay */}
        {/* <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-30 z-20"></div> */}

        {/* Content on top of overlay */}
        <div className="xl:w-2/3 absolute inset-0 flex flex-col items-start lg:px-48 md:px-32 px-12 justify-center text-left text-white z-30">
          <h1 className="text-2xl md:text-6xl font-medium mb-4">
            The Pure Joy of Luxury Boating Without the Hassle
          </h1>
          <p className="text-sm font-normal md:text-xl mb-6">
          Welcome to Gulf Coast’s luxury private boat club, offering our members access to a world-class fleet of USCG-captained vessels.
          </p>
          <button
            onClick={handleInquireButton}
            className="px-6 py-3 bg-midnightblue hover:bg-midnightblue text-white rounded-full"
          >
            Inquire About Membership
          </button>
        </div>
      </motion.div>

      {/* Info Section */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInUpVariant}
        className="flex flex-col md:py-10 lg:px-20 px-4 md:flex-row"
      >
        {/* Image Container */}
        <motion.div
          variants={slideInLeftVariant}
          className="relative flex justify-center items-center h-[300px] md:h-auto lg:h-auto xl:h-auto w-full md:w-1/2"
        >
          <img
            src={home1}
            alt=""
            className="xl:w-[500px] lg:w-[400px] md:w-[280px] w-[250px] lg:mr-10 relative"
          />
          <img
            src={home2}
            alt=""
            className="xl:w-[300px] lg:w-[250px] md:w-[200px] w-[180px] absolute right-[10%] md:right-[2%] lg:right-[2%] lg:bottom-[10%] bottom-[5%]"
          />
        </motion.div>

        {/* Text Section */}
        <motion.div
          variants={slideInRightVariant}
          className="flex flex-col md:items-start items-center px-5 justify-center w-full md:w-1/2 text-center md:text-left space-y-4"
        >
          <p className="font-normal text-midnightblue text-3xl md:text-4xl lg:text-5xl">
            The Best of All Worlds
          </p>
          <div className="flex justify-start">
            <div className="hidden md:block w-2 rounded-full mr-2 bg-blue-500"></div>
            <p className="font-veryLight">
              Don't own one boat when you can have access to a fleet of boats -
              for less money and absolutely no headaches!
            </p>
          </div>
          <p className="font-medium">
            Our fleet ranges from runabouts and dayboats to yachts and sailing
            catamarans. Our fleet is meticulously maintained, fully captained,
            provisioned, and prepared for your adventure. Simply step aboard,
            relax, and indulge in your day on the water—leave the captaining,
            maintenance, repairs, and cleaning to our attentive staff.
          </p>
          <button
            onClick={openModal}
            className="px-6 py-3 text-sm bg-midnightblue hover:bg-midnightblue text-white  rounded-full"
          >
            Download Membership Brochure
          </button>
        </motion.div>

        {/* Modal */}
        {isModalOpen && <Modal isModalOpen={true} closeModal={closeModal} />}
      </motion.div>

      {/* Membership Benefits Section */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="relative w-full bg-cover bg-center py-16"
        style={{ backgroundImage: `url(${home9})` }}
      >
        <div className="absolute inset-0 bg-midnightblue bg-opacity-90"></div>
        <div className="relative z-10 container mx-auto px-4 md:px-8 max-w-7xl">
          <motion.h1
            variants={fadeInUpVariant}
            className="text-white text-4xl md:text-5xl font-veryLight mb-12 text-center"
          >
            Benefits of Membership
          </motion.h1>

          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-12"
          >
            {benefitsData.map((benefit, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="flex flex-col items-center space-y-2 p-4"
              >
                <img src={homeicon} alt="" className="w-16 h-16" />
                <h3 className="text-white text-xl font-veryLight">
                  {benefit.title}
                </h3>
                <p className="text-gray-400 text-center max-w-sm">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Fleet Section */}
      <motion.div
        variants={containerVariants}
        className="grid grid-cols-1 md:grid-cols-2 gap-8 px-10 py-10"
      >
        {fleetImages.map((fleet, index) => {
          const isLastItem = index === fleetImages.length - 1;
          const isOdd = fleetImages.length % 2 !== 0;

          return (
            <motion.div
              key={index}
              variants={fleetItemVariants}
              className={`bg-white rounded-lg overflow-hidden shadow-lg transform transition-transform duration-300 ${
                isOdd && isLastItem ? "md:col-span-2 md:w-1/2 md:mx-auto" : ""
              }`}
            >
              <div className="relative">
                <img
                  src={fleet.img}
                  alt={fleet.name}
                  className="w-full xl:h-[400px] md:h-[220px] object-cover"
                  loading="lazy"
                />
                {/* Text Box */}
                <div className="absolute top-0 left-0 bg-midnightblue text-white text-sm md:text-lg w-[130px] xl:w-[200px] xl:py-8 py-4 text-center">
                  {fleet.location}
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-veryLight text-2xl text-midnightblue mb-4">
                  {fleet.size} {fleet.name}
                </h3>
                <a
                  href={`/fleet#${fleet.name
                    .replace(/[,\s]+/g, "") // Removes spaces AND commas
                    .toLowerCase()}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="w-full px-6 py-3 bg-midnightblue hover:bg-blue-700 text-white font-light rounded-full transition-colors duration-300">
                    View Vessel
                  </button>
                </a>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Experience Freedom Section */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={slideInLeftVariant}
        className="flex flex-col px-6 lg:px-20 relative w-full bg-cover bg-center py-16 lg:h-[600px] justify-center"
        style={{ backgroundImage: `url(${home6})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-midnightblue to-transparent bg-opacity-90"></div>
        <div className="z-10 flex flex-col text-white items-start gap-4 md:w-1/2 lg:w-1/3">
          <p className="text-3xl lg:text-6xl">Experience Freedom</p>
          <p className="text-sm lg:text-lg font-veryLight">
            Love boating again! Gone are the days of spending hours opening and
            closing your boat and managing all the maintenance and unexpected
            costs. View our membership options and get in touch to get started.
          </p>
          <Link to={"/members"}>
            <button className="px-4 py-2 bg-blue-600 rounded-full">
              View Memberships
            </button>
          </Link>
        </div>
      </motion.div>

      {/* Testimonials */}
      <TestimonialsSection />

      {/* Contact Form Section */}
      <ContactForm />
    </div>
  );
};

export default Home;

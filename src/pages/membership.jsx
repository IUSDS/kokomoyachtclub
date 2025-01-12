import React, { useState, useEffect } from 'react';
import Vid from '../assets/videos/home.mp4';
import { FaRegCheckCircle } from "react-icons/fa";
import ReCAPTCHA from 'react-google-recaptcha';
import { home5 } from '../assets/images';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import MembershipLevels from '../components/MembershipLevels';
import TestimonialsSection from '../components/TestimonialsSection';

// Motion variants for smooth animations
const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const membershipData = [
    {
        title: "Silver",
        description: "Best for Occasional Boater",
        points: "1,850 Mariner Points Annually",
        benefits: [
            "2 Open Reservations",
            "12 Weekend Outings Annually",
            "Unlimited Last-Minute Reservations",
            "1 Overnight Trip Included",
            "Base Tier Scheduling"
        ],
        bgColor: "bg-white",
        borderColor: 'border-black',
        textColor: "text-midnightblue",
        buttonText: "Request a Member Packet",
    },
    {
        title: "Gold",
        description: "Our most popular, ideal for snowbirds",
        points: "1,850 Mariner Points Annually",
        benefits: [
            "2 Open Reservations",
            "12 Weekend Outings Annually",
            "Unlimited Last-Minute Reservations",
            "1 Overnight Trip Included",
            "Base Tier Scheduling"
        ],
        bgColor: "bg-midnightblue",
        borderColor: 'border-white',
        textColor: "text-white",
        buttonText: "Request a Member Packet",
    },
    {
        title: "Platinum",
        description: "Perfect for full-time Residents",
        points: "4,900 Mariner Points Annually",
        benefits: [
            "6 Open Reservations",
            "Unlimited Weekend Outings",
            "Unlimited Last-Minute Reservations",
            "2 Multi-Day Trips Included",
            "Platinum Priority Scheduling"
        ],
        bgColor: "bg-white",
        borderColor: 'border-black',
        textColor: "text-midnightblue",
        buttonText: "Request a Member Packet",
    },
    {
        title: "Diamond",
        description: "The Ultimate Membership for Water Warriors",
        points: "7,500 Mariner Points Annually",
        benefits: [
            "8 Open Reservations",
            "Unlimited Weekend Outings",
            "Unlimited Last-Minute Reservations",
            "3 Multi-Day Trips Included",
            "Top Priority Scheduling"
        ],
        bgColor: "bg-white",
        borderColor: 'border-black',
        textColor: "text-midnightblue",
        buttonText: "Request a Member Packet",
    }
];
const MembershipTier = ({ title, description, points, benefits, bgColor, textColor, borderColor, buttonText, btnColor, btnTextColor }) => (
    <motion.div
        className={`px-4 md:h-[700px] xl:h-[550px] w-full flex flex-col items-center ${bgColor} rounded-lg space-y-4 py-4`}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={{
            hidden: { opacity: 0, y: 50 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
        }}
    >
        <p className={`${textColor} text-xl text-center font-normal`}>{title}</p>
        <p className={`${textColor} text-md text-center font-normal`}>{description}</p>
        {/* Pointers */}
        <div className="flex flex-col space-y-2">
            <div className="flex flex-col pl-2 text-sm justify-start">
                <div className={`flex items-center gap-2 border-b border-dashed ${borderColor} pb-2`}>
                    <FaRegCheckCircle className={`${textColor}`} />
                    <p className={`${textColor}`} >{points}</p>
                </div>
            </div>
            {benefits.map((benefit, index) => (
                <div key={index} className="flex flex-col pl-2 text-sm justify-start">
                    <div className={`flex items-center gap-2 border-b border-dashed ${borderColor} pb-2`}>
                        <FaRegCheckCircle className={`${textColor}`} />
                        <p className={`${textColor}`} >{benefit}</p>
                    </div>
                </div>
            ))}
        </div>
        <p className={`text-3xl pt-6 ${textColor} font-medium`}>Inquire for Details</p>
        <a href={'/contact'} target='_blank' rel="noopener noreferrer" >
            <button className={`w-fit px-6 py-3 text-sm bg-blue-600 hover:bg-opacity-90 text-white shadow-lg font-semibold rounded-full transition-all`}>
                {buttonText}
            </button>
        </a>
    </motion.div>
);

const Membership = () => {
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

    const [isVerified, setIsVerified] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState('right');

    const handleCaptcha = (value) => {
        setIsVerified(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!isVerified) {
            alert("Please verify that you are not a robot!");
            return;
        }
        alert("Form submitted successfully!");
    };

    // For modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
    });

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Handle form submission
    const handleModalSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted', formData);
        // Close modal after form submission
        setIsModalOpen(false);
    };

    // Open modal
    const openModal = () => {
        setIsModalOpen(true);
    };

    // Close modal
    const closeModal = () => {
        setIsModalOpen(false);
    };
    return (
        <div>
            {/* Hero Section */}
            <div className="relative w-full h-screen overflow-hidden">
                <video autoPlay muted loop playsInline className="absolute top-0 left-0 w-full h-full object-cover z-10" style={{ pointerEvents: "none" }}>
                    <source src={Vid} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                <div className="absolute top-0 left-0 w-full h-full bg-blue-900 bg-opacity-50 z-20 pointer-events-none"></div>
                <div className="absolute xl:w-2/3 inset-0 flex flex-col items-start lg:px-48 md:px-32 px-12 justify-center text-left text-white z-30">
                    <h1 className="text-3xl md:text-6xl font-medium mb-4">Membership</h1>
                    <p className="text-base font-normal md:text-xl mb-6">
                        Whether you are a Snowflake, Snowbird, Full Time Resident or a Water Warrior, we have the right membership for you. Members book half day, full day or multi-day outings using their Mariner Points associated with their membership level.
                    </p>
                    <button onClick={openModal} className="px-6 py-3 text-sm bg-midnightblue hover:bg-midnightblue text-white  rounded-full">Download Membership Brochure</button>
                </div>
                {/* Modal */}
                <AnimatePresence>
                    {isModalOpen && (
                        <div
                            initial={{ opacity: 0, }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, }}
                            transition={{ duration: 0.3 }}
                            className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50"
                        >
                            <div
                                initial={{ y: -100 }}
                                animate={{ y: 0 }}
                                exit={{ y: 100 }}
                                transition={{ duration: 0.3 }}
                                className="bg-white p-8 rounded-lg w-96"
                            >
                                <h2 className="text-2xl font-semibold text-midnightblue mb-4">
                                    Fill Out the Form
                                </h2>
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-4">
                                        <label
                                            htmlFor="name"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Name
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            required
                                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>

                                    <div className="mb-4">
                                        <label
                                            htmlFor="phone"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Phone
                                        </label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            required
                                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>

                                    <div className="mb-4">
                                        <label
                                            htmlFor="email"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            required
                                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>

                                    <div className="flex justify-between">
                                        <button
                                            type="button"
                                            onClick={closeModal}
                                            className="bg-gray-300 text-gray-800 px-4 py-2 rounded-full"
                                        >
                                            Close
                                        </button>
                                        <button
                                            type="submit"
                                            className="bg-midnightblue text-white px-4 py-2 rounded-full"
                                        >
                                            Submit
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}
                </AnimatePresence>
            </div>

            {/* Membership Levels Section */}
            <MembershipLevels />

            {/* Testimonials Section with Motion */}
            <TestimonialsSection />
        </div>
    );
};

export default Membership;

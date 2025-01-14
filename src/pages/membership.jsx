import React, { useState, useEffect } from 'react';
import Vid from '../assets/videos/home.mp4';
import { FaRegCheckCircle } from "react-icons/fa";
import ReCAPTCHA from 'react-google-recaptcha';
import { home5 } from '../assets/images';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import MembershipLevels from '../components/MembershipLevels';
import TestimonialsSection from '../components/TestimonialsSection';
import Modal from '../components/Modal';

// Motion variants for smooth animations
const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

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
                {isModalOpen && <Modal isModalOpen={true} closeModal={closeModal}/>}
            </div>

            {/* Membership Levels Section */}
            <MembershipLevels />

            {/* Membership Details Section */}
            <div className='py-20 flex flex-col px-10 md:px-24 space-y-12'>
                <p className='text-midnightblue text-4xl text-center font-medium spacy-8'>Membership Details</p>

                {/* Open Reservations */}
                <div className='flex flex-col space-y-5'>
                    <p className='text-midnightblue text-2xl'>Open Reservations</p>
                    <p>
                        All members have access to the full fleet of vessels. An “outing” is a half day and vessels are available for 2 outings per day. Outing times vary throughout the year based on sunrise and sunset. Refer to the booking calendar for specific details. Days are split evenly from 8:30am through an hour after sunset. The entire outing window will be reserved for the member to use as they wish. Fourteen total outings per week are available per vessel. Each member has Mariner Points assigned in order to book their outings. Mariner points vary by membership tier. Each vessel requires a specific number of Mariner Points to book an outing. Mariner Points have different values based on peak and off peak seasons as well as weekday and weekend outings.
                    </p>
                    <p>
                        Each member is allowed to have the number of open reservations in the system according to their membership tier. Last-minute bookings do not count toward open reservation counts. Last-minute bookings are available to members 24 hours in advance of the open outing.
                    </p>
                </div>

                {/* Vessel Availability */}
                <div className='flex flex-col space-y-5'>
                    <p className='text-midnightblue text-2xl'>Vessel Availability</p>
                    <p>
                        We strive to assure availability of vessels to our membership. As we continue to grow and add members, while there are always varying demand periods within seasons, the combined amount of
                        all possible reservations from active members is targeted to not exceed 80% of the outing availability during peak season. We want you to enjoy your membership and the variety of vessels you
                        have available to you.
                    </p>
                </div>

                {/* Date and Time Terms */}
                <div className='flex flex-col space-y-5'>
                    <p className='text-midnightblue text-2xl'>Date and Time Terms</p>
                    <p>
                        These are the specifics that qualify outings as weekday/weekend, morning/evening, and in/off-season.
                    </p>
                    <div className='flex flex-col'>
                        <p><span className='font-bold'>Weekday Outing:</span> Monday morning through Friday morning</p>
                        <p><span className='font-bold'>Weekend Outing:</span> Friday afternoon through Sunday afternoon</p>
                    </div>
                    <div className='flex flex-col'>
                        <p><span className='font-bold'>Morning Outing:</span> 8:30am until Mid-Day; varies by calendar</p>
                        <p><span className='font-bold'>Afternoon/sunset Outing:</span> Mid-Day to 1 Hour After Sunset; varies by calendar afternoon</p>
                    </div>
                    <div className='flex flex-col'>
                        <p><span className='font-bold'>In-Season</span> November 1 - April 30</p>
                        <p><span className='font-bold'>Off-Season</span>May 1 - October 30</p>
                    </div>
                    <p>Bonus off-season reservations are valid on company owned or leased vessels only.</p>
                </div>

                {/* Included in Dues */}
                <div className='flex flex-col space-y-5'>
                    <p className='text-midnightblue text-2xl'>Included in Dues</p>
                    <p>
                        With your membership, you have access to all vessels, insurance, fuel for coastal cruising (coastal cruising is an industry standard speed of 10mph), USCG Certified Captain, First Mate on
                        yachts/catamarans and all included recreational equipment.
                    </p>
                    <p>
                        <span className='font-bold'>Amenities:</span> Vessels are outfitted with refrigerators, ice-in coolers, water, soft drinks, light snacks, towels, sunscreen, Bluetooth stereos, and power cords for charging electronics. Upon request, captains will provide snorkel equipment, paddle boards, large noodles, and BOTE hangout floats. Tubing is available on certain vessels. Optionally, we have partnered with third parties for members to enjoy jet skis, e-foils, sea bobs, and other accessories.
                    </p>
                    <p>
                        <span className='font-bold'>Provisions:</span> For many members, the joy of boating includes enjoying wonderful food and beverages while cruising the waters. We have a curated list of culinary choices and a full minibar including beer, wine, high noons, champagne, and various spirits. We also offer unique items such as flowers, chefs, and musicians on various vessels for special occasions.
                    </p>
                    <p>
                        <span className='font-bold'>Member Services (coming soon):</span> Its easy to manage your membership on our website. Simply select your time, add your amenities and book it. It is that simple. In addition, members can call or text the KYC Member Services team for assistance with booking trips, building itineraries, booking dining reservations, catering or any other special requests. The day before each outing, Captains reach out to introduce themselves, discuss itinerary details, confirm pick-up location and discuss your timing.
                    </p>
                    <p>
                        <span className='font-bold'>Multi-Day Cruising:</span> The Club’s yachts including the Memory Maker and Memories, Not Dreams power catamarans and Wanderlust, the 4 bedroom sailing catamaran. These vessels allow amazing overnight experiences in addition to daytime cruises. Memberships include weekday multi-day excursions in their membership. In addition, all memberships are allowed to take
                        advantage of the multi-day excursions based on the daily rate and availability. Enjoy 2–7 day excursions along Florida’s Gulf Coast. Explore destinations including St. Pete, Tampa, Boca Grande,
                        Captiva and Sanibel Islands, Fort Myers Beach, Naples, Marco Island and the Keys.
                    </p>
                    <p>
                        <span className='font-bold'>Fishing:</span> We have a great network of experienced fishing charters that we can coordinate for you, from inland fishing to offshore gulf fishing.
                    </p>
                </div>

                {/* Not Included in Dues */}
                <div className='flex flex-col space-y-5'>
                    <p className='text-midnightblue text-2xl'> Not Included in Dues</p>
                    <p>
                        <span className='font-bold'>Standard Outing Fee:</span> A fee of $85 per outing. This fee covers the above amenities, cleaning, and incidentals (provisions, fuel, crew gratuities, third party water toys, and optional additional staff such as mates, stewards, chefs, musicians, etc.)
                    </p>
                    <p>
                        <span className='font-bold'>Overnight Excursion Incidentals:</span> Labor surcharge of $350 per day, dockage fees for remote ports, hotel for staff if needed.
                    </p>
                </div>
            </div>

            {/* Testimonials Section with Motion */}
            <TestimonialsSection />
        </div>
    );
};

export default Membership;

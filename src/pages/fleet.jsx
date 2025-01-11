import React, { useState } from 'react';
import Vid from '../assets/videos/home.mp4';
import ImageCarousel from '../components/ImageCarousel';
import { memory_maker, MM1, MM2, MM3, CY1, CY2, CY3, club_yacht, giddy_up, GU1, GU2, GU3, home4, GU5, home7, wl2, wl3, wl4, wl5, wl6, wl7, TS1, TS2, home5, home2, L1, L2, L3, home3, home6, home8 } from '../assets/images';
import { FaRegCheckCircle } from "react-icons/fa";
import ReCAPTCHA from 'react-google-recaptcha';

const fleetData = [
    {
        title: '50\' Memory Maker',
        points: '200-234 Mariner Points',
        description: 'Our 50\' Three Bedroom, Three Story Power Catamaran perfect for half days, full days and multi-day excursions. Experience unmatched elegance with three stories of luxury, four spacious entertaining areas, and state-of-the-art amenities. Memory Maker has 3 bedrooms with ensuite bathrooms, an office, full galley and family room. Ideal for full day and half day dayboating plus amazing overnight and multi-day journeys.',
        images: [memory_maker, MM1, MM2, MM3],
        buttonText: 'Become a Member to Book',
        reverse: false,
    },
    {
        title: '50\' Club Yacht',
        points: '200-234 Mariner Points',
        description: 'Exclusive to Kokomo Yacht Club, our very own custom built luxury day yacht. Designed to maximize your perfect day on the water. There is nothing like it on the water! The entire vessel opens to the outdoors and provides free flowing indoor/outdoor space. The entire vessel can also or be closed with full air conditioning. The spacious front bow provides a sundeck and couch seating plus outdoor air conditioning. Plenty of conversation spaces in the bow, cockpit and cabin. Next to the helm, the lower level also features an air conditioned lounge with television, full galley and full size bathroom.',
        images: [CY1, CY2, CY3, club_yacht],
        buttonText: 'Become a Member to Book',
        reverse: true,
    },
    {
        title: '47\' Giddy Up',
        points: '175-207 Mariner Points',
        description: 'Welcome to our amazing Cruisers Yachts GLS 42. With dual beach doors, large U-shaped main seating, galley with a raised wet bar, and a spacious open bow, the entertainment possibilities are endless. The lower cabin features an aft stateroom and U-shaped dinette that converts into a berth. A full galley and standing head with shower complete this remarkable yacht.',
        images: [giddy_up, GU1, GU2, GU3, home4, GU5],
        buttonText: 'Become a Member to Book',
        reverse: false,
    },
    {
        title: '42\' Wanderlust',
        points: '163-189 Mariner Points',
        description: 'She is the nicest sailing vessel in the market. Unlike traditional sailing catamarans the Bali 4.2 has a front bow that is completely solid with tons of room for seating and enjoying the day. The entire stern of the vessel opens to create a wide open flow from cabin to the cockpit. She is great for both sailing adventures as well as non sailing day boating. She is perfect for overnight and multi-night excursions with her 4 bedrooms, 4 full baths and crew quarters.',
        images: [home7, wl2, wl3, wl4, wl5, wl6, wl7],
        buttonText: 'Become a Member to Book',
        reverse: true,
    },
    {
        title: '38\' Top Shelf',
        points: '131-144 Mariner Points',
        description: 'Our 38\' Open Bow Day Boat for up to 13 guests. Perfect for day trips to restaurants, sandbars or simply cruising, this open bow day boat offers ultimate comfort with spacious seating, cushioned flooring throughout, mahogany tables, shade for the entire boat, full bathroom, an advanced stereo system, water toys and twin 350’s for plenty of “Get Up and Go”.',
        images: [home5, TS1, TS2],
        buttonText: 'Become a Member to Book',
        reverse: false,
    },
    {
        title: '29\' The Life',
        points: '115-125 Mariner Points',
        description: 'Ideal for small gatherings up to 6 people, this spectacular 29\' open bow day boat provides luxurious appointments, a marine head and an amazing stereo system. Captain Jeff, who grew up on the waters of Sarasota Bay, always provides a memorable day on the water.',
        images: [L1, home2, L2, L3],
        buttonText: 'Become a Member to Book',
        reverse: true,
    }
];

const FleetSection = ({ title, points, description, images, buttonText, reverse }) => (
    <div className={`flex flex-col ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'} w-full xl:px-32 p-8 gap-8`}>
        <div className='w-full md:w-1/2'>
            <ImageCarousel images={images} />
        </div>

        <div className="flex flex-col w-full md:w-1/2 space-y-6">
            <h2 className="font-normal text-midnightblue text-3xl md:text-4xl xl:text-6xl lg:text-5xl">{title}</h2>

            <div className='flex items-center'>
                <div className='w-2 h-6 rounded-full mr-2 bg-blue-500'></div>
                <p className="font-veryLight">{points}</p>
            </div>

            <p className='font-medium'>{description}</p>

            <button className="w-fit px-6 py-3 text-sm bg-midnightblue hover:bg-opacity-90 text-white font-semibold rounded-full transition-all">
                {buttonText}
            </button>
        </div>
    </div>
);

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

const MembershipTier = ({ title, description, points, benefits, bgColor, textColor, borderColor, buttonText }) => (
    <div className={`px-4 md:h-[600px] w-full flex flex-col items-center ${bgColor} rounded-lg space-y-4 py-4`}>
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
        <button className={`w-fit px-6 py-3 text-sm bg-blue-600 hover:bg-opacity-90 text-white font-semibold rounded-full transition-all`}>
            {buttonText}
        </button>
    </div>
);


const Fleet = () => {
    const [isVerified, setIsVerified] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState('right');

    const handleCaptcha = (value) => {
        console.log("Captcha value:", value);
        setIsVerified(true); // Enable form submission on successful verification
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!isVerified) {
            alert("Please verify that you are not a robot!");
            return;
        }
        alert("Form submitted successfully!");
    };

    const handleDotClick = (index) => {
        setDirection(index > currentIndex ? 'right' : 'left');
        setCurrentIndex(index);
    };
    const testimonials = [
        {
            name: 'Brian M',
            msg: `Kokomo Yacht Club is hands down the premier luxury Yacht Club for the Sarasota, Tampa/St Pete area. The fleet provides for any experience you want to have on the water.  KYC makes the boating experience so easy and the yachts are always in tip top shape.  If you want a boat and don't want to maintain one.  This is the place to be.`
        },
        {
            name: 'Cynthia M',
            msg: 'Boating life made easy and enjoyable! Kokomo Yacht Club provides top of the line boats, captains, and crew. All you need to do is to show up and enjoy the sandbars, waterfront dining, sunsets, and so much more.'
        },
        {
            name: 'Ned & Sue',
            msg: `We spent quite a lot of time researching boat clubs before deciding on yours earlier this summer and we could not be happier. The service and professionalism of the entire staff has been exemplary.  We have now had our fourth cruise and each and every captain has not only been professional, but they have greatly added to the experience by explaining to all of our guests what we are seeing, acting almost as tour guides which is way above and beyond. We hope to be with you for many years to come! Thank you for the excellent experiences.`
        }
    ]
    const fleetImages = [
        { name: "Memory Maker", img: home3 },
        { name: "Giddy Up", img: home4 },
        { name: "Top Shelf", img: home5 },
        { name: "Club Yacht", img: home6 },
        { name: "Wanderlust", img: home7 },
        { name: "The Life", img: home8 },
    ];
    return (
        <div className='lg:space-y-32 md:space-y-28 space-y-16 overflow-x-hidden'>
            {/* Hero Section */}
            <div className="relative w-full h-screen overflow-hidden">
                <video autoPlay muted loop playsInline className="absolute top-0 left-0 w-full h-full object-cover">
                    <source src={Vid} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>

                <div className="absolute xl:w-2/3 inset-0 flex flex-col items-start lg:px-48 md:px-32 px-12 justify-center text-left text-white">
                    <h1 className="text-2xl md:text-6xl font-extralight mb-4">Vessels</h1>
                    <p className="text-sm font-extralight md:text-lg mb-6">
                        Take a look at the stunning boats we have available for our members to book. As membership grows, we continue to add new vessels to ensure our members have ample opportunities and options for booking.
                    </p>
                    <button className="px-6 py-3 bg-midnightblue text-white font-light rounded-full">
                        Become a Member
                    </button>
                </div>
            </div>

            {/* Fleet Sections */}
            {fleetData.map((fleetItem, index) => (
                <FleetSection key={index} {...fleetItem} />
            ))}

            {/* Membership Details Section */}
            <div className='bg-gray-100 space-y-4 py-10'>
                <p className='text-midnightblue text-3xl text-center'>Membership Levels</p>
                <p className='text-center px-6'>
                    Membership has its privileges. The higher the tier, the higher the privileges. Membership components consist of Mariner Points, the number of open reservations allowed in the system and the flexibility of booking outings on weekdays, weekends and multi days. All Yachting Memberships begin with one-time capital contribution then simply choose which membership suits you best. Membership is an annual commitment, paid annually or quarterly.
                </p>

                {/* Dynamically Render Membership Tiers */}
                <div className='w-full px-2 flex flex-col justify-center items-center md:flex-row md:space-x-4'>
                    {membershipData.map((tier, index) => (
                        <MembershipTier key={index} {...tier} />
                    ))}
                </div>

                <div className='text-center px-6'>
                    <p>
                        See detailed membership overview for specific terms and conditions regarding rules by membership tier. Higher tiers have greater flexibility. Reservations may have restrictions based on day of week, time of year and number of open reservations. Vessel, staff, fuel for coastal cruising, water toys, insurance and core provisioning included in membership. Additional provisioning of catering and adult beverages, $85 booking fee, excess fuel and optional staff gratuity not included. Kokomo Yacht Club is a private luxury boat membership club. All potential members must be approved for membership by Kokomo Yacht Club.
                    </p>
                </div>
            </div>

            {/* Testimonials */}
            <div className='flex flex-col md:flex-row px-8 py-20 gap-4 items-start'>
                <div className='flex flex-col md:w-1/2 gap-4 py-8 px-5'>
                    <p className='text-midnightblue text-4xl md:text-5xl md:w-full w-2/3'>Testimonials & Reviews</p>
                    <p className='text-gray-500 text-sm md:text-lg'>See what our members have to say about Kokomo Yacht Club!</p>
                </div>
                <div className="flex flex-col items-center w-full md:w-1/2">
                    {/* Fixed height container */}
                    <div className="h-[580px] md:h-[400px] lg:h-[250px] w-full max-w-3xl relative overflow-hidden">
                        {/* Sliding testimonial */}
                        <div
                            key={currentIndex}
                            className={`absolute w-full transform transition-all duration-500 ease-in-out ${direction === 'right'
                                ? 'translate-x-0 animate-slideFromRight'
                                : 'translate-x-0 animate-slideFromLeft'
                                }`}
                        >
                            <div className="flex flex-col shadow-lg rounded-lg mx-4 md:mx-0 h-full">
                                <div className="px-8 py-6 text-gray-500 bg-red-50 rounded-t-lg flex-grow">
                                    <p>{testimonials[currentIndex].msg}</p>
                                </div>
                                <p className="text-midnightblue font-semibold px-5 py-2">
                                    {testimonials[currentIndex].name}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Navigation Dots */}
                    <div className="flex space-x-2 mt-6">
                        {testimonials.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => handleDotClick(index)}
                                className={`w-3 h-3 rounded-full transition-colors duration-300 ${currentIndex === index ? 'bg-midnightblue' : 'bg-gray-300'
                                    }`}
                                aria-label={`Go to testimonial ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Form Section */}
            <div className='flex flex-col xl:flex-row'>
                <div className='relative xl:h-screen inset-0 bg-cover bg-center xl:w-1/2'>
                    <img src={home5} alt="" className='h-full w-full object-cover' />
                    <div className="absolute inset-0 bg-midnightblue bg-opacity-30"></div>
                </div>
                <div className='xl:w-1/2 flex flex-col items-start py-10 px-8 gap-4 bg-midnightblue text-white'>
                    <p className='text-3xl md:text-4xl'>Contact Us</p>
                    <hr className="border-t-2 z-10 border-white" />
                    {/* Form */}
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-x-4 w-full'>
                        <div className='flex flex-col py-2'>
                            <label htmlFor="first_name">First Name</label>
                            <input type="text" className='rounded-md h-10 px-4 text-black focus:outline-none' placeholder='First Name' />
                        </div>
                        <div className='flex flex-col py-2'>
                            <label htmlFor="last_name">Last Name</label>
                            <input type="text" className='rounded-md h-10 px-4 text-black focus:outline-none' placeholder='Last Name' />
                        </div>
                        <div className='flex flex-col py-2'>
                            <label htmlFor="phone">Phone</label>
                            <input type="number" className='rounded-md h-10 px-4 text-black focus:outline-none' placeholder='Phone' />
                        </div>
                        <div className='flex flex-col py-2'>
                            <label htmlFor="email">Email</label>
                            <input type="email" className='rounded-md h-10 px-4 text-black focus:outline-none' placeholder='Email' />
                        </div>
                    </div>
                    <div className='flex flex-col w-full'>
                        <label htmlFor="message">Message</label>
                        <input type="text" className='rounded-md h-20 px-4 text-black focus:outline-none' placeholder='Message' />
                    </div>
                    <ReCAPTCHA
                        sitekey="YOUR_SITE_KEY" // Replace with your Google reCAPTCHA site key
                        onChange={handleCaptcha}
                    />
                    <button className='px-2 py-2 w-full rounded-full bg-blue-600'>send</button>
                </div>
            </div>
        </div>
    );
};

export default Fleet;
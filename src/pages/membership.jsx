import React, { useState } from 'react';
import Vid from '../assets/videos/home.mp4';
import { FaRegCheckCircle } from "react-icons/fa";
import ReCAPTCHA from 'react-google-recaptcha';
import { home5 } from '../assets/images';

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

const membership = () => {
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
    return (
        <div>
            {/* Hero Section */}
            <div className="relative w-full h-screen overflow-hidden">
                <video autoPlay muted loop playsInline className="absolute top-0 left-0 w-full h-full object-cover">
                    <source src={Vid} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>

                <div className="absolute xl:w-2/3 inset-0 flex flex-col items-start lg:px-48 md:px-32 px-12 justify-center text-left text-white">
                    <h1 className="text-2xl md:text-6xl font-extralight mb-4">Membership</h1>
                    <p className="text-sm font-extralight md:text-lg mb-6">
                        Whether you are a Snowflake, Snowbird, Full Time Resident or a Water
                        Warrior, we have the right membership for you. Members book half day, full
                        day or multi-day outings using their Mariner Points associated with their
                        membership level.
                    </p>
                    <button className="px-6 py-3 bg-midnightblue text-white font-light rounded-full">
                        Become a Membership
                    </button>
                </div>
            </div>

            {/* Membership Levels Section */}
            <div className='bg-gray-100 space-y-4 py-20'>
                <p className='text-midnightblue text-4xl pl-10 text-left'>Membership Levels</p>
                <p className='text-left px-10'>
                    Membership has its privileges. The higher the tier, the higher the privileges. Membership components consist of Mariner Points, the number of open reservations allowed in the system and the flexibility of booking outings on weekdays, weekends and multi days. All Yachting Memberships begin with one-time capital contribution then simply choose which membership suits you best. Membership is an annual commitment, paid annually or quarterly.
                </p>

                {/* Dynamically Render Membership Tiers */}
                <div className='w-full px-2 flex flex-col justify-center items-center md:flex-row md:space-x-4'>
                    {membershipData.map((tier, index) => (
                        <MembershipTier key={index} {...tier} />
                    ))}
                </div>

                <div className='text-left px-10'>
                    <p>
                        See detailed membership overview for specific terms and conditions regarding rules by membership tier. Higher tiers have greater flexibility. Reservations may have restrictions based on day of week, time of year and number of open reservations. Vessel, staff, fuel for coastal cruising, water toys, insurance and core provisioning included in membership. Additional provisioning of catering and adult beverages, $85 booking fee, excess fuel and optional staff gratuity not included. Kokomo Yacht Club is a private luxury boat membership club. All potential members must be approved for membership by Kokomo Yacht Club.
                    </p>
                </div>
            </div>

            {/* Membership Details Section */}
            <div className='py-20 flex flex-col px-10 md:px-24 space-y-12'>
                <p className='text-midnightblue text-4xl text-left spacy-8'>Membership Details</p>

                {/* Open Reservations */}
                <div className='flex flex-col space-y-5'>
                    <p className='text-midnightblue text-2xl'>Open Reservations</p>
                    <p>All members have access to the full fleet of vessels. An “outing” is a half day and vessels are available for 2 outings per day.  Outing times vary throughout the year based on sunrise and sunset. Refer to the booking calendar for specific details. Days are split evenly from 8:30am through an hour after sunset. The entire outing window will be reserved for the member to use as they wish. Fourteen total outings per week are available per vessel. Each member has Mariner Points assigned in order to book their outings. Mariner points vary by membership tier. Each vessel requires a specific number of Mariner Points to book an outing.  Mariner Points have different values based on peak and off peak seasons as well as weekday and weekend outings.
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

            {/* Testimonials Section */}
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
            <div className='flex flex-col py-20 xl:flex-row'>
                <div className='relative xl:h-screen inset-0 bg-cover bg-center xl:w-1/2'>
                    <img src={home5} alt="" className='h-full w-full object-cover' />
                    <div className="absolute inset-0 bg-midnightblue bg-opacity-30"></div>
                </div>
                <div className='xl:w-1/2 flex flex-col items-start py-20 px-8 gap-4 bg-midnightblue text-white'>
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

            {/* Included in Dues */}
            <div className='flex flex-col py-20 xl:flex-row'>

            </div>
        </div>
    )
}

export default membership
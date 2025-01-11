import React, { useState } from 'react';
import Vid from '../assets/videos/home.mp4';
import { div } from 'framer-motion/client';
import { home1, home2, home3, home4, home5, home6, home7, home8, home9 } from '../assets/images';
import homeicon from '../assets/icons/homeicon.png';
import ReCAPTCHA from 'react-google-recaptcha';

const Home = () => {
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
        <div>
            {/* Hero Section */}
            <div className="relative w-full h-screen overflow-hidden">
                {/* Video Background */}
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="absolute top-0 left-0 w-full h-full object-cover"
                >
                    <source src={Vid} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>

                {/* Overlay Content */}
                <div className="xl:w-2/3 absolute inset-0 flex flex-col items-start lg:px-48 md:px-32 px-12 justify-center text-left text-white">
                    <h1 className="text-2xl md:text-6xl font-extralight mb-4">The Pure Joy of Luxury Boating Without the Hassle</h1>
                    <p className="text-sm font-extralight md:text-lg mb-6">Welcome to Sarasota’s luxury private boat club offering our members a
                        world class fleet of USCG captained vessels.</p>
                    <button className="px-6 py-3 bg-midnightblue hover:bg-midnightblue text-white font-light rounded-full">
                        Inquire About Membership
                    </button>
                </div>
            </div>

            {/* Info */}
            <div className="flex flex-col py-8 xl:h-[792px] lg:h-[600px] lg:px-20 px-4 md:flex-row">
                {/* Image Container */}
                <div className="relative flex justify-center items-center h-[300px] md:h-auto lg:h-auto xl:h-auto w-full md:w-1/2">
                    <img src={home1} alt="" className="xl:w-[500px] lg:w-[400px] md:w-[280px] w-[250px] lg:mr-10 relative" />
                    <img
                        src={home2}
                        alt=""
                        className="xl:w-[300px] lg:w-[250px] md:w-[200px] w-[180px] absolute right-[10%] md:right-[2%] lg:right-[2%] lg:bottom-[10%] bottom-[5%]"
                    />
                </div>

                {/* Text Section */}
                <div className="flex flex-col md:items-start items-center px-5 justify-center w-full md:w-1/2 text-center md:text-left space-y-4">
                    <p className="lightfont text-midnightblue text-3xl md:text-4xl lg:text-5xl">
                        The Best of All Worlds
                    </p>
                    <div className='flex justify-start'>
                        <div className='hidden md:block w-2 rounded-full mr-2 bg-blue-500'></div>
                        <p className="font-veryLight">
                            Don't own one boat when you can have access to a fleet of boats - for less money and absolutely no headaches!
                        </p>
                    </div>
                    <p className='font-medium'>
                        Our fleet ranges from runabouts and dayboats to yachts and sailing
                        catamarans. Our fleet is meticulously maintained, fully captained,
                        provisioned, and prepared for your adventure. Simply step aboard,
                        relax, and indulge in your day on the water—leave the captaining,
                        maintenance, repairs, and cleaning to our attentive staff.
                    </p>
                    <button className="px-6 py-3 text-sm bg-midnightblue hover:bg-midnightblue text-white font-light rounded-full">
                        Download Membership Brochure
                    </button>
                </div>
            </div>

            {/* Membership Benefits Section */}
            <div
                className="relative w-full bg-cover bg-center py-16"
                style={{
                    backgroundImage: `url(${home9})`
                }}
            >
                {/* Overlay */}
                <div className="absolute inset-0 bg-midnightblue bg-opacity-90"></div>

                {/* Content Container */}
                <div className="relative z-10 container mx-auto px-4 md:px-8 max-w-7xl">
                    {/* Section Header */}
                    <h1 className="text-white text-4xl md:text-5xl font-veryLight mb-12 text-center">
                        Benefits of Membership
                    </h1>

                    {/* Benefits Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-12">
                        {/* Benefit 1 */}
                        <div className="flex flex-col items-center space-y-2 p-4">
                            <img src={homeicon} alt="" className="w-16 h-16" />
                            <h3 className="text-white text-xl font-veryLight">Exclusive Access</h3>
                            <p className="text-gray-400 text-center max-w-sm">
                                Our extensive approval process limits member numbers, which maximizes your ability to book what you want, when you want.
                            </p>
                        </div>

                        {/* Benefit 2 */}
                        <div className="flex flex-col items-center space-y-2 p-4">
                            <img src={homeicon} alt="" className="w-16 h-16" />
                            <h3 className="text-white text-xl font-veryLight">Best In Class Fleet</h3>
                            <p className="text-gray-400 text-center max-w-sm">
                                Optimize every experience on the water. Have full access to our constantly expanding fleet, including the custom Club Yachts, designed and built for KYC.
                            </p>
                        </div>

                        {/* Benefit 3 */}
                        <div className="flex flex-col items-center space-y-2 p-4">
                            <img src={homeicon} alt="" className="w-16 h-16" />
                            <h3 className="text-white text-xl font-veryLight">5 Star Staff</h3>
                            <p className="text-gray-400 text-center max-w-sm">
                                Our Captains and mates are the best in the business to provide a worry-free day on the water.
                            </p>
                        </div>

                        {/* Benefit 4 */}
                        <div className="flex flex-col items-center space-y-2 p-4">
                            <img src={homeicon} alt="" className="w-16 h-16" />
                            <h3 className="text-white text-xl font-veryLight">Flexible Memberships</h3>
                            <p className="text-gray-400 text-center max-w-sm">
                                Kokomo Yacht Club offers multiple tiers of membership, allowing you to choose a membership level that best suits your lifestyle.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Fleet Section */}
            <div className='px-4 py-20'>
                <p className='font-veryLight text-midnightblue md:text-left lg:px-20 text-center md:text-5xl text-4xl'>
                    Featured From Our Fleet
                </p>
                {/* Dynamically Display Images */}
                <div className=' grid grid-cols-1 md:grid-cols-3 lg:grid-cols-2 lg:px-20 gap-6 mt-6'>
                    {fleetImages.map((fleet, index) => (
                        <div
                            key={index}
                            className='flex flex-col shadow-lg rounded-lg'>
                            {/* Image */}
                            <img
                                src={fleet.img}
                                alt={fleet.name}
                                className='rounded-t-lg'
                            />
                            {/* Details */}
                            <div className='flex flex-col items-start pl-6 md:items-start md:px-6 justify-between bg-gray-100 py-6 gap-4'>
                                <p className='font-veryLight text-xl md:text-2xl lg:text-3xl text-midnightblue'>{fleet.name}</p>
                                <button className="px-4 py-2 bg-midnightblue hover:bg-midnightblue text-white font-light rounded-full text-sm">
                                    View Vessel
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Text section */}
            <div className='flex flex-col px-6 lg:px-20 relative w-full bg-cover bg-center py-16 lg:h-[600px] justify-center'
                style={{
                    backgroundImage: `url(${home6})`
                }}>
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-midnightblue to-transparent bg-opacity-90"></div>
                <div className='z-10 flex flex-col text-white items-start gap-4 md:w-1/2 lg:w-1/3'>
                    <p className=' text-3xl lg:text-6xl '>Experience Freedom</p>
                    <p className='text-sm lg:text-lg font-veryLight'>Love boating again! Gone are the days of spending hours
                        opening and closing your boat and managing all the
                        maintenance and unexpected costs. View our membership
                        options and get in touch to get started.
                    </p>
                    <button className='px-4 py-2 bg-blue-600 rounded-full'>View Memberships</button>
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

export default Home;

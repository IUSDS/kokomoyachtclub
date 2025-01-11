import React,{ useState } from 'react';
import { founderImg, foundersKokomo, home3, home4,home5,home6,home7,home8 } from '../assets/images';
import ReCAPTCHA from 'react-google-recaptcha';

const Founders = () => {
    const [isVerified, setIsVerified] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState('right');

    const handleCaptcha = (value) => {
        console.log("Captcha value:", value);
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
        <div className='space-y-20 md:space-y-28'>
            {/* Hero Section */}
            <div
                className="relative w-full bg-cover bg-center py-16"
                style={{
                    backgroundImage: `url(${founderImg})`
                }}
            >
                {/* Overlay with more opacity */}
                <div className="absolute inset-0 bg-gradient-to-r from-midnightblue to-transparent"></div>
                <div className='z-10 px-6 md:px-20'>
                    <p className='text-6xl text-white text-center md:text-left drop-shadow-md'>
                        From the Founders
                    </p>
                </div>
            </div>

            {/* Content section */}
            <div className='flex flex-col'>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-center px-6">
                    <div className="flex justify-center md:justify-end">
                        <img src={foundersKokomo} className="w-full max-w-[500px] rounded-lg" alt="Founders" />
                    </div>
                    <div className="flex flex-col space-y-4 text-left xl:w-2/3">
                        <p className="text-base leading-relaxed text-gray-700">
                            We’re Brian and Peggy, newcomers to Florida’s Gulf Coast, nestled in the vibrant Sarasota area. After two decades enjoying lakeside boating, our move to Sarasota introduced us to the unparalleled beauty of the Gulf of Mexico. Our inaugural evening in Sarasota Bay aboard our first boat, Top Shelf, treated us to the awe-inspiring “World Famous Siesta Key Sunset” from Big Sarasota Pass—a moment that truly took our breath away. Since then, we’ve created countless memories with loved ones, exploring from St. Pete to Venice, lounging in the water at sandbars, enjoying the many bars and restaurants on the water, and cruising the scenic coasts of Sarasota, Bird Key, Siesta Key, and beyond. Whether it’s savoring sunsets or encountering dolphins and manatees, every outing holds new and unforgettable adventures.
                        </p>
                        <p className="text-base leading-relaxed text-gray-700">
                            Our passion for local waters led us to expand our fleet with “Memory Maker,” a 50′ three-bedroom power catamaran. This addition has allowed us to embark on overnight and multi-day journeys to Tampa, Boca Grande, Naples, and beyond, with plans to explore the Keys this year!
                        </p>
                        <p className="text-base leading-relaxed text-gray-700">
                            Eager to share our love for boating without the headaches of ownership or stress of captaining, we founded Kokomo Yacht Club.
                        </p>
                    </div>
                </div>
                <div className='flex flex-col space-y-4 text-left px-6 xl:px-28 xl:pt-4' >
                    <p className='text-base leading-relaxed text-gray-700'>
                        As a member, you enjoy access to our impressive growing fleet of meticulously maintained vessels— ranging from sleek runabouts and luxury day boats to spacious
                        yachts and a sailing catamaran — all fully crewed and provisioned for a stress-free day on the water. Our handpicked captains and crew ensure a seamless experience,
                        complemented by an exquisite catering menu and premium beverages. Plus, our new docks offer access to resort amenities, including a pool, full bar, and bicycles for
                        exploring downtown Sarasota.
                    </p>
                    <p className='text-base leading-relaxed text-gray-700'>
                        Come join us at Kokomo Yacht Club and discover the epitome of luxury boating. Let us handle the details while you immerse yourself in the pure joy of being on the
                        water creating memories that will last a lifetime.
                    </p>
                </div>
            </div>

            {/* Testimonials */}
            <div className='flex flex-col md:flex-row px-8 gap-4 items-start'>
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
}

export default Founders;

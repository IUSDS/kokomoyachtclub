import React, { useState, useEffect } from 'react';
import { founderImg, foundersKokomo, home3, home4, home5, home6, home7, home8 } from '../assets/images';
import ReCAPTCHA from 'react-google-recaptcha';
import ScrollReveal from 'scrollreveal';
import { useLocation } from 'react-router-dom';
import TestimonialsSection from '../components/TestimonialsSection';
import ContactForm from '../components/ContactForm';

const Founders = () => {
    const [isVerified, setIsVerified] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState('right');
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
        // Initialize ScrollReveal
        const sr = ScrollReveal({
            opacity: 0,
            duration: 1000,
            distance: '0px',
            scale: 1,
            easing: 'ease-in-out',
            reset: false
        });

        // Apply animations to different sections
        sr.reveal('.fade-in', {
            interval: 200
        });

        // Clean up
        return () => sr.destroy();
    }, []);

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

    return (
        <div className='space-y-16'>
            {/* Hero Section */}
            <div
                className="fade-in relative w-full bg-cover bg-center py-16"
                style={{
                    backgroundImage: `url(${founderImg})`
                }}
            >
                <div className="absolute inset-0 bg-gradient-to-r from-midnightblue to-transparent"></div>
                <div className='z-10 px-6 md:px-20'>
                    <p className='text-3xl md:text-5xl text-white text-center md:text-left drop-shadow-md'>
                        From the Founders
                    </p>
                </div>
            </div>

            {/* Content section */}
            <div className='flex flex-col px-6 md:px-12'>
                <div className="flex flex-col md:flex-row gap-8 justify-center">
                    <div className="fade-in flex xl:w-1/3 md:w-1/2 items-center justify-center">
                        <img src={foundersKokomo} className="w-full md:h-[400px] max-w-[500px] rounded-lg" alt="Founders" />
                    </div>
                    <div className="flex xl:w-2/3 md:w-1/2 flex-col space-y-4 text-left">
                        <p className="fade-in text-base leading-relaxed text-gray-700">
                            We're Brian and Peggy, newcomers to Florida's Gulf Coast, nestled in the vibrant Sarasota area. After two decades enjoying lakeside boating, our move to Sarasota introduced us to the unparalleled beauty of the Gulf of America. Our inaugural evening in Sarasota Bay aboard our first boat, Top Shelf, treated us to the awe-inspiring "World Famous Siesta Key Sunset" from Big Sarasota Pass—a moment that truly took our breath away. Since then, we've created countless memories with loved ones, exploring from St. Pete to Venice, lounging in the water at sandbars, enjoying the many bars and restaurants on the water, and cruising the scenic coasts of Sarasota, Bird Key, Siesta Key, and beyond. Whether it's savoring sunsets or encountering dolphins and manatees, every outing holds new and unforgettable adventures.
                        </p>
                        <p className="fade-in text-base leading-relaxed text-gray-700">
                            Our passion for local waters led us to expand our fleet with "Memory Maker," a 50′ three-bedroom power catamaran. This addition has allowed us to embark on overnight and multi-day journeys to Tampa, Boca Grande, Naples, and beyond, with plans to explore the Keys this year!
                        </p>
                        <p className="fade-in text-base leading-relaxed text-gray-700">
                            Eager to share our love for boating without the headaches of ownership or stress of captaining, we founded Kokomo Yacht Club.
                        </p>
                    </div>
                </div>
                <div className='flex flex-col space-y-4 text-left xl:pt-4'>
                    <p className='fade-in text-base leading-relaxed text-gray-700'>
                        As a member, you enjoy access to our impressive growing fleet of meticulously maintained vessels— ranging from sleek runabouts and luxury day boats to spacious
                        yachts and a sailing catamaran — all fully crewed and provisioned for a stress-free day on the water. Our handpicked captains and crew ensure a seamless experience,
                        complemented by an exquisite catering menu and premium beverages. Plus, our new docks offer access to resort amenities, including a pool, full bar, and bicycles for
                        exploring downtown Sarasota.
                    </p>
                    <p className='fade-in text-base leading-relaxed text-gray-700'>
                        Come join us at Kokomo Yacht Club and discover the epitome of luxury boating. Let us handle the details while you immerse yourself in the pure joy of being on the
                        water creating memories that will last a lifetime.
                    </p>
                </div>
            </div>

            {/* Testimonials */}
            <TestimonialsSection />

            {/* Form Section */}
            <ContactForm />
        </div>
    );
}

export default Founders;
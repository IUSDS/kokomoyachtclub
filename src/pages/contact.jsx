import React, { useState, useEffect } from 'react'
import { wanderlust,giddy_up } from '../assets/images';
import ScrollReveal from 'scrollreveal';
import ReCAPTCHA from 'react-google-recaptcha';
import { useLocation } from 'react-router-dom';

const contact = () => {
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
  ];
  const handleCaptcha = (value) => setIsVerified(true); 
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
          backgroundImage: `url(${wanderlust})`
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-midnightblue to-transparent"></div>
        <div className='z-10 px-6 md:px-20'>
          <p className='text-3xl md:text-5xl text-white text-center md:text-left drop-shadow-md'>
            Contact Us
          </p>
        </div>
      </div>

      {/* Contact Section */}
      <div className='flex flex-col md:flex-row space-y-6'>
        {/* Image */}
        <div className='md:w-1/2 flex justify-center items-center'>
          <img src={giddy_up} className='xl:w-[600px] w-[350px] rounded-lg' alt="" />
        </div>
        {/* Content */}
        <div className='md:w-1/2 flex flex-col px-6 space-y-4'>
          <p className='text-2xl md:text-4xl text-midnightblue'>Contact Us</p>
          <div className="flex justify-start">
            <div className="w-3 rounded-full mr-2 bg-blue-500"></div>
            <p className="">
              If you have questions or would like to apply for a yacht club membership, fill out this form and we'll reach out to you soon.
            </p>
          </div>

          {/* Form Section */}
          <div>
            <form action="#" method="POST" className="space-y-4">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Name"
                />
              </div>

              {/* Phone Field */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Phone"
                />
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Email"
                />
              </div>

              {/* Dropdown - How Can We Help? */}
              <div className="space-y-2 relative">
                <label htmlFor="help" className="block text-sm font-medium text-gray-700">
                  How Can We Help?
                </label>
                <select
                  id="help"
                  name="help"
                  required
                  className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-midnightblue/80 w-full"
                >
                  <option value="I Want to Join the Yacht Club">I Want to Join the Yacht Club</option>
                  <option value="I Have a Question">I Have a Question</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Message Field */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                  Anything to Add?
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows="4"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Message"
                ></textarea>
              </div>

              {/* reCAPTCHA */}
              <ReCAPTCHA sitekey="YOUR_SITE_KEY" onChange={handleCaptcha} />

              {/* Submit Button */}
              <div className="mt-6">
                <button
                  onClick={handleSubmit}
                  className="w-full bg-blue-600 text-white rounded-full py-2 font-semibold hover:bg-blue-700"
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className='flex flex-col md:flex-row px-8 gap-4 items-start'>
        <div className='fade-in flex flex-col md:w-1/2 gap-4 py-8 px-5'>
          <p className='text-midnightblue text-4xl md:text-5xl md:w-full w-2/3'>Testimonials & Reviews</p>
          <p className='text-gray-500 text-sm md:text-lg'>See what our members have to say about Kokomo Yacht Club!</p>
        </div>
        <div className="fade-in flex flex-col items-center w-full md:w-1/2">
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
    </div>
  )
}

export default contact
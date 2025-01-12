import React, { useState } from 'react';
import { motion } from 'framer-motion';

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState('right');

  const testimonials = [
    {
      name: 'Brian M',
      msg: `Kokomo Yacht Club is hands down the premier luxury Yacht Club for the Sarasota, Tampa/St Pete area. The fleet provides for any experience you want to have on the water. KYC makes the boating experience so easy and the yachts are always in tip-top shape. If you want a boat and don't want to maintain one, this is the place to be.`,
    },
    {
      name: 'Cynthia M',
      msg: 'Boating life made easy and enjoyable! Kokomo Yacht Club provides top of the line boats, captains, and crew. All you need to do is to show up and enjoy the sandbars, waterfront dining, sunsets, and so much more.',
    },
    {
      name: 'Ned & Sue',
      msg: `We spent quite a lot of time researching boat clubs before deciding on yours earlier this summer and we could not be happier. The service and professionalism of the entire staff has been exemplary. We have now had our fourth cruise, and each and every captain has not only been professional, but they have greatly added to the experience by explaining to all of our guests what we are seeing, acting almost as tour guides which is way above and beyond.`,
    },
  ];

  const handleDotClick = (index) => {
    setDirection(index > currentIndex ? 'right' : 'left');
    setCurrentIndex(index);
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={sectionVariants}
      className="flex flex-col md:flex-row px-8 py-8 gap-4 items-start"
    >
      <div className="flex flex-col md:w-1/2 gap-4 py-8 px-5">
        <p className="text-midnightblue text-4xl md:text-5xl md:w-full w-2/3">Testimonials & Reviews</p>
        <p className="text-gray-500 text-sm md:text-lg">See what our members have to say about Kokomo Yacht Club!</p>
      </div>
      <div className="flex flex-col items-center w-full md:w-1/2">
        {/* Fixed height container */}
        <div className="h-[580px] md:h-[400px] lg:h-[250px] w-full max-w-3xl relative overflow-hidden">
          {/* Sliding testimonial */}
          <div
            key={currentIndex}
            className={`absolute w-full transform transition-all duration-500 ease-in-out ${direction === 'right' ? 'translate-x-0 animate-slideFromRight' : 'translate-x-0 animate-slideFromLeft'}`}
          >
            <div className="flex flex-col shadow-lg rounded-lg mx-4 md:mx-0 h-full">
              <div className="px-8 py-6 text-gray-500 bg-red-50 rounded-t-lg flex-grow">
                <p>{testimonials[currentIndex].msg}</p>
              </div>
              <p className="text-midnightblue font-semibold px-5 py-2">{testimonials[currentIndex].name}</p>
            </div>
          </div>
        </div>

        {/* Navigation Dots */}
        <div className="flex space-x-2 mt-6">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`w-3 h-3 rounded-full transition-colors duration-300 ${currentIndex === index ? 'bg-midnightblue' : 'bg-gray-300'}`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default TestimonialsSection;

import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const Modal = ({ isModalOpen, closeModal }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  // Handle form submission
  const handleModalSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://3.27.181.229/vistors/add-visitor', {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          visitor_name: name,
          phone_no: phone,
        })
      });
      if (!response.ok) {
        throw new Error('Error submitting form');
      }
      console.log('Form submitted');
      setName('');
      setPhone('');
      setEmail('');
      window.open(
        'https://image-bucket-kokomo-yacht-club.s3.ap-southeast-2.amazonaws.com/profile_pictures/KokomoYachtClubBrochure8-24.pdf?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAXKPUZZCOMSXIVJLZ%2F20250113%2Fap-southeast-2%2Fs3%2Faws4_request&X-Amz-Date=20250113T080237Z&X-Amz-Expires=300&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAAaDmFwLXNvdXRoZWFzdC0yIkcwRQIhAMZNmJsCAFx8pxPXob7FNE1yQP3k9kEpqoLWRneN%2ByGHAiBPdMcT6LEY14Rczni%2BdHXEd5tcYLcFxewCpmf3iSMwkSqSAwjp%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDUwMzU2MTQzOTM4OCIMA%2B6MDthpvQQTMQeBKuYC5sUPm3yhCahOuT2mXWSQvG0KLCFe3OvsYt5HgqyJU421om4yxVHs9ZJqT3hov8WQvGHjZpJsGWsWyyczDWh%2BhZBVxlfvoPmecrU1HZZxDIzGK4ZxWlgD%2B8V4U4HVIL4%2BOqQCManrUbIhTe8SGdWfiLt%2B0B3OSaO8wXoucykurLt%2BcGs6j8oI%2Fdfs%2FdF12ek19tE60AgDLmhgtVTtYcQiAD%2B7WutkObJLOf0GrVD031wpb%2BqdQlK6D5AxsXycCO%2FjMrOK%2BoSGF4BFxXJ6I1xyUWeR0gvkKqqnMLzSmGLq3nugksdmJYC6N1n3%2F6IOiNCfT6Cucg3T1orwFh4cWy79CRuF%2BnGHVcAEqq8sSZKws%2FeID9bNeKMVwBjx7dfTiuGTqezaMROjAWavEBMceGJ302GYivBqjf4dFFRO5uWtzfgXgkAzeCsOWBbHdnLFLNPJpDYs6ZZ2GkMeML20YT4R1bh3e8TSADCBjZO8BjqzAhYCZyYOUQngR7GplFODCFXhcZ%2FCdhrKYnrzYcNJAId2rRJnogdz4wlNkthRdUSgi5bAzKIVNvg30y00WYTC9MPwhkLrygAYghPMDXvZZMPRh0ZEX16osHtvEWNAxePuUFnZ0bp56W6yyJYpEcAYhy8G5y%2BugwZwTEYDcYv35vKTXs%2BKrmVAmtMvUWPFYKePWJcdsYdfhCJP01qh0KHOHaXhHItmv9oTRYr50Lm23IYmFrYj9tFJsaGGWXWVgNkydkGICtUAdyC6JShsvWXqhPS0I8%2BjQdTKnwukZLGKMNS%2B2TD4T46dDHgIQs3iVOiPTGDvxu36moAhTqEaodrj49hVHJjYoHp1u8%2BkwU70hWc46qdK0jUR%2BnmCA4PyK%2FgtfNPZWX9loqHjBYSiGGRHs1exerU%3D&X-Amz-Signature=4757b64d64e3727f95cc6bc1bba72ef14f7b5e6fd22dc6b43425026bfc23ecd9&X-Amz-SignedHeaders=host&response-content-disposition=inline',
        '_blank'
      )
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50"
          >
            <motion.div
              initial={{ y: -100 }}
              animate={{ y: 0 }}
              exit={{ y: 100 }}
              transition={{ duration: 0.3 }}
              className="bg-white p-8 rounded-lg w-80"
            >
              <h2 className="text-2xl font-semibold text-midnightblue mb-4">
                Fill Out the Form
              </h2>
              <form onSubmit={handleModalSubmit}>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Modal;

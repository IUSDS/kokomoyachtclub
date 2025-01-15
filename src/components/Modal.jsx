import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import CustomAlert from '../components/CustomAlert';

const Modal = ({ isModalOpen, closeModal }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [alertopen, setAlertOpen] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertBody, setAlertBody] = useState('');

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleAlertColse = () => {
    setAlertOpen(false);
  }

  // Handle form submission
  const handleModalSubmit = async (e) => {
    e.preventDefault();

    if (!/^\d{10}$/.test(phone)) {
      setAlertTitle("Invalid Number!");
      setAlertBody("Please enter a 10-digit mobile number");
      setAlertOpen(true);
      return;
    }

    if (!validateEmail(email)) {
      setAlertTitle("Invalid Email!");
      setAlertBody("Please enter a valid email");
      setAlertOpen(true);
      return;
    }

    try {
      const response = await fetch('http://13.210.171.75/visitors/add-visitor', {
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

      fetch("http://13.210.171.75/visitors/get-pdf", {
        method: "GET",
        headers: {
          "accept": "application/json",
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Request failed with status ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          console.log(data);
          console.log("Pre-signed URL:", data.url);
          window.open(data.url, "_blank");
        })
        .catch((error) => {
          console.error("Error fetching PDF URL:", error);
        });


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
              className="bg-white p-8 rounded-lg w-[500px]"
            >
              <div className='mb-4 text-sm font-semibold text-midnightblue space-y-1'>
                <p >
                  Thank you for your interest in the membership.
                </p>
                <p >
                  Please provide your contact information to download our brochure.
                </p>
              </div>
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
      <CustomAlert onClose={handleAlertColse} isVisible={alertopen} title={alertTitle} body={alertBody} />
    </div>
  );
};

export default Modal;

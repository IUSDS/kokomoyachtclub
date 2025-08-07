import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import CustomAlert from "../components/CustomAlert";
import Swal from "sweetalert2";
import { X } from 'lucide-react';

const Modal = ({ isModalOpen, closeModal }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [alertopen, setAlertOpen] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [alertBody, setAlertBody] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const API_BASE = import.meta.env.DEV
    ? "http://localhost:8000"
    : "https://api.kokomoyachtclub.vip";

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleAlertClose = () => {
    setAlertOpen(false);
  };

  const handleModalSubmit = async (e) => {
    e.preventDefault();
    setIsButtonDisabled(true); // Disable the button

    // Validation
    if (!/^\d{10}$/.test(phone)) {
      setAlertTitle("Invalid Number!");
      setAlertBody("Please enter a 10-digit mobile number.");
      setAlertOpen(true);
      setIsButtonDisabled(false);
      return;
    }

    if (!validateEmail(email)) {
      setAlertTitle("Invalid Email!");
      setAlertBody("Please enter a valid email.");
      setAlertOpen(true);
      setIsButtonDisabled(false);
      return;
    }

    try {
      const response = await fetch(`${API_BASE}/visitors/add-visitors-details`, {
        method: "POST",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          visitor_name: name,
          phone_no: phone,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("API Error:", response.status, errorData);
        throw new Error("Submission failed");
      }

      // Reset form fields
      setName("");
      setPhone("");
      setEmail("");

      // Open brochure immediately in a new tab
      window.open(
        "https://image-bucket-kokomo-yacht-club.s3.ap-southeast-2.amazonaws.com/kyc_brochure.pdf",
        "_blank"
      );

      // Close the modal
      closeModal();

      await Swal.fire({
        html: `
    <div class="swal-custom-container relative w-full max-w-lg mx-auto bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white rounded-2xl shadow-2xl overflow-hidden p-8 backdrop-blur-sm">
      
      <!-- Decorative Elements -->
      <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 via-white to-blue-400"></div>
      <div class="absolute -top-20 -right-20 w-40 h-40 bg-blue-500 rounded-full opacity-10 blur-3xl"></div>
      <div class="absolute -bottom-20 -left-20 w-40 h-40 bg-white rounded-full opacity-5 blur-3xl"></div>

      <!-- Message Content -->
      <h2 class="text-3xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent mb-12 text-center">
        Details Submitted!
      </h2>
      <p class="text-blue-100 text-2xl text-center mb-8">
        Thank you for your interest in <br/> <strong>Kokomo Yacht Club</strong>.
      </p>
      <p class="text-blue-100 mb-6 text-lg text-center">
        Your brochure has been opened in a new tab.
      </p>

      <!-- Manual Close Button -->
      <div class="text-center mt-6">
        <button id="swal-close-btn" class="bg-white text-slate-900 px-6 py-3 rounded-xl font-semibold hover:bg-blue-100 transition-all duration-300">
          Got it
        </button>
      </div>
    </div>
  `,
        background: "transparent",
        showConfirmButton: false,
        customClass: {
          popup: "p-0 bg-transparent shadow-none",
        },
        didOpen: () => {
          const btn = document.getElementById("swal-close-btn");
          if (btn) btn.addEventListener("click", () => Swal.close());
        },
      });



    } catch (error) {
      console.error(error);
      setAlertTitle("Submission Failed");
      setAlertBody("Something went wrong. Please try again later.");
      setAlertOpen(true);
    } finally {
      setIsButtonDisabled(false);
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
            className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50"
            onClick={closeModal}
          >
            <motion.div
              initial={{ y: -100 }}
              animate={{ y: 0 }}
              exit={{ y: 100 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-lg mx-auto bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white rounded-3xl shadow-2xl relative overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Decorative elements */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 via-white to-blue-400"></div>
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-500 rounded-full opacity-10 blur-3xl"></div>
              <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-white rounded-full opacity-5 blur-3xl"></div>

              {/* Close button */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white bg-opacity-10 hover:bg-opacity-20 transition-all duration-200 group"
              >
                <X className="w-4 h-4 text-white group-hover:rotate-90 transition-transform duration-200" />
              </button>

              <div className="p-8">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent mb-2">
                    Download Our Brochure
                  </h2>
                  <p className="text-blue-100 mb-4">
                    Thank you for your interest in Kokomo Yacht Club! Please
                    fill out the form below to download our brochure.
                  </p>
                  <div className="w-16 h-1 bg-gradient-to-r from-blue-400 to-white mx-auto rounded-full"></div>
                </div>

                <form onSubmit={handleModalSubmit} className="space-y-6">
                  <div className="group">
                    <label className="block mb-2 text-sm font-medium text-blue-100 group-focus-within:text-white transition-colors">
                      Name
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        className="w-full p-4 rounded-xl bg-white bg-opacity-10 backdrop-blur-sm border border-white border-opacity-20 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 hover:bg-opacity-15"
                        placeholder="Enter your full name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                      <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-blue-400 to-white scale-x-0 group-focus-within:scale-x-100 transition-transform duration-300"></div>
                    </div>
                  </div>

                  <div className="group">
                    <label className="block mb-2 text-sm font-medium text-blue-100 group-focus-within:text-white transition-colors">
                      Email Address
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        className="w-full p-4 rounded-xl bg-white bg-opacity-10 backdrop-blur-sm border border-white border-opacity-20 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 hover:bg-opacity-15"
                        placeholder="your@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                      <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-blue-400 to-white scale-x-0 group-focus-within:scale-x-100 transition-transform duration-300"></div>
                    </div>
                  </div>

                  <div className="group">
                    <label className="block mb-2 text-sm font-medium text-blue-100 group-focus-within:text-white transition-colors">
                      Phone Number
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        className="w-full p-4 rounded-xl bg-white bg-opacity-10 backdrop-blur-sm border border-white border-opacity-20 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 hover:bg-opacity-15"
                        placeholder="(555) 123-4567"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                        maxLength={10}
                      />
                      <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-blue-400 to-white scale-x-0 group-focus-within:scale-x-100 transition-transform duration-300"></div>
                    </div>
                  </div>

                  <div className="flex justify-between pt-4">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="px-6 py-3 rounded-xl bg-white bg-opacity-10 backdrop-blur-sm border border-white border-opacity-20 text-white hover:bg-opacity-20 transition-all duration-300"
                    >
                      Close
                    </button>
                    <button
                      type="submit"
                      disabled={isButtonDisabled}
                      className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg ${isButtonDisabled
                          ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                          : "bg-gradient-to-r from-white to-blue-100 text-slate-900 hover:from-blue-50 hover:to-white transform hover:scale-105 hover:shadow-xl"
                        }`}
                    >
                      {isButtonDisabled ? "Please wait..." : "Submit Details"}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <CustomAlert
        onClose={handleAlertClose}
        isVisible={alertopen}
        title={alertTitle}
        body={alertBody}
      />
    </div>
  );
};

export default Modal;

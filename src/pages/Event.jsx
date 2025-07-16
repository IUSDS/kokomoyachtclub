import React, { useState } from "react";
import {
  events_hero,
  quay_401,
  sky,
  boat,
  section_two,
  image,
  ocean,
  boat2,
  go
} from "../assets/images";

import op_logo from "../assets/logos/op_logo.png";

const Form = ({ onClose, event, title }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone_no: "",
    event_name: event,
  });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState({ type: "", text: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    let temp = {};
    temp.name = formData.name ? "" : "Name is required.";
    temp.email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
      ? ""
      : "Invalid email.";
    temp.phone_no = /^\d{10}$/.test(formData.phone_no)
      ? ""
      : "Enter 10-digit US phone number.";
    setErrors(temp);
    return Object.values(temp).every((x) => x === "");
  };

  const API_BASE = import.meta.env.DEV
    ? "http://localhost:8000"
    : "https://api.kokomoyachtclub.vip";

  const handleSubmit = async (e) => {
    if (e?.preventDefault) e.preventDefault();
    setMessage({ type: "", text: "" });
    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const res = await fetch(`${API_BASE}/visitors/add-event-details`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error();

      setMessage({ type: "success", text: "Submitted successfully!" });
      setFormData({
        name: "",
        email: "",
        phone_no: "",
        event_name: event,
      });
      setTimeout(() => onClose(), 3000);
    } catch (err) {
      setMessage({ type: "error", text: "Error submitting the form." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="w-full max-w-lg mx-auto bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white rounded-3xl shadow-2xl relative overflow-hidden animate-in fade-in duration-300">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 via-white to-blue-400"></div>
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-500 rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-white rounded-full opacity-5 blur-3xl"></div>

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white bg-opacity-10 hover:bg-opacity-20 transition-all duration-200 group"
        >
          <span className="text-white text-xl group-hover:rotate-90 transition-transform duration-200">
            ×
          </span>
        </button>

        <div className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent mb-2">
              {title}
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-blue-400 to-white mx-auto rounded-full"></div>
          </div>

          {message.text && (
            <div
              className={`text-sm mb-6 p-4 rounded-xl backdrop-blur-sm border transition-all duration-300 ${
                message.type === "success"
                  ? "bg-emerald-500 bg-opacity-20 border-emerald-400 text-emerald-100"
                  : "bg-red-500 bg-opacity-20 border-red-400 text-red-100"
              }`}
            >
              <div className="flex items-center">
                <div
                  className={`w-2 h-2 rounded-full mr-3 ${
                    message.type === "success" ? "bg-emerald-400" : "bg-red-400"
                  }`}
                ></div>
                {message.text}
              </div>
            </div>
          )}

          <div className="space-y-6">
            <div className="group">
              <label className="block mb-2 text-sm font-medium text-blue-100 group-focus-within:text-white transition-colors">
                Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  className="w-full p-4 rounded-xl bg-white bg-opacity-10 backdrop-blur-sm border border-white border-opacity-20 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 hover:bg-opacity-15"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
                <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-blue-400 to-white scale-x-0 group-focus-within:scale-x-100 transition-transform duration-300"></div>
              </div>
              {errors.name && (
                <p className="text-red-300 text-sm mt-2 flex items-center animate-in slide-in-from-left-1 duration-200">
                  <span className="w-1 h-1 bg-red-400 rounded-full mr-2"></span>
                  {errors.name}
                </p>
              )}
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
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
                <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-blue-400 to-white scale-x-0 group-focus-within:scale-x-100 transition-transform duration-300"></div>
              </div>
              {errors.email && (
                <p className="text-red-300 text-sm mt-2 flex items-center animate-in slide-in-from-left-1 duration-200">
                  <span className="w-1 h-1 bg-red-400 rounded-full mr-2"></span>
                  {errors.email}
                </p>
              )}
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
                  value={formData.phone_no}
                  onChange={(e) =>
                    setFormData({ ...formData, phone_no: e.target.value })
                  }
                  maxLength={10}
                />
                <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-blue-400 to-white scale-x-0 group-focus-within:scale-x-100 transition-transform duration-300"></div>
              </div>
              {errors.phone_no && (
                <p className="text-red-300 text-sm mt-2 flex items-center animate-in slide-in-from-left-1 duration-200">
                  <span className="w-1 h-1 bg-red-400 rounded-full mr-2"></span>
                  {errors.phone_no}
                </p>
              )}
            </div>

            {/* <div className="group">
              <label className="block mb-2 text-sm font-medium text-blue-100 group-focus-within:text-white transition-colors">
                Number of Attendees
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="1"
                  max="999"
                  className="w-full p-4 rounded-xl bg-white bg-opacity-10 backdrop-blur-sm border border-white border-opacity-20 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 hover:bg-opacity-15"
                  placeholder="How many people will attend?"
                  value={formData.attendees}
                  onChange={(e) => setFormData({ ...formData, attendees: parseInt(e.target.value) || 0 })}
                />
                <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-blue-400 to-white scale-x-0 group-focus-within:scale-x-100 transition-transform duration-300"></div>
              </div>
              {errors.attendees && (
                <p className="text-red-300 text-sm mt-2 flex items-center animate-in slide-in-from-left-1 duration-200">
                  <span className="w-1 h-1 bg-red-400 rounded-full mr-2"></span>
                  {errors.attendees}
                </p>
              )}
            </div> */}

            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-white to-blue-100 text-slate-900 font-semibold py-4 rounded-xl hover:from-blue-50 hover:to-white transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg hover:shadow-xl relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              <div className="relative flex items-center justify-center">
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-slate-900 border-t-transparent rounded-full animate-spin mr-3"></div>
                    Submitting...
                  </>
                ) : (
                  <>
                    Submit Registration
                    <div className="ml-2 transform group-hover:translate-x-1 transition-transform duration-200">
                      →
                    </div>
                  </>
                )}
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const EmailMarketingForm = ({ onClose, event, title }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone_no: "",
    event_name: event,
  });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState({ type: "", text: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    let temp = {};
    temp.name = formData.name ? "" : "Name is required.";
    temp.email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
      ? ""
      : "Invalid email.";
    temp.phone_no = /^\d{10}$/.test(formData.phone_no)
      ? ""
      : "Enter 10-digit US phone number.";
    setErrors(temp);
    return Object.values(temp).every((x) => x === "");
  };

  const API_BASE = import.meta.env.DEV
    ? "http://localhost:8000"
    : "https://api.kokomoyachtclub.vip";

  const handleSubmit = async (e) => {
    if (e?.preventDefault) e.preventDefault();
    setMessage({ type: "", text: "" });
    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const res = await fetch(`${API_BASE}/visitors/add-event-details`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error();

      setMessage({ type: "success", text: "Submitted successfully!" });
      setFormData({
        name: "",
        email: "",
        phone_no: "",
        event_name: event,
        attendees: 1,
      });
      setTimeout(() => onClose(), 3000);
    } catch (err) {
      setMessage({ type: "error", text: "Error submitting the form." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="w-full max-w-md mx-auto bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white rounded-3xl shadow-2xl relative overflow-hidden animate-in fade-in duration-300">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 via-white to-blue-400"></div>
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-500 rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-white rounded-full opacity-5 blur-3xl"></div>

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white bg-opacity-10 hover:bg-opacity-20 transition-all duration-200 group"
        >
          <span className="text-white text-xl group-hover:rotate-90 transition-transform duration-200">
            ×
          </span>
        </button>

        <div className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent mb-2">
              {title}
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-blue-400 to-white mx-auto rounded-full"></div>
          </div>

          {message.text && (
            <div
              className={`text-sm mb-6 p-4 rounded-xl backdrop-blur-sm border transition-all duration-300 ${
                message.type === "success"
                  ? "bg-emerald-500 bg-opacity-20 border-emerald-400 text-emerald-100"
                  : "bg-red-500 bg-opacity-20 border-red-400 text-red-100"
              }`}
            >
              <div className="flex items-center">
                <div
                  className={`w-2 h-2 rounded-full mr-3 ${
                    message.type === "success" ? "bg-emerald-400" : "bg-red-400"
                  }`}
                ></div>
                {message.text}
              </div>
            </div>
          )}

          <div className="space-y-6">
            <div className="group">
              <label className="block mb-2 text-sm font-medium text-blue-100 group-focus-within:text-white transition-colors">
                Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  className="w-full p-4 rounded-xl bg-white bg-opacity-10 backdrop-blur-sm border border-white border-opacity-20 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 hover:bg-opacity-15"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
                <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-blue-400 to-white scale-x-0 group-focus-within:scale-x-100 transition-transform duration-300"></div>
              </div>
              {errors.name && (
                <p className="text-red-300 text-sm mt-2 flex items-center animate-in slide-in-from-left-1 duration-200">
                  <span className="w-1 h-1 bg-red-400 rounded-full mr-2"></span>
                  {errors.name}
                </p>
              )}
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
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
                <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-blue-400 to-white scale-x-0 group-focus-within:scale-x-100 transition-transform duration-300"></div>
              </div>
              {errors.email && (
                <p className="text-red-300 text-sm mt-2 flex items-center animate-in slide-in-from-left-1 duration-200">
                  <span className="w-1 h-1 bg-red-400 rounded-full mr-2"></span>
                  {errors.email}
                </p>
              )}
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
                  value={formData.phone_no}
                  onChange={(e) =>
                    setFormData({ ...formData, phone_no: e.target.value })
                  }
                  maxLength={10}
                />
                <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-blue-400 to-white scale-x-0 group-focus-within:scale-x-100 transition-transform duration-300"></div>
              </div>
              {errors.phone_no && (
                <p className="text-red-300 text-sm mt-2 flex items-center animate-in slide-in-from-left-1 duration-200">
                  <span className="w-1 h-1 bg-red-400 rounded-full mr-2"></span>
                  {errors.phone_no}
                </p>
              )}
            </div>

            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-white to-blue-100 text-slate-900 font-semibold py-4 rounded-xl hover:from-blue-50 hover:to-white transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg hover:shadow-xl relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              <div className="relative flex items-center justify-center">
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-slate-900 border-t-transparent rounded-full animate-spin mr-3"></div>
                    Submitting...
                  </>
                ) : (
                  <>
                    Submit
                    <div className="ml-2 transform group-hover:translate-x-1 transition-transform duration-200">
                      →
                    </div>
                  </>
                )}
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Event = () => {
  const [showForm, setShowForm] = useState(false);
  const [showEmailSignupForm, setShowEmailSignupForm] = useState(false);
  return (
    <div className="space-y-12">
      {/* Hero section */}
      <div
        className="relative w-full h-[544px] md:h-[744px] xl:h-[944px] bg-cover bg-center "
        style={{ backgroundImage: `url(${events_hero})` }}
      >
        {/* Title */}
        <p className="absolute top-[25%] left-1/2 transform -translate-x-1/2 text-xl w-[90%] font-bold md:text-5xl xl:text-7xl text-white text-center drop-shadow-md">
          EVENTS AT KOKOMO YACHT CLUB
        </p>

        {/* Button */}
        <button
          onClick={() => setShowForm(true)}
          className="absolute top-[65%] left-1/2 transform -translate-x-1/2 text-white font-semibold w-[250px] md:w-fit text-lg md:text-2xl bg-midnightblue px-6 py-4 rounded-full shadow-lg hover:scale-105 transition-all duration-300"
        >
          Sign Up For Future Events
        </button>

        {/* Bottom Shape */}
        <div className="custom-shape-divider-bottom-1750074161">
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
              className="shape-fill"
            />
          </svg>
        </div>
      </div>

      {/* Section 1 */}
      <div className="flex flex-col-reverse md:flex-row items-center px-4 md:px-8 lg:px-16">
        {/* Text */}
        <div className="w-full md:w-1/2 flex flex-col space-y-3 pt-8">
          <p className="font-bold text-2xl sm:text-3xl xl:w-2/3 lg:text-4xl text-center md:text-left text-midnightblue">
            The Exclusive Boat Club of Sarasota
          </p>
          <div className="mx-auto md:mx-0 w-16 sm:w-24 lg:w-32 h-1 rounded-full bg-midnightblue" />
          <p className="text-sm sm:text-base xl:w-[80%] md:text-lg text-center md:text-left">
            Welcome to the inner circle of coastal sophistication. At Kokomo
            Yacht Club, our events are private gateways to a life less ordinary.
            Our curated events are designed to bring the community together in
            one of Sarasota's premier locations. With a team dedicated to
            creating an effortless and unforgettable experience, this private
            club is set to redefine luxury boating and a unique social scene.
          </p>
        </div>

        {/* Images */}
        <div className="w-full md:w-1/2 h-64 sm:h-80 md:h-[450px] flex items-center justify-center">
          <img
            src={section_two}
            alt="Main"
            className="w-72 sm:w-60 md:w-80 lg:w-[75%] rounded-xl"
          />
        </div>
      </div>

      {/* Section 2 */}
      <div className="bg-midnightblue h-20 flex justify-center items-center">
        <p className="text-white text-sm md:text-xl lg:text-3xl px-4 text-center font-semibold">
          THIS IS BOATING THE WAY IT SHOULD BE – SEAMLESS, JOYFUL AND
          HASSLE-FREE
        </p>
      </div>

      {/* Section 4 */}
      <div className="text-midnightblue md:py-16 text-center font-semibold text-lg md:text-xl lg:text-2xl md:gap-4 px-8 flex flex-col items-center justify-center ">
        <p>
          ENJOY A FIRST LOOK AT OUR NEWLY EXPANDED LUXURY FLEET WHILE IMMERSING
          YOURSELF IN THE CHARM OF SARASOTA'S MOST UNIQUE LUXURY BOATING CLUB.
        </p>
        <p>
          KINDLY RSVP BY JULY 7 TO RESERVE YOUR SPOT—AND JOIN US FOR AN
          EXCLUSIVE POST-EVENT SUNSET CRUISE.
        </p>
        <button
          onClick={() => setShowForm(true)}
          className="text-white font-semibold mt-4 w-fit text-lg md:text-2xl bg-midnightblue px-6 py-4 rounded-full shadow-lg hover:scale-105 transition-all duration-300"
        >
          Sign Up For Future Events
        </button>
      </div>

      {/* Events Highlight Section */}
      <div
        className="relative w-full bg-cover bg-center  xl:h-[80vh] md:h-[60vh] h-[50vh] shadow-midnight"
        style={{ backgroundImage: `url(${quay_401})` }}
      >
        <div className="flex flex-col space-y-6 justify-between h-full py-10 px-10 items-start w-fit">
          {/* Heading Card */}
          <div className="border-2 border-white rounded-xl w-full py-4 sm:py-6 md:py-8 px-3 sm:px-6 md:px-8 text-white font-bold text-lg sm:text-xl md:text-2xl bg-gradient-to-r from-midnightblue via-[#5456A1] to-transparent">
            EVENT HIGHLIGHTS INCLUDE
          </div>
          {/* List Card */}
          <div className="border-2 border-white rounded-xl w-fit py-4 sm:py-6 md:py-8 px-3 sm:px-6 md:px-8 text-white text-sm md:text-lg bg-gradient-to-r from-midnightblue via-[#5456A1] to-transparent">
            <ul className="list-disc list-inside space-y-2">
              <li>
                HANDCRAFTED COCKTAILS & SIGNATURE APPETIZERS BY OCEAN PRIME
              </li>
              <li>LIVE MUSIC FEATURING BRI RIVIERA BAND</li>
              <li>A FIRST LOOK AT THE NEWLY EXPANDED LUXURY FLEET</li>
              <li>ELEGANT PARK-LIKE SURROUNDINGS</li>
              <li>EXCLUSIVE MEMBERSHIP INCENTIVES</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Past Events */}
      <div className="grid grid-cols-1 md:grid-cols-2 md:pt-20 px-6 md:px-10 gap-8">
        <div>
          <img src={go} alt="Fleet at Grand Opening" className="rounded-lg shadow-lg" />
        </div>
        <div className="grid grid-cols-1 text-midnightblue text-center md:text-left h-fit gap-2">
          <p className="text-xl md:text-3xl xl:text-5xl font-semibold">Inside Past Events</p>
          <p className="md:text-xl">
            Kokomo events are private by nature, but here’s a glimpse for those with the right kind of curiosity.
          </p>
          <p className="font-semibold md:text-xl">
            Previous Highlights Include:
          </p>
          <ul className="md:text-xl">
            <li>Sunday Polo & Brunch – A Members-Only Outing</li>
            <li>Meet the Fleet – Private Yacht Showcase</li>
            <li>Grand Opening at Quay Commons</li>
          </ul>
        </div>
      </div>

      {/* Section 6 */}
      <div
        className="md:pt-20 px-6 md:px-10"
        style={{ textShadow: "2px 2px 5px rgba(0,0,0,0.5)" }}
      >
        <div
          className="relative w-full rounded-lg shadow-lg bg-cover bg-center text-white min-h-[500px] md:min-h-[400px] lg:min-h-[500px] xl:min-h-[700px]"
          style={{ backgroundImage: `url(${sky})` }}
        >
          {/* Text block */}
          <p className="absolute top-[30%] left-5 text-2xl md:text-3xl lg:text-4xl xl:text-6xl font-bold">
            Crafted for Those Who Belong
          </p>

          <p className=" absolute top-[50%] left-5 max-w-xl md:w-1/2 lg:max-w-2xl xl:text-xl">
            True luxury isn’t crowded, it’s curated. At Kokomo Yacht Club, each
            gathering is an intentional experience that blends fine hospitality
            with organic connection. You’re not just attending— you’re arriving
            among peers, innovators, and tastemakers who understand the quiet
            power of access.
          </p>

          {/* Boat graphic */}
          <img
            src={boat}
            alt="boat"
            className="absolute right-0 bottom-0 w-48 md:w-[500px] xl:w-[800px]"
          />
        </div>
      </div>

      {/* spacer */}
      <div className="hidden md:block w-full h-10 xl:h-56"></div>

      {/* Section 7 */}
      <div
        className="relative mx-6 md:mx-10 bg-cover bg-center rounded-lg shadow-lg text-white min-h-[500px] md:min-h-[600px] xl:min-h-[800px] flex items-center"
        style={{
          backgroundImage: `url(${ocean})`,
          textShadow: "2px 2px 5px rgba(0,0,0,0.5)",
        }}
      >
        {/* Centered Boat */}
        <img
          src={boat2}
          alt="Boat"
          className="absolute left-1/2 md:left-[65%] lg:left-[60%] xl:left-[50%] top-52 md:top-40 xl:top-36 transform -translate-x-1/2 -translate-y-1/2 w-64 md:w-[400px] xl:w-[750px]"
        />

        {/* Top-left Heading */}
        <div className="absolute top-[2%] md:top-[8%] left-4 md:left-10 flex flex-col md:gap-2 w-2/3 md:w-1/2">
          <p className="font-semibold text-2xl md:text-4xl lg:text-4xl xl:text-6xl">
            Get On The List
          </p>
          <p className="text-sm md:text-lg lg:text-lg xl:text-xl max-w-xs md:max-w-xs">
            Because exclusivity starts with access
          </p>
        </div>

        {/* Bottom-right CTA */}
        <div className="absolute bottom-6 xl:bottom-10 right-4 md:right-10 w-[60%] md:w-[40%] flex flex-col items-end text-right gap-2 md:gap-4">
          <p className="text-xs md:text-base lg:text-lg xl:text-2xl leading-snug">
            Our invitation list is limited and intentional. Sign up to receive
            early access to private events, seasonal gatherings, and yacht
            previews.
          </p>
          <button
            onClick={() => setShowEmailSignupForm(true)}
            className="text-white border border-white md:text-xl lg:text-2xl rounded-full px-4 md:px-6 xl:px-10 py-1 bg-white/10 hover:bg-white hover:text-midnightblue transition"
          >
            Sign Up For Future Events
          </button>
        </div>
      </div>

      {/* Section 8 */}
      <div className="flex flex-col md:flex-row-reverse items-center gap-8 px-6 md:px-10 pt-6">
        {/* Image Section */}
        <img
          src={image}
          alt="Aerial view of fleet"
          className="w-full md:w-1/2 rounded-lg shadow-lg"
        />

        {/* Text & CTA */}
        <div className="flex flex-col justify-center md:justify-between md:h-full items-center md:items-start text-center md:text-left space-y-4 xl:space-y-6 md:w-[80%]">
          <p className="text-midnightblue text-2xl md:text-3xl xl:text-5xl font-bold leading-tight">
            Ready to Own the Adventure?
          </p>

          <div className="flex flex-col sm:flex-row md:flex-col gap-4 w-full items-center md:items-start">
            <button
              onClick={() => (window.location.href = "/membership")}
              className="bg-midnightblue text-white font-bold px-6 py-3 rounded-full w-[80%] hover:scale-105 transition-all duration-300 shadow-lg"
            >
              Explore Membership
            </button>

            <button
              onClick={() => (window.location.href = "/contact")}
              className="bg-midnightblue text-white font-bold px-6 py-3 rounded-full w-[80%] hover:scale-105 transition-all duration-300 shadow-lg"
            >
              Schedule a Private Tour
            </button>
          </div>
        </div>
      </div>

      {/* Forms */}
      {showForm && (
        <div className="fixed inset-0 shadow-xl flex justify-center items-center z-50">
          <Form
            onClose={() => setShowForm(false)}
            event={"Future Events"}
            title={"Sign Up For Future Events"}
          />
        </div>
      )}
      {showEmailSignupForm && (
        <div className="fixed inset-0 shadow-xl flex justify-center items-center z-50">
          <EmailMarketingForm
            onClose={() => setShowEmailSignupForm(false)}
            event={"Future Events"}
            title={"Sign Up For Future Events"}
          />
        </div>
      )}
    </div>
  );
};

export default Event;

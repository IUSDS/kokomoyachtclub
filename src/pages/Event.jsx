import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  events_hero,
  sky,
  boat,
  section_two,
  image,
  ocean,
  boat2,
  go,
} from "../assets/images";
import { X } from 'lucide-react';
import EventSection from "../components/EventSection";

const Form = ({ onClose, event, title }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone_no: "",
    event_name: event,
    attendees: "",
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
    <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center p-4 z-50" onClick={onClose}>
      <div className="w-full max-w-lg mx-auto bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white rounded-3xl shadow-2xl relative overflow-hidden animate-in fade-in duration-300" onClick={(e) => e.stopPropagation()}>
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 via-white to-blue-400"></div>
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-500 rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-white rounded-full opacity-5 blur-3xl"></div>

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white bg-opacity-10 hover:bg-opacity-20 transition-all duration-200 group"
        >
          <X className="w-4 h-4 text-white group-hover:rotate-90 transition-transform duration-200" />
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
              className={`text-sm mb-6 p-4 rounded-xl backdrop-blur-sm border transition-all duration-300 ${message.type === "success"
                ? "bg-emerald-500 bg-opacity-20 border-emerald-400 text-emerald-100"
                : "bg-red-500 bg-opacity-20 border-red-400 text-red-100"
                }`}
            >
              <div className="flex items-center">
                <div
                  className={`w-2 h-2 rounded-full mr-3 ${message.type === "success" ? "bg-emerald-400" : "bg-red-400"
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

            <div className="group">
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
    <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center p-4 z-50" onClick={onClose}>
      <div className="w-full max-w-md mx-auto bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white rounded-3xl shadow-2xl relative overflow-hidden animate-in fade-in duration-300" onClick={(e) => e.stopPropagation()}>
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 via-white to-blue-400"></div>
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-500 rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-white rounded-full opacity-5 blur-3xl"></div>

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white bg-opacity-10 hover:bg-opacity-20 transition-all duration-200 group"
        >
          <X className="w-4 h-4 text-white group-hover:rotate-90 transition-transform duration-200" />
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
              className={`text-sm mb-6 p-4 rounded-xl backdrop-blur-sm border transition-all duration-300 ${message.type === "success"
                ? "bg-emerald-500 bg-opacity-20 border-emerald-400 text-emerald-100"
                : "bg-red-500 bg-opacity-20 border-red-400 text-red-100"
                }`}
            >
              <div className="flex items-center">
                <div
                  className={`w-2 h-2 rounded-full mr-3 ${message.type === "success" ? "bg-emerald-400" : "bg-red-400"
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
  const navigate = useNavigate();
  const handleGallery = () => {
    navigate('gallery');
  }
  return (
    <div className="space-y-12 lg:space-y-20">

      {/* Hero section */}
      <section
        className="relative w-full h-[60vh] bg-cover bg-center"
        style={{ backgroundImage: `url(${events_hero})` }}
      >
        {/* Title */}
        <div className="absolute inset-x-0 bottom-[20%] md:bottom-[10%] flex flex-col justify-center items-center px-4">
          <h1 className="text-2xl md:text-5xl xl:text-7xl font-bold text-white text-center drop-shadow-md max-w-6xl leading-tight">
            EVENTS AT
          </h1>
          <h1 className="text-2xl md:text-5xl xl:text-7xl font-bold text-white text-center drop-shadow-md max-w-6xl leading-tight">
            KOKOMO YACHT CLUB
          </h1>
        </div>

        {/* Button */}
        {/* <div className="absolute inset-x-0 bottom-[15%] md:bottom-[8%] flex justify-center px-4">
          <button
            onClick={() => setShowForm(true)}
            className="text-white font-semibold text-lg md:text-xl xl:text-2xl bg-midnightblue px-8 py-4 md:px-10 md:py-5 rounded-full shadow-lg hover:scale-105 transition-all duration-300 whitespace-nowrap"
          >
            RSVP NOW
          </button>
        </div> */}
      </section>

      {/* Current Event */}
      <section className="flex flex-col space-y-6 items-center justify-center">
        <EventSection showForm={() => setShowForm(true)}/>
      </section>

      {/* Section 2 */}
      <section className="bg-midnightblue h-20 flex justify-center items-center">
        <p className="text-white text-sm md:text-xl lg:text-3xl px-4 text-center font-semibold">
          THIS IS BOATING THE WAY IT SHOULD BE – SEAMLESS, JOYFUL AND
          HASSLE-FREE
        </p>
      </section>

      {/* Section 1 */}
      <section className="flex flex-col-reverse md:flex-row items-center px-4 md:px-8 lg:px-16">
        {/* Text */}
        <div className="w-full md:w-1/2 flex flex-col space-y-3 pt-8">
          <p className="font-bold text-2xl sm:text-3xl xl:w-2/3 lg:text-4xl text-center md:text-left text-midnightblue">
            The Exclusive Boat Club of Sarasota
          </p>
          <div className="mx-auto md:mx-0 w-16 sm:w-24 lg:w-32 h-1 rounded-full bg-midnightblue" />
          <p className="text-sm sm:text-base xl:w-[80%] md:text-lg text-center md:text-left">
            At Kokomo
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
      </section>

      {/* Past Events */}
      <section className="mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 justify-center items-start">
          {/* Image */}
          <div className="relative">
            <img
              src={go}
              alt="Fleet at Grand Opening - Kokomo Yacht Club exclusive event"
              className="w-full h-[300px] sm:h-[400px] md:h-[450px] lg:h-[500px] object-cover rounded-xl shadow-2xl"
            />
          </div>

          {/* Content */}
          <div className="space-y-4 text-center lg:text-left">
            <div className="space-y-4">
              <h2 className="text-2xl sm:text-3xl md:text-4xl xl:text-5xl font-semibold text-midnightblue leading-tight">
                Inside Past Events
              </h2>

              <p className="text-base md:text-lg xl:text-xl text-gray-700 leading-relaxed">
                Kokomo events are private by nature, but here's a glimpse for those
                with the right kind of curiosity.
              </p>
            </div>

            <div className="mt-12 p-4 sm:p-6 lg:p-8 bg-white rounded-lg shadow-sm border">
              <div className="grid gap-3 sm:gap-4">
                {[
                  'Grand Opening at Quay Commons',
                  'Tour the Fleet',
                  'Private Networking Gatherings'
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 hover:bg-gray-50 rounded-lg transition-colors">
                    <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-blue-900 rounded-full mt-1.5 sm:mt-2 flex-shrink-0"></div>
                    <span className="text-base sm:text-lg lg:text-xl text-gray-700 leading-relaxed">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="">
              <button 
                className="bg-midnightblue text-white font-semibold text-base md:text-lg px-8 py-3 md:px-10 md:py-4 rounded-full shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300"
                onClick={handleGallery}>
                View Private Gallery
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6 */}
      <section
        className="md:pt-20 px-6 md:px-10"
        style={{ textShadow: "2px 2px 5px rgba(0,0,0,0.5)" }}
      >
        <div
          className="relative w-full rounded-lg shadow-lg bg-cover bg-center text-white min-h-[500px] md:min-h-[400px] lg:min-h-[500px] xl:min-h-[700px]"
          style={{ backgroundImage: `url(${sky})` }}
        >
          {/* Text block */}
          <p className="absolute top-[10%] xl:top-[30%] left-5 text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold">
            Luxury Boating Club
          </p>
          <p className="absolute top-[18%] xl:top-[40%] md:top-[20%] w-2/3 left-5 text-lg md:text-xl lg:text-2xl xl:text-3xl font-semibold">
            Designed for Those Who Want Boating to Be a Part of Their Lifestyle
          </p>

          <p className=" absolute top-[40%] xl:top-[50%] left-5 max-w-xl md:w-1/2 lg:max-w-2xl xl:text-xl">
            At Kokomo Yacht Club, we believe true luxury is about curation, not
            crowds. Each of our gatherings is designed to be an intentional
            experience, blending exceptional hospitality with genuine
            connection. When you join us, you're not just attending an event;
            you're arriving among a select group of peers who appreciate the
            unique value of exclusive access and boating as a lifestyle.
          </p>

          {/* Boat graphic */}
          <img
            src={boat}
            alt="boat"
            className="hidden md:block absolute right-0 bottom-0 w-48 md:w-[500px] xl:w-[800px]"
          />
        </div>
      </section>

      {/* spacer */}
      <div className="hidden md:block w-full h-10 xl:h-32"></div>

      {/* Email Marketing */}
      <section
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
          className="absolute left-1/2 md:left-[65%] lg:left-[70%] xl:left-[55%] top-52 md:top-40 xl:top-36 transform -translate-x-1/2 -translate-y-1/2 w-64 md:w-[400px] xl:w-[650px]"
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
            className="text-midnightblue border border-white md:text-lg rounded-full px-4 md:px-6 xl:px-10 py-1 bg-white/80 hover:bg-transparent hover:text-white transition"
          >
            Find out about Future Events
          </button>
        </div>
      </section>

      {/* Section 8 */}
      <section className="flex flex-col md:flex-row-reverse items-center gap-8 px-6 md:px-10 pt-6">
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
      </section>

      {/* Forms */}
      {showForm && (
        <div className="fixed inset-0 shadow-xl flex justify-center items-center z-50">
          <Form
            onClose={() => setShowForm(false)}
            event={"Anchors Away Event RSVP"}
            title={"Anchors Away Event RSVP"}
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

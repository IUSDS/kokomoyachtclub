import React, { useState } from "react";
import {
  events_hero,
  quay_401,
  fleet,
  building,
  sky,
  boat,
  section_two,
  image,
  section_3_whole,
  ocean,
  boat2,
} from "../assets/images";
import {
  calender,
  champagne,
  vector,
  location,
  calendar2,
} from "../assets/icons";

import op_logo from "../assets/logos/op_logo.png";

const Form = ({ onClose, event, title}) => {
  const [formData, setFormData] = useState({ name: "", email: "", phone_no: "", event_name: event });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState({ type: "", text: "" });

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

  // pick your API base from env (Vite / CRA)
  const API_BASE = import.meta.env.DEV
    ? "http://localhost:8000"
    : "https://api.kokomoyachtclub.vip";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });
    if (!validate()) return;

    try {
      const res = await fetch(`${API_BASE}/visitors/add-event-details`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error();

      setMessage({ type: "success", text: "Submitted successfully!" });
      setFormData({ name: "", email: "", phone_no: "" });
      setTimeout(() => onClose(), 3000);
    } catch (err) {
      setMessage({ type: "error", text: "Error submitting the form." });
    }
  };

  return (
    <div className="w-[90%] md:w-[90%] lg:w-[80%] xl:w-[50%] h-fit p-8 bg-midnightblue text-white rounded-lg shadow-xl relative">
      <button
        onClick={onClose}
        className="absolute top-3 right-4 text-white text-xl font-bold"
      >
        ✕
      </button>

      <h2 className="text-2xl mb-6 text-center font-semibold">{title}</h2>

      {message.text && (
        <div
          className={`text-sm mb-4 p-2 rounded ${
            message.type === "success" ? "bg-green-600" : "bg-red-500"
          }`}
        >
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label>Name</label>
          <input
            type="text"
            className="block w-full mt-1 p-2 rounded text-black"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          {errors.name && <p className="text-red-400 text-sm">{errors.name}</p>}
        </div>

        <div>
          <label>Email Address</label>
          <input
            type="email"
            className="block w-full mt-1 p-2 rounded text-black"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          {errors.email && (
            <p className="text-red-400 text-sm">{errors.email}</p>
          )}
        </div>

        <div>
          <label>Phone Number</label>
          <input
            type="number"
            className="block w-full mt-1 p-2 rounded text-black"
            value={formData.phone_no}
            onChange={(e) =>
              setFormData({ ...formData, phone_no: e.target.value })
            }
            maxLength={10}
          />
          {errors.phone_no && (
            <p className="text-red-400 text-sm">{errors.phone_no}</p>
          )}
        </div>

        <button
          type="submit"
          className="bg-white text-midnightblue font-semibold px-6 py-2 rounded-full hover:bg-gray-100"
        >
          Submit
        </button>
      </form>
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
          className="absolute top-[65%] left-1/2 transform -translate-x-1/2 text-white font-semibold w-[250px] md:w-[300px] text-lg md:text-2xl bg-midnightblue px-6 py-4 rounded-full shadow-lg hover:scale-105 transition-all duration-300"
        >
          RSVP NOW
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

      {/* KYCxOceanPrime */}
      <div className="flex flex-col gap-6 items-center justify-center">
        <div className="flex items-center font-bold text-midnightblue text-2xl xl:text-3xl">
          <p>In Collaboration With</p>
        </div>
        <div className="flex items-center">
          <img
            src={op_logo}
            alt="Ocean Prime logo"
            className="w-56 md:w-40 xl:w-80"
          />
        </div>
      </div>

      {/* Section 3 Mobile View */}
      <div className="md:hidden flex flex-col justify-center items-center space-y-4 px-6">
        {/* Img Box */}
        <div className="relative w-full">
          <div className="absolute top-6 -left-3 h-10 w-4 rounded-md bg-midnightblue" />
          <img
            src={fleet}
            alt="A fleet preview"
            className="w-full rounded-lg"
          />
          <div className="absolute top-2 -left-3 flex items-center gap-2 bg-midnightblue rounded-e-xl px-4 h-12">
            <img src={calender} alt="calendar icon" className="w-6 h-6" />
            <div className="flex flex-col justify-center text-white text-xs">
              <p>UPCOMING</p>
              <p>THURSDAY, JULY 10 | 5:00 - 8:00 PM</p>
            </div>
          </div>
        </div>

        <div className="bg-midnightblue h-16 w-full rounded-md flex items-center justify-center gap-2 text-white">
          <img src={champagne} alt="Champagne icon" className="w-10 h-10" />
          <p className="font-bold">GRAND OPENING AT THE QUAY COMMONS</p>
          <img src={champagne} alt="Champagne icon" className="w-10 h-10" />
        </div>

        <img
          src={building}
          alt="Building | Quay Commons"
          className="rounded-md w-full"
        />

        <div className="rounded-md w-full border-2 border-midnightblue pb-8 mb-10 space-y-8">
          <div className="relative inline-block">
            <img src={vector} alt="vector art" className="block w-full" />
            <p className="absolute inset-0 flex justify-center items-center text-white font-semibold text-center px-4">
              AN INVITATION TO THE INNER CIRCLE
            </p>
          </div>
          <p className="text-midnightblue text-center">
            Kokomo Yacht Club cordially invites you to the unveiling of their
            new waterfront home at Sarasota's most prestigious address.
          </p>
          <div className="flex flex-col items-center justify-center">
            <img src={location} alt="location icon" className="w-12" />
            <p className="text-midnightblue text-center">
              501 Quay Commons | Sarasota, Florida
            </p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <img src={calendar2} alt="calendar icon" className="w-12" />
            <p className="text-midnightblue text-center">
              Thursday, July 10 | 5:00 - 8:00 PM
            </p>
          </div>
        </div>
      </div>

      {/* Section 3 Desktop View */}
      <div className="hidden md:flex md:justify-center md:items-center px-10">
        <img src={section_3_whole} alt="image of section 3" />
      </div>

      {/* Section 4 */}
      <div className="text-midnightblue md:py-16 text-center font-semibold text-lg md:text-xl lg:text-2xl md:gap-4 px-8 flex flex-col items-center justify-center ">
        <p>
          ENJOY A FIRST LOOK AT OUR NEWLY EXPANDED LUXURY FLEET WHILE IMMERSING YOURSELF IN THE CHARM OF SARASOTA'S MOST UNIQUE LUXURY BOATING CLUB. 
        </p>
        <p>
          KINDLY RSVP BY JULY 7 TO RESERVE YOUR SPOT—AND JOIN US FOR AN EXCLUSIVE POST-EVENT SUNSET CRUISE.
        </p>
        <button
          onClick={() => setShowForm(true)}
          className="text-white font-semibold mt-4 w-[250px] md:w-[300px] text-lg md:text-2xl bg-midnightblue px-6 py-4 rounded-full shadow-lg hover:scale-105 transition-all duration-300"
        >
          RSVP NOW
        </button>
      </div>

      {/* Section 5 */}
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
            Get On the List
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
          <button onClick={() => setShowEmailSignupForm(true)} className="text-white border border-white md:text-xl lg:text-2xl rounded-full px-4 md:px-6 xl:px-10 py-1 bg-white/10 hover:bg-white hover:text-midnightblue transition">
            Join Our Guest List
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
          <Form onClose={() => setShowForm(false)} event={"Grand Opening at The Quay"} title={"The Inner Circle RSVP"} />
        </div>
      )}
      {showEmailSignupForm && (
        <div className="fixed inset-0 shadow-xl flex justify-center items-center z-50">
          <Form onClose={() => setShowEmailSignupForm(false)} event={"Email Marketing"} title={"Join Our Guest List"} />
        </div>
      )}
    </div>
  );
};

export default Event;

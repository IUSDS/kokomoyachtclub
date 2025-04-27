import React, { useState, useEffect } from "react";
import { User, Medal, DollarSign, Menu, ChevronRight } from "lucide-react";
import yacht_club_logo from "../assets/logos/favicon2.png";
import { div } from "framer-motion/client";
import useAuthStore from "../authStore";
import { useNavigate } from "react-router-dom";
import { cert, coins, dp, user_icon } from "../assets/icons/index";

const NewMemberPortal = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { user, isLoggedIn, checkSession } = useAuthStore();
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    } else if (!user) {
      // If the user exists but isn't loaded yet, check session
      // checkSession();
    }
  }, [isLoggedIn, user, navigate, checkSession]);

  if (error) {
    return <div>{error}</div>;
  }

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className="bg-midnightblue p-4">
      <div className="flex bg-gray-100 rounded-lg shadow-lg">
        {/* Sidebar */}
        <div className="hidden md:flex flex-col text-white w-20 p-2 shadow-xl">
          <div className="flex-1 flex flex-col items-center justify-between py-4 gap-6">
            <div className="mt-4">
              <img src={yacht_club_logo} alt="" className="w-20" />
            </div>
            <div className="flex flex-col ">
              <span className="text-xl font-semibold whitespace-nowrap text-midnightblue transform -rotate-90">
                KOKOMO YACHT CLUB
              </span>
            </div>
            <div className="">
              <img src={user_icon} alt="" className="w-10 cursor-pointer" />
            </div>
          </div>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden fixed top-4 left-4 z-50">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="bg-blue-900 text-white p-2 rounded-md"
          >
            <Menu size={24} />
          </button>
        </div>

        {/* Mobile sidebar */}
        {isMenuOpen && (
          <div className="md:hidden fixed inset-0 z-40 bg-blue-900 text-white p-8">
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-yellow-400 flex items-center justify-center rounded">
                  <span className="text-blue-900 font-bold">YC</span>
                </div>
                <span className="text-xl font-bold">KOKOMO YACHT CLUB</span>
              </div>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="text-white"
              >
                <ChevronRight size={24} />
              </button>
            </div>
            <div className="flex flex-col gap-6 text-lg">
              <button className="text-left">Dashboard</button>
              <button className="text-left">Profile</button>
              <button className="text-left">Bookings</button>
              <button className="text-left">Services</button>
              <button className="text-left">Settings</button>
            </div>
          </div>
        )}

        {/* Main content */}
        <div className="flex-1 flex flex-col">
          {/* Main area */}
          <div className="flex-1 p-4 md:p-8">
            <div className="flex flex-col md:flex-row justify-between mb-6">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-blue-900">
                  Dashboard
                </h1>
                <p className="text-blue-700">Welcome Back!</p>
              </div>
            </div>

            {/* Content area - placeholder for main dashboard content */}
            <div className="">
              {/* Dashboard content would go here */}
              <iframe
                className="w-full h-[800px] mx-auto"
                src="https://fareharbor.com/embeds/book/kokomocharters/?full-items=yes&flow=1257684"
                title="FareHarbor Item Grid"
                allowFullScreen
                sandbox="allow-scripts allow-same-origin allow-forms allow-top-navigation-by-user-activation"
              />
            </div>
          </div>
        </div>

        {/* Right sidebar with user info */}
        <div className="hidden md:block w-80 border-l border-gray-200 px-6 py-10 shadow-xl rounded-r-lg space-y-4">
          {/* Name and Member Image */}
          <div className="flex justify-between">
            <div className="flex flex-col space-y-1">
              <p className="text-lg text-gray-700">Hello,</p>
              <p className="text-midnightblue text-4xl font-bold">
                {user.first_name}!
              </p>
            </div>
            {/* <img src={dp} alt="Default display pic" className="w-20" /> */}
            {imageError ? (
              <img src={dp} alt="Default display pic" className="w-20" />
            ) : (
              <img
                src={user.picture_url}
                alt="Profile"
                className="w-20 object-cover"
                onError={handleImageError}
              />
            )}
          </div>
          {/* Membership type and Points */}
          <div className="flex justify-between">
            <div className="rounded-full bg-midnightblue flex justify-evenly items-center w-[120px] h-[30px]">
              <img src={cert} alt="certificate icon" className="h-6" />
              <p className="text-amber-300 text-sm font-semibold">
                {user.membership_type}
              </p>
            </div>
            <div className="rounded-full bg-midnightblue flex justify-evenly items-center w-[120px] h-[30px]">
              <img src={coins} alt="certificate icon" className="h-6" />
              <p className="text-amber-300 text-sm font-semibold">
                {user.points} MP
              </p>
            </div>
          </div>

          {/* Member Info */}
          <div className="bg-blue-800 text-white p-4 rounded-lg">
            <h3 className="text-xl font-bold mb-4">Member Information</h3>

            <div className="mb-4">
              <p className="text-sm mb-1">Email</p>
              <p className="text-sm">{user.email_id}</p>
            </div>

            <div className="mb-4">
              <p className="text-sm mb-1">Phone No.</p>
              <p className="text-sm">{user.phone_number || "N/A"}</p>
            </div>

            <div className="mb-4">
              <p className="text-sm mb-1">Address</p>
              <p className="text-sm">
                {user.member_address1}, {user.member_address2}
              </p>
              <p className="text-sm">
                {user.member_city}, {user.member_state} {user.member_zip}
              </p>
            </div>

            <div className="mb-2">
              <p className="text-sm mb-1">Emergency Contact</p>
              <p className="text-sm">{user.emergency_name}</p>
              <p className="text-sm">{user.emergency_contact}</p>
              <p className="text-sm">{user.emergency_relationship}</p>
            </div>
          </div>

          {/* Helpful Links */}
          <div className="bg-blue-800 text-white p-4 rounded-lg">
            <h3 className="text-xl font-bold mb-4">Helpful Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm hover:underline">
                  Member Services
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hover:underline">
                  Update Details
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hover:underline">
                  Booking Details
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewMemberPortal;

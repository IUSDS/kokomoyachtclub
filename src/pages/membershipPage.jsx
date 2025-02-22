import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import ImageCard from '../components/imageCard';
import { boca, captiva, keywest, marco, loginImg, naples } from '../assets/images';
import { API_URL } from '../constant';
import useAuthStore from '../authStore';


const MembershipPage = () => {
  const [memberDetails, setMemberDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  const fetchMemberDetails = async () => {
    const username = localStorage.getItem("username");

    if (!username) {
      setError("No username found. Please log in again.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`https://api.kokomoyachtclub.vip/new-userdetail/user-details/?username=${username}`);

      if (response.ok) {
        const data = await response.json();
        setMemberDetails(data);
      } else {
        setError("Failed to fetch member details");
      }
    } catch (error) {
      setError("An error occurred while fetching member details");
    } finally {
      setLoading(false);
    }
  };

  const handlePreviousBooking = () => {
    navigate("previous_booking");
  }

  const handleExperience = () => {
    const url = "/membership/plan_experiences";
    window.open(url, "_blank");
  }

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [isLoggedIn])

  useEffect(() => {
    fetchMemberDetails();
    // window.scrollTo(0, 0);
  }, []);

  // Render loading state, error, or member details
  if (loading) {
    return <div className='w-full text-center'>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="flex flex-col justify-center items-center overflow-x-hidden space-y-8">
      {/* Hero Section */}
      <div className="relative">
        <img className="w-screen h-[150px] md:h-fit object-cover" src={loginImg} alt="Hero" />
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <p className="absolute text-white font-bold top-[40%] text-center text-xl w-full md:text-6xl">
          Member Services
        </p>
      </div>

      {/* Welcome Section */}
      <div className="font-bold text-midnightblue md:text-3xl text-xl xl:text-6xl">Welcome</div>

      {/* User details */}
      <div className='flex flex-col md:flex-row w-full md:justify-evenly items-center '>
        {/* Member Info */}
        <div className="flex flex-col justify-center items-center md:w-1/2">
          <div className="bg-white md:w-full p-6 rounded-lg shadow-lg">
            <div className="space-y-4">
              {/* Profile Picture */}
              <div className="flex justify-center">
                <img
                  src={memberDetails.picture_url}
                  alt="Profile"
                  className="w-24 h-24 rounded-full border-2 border-gray-300"
                />
              </div>

              {/* Full Name */}
              <h3 className="text-xl font-semibold text-gray-800 text-center md:text-start">
                {memberDetails.first_name} {memberDetails.last_name}
              </h3>

              {/* Membership Type */}
              <div className="flex items-center space-x-2 justify-center md:justify-start">
                <span className="text-sm text-gray-500">Membership Type:</span>
                <span className="px-3 py-1 text-sm font-medium bg-blue-100 text-blue-800 rounded-full">
                  {memberDetails.membership_type || "N/A"}
                </span>
              </div>

              {/* Points Balance */}
              <div className="flex flex-col items-center md:items-start justify-between text-center rounded-lg">
                <p className="text-sm font-medium text-gray-500">Points Balance</p>
                <p className="mt-1 text-2xl font-bold text-gray-900">{memberDetails.points}</p>
              </div>

              {/* Contact Info */}
              <div className="flex flex-col items-center md:items-start justify-between text-center rounded-lg">
                <h4 className="text-lg font-semibold text-gray-700">Contact Information</h4>
                <p className="text-sm text-gray-500">{memberDetails.email_id}</p>
                <p className="text-sm text-gray-500">{memberDetails.phone_number || "N/A"}</p>
              </div>

              {/* Address */}
              <div className="flex flex-col items-center md:items-start justify-between text-center rounded-lg">
                <h4 className="text-lg font-semibold text-gray-700">Address</h4>
                <p className="text-sm text-gray-500">
                  {memberDetails.member_address1}, {memberDetails.member_address2}
                </p>
                <p className="text-sm text-gray-500">
                  {memberDetails.member_city}, {memberDetails.member_state} {memberDetails.member_zip}
                </p>
              </div>

              {/* Emergency Contact (if available) */}
              {memberDetails.emergency_name && (
                <div className="flex flex-col items-center md:items-start justify-between text-center rounded-lg">
                  <h4 className="text-lg font-semibold text-gray-700">Emergency Contact</h4>
                  <p className="text-sm text-gray-500">{memberDetails.emergency_name}</p>
                  <p className="text-sm text-gray-500">{memberDetails.emergency_contact}</p>
                  <p className="text-sm text-gray-500">Relationship: {memberDetails.emergency_relationship}</p>
                </div>
              )}

              {/* Company Name (if applicable) */}
              {memberDetails.company_name && (
                <div className="flex flex-col items-center md:items-start justify-between text-center rounded-lg">
                  <h4 className="text-lg font-semibold text-gray-700">Company</h4>
                  <p className="text-sm text-gray-500">{memberDetails.company_name}</p>
                </div>
              )}

              {/* Referral Information */}
              {memberDetails.referral_information && (
                <div className="mt-4">
                  <h4 className="text-lg font-semibold text-gray-700">Referral Information</h4>
                  <p className="text-sm text-gray-500">{memberDetails.referral_information}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Plan Your Experiences Section */}
      <div className="flex-grow w-full p-4 space-y-8">
        <h1 className='xl:text-4xl text-center text-midnightblue font-bold'>Plan your Experiences</h1>
        <iframe
          className="w-full h-[800px] mx-auto"
          src="https://fareharbor.com/embeds/book/kokomocharters/?full-items=yes&flow=1257684"
          title="FareHarbor Item Grid"
          allowFullScreen
          sandbox="allow-scripts allow-same-origin allow-forms allow-top-navigation-by-user-activation"
        />
      </div>

      {/* Buttons Section */}
      {/* <div className='flex flex-col md:flex-row gap-4 md:gap-8 my-8'>
        <button
          onClick={handleExperience}
          className="py-4 px-6 bg-midnightblue/90 text-white rounded-lg hover:bg-midnightblue shadow-lg"
        >
          PLAN YOUR EXPERIENCE
        </button>
        <button
          onClick={handlePreviousBooking}
          className="py-4 px-6 bg-midnightblue/90 text-white rounded-lg hover:bg-midnightblue shadow-lg"
        >
          CHECK PREVIOUS BOOKINGS
        </button>
      </div> */}

      {/* Overnight Cruising Adventures */}
      {/* <div className="flex flex-col justify-center items-center mt-8 gap-4">
        <p className="font-bold text-lg">Overnight Cruising Adventures</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mx-4">
          <ImageCard link={boca} name="BOCA GRANDE - GASPARILLA" />
          <ImageCard link={naples} name="NAPLES" />
          <ImageCard link={keywest} name="KEY WEST" />
          <ImageCard link={captiva} name="CAPTIVA & SANIBEL ISLAND" />
          <ImageCard link={marco} name="MARCO ISLAND" />
        </div>
      </div> */}
    </div>
  );
};

export default MembershipPage;

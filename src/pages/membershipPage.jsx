import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import ImageCard from '../components/imageCard';
import { boca, captiva, keywest, marco, memberImg, naples } from '../assets/images';
import { API_URL } from '../constant';
import useAuthStore from '../authStore';


const MembershipPage = () => {
  // const [calenderOpen, setCalenderOpen] = useState(false);
  // const [selectedDate, setSelectedDate] = useState(null);
  const [memberDetails, setMemberDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  // Function to make the API request and get member details
  const fetchMemberDetails = async () => {
    const username = localStorage.getItem("username");

    if (!username) {
      setError("No username found. Please log in again.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`https://kokomoyachtclub.vip/get/user-details/?username=${username}`);

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
  },[isLoggedIn])

  useEffect(() => {
    fetchMemberDetails();
    // window.scrollTo(0, 0);
  }, []);

  // Render loading state, error, or member details
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="flex flex-col justify-center items-center overflow-x-hidden">
      {/* Hero Section */}
      <div className="relative">
        <img className="w-screen h-fit object-cover" src={memberImg} alt="Hero" />
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <p className="absolute text-white font-bold top-[45%] text-center text-xl w-full md:text-6xl">
          Member Services
        </p>
      </div>

      {/* Welcome Section */}
      <div className="font-semibold md:text-3xl text-xl mt-4">Welcome</div>

      {/* User details */}
      <div className='flex flex-col md:flex-row w-full md:justify-evenly items-center '>
        {/* Picture */}
        {memberDetails.picture_url && (
          <div className="mt-4">
            <img
              src={memberDetails.picture_url}
              alt="Member"
              className="w-20 md:w-40 md:h-40 h-20 rounded-full object-cover border-2 border-gray-200"
            />
          </div>
        )}

        {/* Member Info and Date Selection */}
        <div className="flex flex-col justify-center items-center my-2 md:w-1/2">
          {/* Member Info Section */}
          {memberDetails ? (
            <div className="bg-white md:w-full p-6 rounded-lg shadow-lg">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-800 text-center md:text-start">{memberDetails.full_name}</h3>
                <div className="flex items-center space-x-2 justify-center md:justify-start">
                  <span className="text-sm text-gray-500">Membership Type:</span>
                  <span className="px-3 py-1 text-sm font-medium bg-blue-100 text-blue-800 rounded-full">
                    {memberDetails.membership_type}
                  </span>
                </div>

                <div className="flex flex-col items-center md:items-start justify-between text-center rounded-lg">
                  <p className="text-sm font-medium text-gray-500">Points Balance</p>
                  <p className="mt-1 text-2xl font-bold text-gray-900">{memberDetails.points}</p>
                </div>
              </div>
            </div>
          ) : (
            <div>No member data available</div>
          )}
        </div>
      </div>

      {/* Buttons Section */}
      <div className='flex flex-col md:flex-row gap-4 md:gap-8 my-8'>
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
      </div>

      {/* Overnight Cruising Adventures */}
      <div className="flex flex-col justify-center items-center mt-8 gap-4">
        <p className="font-bold text-lg">Overnight Cruising Adventures</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mx-4">
          <ImageCard link={boca} name="BOCA GRANDE - GASPARILLA" />
          <ImageCard link={naples} name="NAPLES" />
          <ImageCard link={keywest} name="KEY WEST" />
          <ImageCard link={captiva} name="CAPTIVA & SANIBEL ISLAND" />
          <ImageCard link={marco} name="MARCO ISLAND" />
        </div>
      </div>
    </div>
  );
};

export default MembershipPage;

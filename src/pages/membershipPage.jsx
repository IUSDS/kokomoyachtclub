import React, { useState, useEffect } from 'react';
import img from '../assets/images/member_page.png';
import MemberInfo from '../components/memberInfo';
import DatePicker from 'react-datepicker';
import DateButton from "../components/dateButton";
import ImageCard from '../components/imageCard';
import boca from '../assets/images/boca-grande.jpg';
import naples from '../assets/images/naples.jpg';
import keywest from '../assets/images/keywest.jpg';
import captiva from '../assets/images/captiva.jpg';
import marco from '../assets/images/marco.jpg';

const MembershipPage = () => {
  const [calenderOpen, setCalenderOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [memberDetails, setMemberDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to make the API request and get member details
  const fetchMemberDetails = async () => {
    try {
      const response = await fetch("http://3.27.181.229/user-details/?username=${username}", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setMemberDetails(data);
        setLoading(false);
        console.log('This is from membership page ',data);
      } else {
        setError("Failed to fetch member details");
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching member details:", error);
      setError("An error occurred while fetching member details");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMemberDetails(); // Fetch member details on component mount
    window.scrollTo(0, 0); // Scroll to top
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
        <img className="w-screen h-fit object-cover" src={img} alt="Hero" />
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <p className="absolute text-white font-bold top-[45%] text-center text-xl w-full md:text-6xl">
          Member Services
        </p>
      </div>

      {/* Welcome Section */}
      <div className="font-semibold md:text-3xl text-xl mt-4">Welcome</div>

      {/* Member Info and Date Selection */}
      <div className="flex flex-col w-full md:flex-row justify-between md:px-36 items-center gap-4">
        <div className="flex flex-col justify-center items-center my-2 w-full">
          {/* Member Info Section */}
          {memberDetails ? (
            <div>
              <h3>{memberDetails.full_name}</h3>
              <p>Membership Type: {memberDetails.membership_type}</p>
              <p>Points: {memberDetails.points}</p>
              {/* Render profile picture if available */}
              {memberDetails.picture_url && (
                <img src={memberDetails.picture_url} alt="Member" />
              )}
            </div>
          ) : (
            <div>No member data available</div>
          )}
        </div>

        {/* Date Selection Section */}
        <div className="relative items-center justify-start">
          <button onClick={() => setCalenderOpen(!calenderOpen)}>
            <DateButton />
          </button>
          {calenderOpen && (
            <div className="absolute z-10 top-7 mt-2 shadow-md rounded w-fit h-fit">
              <DatePicker
                selected={selectedDate}
                onChange={(date) => {
                  setSelectedDate(date);
                  setCalenderOpen(false);
                }}
                inline
              />
            </div>
          )}
        </div>
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

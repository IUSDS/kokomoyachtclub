import React, { useState } from 'react'
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

const membershipPage = () => {
  const [calenderOpen, setCalenderOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  // Function to make the API request
  const searchByDate = async (date) => {
    try {
      const formattedDate = date.toISOString().split("T")[0]; // Format to 'YYYY-MM-DD'
      const response = await fetch("https://api.example.com/search-by-date", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ date: formattedDate }),
      });

      const data = await response.json();
      console.log("API Response:", data);
    } catch (error) {
      console.error("Error sending API request:", error);
    }
  };

  return (
    <div className='flex flex-col justify-center items-center overflow-x-hidden'>
      {/* Hero Section Image */}
      <div className='relative '>
        <img className="w-screen h-fit object-cover" src={img} alt="" />
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <p className='absolute text-white font-bold top-[45%] text-center text-xl w-full md:text-6xl'>Member Services</p>
      </div>

      <div className='font-semibold md:text-3xl text-xl mt-4'>Welcome</div>

      <div className='flex flex-col w-full md:flex-row justify-between md:px-36 items-center gap-4'>
        {/* Member Info Section */}
        <div className='flex flex-col justify-center items-center my-2 md:w-full'>
          <MemberInfo />
        </div>

        {/* Date Selection section */}
        <div className='relative items-center justify-start'>
          <button onClick={() => setCalenderOpen(!calenderOpen)}>
            <DateButton />
          </button>

          {/* optional calender */}
          {calenderOpen && (
            <div className="absolute z-10 top-7 mt-2 shadow-md rounded w-fit h-fit">
              <DatePicker
                selected={selectedDate}
                onChange={(date) => {
                  setSelectedDate(date);
                  searchByDate(date);
                  setCalenderOpen(false);
                }} // Updates selected date
                inline
              />
            </div>
          )}
        </div>
      </div>

      {/* Yatch availibity info */}
      <div></div>

      {/* Over night cruising adventure */}
      <div className='flex flex-col justify-center items-center mt-8 gap-4'>
        <p className='font-bold text-lg'>Overnight Cruising Adventures</p>

        {/* Images */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8 mx-4'>
          <ImageCard link={boca} name="BOCA GRANDE - GASPARILLA" />
          <ImageCard link={naples} name="NAPLES" />
          <ImageCard link={keywest} name="KEY WEST" />
          <ImageCard link={captiva} name="CAPTIVA & SANIBEL ISLAND" />
          <ImageCard link={marco} name="MARCO ISLAND" />
        </div>
      </div>
    </div>
  )
}

export default membershipPage
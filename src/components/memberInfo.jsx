import React, { useState } from 'react'
import { FaUserCircle } from "react-icons/fa";
import 'react-datepicker/dist/react-datepicker.css'

const memberInfo = () => {
  const name = 'Test_user_01';
  const level = 'Rookie';
  const dueDate = '15/12/2004';
  const points = '113';
  
  return (
    <div className='flex flex-col md:flex-row md:gap-8 md:w-full items-center md:justify-start gap-4 p-2'>
      {/* User Image */}
      <FaUserCircle className='text-midnightblue' size={200} />

      {/* Information */}
      <div className='flex flex-col p-4 font-bold text-gray-500'>
        <div className='flex w-[300px] justify-between'>
          <p>Name:</p>
          <p>{name}</p>
        </div>
        <div className='flex w-[300px] justify-between'>
          <p>Memvership Level:</p>
          <p>{level}</p>
        </div>
        <div className='flex w-[300px] justify-between'>
          <p>Next Due Date:</p>
          <p>{dueDate}</p>
        </div>
        <div className='flex w-[300px] justify-between'>
          <p>Available Mariner Points:</p>
          <p>{points}</p>
        </div>
      </div>

      
    </div>
  )
}

export default memberInfo
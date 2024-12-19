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
      <div className='flex justify-evenly p-4 w-full font-semibold md:text-xl'>
        <div className='flex flex-col text-midnightblue'>
          <div className='flex justify-between'>
            <p>Name:</p>
          </div>
          <div className='flex justify-between'>
            <p>Membership Level:</p>
          </div>
          <div className='flex justify-between'>
            <p>Next Due Date:</p>
          </div>
          <div className='flex justify-between'>
            <p>Available Mariner  Points:</p>
          </div>
        </div>
        <div className='flex flex-col text-gray-600'>
          <div className='flex justify-between'>
            <p>{name}</p>
          </div>
          <div className='flex justify-between'>
            <p>{level}</p>
          </div>
          <div className='flex justify-between'>
            <p>{dueDate}</p>
          </div>
          <div className='flex justify-between'>
            <p>{points}</p>
          </div>
        </div>
      </div>


    </div>
  )
}

export default memberInfo
import React, { useState } from 'react'
import { BiBold } from 'react-icons/bi';
import { SlCalender } from "react-icons/sl";
import { IoSearchSharp } from "react-icons/io5";

const dateButton = () => {
  return ( 
    <div className='flex text-midnightblue cursor-pointer shadow-lg items-center justify-between w-[250px] border-2 rounded-md'>
        <div className='flex items-center'>
          <SlCalender className='m-2'/>
          <p>Search by date</p>
        </div>
        <div className='p-2 bg-midnightblue rounded-ee-md rounded-se-md'>  
          <IoSearchSharp className='text-white' />
        </div>
    </div>
  )
}

export default dateButton;
import React, { useState } from 'react';
import Table from './invoiceTable';
import { div } from 'framer-motion/client';

const createInvoiceForm = () => {
  const [bookingID, setBookingID] = useState('');
  const [outstandingAmount, setOutstandingAmount] = useState(500);
  const handleBookingIDChange = (e) => {
    setBookingID(e.target.value);
  }
  const handleCheck = () => { }
  return (
    <div className='flex flex-col mt-4 md:mt-0 gap-4'>

      <div className='flex flex-col'>
        <div className='flex flex-col md:flex-row items-center gap-4'>
          {/* Booking input field */}
          <div className='flex items-center justify-center gap-4 border border-midnightblue py-2 rounded-xl text-sm w-fit px-4'>
            <span>Enter Booking ID: </span>
            <div className="">
              <input
                type="text"
                id="bookingID"
                value={bookingID}
                onChange={handleBookingIDChange}
                className=" block w-full rounded-lg bg-gray-100 px-2 py-1 border border-midnightblue focus:outline-none text-midnightblue"
              />
            </div>
          </div>
          {/* Button */}
          <div className='w-full flex justify-center md:w-fit'>
            <button
              className="py-2 px-4 w-full bg-midnightblue/90 text-white rounded-lg hover:bg-midnightblue"
              onClick={handleCheck}>
              Check
            </button>
          </div>
        </div>
        
        {outstandingAmount && (
          <div className='flex px-4 py-1'>
            <span>Outstanding Amount: $</span>
            {outstandingAmount}
          </div>
        )}
      </div>

      {/* Table */}
      <div>
        <Table />
      </div>
    </div>
  )
}

export default createInvoiceForm;
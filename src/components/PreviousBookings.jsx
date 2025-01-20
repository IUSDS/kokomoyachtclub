import React, { useState } from 'react'
import BookingTable from './bookingTable';

const PreviousBookings = () => {
    const [username, setUsername] = useState('');
    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    }
    const handleCheck = () => {

    }
    return (
        <div className='flex flex-col items-center md:items-start space-y-4'>
            {/* Username Section */}
            <div className='flex flex-col md:flex-row items-center gap-4'>
                {/* Booking input field */}
                <div className='flex items-center justify-center gap-4 border border-midnightblue py-2 rounded-xl text-sm w-fit px-4'>
                    <span>Enter Username: </span>
                    <div className="">
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={handleUsernameChange}
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

            {/* Table Section */}
            <div className=''>
                <BookingTable />
            </div>
        </div>
    )
}

export default PreviousBookings
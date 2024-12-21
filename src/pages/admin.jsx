import React from 'react'

const admin = () => {
  return (
    <div className='flex flex-col text-midnightblue'>
        <h1 className='text-center font-bold text-2xl py-2'>Admin Dashboard</h1>

        {/* dashboard buttons */}
        <div className='flex gap-2 flex-col px-4'>
            <button className='py-2 px-4 border bg-midnightblue/10 hover:bg-midnightblue/20 rounded-lg border-midnightblue'>Add Points</button>
            <button className='py-2 px-4 border bg-midnightblue/10 hover:bg-midnightblue/20 rounded-lg border-midnightblue'>Update Membership</button>
            <button className='py-2 px-4 border bg-midnightblue/10 hover:bg-midnightblue/20 rounded-lg border-midnightblue'>Update User Details</button>
            <button className='py-2 px-4 border bg-midnightblue/10 hover:bg-midnightblue/20 rounded-lg border-midnightblue'>Add/Remove Members</button>
            <button className='py-2 px-4 border bg-midnightblue/10 hover:bg-midnightblue/20 rounded-lg border-midnightblue'>Create Invoice</button>
        </div>
    </div>
  )
}

export default admin
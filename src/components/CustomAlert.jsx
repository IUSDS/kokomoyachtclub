import React from 'react'

const CustomAlert = ({isVisible, onClose, title, body}) => {
    if(!isVisible) return null;
  return (
    <div className='fixed inset-0 h-screen bg-gray-800 bg-opacity-60 flex justify-center items-center z-50'>
        <div className='bg-white rounded-md shadow-lg p-4'>
            <div className='flex justify-between items-center'>
                <h2 className={`text-xl font-bold ${title === 'Successfull' ? 'text-green-600': title === 'Failed' ? 'text-red-600':'text-midnightblue'} `}>{title}</h2>
            </div>
            <div className='mt-4 text-black'>
                {body}
            </div>
            <div className='mt-4 flex justify-end'>
                <button className='bg-midnightblue text-white px-2 py-1 rounded hover:bg-blue-600 active:bg-blue-500' onClick={onClose}>
                    Close
                </button>
            </div>
        </div>
    </div>
  );
}

export default CustomAlert;
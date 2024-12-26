import React, { useState } from 'react';
import imgIcon from '../assets/images/imageIcon.png';

const AddPointsForm = () => {
  const [username, setUsername] = useState('');
  const [points, setPoints] = useState('');
  const [successMessage, setSuccessMessage] = useState(false);
  const [userData, setUserData] = useState(null);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://3.27.181.229/get/points/?username=${username}`);
      if (!response.ok) {
        throw new Error('User not found');
      }
      const data = await response.json();
      console.log(data);
      setUserData(data);
    } catch (err) {
      console.error("Error fetching user data:", err.message);
    }
  };

  const handleSave = async (e) => {
    try {
      const formData = new FormData();
      formData.append('username', username); 
      formData.append('add_points', Number(points));

      const response = await fetch('http://3.27.181.229/update/update-points/', {
        method: 'PUT',
        headers: {
          'accept': 'application/json',
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to update points');
      }

      const data = await response.json();

      if (data.status === "success") {
        console.log('Points updated successfully:', data.message);
        setSuccessMessage(true);
        handleSubmit(e);
        setTimeout(() => {
          setSuccessMessage(false);
          setPoints('');
        }, 3000);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Error updating points:', error);
      alert('Failed to update points. Please try again.');
    }
  };



  const handleCancel = () => {
    setUsername('');
    setPoints('');
    setSuccessMessage(false);
  };

  return (
    <div className='flex flex-col md:flex-row gap-4'>
      {/* User details section */}
      <div className="flex flex-col items-center md:w-1/2 md:pl-5 md:py-2 gap-4">
        {/* Select Username section */}
        <div className="bg-white shadow-lg rounded-2xl p-6 w-full md:h-40">
          <h2 className="text-lg font-semibold mb-4 text-center md:text-left">Add points to user profile</h2>
          <div className="flex flex-col md:flex-row md:items-end gap-4">
            {/* Image */}
            <div className='flex justify-center'>
              <img src={imgIcon} alt="" className='w-[50px]' />
            </div>
            {/* Form */}
            <div className="">
              <input
                type="text"
                id="username"
                value={username}
                onChange={handleUsernameChange}
                placeholder="Enter username"
                className="mt-1 block w-full px-4 py-2 border rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-midnightblue text-gray-600"
              />
            </div>
            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              className="py-2 px-4 bg-midnightblue/90 text-white rounded-lg hover:bg-midnightblue"
            >
              Submit
            </button>
          </div>
        </div>

        {/* user data section */}
        {userData && (
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden w-full max-w-2xl">
            {/* Table Header */}
            <div className="bg-gray-50 px-6 py-3 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-center md:text-left text-midnightblue">User Details</h3>
            </div>

            {/* Table Content */}
            <div className="divide-y divide-gray-200">
              <div className="flex hover:bg-gray-50">
                <div className="w-1/2 px-6 py-4 whitespace-nowrap bg-gray-50">
                  <span className="text-sm font-medium text-gray-600">Username</span>
                </div>
                <div className="w-1/2 px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-gray-900">{userData.username}</span>
                </div>
              </div>

              <div className="flex hover:bg-gray-50">
                <div className="w-1/2 px-6 py-4 whitespace-nowrap bg-gray-50">
                  <span className="text-sm font-medium text-gray-600">Points</span>
                </div>
                <div className="w-1/2 px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-gray-900">{userData.points}</span>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* main components section */}
      {userData && (
        <div className="md:w-1/2 h-fit md:mx-5 md:my-2 text-midnightblue mx-auto w-full bg-white p-6 rounded-2xl shadow-xl space-y-6">
          <h2 className="text-xl font-semibold flex flex-col md:flex-row items-center text-center md:text-left">
            Add Points to User Profile{``}
            {successMessage && (
              <span className="ml-4 text-green-500 text-sm font-medium">
                ✓ Successfully Updated
              </span>
            )}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Points Field */}
            <div className="flex flex-col space-y-1">
              <label className="text-center md:text-left font-medium">Points Details</label>
              <input
                type="number"
                placeholder="Enter points"
                value={points}
                onChange={(e) => setPoints(e.target.value)}
                className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-midnightblue"
              />
            </div>

            {/* Buttons */}
            <div className="flex justify-center md:justify-start space-x-4">
              <button
                onClick={handleSave}
                className="px-4 py-1 text-midnightblue border-midnightblue border rounded-md hover:bg-midnightblue hover:text-white"
              >
                Save
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-1 text-midnightblue border-midnightblue border rounded-md hover:bg-midnightblue hover:text-white"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default AddPointsForm;

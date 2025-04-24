import React, { useState } from 'react';
import imgIcon from '../assets/images/imageIcon.webp';
import { API_URL } from '../constant';
import { SiSuperuser } from 'react-icons/si';

const UpdateMembershipForm = () => {
  const [username, setUsername] = useState('');
  const [membershipType, setMembershipType] = useState('');
  const [errorMessage, setErrorMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [userData, setUserData] = useState(null);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://api.kokomoyachtclub.vip/get-membership/get-membership/?username=${username}`);
      if (!response.ok) {
        throw new Error('User not found!');
      }
      const data = await response.json();
      // console.log(data);
      setUserData(data);
    } catch (err) {
      setErrorMessage(err.message);
      console.error("Error fetching user data:", err.message);
      setTimeout(() => {
        setUsername('');
        setUserData(null);
        setErrorMessage('');
      }, 3000);
    }
  };

  const handleSave = async (e) => {
    try {
      const formData = new FormData();
      formData.append('username', username);
      formData.append('membership_type', membershipType);

      const response = await fetch(`https://api.kokomoyachtclub.vip/get-membership/update-membership/`, {
        method: 'PUT',
        headers: {
          'accept': 'application/json',
        },
        body: formData,
      });

      if (response.ok) {
        setSuccessMessage(true);
        await handleSubmit(e); // Refresh data after successful update
        setTimeout(() => {
          setSuccessMessage(false);
        }, 4000);
      } else {
        setErrorMessage('Failed to add member.');
        console.log(data.message);
      }

      const data = await response.json();

    } catch (error) {
      console.error('Error updating membership:', error);
      setErrorMessage('Failed to add membership. Please try again.');
      setTimeout(() => {
        setSuccessMessage(false);
        setMembershipType('');
      }, 4000);
    }
  };

  const handleCancel = () => {
    setUsername('');
    setUserData(null);
    setSuccessMessage(false);
  };

  return (
    <div className='flex flex-col md:flex-row gap-4'>
      {/* User details section */}
      <div className="flex flex-col items-center md:w-1/2 md:pl-5 md:py-2 gap-4">
        {/* Select Username section */}
        <div className="bg-white shadow-lg rounded-2xl p-6 w-full md:h-40">
          <h2 className="text-lg font-semibold mb-4 text-center md:text-left">Update Membership</h2>
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
            {/* Error message */}
            {errorMessage && (
              <div className="self-stretch text-red-500 text-sm mx-auto md:mx-0 md:mt-4">
                {errorMessage}
              </div>
            )}
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
                  <span className="text-sm font-medium text-gray-600">Membership</span>
                </div>
                <div className="w-1/2 px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-gray-900">{userData.membership_type}</span>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* main components section */}
      {userData && (
        <div className="md:w-1/2 h-fit md:mx-5 md:my-2 text-midnightblue mx-auto w-full bg-white p-6 rounded-2xl shadow-xl space-y-6">
          <h2 className="text-xl font-semibold text-midnightblue flex flex-col md:flex-row items-center">
            Update Membership
            {successMessage && (
              <span className="ml-4 text-green-500 text-sm font-medium">
                Successfully Updated ✓
              </span>
            )}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col space-y-1">
              <label className="font-medium text-center md:text-left">Membership Type</label>
              <select
                value={membershipType}
                onChange={(e) => setMembershipType(e.target.value)}
                className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-midnightblue/80"
              >
                <option value="" disabled>Select Membership Type</option>
                <option value="Silver" disabled={userData.membership_type === "Silver"}>Silver</option>
                <option value="Gold" disabled={userData.membership_type === "Gold"}>Gold</option>
                <option value="Platinum" disabled={userData.membership_type === "Platinum"}>Platinum</option>
                <option value="Premium" disabled={userData.membership_type === "Premium"}>Premium</option>
              </select>
            </div>

            <div className="flex space-x-4">
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

export default UpdateMembershipForm;
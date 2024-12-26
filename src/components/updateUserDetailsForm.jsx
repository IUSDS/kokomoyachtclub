import React, { useState } from 'react'
import imgIcon from '../assets/images/imageIcon.png';

const UpdateUserDetailsForm = () => {
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [successMessage, setSuccessMessage] = useState(false);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://3.27.181.229/user-details/?username=${username}`);
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

  const handleCancel = () => {
    setFirstName('');
    setLastName('');
    setPhone('');
    setAddress('');
    setEmail('');
    setSuccessMessage(false);
  };

  return (
    <div className='flex flex-col md:flex-row gap-4'>
      {/* User details section */}
      <div className="flex flex-col items-center md:w-1/2 md:pl-5 md:py-2 gap-4">
        {/* Select Username section */}
        <div className="bg-white shadow-lg rounded-2xl p-6 w-full md:h-40">
          <h2 className="text-lg font-semibold mb-4 text-center md:text-left">Update user details</h2>
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
                  <span className="text-sm text-gray-900">{userData.full_name}</span>
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

      {/* Main content section */}
      {userData && (
        <div className="md:w-1/2 md:mx-5 md:my-2 text-midnightblue mx-auto w-full bg-white p-6 rounded-2xl shadow-xl space-y-6">
          <h2 className="text-xl font-semibold flex items-center">
            Update User Details
            {successMessage && (
              <span className="ml-4 text-green-500 text-sm font-medium">
                ✓ Successfully Updated
              </span>
            )}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col space-y-1">
              <label className="font-medium text-midnightblue">First Name</label>
              <input
                type="text"
                placeholder="Enter first name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-midnightblue"
              />
            </div>

            <div className="flex flex-col space-y-1">
              <label className="font-medium text-midnightblue">Last Name</label>
              <input
                type="text"
                placeholder="Enter last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-midnightblue"
              />
            </div>

            <div className="flex flex-col space-y-1">
              <label className="font-medium text-midnightblue">Phone Number</label>
              <input
                type="text"
                placeholder="Enter phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-midnightblue"
              />
            </div>

            <div className="flex flex-col space-y-1">
              <label className="font-medium text-midnightblue">Address</label>
              <input
                type="text"
                placeholder="Enter address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-midnightblue"
              />
            </div>

            <div className="flex flex-col space-y-1">
              <label className="font-medium text-midnightblue">Email</label>
              <input
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-midnightblue"
              />
            </div>

            <div className="flex space-x-4">
              <button
                type="submit"
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

export default UpdateUserDetailsForm;

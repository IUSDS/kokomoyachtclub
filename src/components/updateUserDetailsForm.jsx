import React, { useState } from 'react'
import imgIcon from '../assets/images/imageIcon.webp';
import { API_URL } from '../constant';

const UpdateUserDetailsForm = () => {
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState(null);
  const [firstName, setFirstName] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('')
  const [lastName, setLastName] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [picture, setPicture] = useState(null);
  const [successMessage, setSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [memberCity, setMemberCity] = useState('');
  const [memberState, setMemberState] = useState('');
  const [memberZip, setMemberZip] = useState('');
  const [dl, setDl] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [points, setPoints] = useState('');
  const [membership, setMembership] = useState('');

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    setErrorMessage('');
    try {
      const response = await fetch(`https://api.kokomoyachtclub.vip/new-userdetail/user-details/?username=${username}`);
      if (!response.ok) {
        throw new Error('User not found!');
      }
      const data = await response.json();
      setUserData(data);

      // Sync form state with fetched user data
      setFirstName(data.first_name || '');
      setLastName(data.last_name || '');
      setPhoneNumber('');
      setAddress1(data.address1 || '');
      setAddress2(data.address2 || '');
      setPassword(''); // Clear password field for security
    } catch (err) {
      console.error("Error fetching user data:", err.message);
      setErrorMessage(err.message);
      setTimeout(() => {
        setErrorMessage('')
      }, 5000)
    }
  };


  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append('password', password);
      formData.append('username', username);
      formData.append('first_name', firstName);
      formData.append('last_name', lastName);
      formData.append('phone_number', phoneNumber);
      formData.append('member_address1', address1);
      formData.append('member_address2', address2);
      formData.append('member_city', memberCity);
      formData.append('member_state', memberState);
      formData.append('memberZip', memberZip);
      formData.append('dl', dl);
      formData.append('company_name', companyName);
      if (picture) formData.append('file', picture);

      const response = await fetch(`https://api.kokomoyachtclub.vip/update/update/user/`, {
        method: 'PUT',
        body: formData,
      });

      if (response.ok) {
        setSuccessMessage(true);
        await handleSubmit(); // Refresh data after successful update
        setTimeout(() => {
          setSuccessMessage(false);
          handleCancel();
        }, 4000);
      } else {
        setErrorMessage('Failed to update member.');
      }
    } catch (e) {
      console.error('Error updating member:', e);
      setErrorMessage('Failed to update member.');
    }
  };


  const handleCancel = () => {
    setFirstName('');
    setLastName('');
    setPhoneNumber('');
    setAddress1('');
    setAddress2('');
  };

  const handlePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) setPicture(file);
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
            {/* Error message */}
            {errorMessage && (
              <div className="self-stretch text-red-500 text-sm mx-auto md:mx-0 md:mt-4">
                {errorMessage}
              </div>
            )}
          </div>
        </div>

        {/* user data section */}
        {userData && (
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden w-full max-w-2xl">
            {/* Table Header */}
            <div className="bg-gray-50 px-6 py-3 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-center md:text-left text-midnightblue">User Details</h3>
            </div>

            {/* Picture Section */}
            <div className="flex justify-center p-6">
              <img
                src={userData.picture_url}
                alt={`${userData.full_name}'s Profile`}
                className="rounded-full w-32 h-32 object-cover shadow-lg"
              />
            </div>

            {/* Table Content */}
            <div className="divide-y divide-gray-200">
              <div className="flex hover:bg-gray-50">
                <div className="w-1/2 px-6 py-4 whitespace-nowrap bg-gray-50">
                  <span className="text-sm font-medium text-gray-600">Member ID</span>
                </div>
                <div className="w-1/2 px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-gray-900">{userData.member_id}</span>
                </div>
              </div>

              <div className="flex hover:bg-gray-50">
                <div className="w-1/2 px-6 py-4 whitespace-nowrap bg-gray-50">
                  <span className="text-sm font-medium text-gray-600">Full Name</span>
                </div>
                <div className="w-1/2 px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-gray-900">{userData.first_name + " " + userData.last_name}</span>
                </div>
              </div>

              <div className="flex hover:bg-gray-50">
                <div className="w-1/2 px-6 py-4 whitespace-nowrap bg-gray-50">
                  <span className="flex flex-col md:flex-row md:gap-1 text-sm font-medium text-gray-600">
                    <span>Membership</span>
                    <span>Type</span>
                  </span>
                </div>
                <div className="w-1/2 px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-gray-900">{userData.membership_type}</span>
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

              <div className="flex hover:bg-gray-50">
                <div className="w-1/2 px-6 py-4 whitespace-nowrap bg-gray-50">
                  <span className="flex flex-col md:flex-row md:gap-1 text-sm font-medium text-gray-600">
                    <span>Phone</span>
                    <span>Number</span>
                  </span>
                </div>
                <div className="w-1/2 px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-gray-900">{userData.phone_number}</span>
                </div>
              </div>

              <div className="flex hover:bg-gray-50">
                <div className="w-1/2 px-6 py-4 whitespace-nowrap bg-gray-50">
                  <span className="text-sm font-medium text-gray-600">Email ID</span>
                </div>
                <div className="w-1/2 px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-gray-900">{userData.email_id}</span>
                </div>
              </div>

              <div className="flex hover:bg-gray-50">
                <div className="w-1/2 px-6 py-4 whitespace-nowrap bg-gray-50">
                  <span className="text-sm font-medium text-gray-600">Address1</span>
                </div>
                <div className="w-1/2 px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-gray-900">{userData.member_address1}</span>
                </div>
              </div>

              <div className="flex hover:bg-gray-50">
                <div className="w-1/2 px-6 py-4 whitespace-nowrap bg-gray-50">
                  <span className="text-sm font-medium text-gray-600">Address2</span>
                </div>
                <div className="w-1/2 px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-gray-900">{userData.member_address1}</span>
                </div>
              </div>

              <div className="flex hover:bg-gray-50">
                <div className="w-1/2 px-6 py-4 whitespace-nowrap bg-gray-50">
                  <span className="text-sm font-medium text-gray-600">City</span>
                </div>
                <div className="w-1/2 px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-gray-900">{userData.member_city}</span>
                </div>
              </div>

              <div className="flex hover:bg-gray-50">
                <div className="w-1/2 px-6 py-4 whitespace-nowrap bg-gray-50">
                  <span className="text-sm font-medium text-gray-600">State</span>
                </div>
                <div className="w-1/2 px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-gray-900">{userData.member_state}</span>
                </div>
              </div>

              <div className="flex hover:bg-gray-50">
                <div className="w-1/2 px-6 py-4 whitespace-nowrap bg-gray-50">
                  <span className="text-sm font-medium text-gray-600">Zip</span>
                </div>
                <div className="w-1/2 px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-gray-900">{userData.member_zip}</span>
                </div>
              </div>

              <div className="flex hover:bg-gray-50">
                <div className="w-1/2 px-6 py-4 whitespace-nowrap bg-gray-50">
                  <span className="flex flex-col md:flex-row md:gap-1 text-sm font-medium text-gray-600">
                    <span>Referral</span>
                    <span>Information</span>
                  </span>
                </div>
                <div className="w-1/2 px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-gray-900">{userData.referral_information}</span>
                </div>
              </div>

              <div className="flex hover:bg-gray-50">
                <div className="w-1/2 px-6 py-4 whitespace-nowrap bg-gray-50">
                  <span className="flex flex-col md:flex-row md:gap-1 text-sm font-medium text-gray-600">
                    <span>Emergency </span>
                    <span>Contact</span>
                  </span>
                </div>
                <div className="w-1/2 px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-gray-900">{userData.emergency_contact}</span>
                </div>
              </div>

              <div className="flex hover:bg-gray-50">
                <div className="w-1/2 px-6 py-4 whitespace-nowrap bg-gray-50">
                  <span className="flex flex-col md:flex-row md:gap-1 text-sm font-medium text-gray-600">
                    <span>Emergency </span>
                    <span>Email</span>
                  </span>
                </div>
                <div className="w-1/2 px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-gray-900">{userData.emergency_email}</span>
                </div>
              </div>

              <div className="flex hover:bg-gray-50">
                <div className="w-1/2 px-6 py-4 whitespace-nowrap bg-gray-50">
                  <span className="flex flex-col md:flex-row md:gap-1 text-sm font-medium text-gray-600">
                    <span>Emergency </span>
                    <span>Relationship</span>
                  </span>
                </div>
                <div className="w-1/2 px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-gray-900">{userData.emergency_relationship}</span>
                </div>
              </div>

              <div className="flex hover:bg-gray-50">
                <div className="w-1/2 px-6 py-4 whitespace-nowrap bg-gray-50">
                  <span className="flex flex-col md:flex-row md:gap-1 text-sm font-medium text-gray-600">
                    <span>Emergency</span>
                    <span>Name</span>
                  </span>
                </div>
                <div className="w-1/2 px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-gray-900">{userData.emergency_name}</span>
                </div>
              </div>

              <div className="flex hover:bg-gray-50">
                <div className="w-1/2 px-6 py-4 whitespace-nowrap bg-gray-50">
                  <span className="text-sm font-medium text-gray-600">DL</span>
                </div>
                <div className="w-1/2 px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-gray-900">{userData.dl}</span>
                </div>
              </div>

              <div className="flex hover:bg-gray-50">
                <div className="w-1/2 px-6 py-4 whitespace-nowrap bg-gray-50">
                  <span className="text-sm font-medium text-gray-600">Spouse</span>
                </div>
                <div className="w-1/2 px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-gray-900">{userData.spouse}</span>
                </div>
              </div>

              <div className="flex hover:bg-gray-50">
                <div className="w-1/2 px-6 py-4 whitespace-nowrap bg-gray-50">
                  <span className="text-sm font-medium text-gray-600">Spouse Email</span>
                </div>
                <div className="w-1/2 px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-gray-900">{userData.spouse_email}</span>
                </div>
              </div>

              <div className="flex hover:bg-gray-50">
                <div className="w-1/2 px-6 py-4 whitespace-nowrap bg-gray-50">
                  <span className="text-sm font-medium text-gray-600">Spouse Phone</span>
                </div>
                <div className="w-1/2 px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-gray-900">{userData.spouse_phone}</span>
                </div>
              </div>

              <div className="flex hover:bg-gray-50">
                <div className="w-1/2 px-6 py-4 whitespace-nowrap bg-gray-50">
                  <span className="flex flex-col md:flex-row md:gap-1 text-sm font-medium text-gray-600">
                    <span>Company</span>
                    <span>Name</span>
                  </span>
                </div>
                <div className="w-1/2 px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-gray-900">{userData.company_name}</span>
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

            {/* Success message */}
            {successMessage && (
              <span className="ml-4 text-green-500 text-sm font-medium">
                Successfully Updated ✓
              </span>
            )}

            {/* Error message */}
            {errorMessage && (
              <div className="self-stretch text-red-500 text-sm mx-auto md:mx-0 md:mt-4">
                {errorMessage}
              </div>
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
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-midnightblue"
              />
            </div>

            {/* <div className="flex flex-col space-y-1">
              <label className="font-medium text-midnightblue">Password</label>
              <input
                type="text"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-midnightblue"
              />
            </div> */}

            <div className="flex flex-col space-y-1">
              <label className="font-medium text-midnightblue">Address 1</label>
              <input
                type="text"
                placeholder="Enter address"
                value={address1}
                onChange={(e) => setAddress1(e.target.value)}
                className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-midnightblue"
              />
            </div>

            <div className="flex flex-col space-y-1">
              <label className="font-medium text-midnightblue">Address 2</label>
              <input
                type="text"
                placeholder="Enter address"
                value={address2}
                onChange={(e) => setAddress2(e.target.value)}
                className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-midnightblue"
              />
            </div>

            <div className="flex flex-col space-y-1">
              <label className="font-medium text-midnightblue">Member City</label>
              <input
                type="text"
                placeholder="Enter city"
                value={memberCity}
                onChange={(e) => setMemberCity(e.target.value)}
                className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-midnightblue"
              />
            </div>

            <div className="flex flex-col space-y-1">
              <label className="font-medium text-midnightblue">Member State</label>
              <input
                type="text"
                placeholder="Enter state"
                value={memberState}
                onChange={(e) => setMemberState(e.target.value)}
                className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-midnightblue"
              />
            </div>

            <div className="flex flex-col space-y-1">
              <label className="font-medium text-midnightblue">Member Zip</label>
              <input
                type="text"
                placeholder="Enter zip"
                value={memberZip}
                onChange={(e) => setMemberZip(e.target.value)}
                className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-midnightblue"
              />
            </div>

            <div className="flex flex-col space-y-1">
              <label className="font-medium text-midnightblue">DL</label>
              <input
                type="text"
                placeholder="Enter dl"
                value={dl}
                onChange={(e) => setDl(e.target.value)}
                className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-midnightblue"
              />
            </div>

            <div className="flex flex-col space-y-1">
              <label className="font-medium text-midnightblue">Company Name</label>
              <input
                type="text"
                placeholder="Enter zip"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-midnightblue"
              />
            </div>

            <div className="flex flex-col space-y-1">
              <label className="font-medium text-midnightblue">Picture</label>
              <input
                type="file"
                id="picture"
                accept="image/*"
                onChange={handlePictureChange}
                className="file-input"
              />
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

export default UpdateUserDetailsForm;

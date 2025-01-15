import React, { useState } from 'react'
import { API_URL } from '../constant';

const AddRemoveMembersForm = () => {
  const [activeComponent, setActiveComponent] = useState(null);
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [membershipType, setMembershipType] = useState('');
  const [points, setPoints] = useState('');
  const [picture, setPicture] = useState(null);
  const [successMessage, setSuccessMessage] = useState(false);

  const actions = [
    { label: 'Add Member', type: 'addMember' },
    { label: 'Remove Member', type: 'removeMember' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (activeComponent === 'addMember') {
      handleAddMember();
    } else if (activeComponent === 'removeMember') {
      handleRemoveMember();
    }
    setSuccessMessage(true);

    setTimeout(() => {
      setSuccessMessage(false);
      setUsername('');
      setFirstName('');
      setLastName('');
      setPassword('');
      setAddress('');
      setPhoneNumber('');
      setEmail('');
      setMembershipType('');
      setPoints('');
      setPicture('');
    }, 3000);
  };

  const handleCancel = () => {
    setUsername('');
    setFirstName('');
    setLastName('');
    setPassword('');
    setAddress('');
    setPhoneNumber('');
    setEmail('');
    setMembershipType('');
    setPoints('');
    setPicture('');
    setSuccessMessage(false);
  };

  const handleRemoveMember = async () => {
    try {
      const formData = new URLSearchParams();
      formData.append('username', username);

      const response = await fetch(`http://3.27.32.197/update/delete/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'accept': 'application/json',
        },
        body: formData.toString(),
      });

      const result = await response.json();

      if (response.ok) {
        setSuccessMessage('Member removed successfully!');
        handleCancel(); 
      } else {
        alert(result.message || 'Failed to remove member. Please try again.');
      }
    } catch (error) {
      console.error('Error removing member:', error);
      alert('Failed to remove member. Please try again.');
    }
  };

  const handlePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) setPicture(file);
  };


  const handleAddMember = async () => {
    try {
      const formData = new FormData();
      formData.append('username', username);
      formData.append('password', password);
      formData.append('first_name', firstName);
      formData.append('last_name', lastName);
      formData.append('phone_number', phoneNumber);
      formData.append('address', address);
      formData.append('email_id', email);
      formData.append('membership_type', membershipType);
      formData.append('points', points);
      if (picture) formData.append('file', picture);

      const response = await fetch(`http://13.210.171.75/create-member/add-member/`, {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      console.log(result);

      if (response.ok) {
        alert(result.message || 'Member added successfully!');
        handleCancel();
      } else {
        alert(result.message || 'Failed to add member. Please try again.');
      }
    } catch (error) {
      console.error('Error adding member:', error);
      alert('Failed to add member. Please try again.');
    }
  };

  return (
    <div className='flex flex-col md:flex-row'>
      {/* Select action */}
      <div className="md:w-1/2 h-fit md:mx-2 md:my-2 text-midnightblue mx-auto w-full bg-white p-6 rounded-2xl shadow-xl space-y-6">
        <h2 className="text-xl font-semibold flex text-center md:text-left items-center">
          Add/Remove Members
        </h2>
        <div className="flex gap-2 flex-col md:flex-row">
          {actions.map((action) => (
            <button
              key={action.type}
              className={`p-4 border rounded-lg transition-colors duration-200
              ${activeComponent === action.type
                  ? 'bg-midnightblue text-white border-midnightblue'
                  : 'bg-midnightblue/10 hover:bg-midnightblue/20 border-midnightblue'
                }`}
              onClick={() => setActiveComponent(action.type)}
            >
              {action.label}
            </button>
          ))}
        </div>
      </div>

      {/* Active Section */}
      {activeComponent === 'addMember' && (
        <div className="md:w-1/2 md:mx-2 md:my-2 my-4 text-midnightblue mx-auto w-full bg-white p-6 rounded-2xl shadow-xl space-y-6">
          {activeComponent && (
            <div className='space-y-4'>
              <h3 className="text-lg font-medium flex flex-col md:flex-row">
                Add Member
                {successMessage && (
                  <span className="ml-4 text-green-500 text-sm font-medium">
                    ✓ Successfully Updated
                  </span>
                )}
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Input fields */}
                {[
                  { label: 'Username', value: username, setter: setUsername },
                  { label: 'First Name', value: firstName, setter: setFirstName },
                  { label: 'Last Name', value: lastName, setter: setLastName },
                  { label: 'Password', value: password, setter: setPassword, type: 'password' },
                  { label: 'Address', value: address, setter: setAddress },
                  { label: 'Phone Number', value: phoneNumber, setter: setPhoneNumber },
                  { label: 'Email', value: email, setter: setEmail, type: 'email' },
                  { label: 'Membership Type', value: membershipType, setter: setMembershipType, isDropdown: true },
                  { label: 'Points', value: points, setter: setPoints, type: 'number' },
                  { label: 'Picture', value: picture, setter: setPicture, isFile: true },
                ].map(({ label, value, setter, type = 'text', isDropdown, isFile }) => (
                  <div className="flex flex-col px-2" key={label}>
                    <p className="text-sm">{label}</p>
                    {isDropdown ? (
                      <select
                        value={value}
                        onChange={(e) => setter(e.target.value)}
                        className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-midnightblue w-full"
                      >
                        <option value="">Select {label}</option>
                        <option value="Silver">Silver</option>
                        <option value="Gold">Gold</option>
                        <option value="Platinum">Platinum</option>
                        <option value="Premium">Premium</option>
                      </select>
                    ) : isFile ? (
                      <div>
                        <input
                          type="file"
                          id="picture"
                          accept="image/*"
                          onChange={handlePictureChange}
                          className="file-input"
                        />
                      </div>
                    ) : (
                      <input
                        type={type}
                        value={value}
                        onChange={(e) => setter(e.target.value)}
                        placeholder={`Enter ${label.toLowerCase()}`}
                        className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-midnightblue w-full"
                      />
                    )}

                  </div>
                ))}


                {/* Buttons */}
                <div className="flex justify-end my-4 space-x-2">
                  <button
                    type="button"
                    className="px-4 py-1 text-midnightblue border-midnightblue border rounded-md hover:bg-midnightblue hover:text-white"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="p-3 bg-midnightblue text-white rounded-md"
                  >
                    Add Member
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      )}
      {activeComponent === 'removeMember' && (
        <div className='md:w-1/2 Nmd:mx-2 md:my-2 my-4 text-midnightblue mx-auto w-full bg-white p-6 rounded-2xl shadow-xl space-y-6'>
          <h3 className="text-lg font-medium">Remove a Member</h3>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-midnightblue w-full"
            />
            <div className="flex justify-end space-x-2 mt-4">
              <button
                type="button"
                className="p-3 bg-gray-200 rounded-md"
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="p-3 bg-red-600 text-white rounded-md"
              >
                Remove Member
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default AddRemoveMembersForm;

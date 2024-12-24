import React, { useState } from 'react';

const EditInfoCard = ({ fetchUserData }) => {
  const [username, setUsername] = useState('');

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username) {
      alert('Please enter a username');
      return;
    }

    fetchUserData(username);
  };

  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 w-fit h-fit">
      <h2 className="text-lg font-semibold mb-4">Select user to proceed</h2>

      <div className="flex flex-col md:flex-row md:items-end gap-4">
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
  );
};

export default EditInfoCard;

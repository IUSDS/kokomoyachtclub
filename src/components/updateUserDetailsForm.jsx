import React, { useState } from 'react'

const UpdateUserDetailsForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [successMessage, setSuccessMessage] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccessMessage(true);

    setTimeout(() => {
      setSuccessMessage(false);
      setFirstName('');
      setLastName('');
      setPhone('');
      setAddress('');
      setEmail('');
    }, 3000);
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
    <div className="max-w-xl md:mx-10 text-midnightblue mx-auto bg-white p-6 rounded-2xl shadow-lg space-y-6">
      <h2 className="text-xl font-semibold flex items-center">
        Update User Details{' '}
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
            className="px-4 py-1 text-midnightblue border-midnightblue border rounded-md hover:bg-gray-200"
          >
            Save
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="px-4 py-1 text-midnightblue border-midnightblue border rounded-md hover:bg-gray-200"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateUserDetailsForm;

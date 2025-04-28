import React, { useState, useEffect } from "react";

const MemberDetails = ({ userData,onSave }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [dl, setDl] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [picture, setPicture] = useState(null);
  const [membershipType, setMembershipType] = useState("");

  // Whenever userData arrives or changes, seed all fields
  useEffect(() => {
    if (!userData) return;
    // console.log(userData);
    setFirstName(userData.first_name || "");
    setLastName(userData.last_name || "");
    setPhoneNumber(userData.phone_number || "");
    setAddress1(userData.member_address1 || "");
    setAddress2(userData.member_address2 || "");
    setCity(userData.member_city || "");
    setState(userData.member_state || "");
    setZip(userData.member_zip || "");
    setDl(userData.dl || "");
    setCompanyName(userData.company_name || "");
    setMembershipType(userData.membership_type || "");
    // picture we treat separately
  }, [userData]);

  const handlePictureChange = (e) => {
    if (e.target.files.length) setPicture(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      firstName,
      lastName,
      phoneNumber,
      address1,
      address2,
      city,
      state,
      zip,
      dl,
      companyName,
      picture,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 text-midnightblue p-6 bg-white rounded-md shadow"
    >
      {/* Name */}
      <div className="flex flex-col space-y-1">
        <label className="font-medium">First Name</label>
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-midnightblue"
        />
      </div>

      <div className="flex flex-col space-y-1">
        <label className="font-medium">Last Name</label>
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-midnightblue"
        />
      </div>

      {/* Phone */}
      <div className="flex flex-col space-y-1">
        <label className="font-medium">Phone Number</label>
        <input
          type="text"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-midnightblue"
        />
      </div>

      {/* Membership Type (read-only) */}
      <div className="flex flex-col space-y-1">
        <label className="font-medium">Membership Type</label>
        <select
          value={membershipType}
          disabled
          className="border rounded-md p-2 bg-gray-100 cursor-not-allowed"
        >
          <option>{membershipType}</option>
        </select>
      </div>

      {/* Address */}
      <div className="flex flex-col space-y-1">
        <label className="font-medium">Address 1</label>
        <input
          type="text"
          value={address1}
          onChange={(e) => setAddress1(e.target.value)}
          className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-midnightblue"
        />
      </div>

      <div className="flex flex-col space-y-1">
        <label className="font-medium">Address 2</label>
        <input
          type="text"
          value={address2}
          onChange={(e) => setAddress2(e.target.value)}
          className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-midnightblue"
        />
      </div>

      {/* City / State / Zip */}
      <div className="flex flex-col space-y-1">
        <label className="font-medium">City</label>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-midnightblue"
        />
      </div>

      <div className="flex flex-col space-y-1">
        <label className="font-medium">State</label>
        <input
          type="text"
          value={state}
          onChange={(e) => setState(e.target.value)}
          className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-midnightblue"
        />
      </div>

      <div className="flex flex-col space-y-1">
        <label className="font-medium">Zip Code</label>
        <input
          type="text"
          value={zip}
          onChange={(e) => setZip(e.target.value)}
          className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-midnightblue"
        />
      </div>

      {/* Driver’s License */}
      <div className="flex flex-col space-y-1">
        <label className="font-medium">Driver’s License #</label>
        <input
          type="text"
          value={dl}
          onChange={(e) => setDl(e.target.value)}
          className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-midnightblue"
        />
      </div>

      {/* Company */}
      <div className="flex flex-col space-y-1">
        <label className="font-medium">Company Name</label>
        <input
          type="text"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-midnightblue"
        />
      </div>

      {/* Picture upload */}
      <div className="flex flex-col space-y-1">
        <label className="font-medium">Picture</label>
        <input
          type="file"
          accept="image/*"
          onChange={handlePictureChange}
          className="focus:outline-none"
        />
      </div>

      {/* Actions */}
      <div className="flex space-x-4 mt-4">
        <button
          type="submit"
          className="px-4 py-2 border border-midnightblue text-midnightblue rounded-md hover:bg-midnightblue hover:text-white "
        >
          Save Changes
        </button>
      </div>
    </form>
  );
};

export default MemberDetails;

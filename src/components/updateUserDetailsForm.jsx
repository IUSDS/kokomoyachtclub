import React, { useState, useEffect } from "react";
import imgIcon from "../assets/images/imageIcon.webp";

const UpdateUserDetailsForm = () => {
  const [username, setUsername] = useState("");
  const [userData, setUserData] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [memberCity, setMemberCity] = useState("");
  const [memberState, setMemberState] = useState("");
  const [memberZip, setMemberZip] = useState("");
  const [membership, setMembership] = useState("");
  const [dl, setDl] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [picture, setPicture] = useState(null);
  const [successMessage, setSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [usernamesList, setUsernamesList] = useState([]);

  const API_PROD_URL = "https://api.kokomoyachtclub.vip";
  const API_LOCAL_URL = "http://localhost:8000";

  // Fetch all usernames for the dropdown
  useEffect(() => {
    const fetchUsernames = async () => {
      try {
        const res = await fetch(`${API_PROD_URL}/usernames/usernames/`);
        if (!res.ok) throw new Error("Could not load users");
        const { usernames } = await res.json();
        setUsernamesList(usernames);
      } catch (err) {
        console.error(err);
        setErrorMessage("Failed to load users");
      }
    };
    fetchUsernames();
  }, []);

  // Load user details when a username is selected
  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    setErrorMessage("");
    if (!username) {
      setErrorMessage("Please select a user");
      return;
    }
    try {
      const res = await fetch(
        `${API_PROD_URL}/new-userdetail/user-details/?username=${username}`
      );
      if (!res.ok) throw new Error("User not found!");
      const data = await res.json();
      setUserData(data);

      // Prefill form with fetched data
      setFirstName(data.first_name || "");
      setLastName(data.last_name || "");
      setPhoneNumber(data.phone_number || "");
      setAddress1(data.member_address1 || "");
      setAddress2(data.member_address2 || "");
      setMemberCity(data.member_city || "");
      setMemberState(data.member_state || "");
      setMemberZip(data.member_zip || "");
      setMembership(data.membership_type || "");
      setDl(data.dl || "");
      setCompanyName(data.company_name || "");
    } catch (err) {
      console.error(err);
      setErrorMessage(err.message);
      setUserData(null);
      setTimeout(() => setErrorMessage(""), 5000);
    }
  };

  // Save updated details
  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("first_name", firstName);
      formData.append("last_name", lastName);
      formData.append("phone_number", phoneNumber);
      formData.append("membership_type", membership);
      formData.append("member_address1", address1);
      formData.append("member_address2", address2);
      formData.append("member_city", memberCity);
      formData.append("member_state", memberState);
      formData.append("memberZip", memberZip);
      formData.append("dl", dl);
      formData.append("company_name", companyName);
      if (picture) formData.append("file", picture);

      const res = await fetch(`${API_PROD_URL}/update/update/user/`, {
        method: "PUT",
        body: formData,
      });
      if (!res.ok) throw new Error("Update failed");
      setSuccessMessage(true);
      await handleSubmit();
      setTimeout(() => setSuccessMessage(false), 4000);
    } catch (err) {
      console.error(err);
      setErrorMessage("Failed to update member.");
      setTimeout(() => setErrorMessage(""), 4000);
    }
  };

  // Reset form inputs
  const handleCancel = () => {
    setFirstName("");
    setLastName("");
    setPhoneNumber("");
    setAddress1("");
    setAddress2("");
    setMemberCity("");
    setMemberState("");
    setMemberZip("");
    setMembership("");
    setDl("");
    setCompanyName("");
    setPicture(null);
    setErrorMessage("");
    setSuccessMessage(false);
  };

  // Handle profile picture selection
  const handlePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) setPicture(file);
  };

  return (
    <div className="flex flex-col md:flex-row gap-4">
      {/* Left pane: select user & preview */}
      <div className="flex flex-col items-start md:w-1/2 gap-4 p-6 bg-white rounded-2xl shadow-lg">
        <h2 className="text-lg font-semibold">Update User Details</h2>

        <div className="flex justify-between space-x-4 w-full">
          <select
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg bg-gray-100 focus:ring-2 focus:ring-midnightblue"
          >
            <option value="">— Select member by username —</option>
            {usernamesList.map((u) => (
              <option key={u} value={u}>
                {u}
              </option>
            ))}
          </select>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-midnightblue text-white rounded-lg hover:bg-midnightblue/90"
          >
            Submit
          </button>
        </div>

        {errorMessage && <p className="text-sm text-red-500">{errorMessage}</p>}

        {userData && (
          <div className="w-full max-w-md mt-4">
            <div className="p-4">
              <h3 className="text-midnightblue font-semibold">User Details</h3>
            </div>
            <div className="px-4 grid grid-cols-2 gap-2">
              <span className="font-medium text-gray-600">Member ID:</span>
              <span>{userData.member_id}</span>
              <span className="font-medium text-gray-600">Name:</span>
              <span>{`${userData.first_name} ${userData.last_name}`}</span>
              <span className="font-medium text-gray-600">Email:</span>
              <span>{userData.email_id}</span>
              <span className="font-medium text-gray-600">Phone:</span>
              <span>{userData.phone_number}</span>
            </div>
          </div>
        )}
      </div>

      {/* Right pane: edit & save */}
      {userData && (
        <div className="md:w-1/2 bg-white p-6 rounded-2xl shadow-xl space-y-4">
          <h2 className="flex items-center text-xl font-semibold text-midnightblue">
            Edit Details
            {successMessage && (
              <span className="ml-4 text-green-500 font-medium">✓ Saved</span>
            )}
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block font-medium">First Name</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full border rounded-md p-2 focus:ring-2 focus:ring-midnightblue"
              />
            </div>

            <div>
              <label className="block font-medium">Last Name</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full border rounded-md p-2 focus:ring-2 focus:ring-midnightblue"
              />
            </div>

            <div>
              <label className="block font-medium">Phone Number</label>
              <input
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full border rounded-md p-2 focus:ring-2 focus:ring-midnightblue"
              />
            </div>

            <div>
              <label className="block font-medium">Membership Type</label>
              <select
                value={membership}
                onChange={(e) => setMembership(e.target.value)}
                className="w-full border rounded-md p-2 focus:ring-2 focus:ring-midnightblue"
              >
                <option value="">Select Membership</option>
                <option value="Silver">Silver</option>
                <option value="Gold">Gold</option>
                <option value="Platinum">Platinum</option>
                <option value="Diamond">Diamond</option>
              </select>
            </div>

            <div>
              <label className="block font-medium">Address 1</label>
              <input
                type="text"
                value={address1}
                onChange={(e) => setAddress1(e.target.value)}
                className="w-full border rounded-md p-2 focus:ring-2 focus:ring-midnightblue"
              />
            </div>

            <div>
              <label className="block font-medium">Address 2</label>
              <input
                type="text"
                value={address2}
                onChange={(e) => setAddress2(e.target.value)}
                className="w-full border rounded-md p-2 focus:ring-2 focus:ring-midnightblue"
              />
            </div>

            <div>
              <label className="block font-medium">City</label>
              <input
                type="text"
                value={memberCity}
                onChange={(e) => setMemberCity(e.target.value)}
                className="w-full border rounded-md p-2 focus:ring-2 focus:ring-midnightblue"
              />
            </div>

            <div>
              <label className="block font-medium">State</label>
              <input
                type="text"
                value={memberState}
                onChange={(e) => setMemberState(e.target.value)}
                className="w-full border rounded-md p-2 focus:ring-2 focus:ring-midnightblue"
              />
            </div>

            <div>
              <label className="block font-medium">Zip Code</label>
              <input
                type="text"
                value={memberZip}
                onChange={(e) => setMemberZip(e.target.value)}
                className="w-full border rounded-md p-2 focus:ring-2 focus:ring-midnightblue"
              />
            </div>

            <div>
              <label className="block font-medium">Driver’s License</label>
              <input
                type="text"
                value={dl}
                onChange={(e) => setDl(e.target.value)}
                className="w-full border rounded-md p-2 focus:ring-2 focus:ring-midnightblue"
              />
            </div>

            <div>
              <label className="block font-medium">Company Name</label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full border rounded-md p-2 focus:ring-2 focus:ring-midnightblue"
              />
            </div>

            <div>
              <label className="block font-medium">Profile Picture</label>
              <input
                type="file"
                accept="image/*"
                onChange={handlePictureChange}
                className="file-input"
              />
            </div>
          </div>

          <div className="flex space-x-4">
            <button
              onClick={handleSave}
              className="px-4 py-2 border border-midnightblue rounded-md hover:bg-midnightblue hover:text-white"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="px-4 py-2 border border-midnightblue rounded-md hover:bg-midnightblue hover:text-white"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateUserDetailsForm;

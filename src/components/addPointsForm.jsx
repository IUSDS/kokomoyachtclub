import React, { useState, useEffect } from "react";
import { imgIcon } from "../assets/images";

const AddPointsForm = () => {
  const [username, setUsername] = useState("");
  const [points, setPoints] = useState("");
  const [description, setDescription] = useState("");
  const [successMessage, setSuccessMessage] = useState(false);
  const [userData, setUserData] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [usernamesList, setUsernamesList] = useState([]);

  const API_PROD_URL = "https://api.kokomoyachtclub.vip";
  const API_LOCAL_URL = "http://localhost:8000";

  // Fetch all usernames on mount
  useEffect(() => {
    const fetchUsernames = async () => {
      try {
        const res = await fetch(`${API_PROD_URL}/usernames/usernames/`);
        if (!res.ok) throw new Error("Failed to fetch usernames");
        const { usernames } = await res.json();
        setUsernamesList(usernames);
      } catch (err) {
        console.error(err);
        setErrorMessage("Unable to load users");
      }
    };
    fetchUsernames();
  }, []);

  // When user selects one, fetch their details
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username) return setErrorMessage("Please select a user");
    try {
      const res = await fetch(
        `${API_PROD_URL}/points/points/?username=${username}`
      );
      if (!res.ok) throw new Error("User not found");
      const data = await res.json();
      setUserData(data);
      setErrorMessage("");
    } catch (err) {
      setErrorMessage("User not found");
      setUserData(null);
      setTimeout(() => setErrorMessage(""), 3000);
    }
  };

  // Update points
  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("update_points", Number(points));

      const res = await fetch(`${API_PROD_URL}/points/update-points/`, {
        method: "PUT",
        headers: { accept: "application/json" },
        body: formData,
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.detail || "Update failed");
      }
      const result = await res.json();
      if (result.status === "success") {
        setSuccessMessage(true);
        // refresh userData
        handleSubmit(new Event("submit"));
        setTimeout(() => {
          setSuccessMessage(false);
          setPoints("");
        }, 3000);
      }
    } catch (err) {
      console.error(err);
      setErrorMessage("Failed to update points");
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
    }
  };

  const handleCancel = () => {
    setUsername("");
    setPoints("");
    setDescription("");
    setUserData(null);
    setSuccessMessage(false);
    setErrorMessage("");
  };

  return (
    <div className="flex flex-col md:flex-row gap-4">
      {/* ─── Left Pane: Select & View User ───────────────────────────── */}
      <div className="flex flex-col items-center md:w-1/2 gap-4 p-6 bg-white rounded-2xl shadow-lg">
        <h2 className="text-lg font-semibold w-full">Adjust points in user profile</h2>

        <div className="flex space-x-4 justify-evenly w-full">
          {/* Dropdown */}
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
        
        {errorMessage && (
            <p className="text-sm text-red-500 w-full">{errorMessage}</p>
          )}

        {/* User Details */}
        {userData && (
          <div className="w-full">
            <div className="">
              <h3 className="text-midnightblue font-semibold">User Details</h3>
            </div>
            <div className="px-2 grid grid-cols-2 gap-2">
              <span className="font-medium text-gray-600">Username:</span>
              <span>{userData.username}</span>
              <span className="font-medium text-gray-600">Points:</span>
              <span>{userData.points}</span>
            </div>
          </div>
        )}
      </div>

      {/* ─── Right Pane: Add Points ──────────────────────────────────── */}
      {userData && (
        <div className="md:w-1/2 bg-white p-6 rounded-2xl shadow-xl space-y-4">
          <h2 className="flex items-center justify-center md:justify-start text-xl font-semibold text-midnightblue">
            Adjust Points
            {successMessage && (
              <span className="ml-4 text-green-500 font-medium">✓ Updated</span>
            )}
          </h2>
          <div>
            {/* Points */}
            <label className="block font-medium mb-1">Points</label>
            <input
              type="number"
              value={points}
              onChange={(e) => setPoints(e.target.value)}
              className="w-full border rounded-md p-2 focus:ring-2 focus:ring-midnightblue"
            />
            {/* Descriptor */}
            <label className="block font-medium mb-1">Descriptor</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setPoints(e.target.value)}
              className="w-full border rounded-md p-2 focus:ring-2 focus:ring-midnightblue"
            />
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

export default AddPointsForm;

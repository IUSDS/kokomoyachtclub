import React, { useState, useEffect, useCallback } from "react";

const API_BASE = import.meta.env.DEV
  ? "http://localhost:8000"
  : "https://api.kokomoyachtclub.vip";

const AddPointsForm = () => {
  const [username, setUsername] = useState("");
  const [points, setPoints] = useState("");
  const [description, setDescription] = useState("");
  const [userData, setUserData] = useState(null);
  const [usernamesList, setUsernamesList] = useState([]);

  const [loadingUsers, setLoadingUsers] = useState(false);
  const [loadingData, setLoadingData] = useState(false);
  const [saving, setSaving] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState(false);

  // 1) Load all usernames on mount
  useEffect(() => {
    const fetchUsernames = async () => {
      setLoadingUsers(true);
      try {
        const res = await fetch(`${API_BASE}/usernames/usernames/`);
        if (!res.ok) throw new Error();
        const { usernames } = await res.json();
        setUsernamesList(usernames);
      } catch {
        setErrorMessage("Unable to load users");
        setTimeout(() => setErrorMessage(""), 3000);
      } finally {
        setLoadingUsers(false);
      }
    };
    fetchUsernames();
  }, []);

  // 2) Fetch one user’s points
  const fetchUserData = useCallback(async () => {
    if (!username) {
      setErrorMessage("Please select a user");
      setTimeout(() => setErrorMessage(""), 3000);
      return;
    }
    setLoadingData(true);
    try {
      const res = await fetch(
        `${API_BASE}/points/points/?username=${encodeURIComponent(username)}`
      );
      if (!res.ok) throw new Error();
      const data = await res.json();
      setUserData(data);
    } catch {
      setErrorMessage("User not found");
      setUserData(null);
      setTimeout(() => setErrorMessage(""), 3000);
    } finally {
      setLoadingData(false);
    }
  }, [username]);

  // 3) Send updated points + description
  const updatePoints = useCallback(async () => {
    setSaving(true);
    try {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("update_points", points);
      formData.append("description", description);

      const res = await fetch(`${API_BASE}/points/update-points/`, {
        method: "PUT",
        headers: { Accept: "application/json" },
        body: formData,
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.detail || "Update failed");
      }

      setSuccessMessage(true);
      await fetchUserData();            // refresh display
      setTimeout(() => {
        setSuccessMessage(false);
        setPoints("");
        setDescription("");
      }, 3000);
    } catch {
      setErrorMessage("Failed to update points");
      setTimeout(() => setErrorMessage(""), 3000);
    } finally {
      setSaving(false);
    }
  }, [username, points, description, fetchUserData]);

  const handleCancel = () => {
    setUsername("");
    setPoints("");
    setDescription("");
    setUserData(null);
    setErrorMessage("");
    setSuccessMessage(false);
  };

  return (
    <div className="flex flex-col md:flex-row gap-4">
      {/* ─── Left Pane: Select & View User ───────────────────────────── */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          fetchUserData();
        }}
        className="flex flex-col items-center md:w-1/2 gap-4 p-6 bg-white rounded-2xl shadow-lg"
      >
        <h2 className="text-lg font-semibold w-full">
          Adjust points in user profile
        </h2>

        <div className="flex space-x-4 justify-evenly w-full">
          <select
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={loadingUsers}
            className="w-full px-4 py-2 border rounded-lg bg-gray-100 focus:ring-2 focus:ring-midnightblue"
          >
            <option value="">
              — Select member by username —
            </option>
            {usernamesList.map((u) => (
              <option key={u} value={u}>
                {u}
              </option>
            ))}
          </select>

          <button
            type="submit"
            disabled={loadingData}
            className="px-4 py-2 bg-midnightblue text-white rounded-lg hover:bg-midnightblue/90"
          >
            {loadingData ? "Loading..." : "Submit"}
          </button>
        </div>

        {errorMessage && (
          <p className="text-sm text-red-500 w-full">
            {errorMessage}
          </p>
        )}

        {userData && (
          <div className="w-full">
            <h3 className="text-midnightblue font-semibold">
              User Details
            </h3>
            <div className="px-2 grid grid-cols-2 gap-2">
              <span className="font-medium text-gray-600">
                Username:
              </span>
              <span>{userData.username}</span>

              <span className="font-medium text-gray-600">
                Points:
              </span>
              <span>{userData.points}</span>
            </div>
          </div>
        )}
      </form>

      {/* ─── Right Pane: Add Points ──────────────────────────────────── */}
      {userData && (
        <div className="md:w-1/2 bg-white p-6 rounded-2xl shadow-xl space-y-4">
          <h2 className="flex items-center justify-center md:justify-start text-xl font-semibold text-midnightblue">
            Adjust Points
            {successMessage && (
              <span className="ml-4 text-green-500 font-medium">
                ✓ Updated
              </span>
            )}
          </h2>

          <div>
            <label
              htmlFor="points"
              className="block font-medium mb-1"
            >
              Points
            </label>
            <input
              id="points"
              type="number"
              value={points}
              onChange={(e) => setPoints(e.target.value)}
              className="w-full border rounded-md p-2 focus:ring-2 focus:ring-midnightblue"
            />

            <label
              htmlFor="description"
              className="block font-medium mb-1"
            >
              Description
            </label>
            <input
              id="description"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border rounded-md p-2 focus:ring-2 focus:ring-midnightblue"
            />
          </div>

          <div className="flex space-x-4">
            <button
              onClick={updatePoints}
              disabled={saving}
              className="px-4 py-2 border border-midnightblue rounded-md hover:bg-midnightblue hover:text-white"
            >
              {saving ? "Saving..." : "Save"}
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

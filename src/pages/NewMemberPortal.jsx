import React, { useState, useEffect } from "react";
import yacht_club_logo from "../assets/logos/favicon2.png";
import useAuthStore from "../authStore";
import { useNavigate } from "react-router-dom";
import { cert, coins, dp, user_icon } from "../assets/icons/index";
import MemberDetails from "../components/MemberDetails";
import BillingDetails from "../components/BillingDetails";
import BookingHistoryContainer from "../components/BookingHIstoryContainer";

const NewMemberPortal = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [error, setError] = useState(null);
  const [imageError, setImageError] = useState(false);
  const navigate = useNavigate();

  const { user, isLoggedIn, checkSession } = useAuthStore();
  const username = user.username;
  const API_BASE =
    window.location.hostname === "localhost"
      ? "http://127.0.0.1:8000"
      : "https://api.kokomoyachtclub.vip";
  window.location.hostname === "localhost"
    ? "http://127.0.0.1:8000"
    : "https://api.kokomoyachtclub.vip";
  // on mount, verify session
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    } else if (!user) {
      checkSession();
    }
  }, [isLoggedIn, user, navigate, checkSession]);

  if (error) return <div className="p-4 text-red-600">{error}</div>;

  const handleImageError = () => setImageError(true);

  // helper to reload user into the store
  const refreshUser = async () => {
    try {
      const resp = await fetch(
        `${API_BASE}/new-userdetail/user-details/?username=${encodeURIComponent(
          user.username
        )}`
      );
      if (!resp.ok) {
        const text = await resp.text();
        throw new Error(`HTTP ${resp.status}: ${text}`);
      }
      const fresh = await resp.json();
      // overwrite the store’s user
      useAuthStore.setState({ user: fresh });
    } catch (err) {
      console.error("Refresh user failed:", err);
      setError("Could not reload profile.");
    }
  };

  const handleSave = async (values) => {
    const formData = new FormData();
    formData.append("username", user.username);
    formData.append("first_name", values.firstName);
    formData.append("last_name", values.lastName);
    formData.append("phone_number", values.phoneNumber);
    formData.append("member_address1", values.address1);
    formData.append("member_address2", values.address2);
    formData.append("member_city", values.city);
    formData.append("member_state", values.state);
    formData.append("member_zip", values.zip);
    formData.append("dl", values.dl);
    formData.append("company_name", values.companyName);
    if (values.picture) formData.append("picture", values.picture);

    try {
      const res = await fetch(
        "https://api.kokomoyachtclub.vip/update/update/user/",
        { method: "PUT", body: formData }
      );
      if (!res.ok) {
        const txt = await res.text();
        throw new Error(`Update failed: ${res.status} ${txt}`);
      }

      // GET fresh user and store it
      await refreshUser();
      setActiveTab("dashboard");
    } catch (err) {
      console.error(err);
      setError("Could not save changes. Please try again.");
    }
  };

  return (
    <div className="bg-midnightblue p-4">
      <div className="flex md:flex-row flex-col-reverse bg-gray-100 rounded-lg shadow-lg">
        {/* Sidebar */}
        <div className="hidden md:flex flex-col text-white w-20 p-2 shadow-xl">
          <div className="flex-1 flex flex-col items-center justify-between py-4 gap-6">
            <div className="mt-4">
              <img src={yacht_club_logo} alt="" className="w-20" />
            </div>
            <div className="flex flex-col ">
              <span className="text-xl font-semibold whitespace-nowrap text-midnightblue transform -rotate-90">
                KOKOMO YACHT CLUB
              </span>
            </div>
            <div className="">
              <img src={user_icon} alt="" className="w-10 cursor-pointer" />
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 flex flex-col">
          {/* Main area */}
          <div className="flex-1 p-4 md:p-8">
            <div className="flex flex-col md:flex-row justify-between mb-6">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-midnightblue">
                  Dashboard
                </h1>
                <p className="text-midnightblue">Welcome Back!</p>
              </div>
            </div>

            {/* Content area - placeholder for main content */}
            <div className="">
              {activeTab === "dashboard" && (
                <iframe
                  className="w-full h-[500px] mx-auto"
                  src="https://fareharbor.com/embeds/book/kokomocharters/?full-items=yes&flow=1257684"
                  title="FareHarbor Item Grid"
                  allowFullScreen
                  sandbox="allow-scripts allow-same-origin allow-forms allow-top-navigation-by-user-activation"
                />
              )}

              {activeTab === "updateDetails" && (
                <div className="p-4 bg-white rounded shadow-md">
                  <h2 className="text-2xl font-bold text-midnightblue mb-4">
                    Update Your Details
                  </h2>
                  <MemberDetails userData={user} onSave={handleSave} />
                </div>
              )}

              {activeTab === "bookings" && (
                <div className="p-4 bg-white rounded shadow-md">
                  <h2 className="text-2xl font-bold text-midnightblue mb-4">
                    Your Previous Bookings
                  </h2>
                  <BookingHistoryContainer memberId={user.member_id} />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right sidebar with user info */}
        <div className="md:w-[340px] border-l border-gray-200 px-6 py-10 md:shadow-xl rounded-r-lg space-y-4">
          {/* Name and Member Image */}
          <div className="flex justify-between">
            <div className="flex flex-col space-y-1">
              <p className="text-lg text-gray-700">Hello,</p>
              <p className="text-midnightblue text-4xl font-bold">
                {user.first_name}!
              </p>
            </div>
            {/* <img src={dp} alt="Default display pic" className="w-20" /> */}
            {imageError ? (
              <img src={dp} alt="Default display pic" className="w-20" />
            ) : (
              <img
                src={user.picture_url}
                alt="Profile"
                className="w-20 object-cover"
                onError={handleImageError}
              />
            )}
          </div>
          {/* Membership type and Points */}
          <div className="flex justify-between">
            <div className="flex flex-col items-center space-y-1">
              <div className="rounded-full bg-midnightblue flex justify-evenly items-center w-[120px] h-[30px]">
                <img src={cert} alt="certificate icon" className="h-6" />
                <p className="text-amber-300 text-sm font-semibold">
                  {user.membership_type}
                </p>
              </div>
              <p className="text-xs text-gray-400">Membership Tier</p>
            </div>
            <div className="flex flex-col items-center space-y-1">
              <div className="rounded-full bg-midnightblue flex justify-evenly items-center w-[120px] h-[30px]">
                <img src={coins} alt="certificate icon" className="h-6" />
                <p className="text-amber-300 text-sm font-semibold">
                  {user.points}
                </p>
              </div>
              <p className="text-xs text-gray-400">Mariner Points</p>
            </div>
          </div>

          {/* Member Info */}
          <div className="bg-midnightblue text-white p-4 rounded-lg">
            <div className="space-y-3">
              <h3 className="text-xl font-bold">Member Information</h3>

              <div className="">
                <p className="text-sm mb-1">Email</p>
                <p className="text-sm">{user.email_id}</p>
              </div>

              <div className="">
                <p className="text-sm mb-1">Phone No.</p>
                <p className="text-sm">{user.phone_number || "N/A"}</p>
              </div>

              <div className="">
                <p className="text-sm mb-1">Address</p>
                <p className="text-sm">
                  {user.member_address1}, {user.member_address2}
                </p>
                <p className="text-sm">
                  {user.member_city}, {user.member_state} {user.member_zip}
                </p>
              </div>

              <div className="">
                <p className="text-sm mb-1">Emergency Contact</p>
                <p className="text-sm">{user.emergency_name}</p>
                <p className="text-sm">{user.emergency_contact}</p>
                <p className="text-sm">{user.emergency_relationship}</p>
              </div>
            </div>

            {/* Helpful Links */}
            <div className="mt-4">
              <h3 className="text-xl font-bold mb-2">Helpful Links</h3>
              <ul>
                <li>
                  <button
                    onClick={() => setActiveTab("dashboard")}
                    className={`text-sm hover:text-amber-300 text-left w-full ${
                      activeTab === "dashboard"
                        ? "text-amber-300"
                        : "text-white"
                    }`}
                  >
                    Dashboard
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab("updateDetails")}
                    className={`text-sm hover:text-amber-300 text-left w-full ${
                      activeTab === "updateDetails"
                        ? "text-amber-300"
                        : "text-white"
                    }`}
                  >
                    Update Details
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab("bookings")}
                    className={`text-sm hover:text-amber-300 text-left w-full ${
                      activeTab === "bookings" ? "text-amber-300" : "text-white"
                    }`}
                  >
                    Booking History
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab("billings")}
                    className={`text-sm hover:text-amber-300 text-left w-full ${
                      activeTab === "billings" ? "text-amber-300" : "text-white"
                    }`}
                  >
                    Billing Details
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewMemberPortal;

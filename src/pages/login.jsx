import React, { useState } from "react";
import hero_image from "../assets/images/hero.png";
import { useNavigate } from "react-router-dom";

const login = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const navigate = useNavigate(); 
    try {
      const response = await fetch("http://127.0.0.1:8000/validate-user/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, password }),
      });
      const data = await response.json();
  
      if (response.ok) {
        // If successful (e.g., store token, redirect)
        console.log("Login successful!", data);
        localStorage.setItem("token", data.token); // Save token securely
  
        // Navigate to the /members page using React Router
        navigate("/membership"); // Navigates to /members
      } else {
        // Handle login failure
        console.error("Login failed:", data.message);
        alert(data.message); // Show user-friendly error
      }
    } catch (error) {
      console.error("An error occurred during login:", error);
      alert("Unable to login. Please try again later.");
    }
  };
  
  return (
    <>
      {/* Hero Section Image */}
      <img className="w-screen" src={hero_image} alt="" />

      {/* Form Section */}
      <main
        className={` flex flex-col items-center justify-center text-center text-gray-600 font-plus-jakarta-sans`}
      >
        <div className="self-stretch overflow-hidden flex flex-col items-center justify-center">
          <div className="self-stretch overflow-hidden flex flex-col items-center justify-center">
            <div className="self-stretch flex flex-col items-start justify-start py-[30.4px] px-16 md:px-36 lg:px-[430px] z-[0]">
              <div className="self-stretch flex flex-col items-center justify-start gap-4">
                <div className="self-stretch overflow-hidden flex flex-col items-center justify-start gap-10">
                  <div className="self-stretch md:text-xl flex flex-col items-center justify-start gap-2.5">
                    <b className="self-stretch relative tracking-[-0.02em] leading-[32px]">
                      Welcome to Kokomo Yacht Club
                    </b>
                    <div className="self-stretch text-mini">
                      Please log in to continue
                    </div>
                  </div>
                  <form
                    className="self-stretch flex flex-col items-center justify-start gap-3"
                    onSubmit={(e) => e.preventDefault()}
                  >
                    <input
                      className="font-plus-jakarta-sans px-3 text-mini [outline:none] bg-steelblue rounded-2xl self-stretch h-10 placeholder-gray-300"
                      type="text"
                      placeholder="User ID"
                      value={id}
                      onChange={(e) => setId(e.target.value)}
                    />
                    <input
                      className="font-plus-jakarta-sans px-3 text-mini [outline:none] bg-steelblue rounded-2xl self-stretch h-10 placeholder-gray-300"
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </form>
                </div>

                <button className="self-stretch cursor-pointer py-2 rounded-2xl hover:bg-opacity-80 transform duration-200 [border:none] text-center text-sm font-medium font-plus-jakarta-sans text-gray-100 bg-midnightblue" onClick={handleLogin}>
                  LOGIN
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default login;

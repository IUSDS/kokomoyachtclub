import React, { useState } from "react";
import { hero, loginImg } from "../assets/images";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../authStore";

const login = () => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login); // login function from store

  const handleLogin = async () => {
    try {
      const formData = new FormData();
      formData.append("username", user);
      formData.append("password", password);

      const response = await fetch("https://api.kokomoyachtclub.vip/validate-user/validate-user/", {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      const data = await response.json();
      // console.log(data)
      if (response.ok && data.status === "SUCCESS") {

        // Fetch user details after login to confirm session is active
        const userResponse = await fetch(`https://api.kokomoyachtclub.vip/validate-user/current-user/`, {
          method: "GET",
          credentials: "include",
        });

        if (userResponse.ok) {
          const userData = await userResponse.json();
          // console.log("Login User Data:", userData);

          login(userData); // Store user in Zustand state
          setErrorMessage("");

          // Redirect based on user type
          if (data.user_type.toLowerCase() === "user") {
            navigate("/membership");
          } else if (data.user_type.toLowerCase() === "admin") {
            navigate("/admin");
          }
        } else {
          setErrorMessage("Session could not be established.");
        }
      } else {
        setErrorMessage("Invalid credentials");
      }
    } catch (error) {
      setErrorMessage("Unable to login. Please try again later.");
    }
  };

  const handleForgetPassword = () => {
    navigate('/forgot_password');
  }

  return (
    <>
      {/* Hero Section */}
      <div className="relative">
        <img className="w-screen h-[150px] md:h-fit object-cover" src={loginImg} alt="Hero" />
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <p className="absolute text-white font-bold top-[40%] text-center text-xl w-full md:text-6xl">
          Welcome
        </p>
      </div>


      {/* Form Section */}
      <main
        className={`flex flex-col items-center justify-center text-center text-gray-600 font-plus-jakarta-sans`}
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
                      value={user}
                      onChange={(e) => setUser(e.target.value)}
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

                <button
                  className="self-stretch cursor-pointer py-2 rounded-2xl hover:bg-opacity-80 transform duration-200 [border:none] text-center text-sm font-medium font-plus-jakarta-sans text-gray-100 bg-midnightblue"
                  onClick={handleLogin}
                >
                  LOGIN
                </button>

                <p className="text-midnightblue cursor-pointer hover:text-blue-600 transform duration-200" onClick={handleForgetPassword}>Forgot Password?</p>

                {/* Invalid credentials */}
                {errorMessage && (
                  <div className="self-stretch text-red-500 text-sm">
                    {errorMessage}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default login;

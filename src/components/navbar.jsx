import React, { useState, useEffect } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import ResponsiveMenu from "./responsiveMenu";
import { FaUser } from "react-icons/fa";
import logo from "../assets/logos/logo_nav.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuthStore from "../authStore";

const Popup = ({ isVisible, closePopup }) => {
  const logout = useAuthStore((state) => state.logout);
  const user_type = useAuthStore((state) => state.user_type);
  const navigate = useNavigate();

  // console.log("Popup User Data:", user);

  const handleLogout = () => {
    logout();
    closePopup();
    navigate("/login");
  };

  if (!isVisible) return null;

  return (
    <div className="fixed top-24 xl:right-12 md:right-24 z-50">
      <div className="flex flex-col bg-midnightblue text-white p-6 rounded-lg shadow-lg space-y-1">
        {user_type.toLowerCase() === "user" ? (
          <>
            <p
              className="cursor-pointer hover:text-blue-200"
              onClick={() => {
                navigate("/member-portal");
                closePopup();
              }}
            >
              Dashboard
            </p>
          </>
        ) : user_type.toLowerCase() === "admin" ? (
          <>
            <p
              className="cursor-pointer hover:text-blue-200"
              onClick={() => {
                navigate("/admin");
                closePopup();
              }}
            >
              Admin Services
            </p>
          </>
        ) : null}

        {/* Logout Option for Both User and Admin */}
        <p
          onClick={handleLogout}
          className="cursor-pointer hover:text-blue-200"
        >
          Log out
        </p>
      </div>
    </div>
  );
};

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState("");
  const location = useLocation();
  const [popup, setPopup] = useState(false);

  useEffect(() => {
    const path = location.pathname.split("/")[1];
    setSelectedMenu(path || "home");
  }, [location]);

  // Get user authentication status
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  const handlePopup = () => {
    setPopup(!popup);
  };

  // ✅ Close the popup when the user scrolls
  useEffect(() => {
    const handleScroll = () => {
      if (popup) {
        setPopup(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [popup]);

  return (
    <>
      <div className="flex flex-col">
        {/* Top bar with contact details */}
        <div className="flex py-2 justify-between xl:px-20 text-sm md:px-16 px-10 bg-midnightblue">
          <div className="text-white hidden md:block">
            <p>
              <a
                href="https://www.google.com/maps?q=1000+Boulevard+of+the+Arts,+Sarasota,+FL"
                target="_blank"
                rel="noopener noreferrer"
              >
                601 Quay Commons, Sarasota, FL 34236
              </a>
            </p>
          </div>

          <div className="text-white text-sm flex gap-4 md:gap-8">
            <p>
              <a href="tel:+19412592248">(941) 259-2248</a>
            </p>
            <p>
              <a href="mailto:info@KokomoYachtClub.vip">
                info@KokomoYachtClub.vip
              </a>
            </p>
          </div>
        </div>

        {/* Navigation Bar */}
        <nav className="sticky top-0 z-50 bg-white shadow-lg">
          <div className="w-full flex items-center justify-between py-2 px-10">
            {/* Logo */}
            <Link to={"/"}>
              <img src={logo} className="w-[150px]" alt="kokomo_logo" />
            </Link>

            {/* Menu Section */}
            <div className="hidden xl:block">
              <ul className="flex items-center gap-4 text-midnightblue text-base font-nunito">
                {[
                  "home",
                  "fleet",
                  "membership",
                  "list-your-yacht",
                  "founders",
                  "contact",
                ].map((menu) => (
                  <li
                    key={menu}
                    className={`cursor-pointer inline-block py-1 px-2 text-lg font-medium no-underline hover:text-blue-600 ${
                      selectedMenu === menu ? "text-blue-600" : ""
                    }`}
                  >
                    <Link
                      to={menu === "home" ? "/" : `/${menu}`}
                      onClick={() => setSelectedMenu(menu)}
                    >
                      {menu === "list-your-yacht"
                        ? "List Your Yacht"
                        : menu.charAt(0).toUpperCase() + menu.slice(1)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* User & Login Section */}
            <div className="flex items-center justify-center">
              <div className="hidden md:flex justify-between items-center gap-4">
                <div className="flex items-center space-x-4 px-2 py-1">
                  <div>
                    {isLoggedIn ? (
                      <div
                        className="text-midnightblue cursor-pointer hidden xl:block"
                        onClick={handlePopup}
                      >
                        <FaUser size={30} />
                      </div>
                    ) : (
                      <Link to="/login">
                        <button className="bg-midnightblue hidden xl:block text-white rounded-full px-4 py-3 cursor-pointer text-sm hover:bg-opacity-80">
                          Login
                        </button>
                      </Link>
                    )}
                  </div>
                </div>
              </div>

              {/* Mobile hamburger menu */}
              <div
                className="xl:hidden text-3xl text-midnightblue cursor-pointer p-2"
                onClick={() => setOpen(!open)}
              >
                <GiHamburgerMenu />
              </div>
            </div>
          </div>
        </nav>
      </div>

      {/* Mobile Menu */}
      <ResponsiveMenu open={open} setOpen={setOpen} />

      {/* Popup Component */}
      <Popup isVisible={popup} closePopup={() => setPopup(false)} />
    </>
  );
};
export default Navbar;

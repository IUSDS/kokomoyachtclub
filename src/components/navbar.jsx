import React, { useState, useEffect } from 'react';
import { GiHamburgerMenu } from "react-icons/gi";
import ResponsiveMenu from "./responsiveMenu";
import { FaUser } from "react-icons/fa";
import logo from "../assets/logos/logo.png";
import { Link, useLocation } from "react-router-dom";
import useAuthStore from '../authStore';
import { div } from 'framer-motion/client';

const Popup = ({ isVisible, closePopup }) => {
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    logout(); 
    closePopup();
  };

  if (!isVisible) return null;

  return (
    <div className="fixed top-24 xl:right-12 md:right-24 z-50">
      <div className="flex flex-col bg-midnightblue text-white px-4 py-2 rounded-lg shadow-lg">
        {/* <Link to="/login" onClick={closePopup}>
          <p className="cursor-pointer hover:text-blue-200">Go to Login Page</p>
        </Link> */}
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
  const [selectedMenu, setSelectedMenu] = useState('');
  const location = useLocation();
  const [popup, setPopup] = useState(false);

  useEffect(() => {
    const path = location.pathname.split('/')[1];
    setSelectedMenu(path || 'home');
  }, [location]);

  // Tries to get user login info
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  const handlePopup = () => {
    setPopup(!popup);
  }

  return (
    <>
      <div className='flex flex-col'>
        <div className="flex py-2 justify-between xl:px-20 text-sm md:px-16 px-10 bg-midnightblue">
          {/* Address Section */}
          <div className="text-white hidden md:block">
            <p>
              <a
                href="https://www.google.com/maps?q=1000+Boulevard+of+the+Arts,+Sarasota,+FL"
                target="_blank"
                rel="noopener noreferrer"
              >
                1000 Boulevard of the Arts, Sarasota, FL
              </a>
            </p>
          </div>

          {/* Contact Section */}
          <div className="text-white text-sm flex gap-4 md:gap-8">
            <p>
              <a href="tel:+19412592248">
                (941) 259-2248
              </a>
            </p>
            <p>
              <a href="mailto:info@KokomoYachtClub.vip">
                info@KokomoYachtClub.vip
              </a>
            </p>
          </div>
        </div>
        <nav className='sticky top-0 z-50'>
          <div className="w-full flex items-center justify-between py-2 px-10 shadow-lg">
            {/* Logo */}
            <Link to={'/'}>
              <div className="">
                <img src={logo} className='w-[150px]' alt="kokomo_logo" />
              </div>
            </Link>

            {/* Menu section */}
            <div className="hidden xl:block">
              <ul className="flex items-center gap-4 text-midnightblue text-base font-nunito">
                <li
                  className={`cursor-pointer inline-block py-1 px-2 text-lg font-medium no-underline hover:text-blue-600 ${selectedMenu === 'home' ? 'text-blue-600' : ''}`}
                >
                  <Link to="/" onClick={() => setSelectedMenu('home')}>Home</Link>
                </li>
                <li
                  className={`cursor-pointer inline-block py-1 px-2 text-lg font-medium no-underline hover:text-blue-600 ${selectedMenu === 'founders' ? 'text-blue-600' : ''}`}
                >
                  <Link to="/founders" onClick={() => setSelectedMenu('founders')}>From the Founders</Link>
                </li>
                <li
                  className={`cursor-pointer inline-block py-1 px-2 text-lg font-medium no-underline hover:text-blue-600 ${selectedMenu === 'fleet' ? 'text-blue-600' : ''}`}
                >
                  <Link to="/fleet" onClick={() => setSelectedMenu('fleet')}>Fleet</Link>
                </li>
                <li
                  className={`cursor-pointer inline-block py-1 px-2 text-lg font-medium no-underline hover:text-blue-600 ${selectedMenu === 'members' ? 'text-blue-600' : ''}`}
                >
                  <Link to="/members" onClick={() => setSelectedMenu('members')}>Membership</Link>
                </li>
                <li
                  className={`cursor-pointer inline-block py-1 px-2 text-lg font-medium no-underline hover:text-blue-600 ${selectedMenu === 'contact' ? 'text-blue-600' : ''}`}
                >
                  <Link to="/contact" onClick={() => setSelectedMenu('contact')}>Contact</Link>
                </li>
              </ul>
            </div>

            <div className='flex items-center justify-center'>
              {/* Buttons */}
              <div className="hidden md:flex justify-between items-center gap-4">
                <div className="flex items-center space-x-4 px-2 py-1">
                  {/* <Link
                    to="/contact"
                    onClick={(e) => {
                      e.preventDefault();
                      window.open("/contact", "_blank");
                    }}
                  >
                    {!isLoggedIn && (
                      <button className="bg-midnightblue text-white rounded-full px-4 py-3 cursor-pointer font-medium hover:bg-opacity-80">
                        Become a Member
                      </button>
                    )}
                  </Link> */}

                  <div>
                    {isLoggedIn ? (
                      <div className='text-midnightblue cursor-pointer hidden xl:block' onClick={handlePopup} > <FaUser size={30} /> </div>
                    ) : (
                      // Log in button
                      <Link to="/login">
                        <button className="bg-midnightblue hidden xl:block text-white rounded-full px-4 py-3 cursor-pointer text-sm hover:bg-opacity-80">
                          Login
                        </button>
                      </Link>
                    )}
                  </div>
                </div>
              </div>

              {/* Mobile hamburger Menu section */}
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

      {/* Mobile side section */}
      <ResponsiveMenu open={open} setOpen={setOpen} />

      <Popup isVisible={popup} closePopup={() => setPopup(false)} />
    </>
  );
};

export default Navbar;

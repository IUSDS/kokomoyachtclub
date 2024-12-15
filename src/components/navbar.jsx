import React, {useState} from 'react'
import { GiHamburgerMenu } from "react-icons/gi";
import ResponsiveMenu from "./responsiveMenu";
import { FaUser } from "react-icons/fa";
import logo from "../assets/images/logo.png";

const navbar = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <nav>
        <div className="w-full flex items-center justify-between py-4 px-10 shadow-lg">
          {/* Logo */}
          <div className="">
            <img src={logo} alt="kokomo_logo" />
          </div>

          {/* Menu section */}
          <div className="hidden md:block">
            <ul className="flex items-center gap-8 text-midnightblue text-base font-nunito">
              <li className="cursor-pointer inline-block py-1 px-3 font-bold no-underline hover:underline">
                Home
              </li>
              <li className="cursor-pointer inline-block py-1 px-3 font-bold no-underline hover:underline">
                From the Founders
              </li>
              <li className="cursor-pointer inline-block py-1 px-3 font-bold no-underline hover:underline">
                Fleet
              </li>
              <li className="cursor-pointer inline-block py-1 px-3 font-bold no-underline hover:underline">
                Membership
              </li>
              <li className="cursor-pointer inline-block py-1 px-3 font-bold no-underline hover:underline">
                Contact
              </li>
            </ul>
          </div>

          {/* Buttons */}
          <div className="hidden md:flex justify-between items-center gap-4">
            <div className="flex items-center space-x-4 px-2 py-1">
              <button className="bg-midnightblue text-white rounded-lg px-4 py-2 cursor-pointer font-bold hover:bg-opacity-80 ">
                Come Aboard
              </button>
              <FaUser  className='text-midnightblue text-3xl cursor-pointer'/>
            </div>
          </div>

          {/* Mobile hamburger Menu section */}
          <div
            className="md:hidden text-5xl text-midnightblue cursor-pointer p-2"
            onClick={() => setOpen(!open)}
          >
            <GiHamburgerMenu />
          </div>
        </div>
      </nav>

      {/* Mobile side section */}
      <ResponsiveMenu open={open} />
    </>
  )
}

export default navbar
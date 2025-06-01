import React from "react";
import logo from "../assets/logos/logo.png";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Link, useLocation } from "react-router-dom";

const footer = () => {
  return (
    <>
      <div className="flex flex-col lg:flex-row-reverse items-center justify-center gap-4 mx-10 my-8 lg:my-16">
        {/* links section */}
        <div className="flex flex-col md:flex-row md:gap-x-4 xl:gap-x-6 text-gray-600 lg:w-2/3 gap-y-2">
          {/* Fleet */}
          <div className="text-left">
            <p className="text-midnightblue">Fleet</p>
            <ul className="flex gap-x-4 xl:gap-x-6">
              <div className="w-1/2 md:max-w-1/2">
                <li>
                  <a
                    href={`/fleet#peace`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cursor-pointer hover:text-blue-600"
                  >
                    63' Peace
                  </a>
                </li>
                <li>
                  <a
                    href={`/fleet#memorymaker`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cursor-pointer hover:text-blue-600"
                  >
                    50' Memory Maker
                  </a>
                </li>
                <li>
                  <a
                    href={`/fleet#memoriesnotdreams`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cursor-pointer hover:text-blue-600"
                  >
                    50' Memories, Not Dreams
                  </a>
                </li>
                <li>
                  <a
                    href={`/fleet#lil'bitnauti`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cursor-pointer hover:text-blue-600"
                  >
                    50' Lil' Bit Nauti
                  </a>
                </li>
                <li>
                  <a
                    href={`/fleet#congetta`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cursor-pointer hover:text-blue-600"
                  >
                    44' Congetta
                  </a>
                </li>
                <li>
                  <a
                    href={`/fleet#fountainepajot`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cursor-pointer hover:text-blue-600"
                  >
                    44' Fountaine Pajot
                  </a>
                </li>
              </div>
              <div className="w-1/2 md:max-w-1/2">
                <li>
                  <a
                    href={`/fleet#giddyup`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cursor-pointer hover:text-blue-600"
                  >
                    43' Giddy Up
                  </a>
                </li>
                <li>
                  <a
                    href={`/fleet#wnaderlust`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cursor-pointer hover:text-blue-600"
                  >
                    42' Wanderlust
                  </a>
                </li>
                {/* <li>
                  <a
                    href={`/fleet#outrage`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cursor-pointer hover:text-blue-600"
                  >
                    42' Outrage
                  </a>
                </li> */}
                <li>
                  <a
                    href={`/fleet#happyhour`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cursor-pointer hover:text-blue-600"
                  >
                    40' Happy Hour
                  </a>
                </li>
                <li>
                  <a
                    href={`/fleet#thirsttrap`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cursor-pointer hover:text-blue-600"
                  >
                    40' Thirst Trap
                  </a>
                </li>
                <li>
                  <a
                    href={`/fleet#topshelf`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cursor-pointer hover:text-blue-600"
                  >
                    38' Top Shelf
                  </a>
                </li>
                <li>
                  <a
                    href={`/fleet#oceanrode`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cursor-pointer hover:text-blue-600"
                  >
                    35' Ocean Rode
                  </a>
                </li>
                <li>
                  <a
                    href={`/fleet#thelife`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cursor-pointer hover:text-blue-600"
                  >
                    29' The Life
                  </a>
                </li>
              </div>
            </ul>
          </div>
 
          <div className="flex xl:gap-x-6 gap-x-4">
            {/* Helpful Links */}
            <div className="text-left w-1/2 md:max-w-1/2">
              <p className="text-midnightblue">Helpful Links</p>
              <ul>
                <li>
                  <a
                    href="/contact"
                    className="cursor-pointer hover:text-blue-600"
                  >
                    Become a Member
                  </a>
                </li>
                <li>
                  <a href="/" className="cursor-pointer hover:text-blue-600">
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="/founders"
                    className="cursor-pointer hover:text-blue-600"
                  >
                    From the Founders
                  </a>
                </li>
                <li>
                  <a
                    href="/fleet"
                    className="cursor-pointer hover:text-blue-600"
                  >
                    Fleet
                  </a>
                </li>
                <li>
                  <a
                    href="/members"
                    className="cursor-pointer hover:text-blue-600"
                  >
                    Membership
                  </a>
                </li>
                <li>
                  <a
                    href="/contact"
                    className="cursor-pointer hover:text-blue-600"
                  >
                    Contact
                  </a>
                </li>
                <li>
                  <a
                    href="/list-your-yacht"
                    className="cursor-pointer hover:text-blue-600"
                  >
                    List Your Yacht
                  </a>
                </li>
                <li>
                  <a
                    href="/privacy-policy"
                    className="cursor-pointer hover:text-blue-600"
                  >
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>
            {/* Contact Links */}
            <div className="text-left w-1/2 md:max-w-1/2">
              <p className="text-midnightblue">Contact</p>
              <ul>
                <li>
                  <a
                    href="tel:+194125YACHT"
                    className="cursor-pointer hover:text-blue-600"
                  >
                    (941) 25-YACHT
                  </a>
                </li>
                <li>
                  <a
                    href="tel:+19412592248"
                    className="cursor-pointer hover:text-blue-600"
                  >
                    (941) 259-2248
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:info@kokomoyachtclub.vip"
                    className="cursor-pointer hover:text-blue-600"
                  >
                    info@kokomoyachtclub.vip
                  </a>
                </li>
                <li>
                  <a
                    href="https://maps.google.com/?q=1000 Boulevard of the Arts, Sarasota, FL"
                    target="_blank"
                    className="cursor-pointer hover:text-blue-600 "
                  >
                    601 Quay Commons, Sarasota, FL 34236
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* logo section */}
        <div className="flex flex-col items-center xl:items-start gap-4 lg:items-start lg:w-1/3">
          <img
            className="w-[249px] h-[110.1px] object-cover"
            width={249}
            height={110}
            alt=""
            src={logo}
          />
          <p className="text-left text-gray-600">
            SWFL's luxury boat club providing the pure joy of boating without
            the hassles.
          </p>
        </div>
      </div>

      <div
        className={`flex flex-col md:flex-row items-center justify-between w-full mx-auto px-8 py-6 bg-darkslateblue-100 gap-4 border-t border-gray-500 text-white font-dm-sans`}
      >
        <div className="text-smi">Copyright © 2024</div>
        <div className="text-smi">
          <a href="https://www.iusdigitalsolutions.com/" target="_blank">
            Powered by IUS Digital Solutions
          </a>
        </div>
        <div className="flex items-center space-x-3">
          <a
            className="hover:bg-opacity-80 cursor-pointer rounded-2xl bg-myGray w-8 h-8 flex items-center justify-center"
            href="https://www.facebook.com/profile.php?id=61564983026145"
            target="_blank"
          >
            <FaFacebookF className="text-black" />
          </a>
          <a
            className="hover:bg-opacity-80 cursor-pointer rounded-2xl bg-myGray w-8 h-8 flex items-center justify-center"
            href="https://x.com/kokomoyachtclub"
            target="_blank"
          >
            <FaXTwitter className="text-black" />
          </a>
          <a
            className="hover:bg-opacity-80 cursor-pointer rounded-2xl bg-myGray w-8 h-8 flex items-center justify-center"
            href="https://www.instagram.com/kokomoyachtclub"
            target="_blank"
          >
            <FaInstagram className="text-black" />
          </a>
          <a
            className="hover:bg-opacity-80 cursor-pointer rounded-2xl bg-myGray w-8 h-8 flex items-center justify-center"
            href="https://www.linkedin.com/company/kokomo-yacht-club/"
            target="_blank"
          >
            <FaLinkedinIn className="text-black" />
          </a>
        </div>
      </div>
    </>
  );
};

export default footer;

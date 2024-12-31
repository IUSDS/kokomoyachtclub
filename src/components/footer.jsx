import React from 'react'
import logo from "../assets/images/logo.png";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

const footer = () => {
    return (
        <>
            <div className="flex flex-col lg:flex-row-reverse items-center justify-center gap-10 my-8 lg:my-16">
                {/* links section */}
                <div className="flex flex-col md:flex-row gap-8 text-gray-600">
                    <div>
                        <p className="text-midnightblue ">Fleet</p>
                        <ul>
                            <li>
                                <a href="#" className="cursor-pointer hover:text-midnightblue">
                                    50' Memory Maker
                                </a>
                            </li>
                            <li>
                                <a href="#" className="cursor-pointer hover:text-midnightblue">
                                    50' Club Yacht
                                </a>
                            </li>
                            <li>
                                <a href="#" className="cursor-pointer hover:text-midnightblue">
                                    43' Giddy Up
                                </a>
                            </li>
                            <li>
                                <a href="#" className="cursor-pointer hover:text-midnightblue">
                                    42' Wanderlust
                                </a>
                            </li>
                            <li>
                                <a href="#" className="cursor-pointer hover:text-midnightblue">
                                    38' Top Shelf
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <p className="text-midnightblue ">Helpful Links</p>
                        <ul>
                            <li>
                                <a href="#" className="cursor-pointer hover:text-midnightblue">
                                    Home
                                </a>
                            </li>
                            <li>
                                <a href="#" className="cursor-pointer hover:text-midnightblue">
                                    From the Founders
                                </a>
                            </li>
                            <li>
                                <a href="#" className="cursor-pointer hover:text-midnightblue">
                                    Fleet
                                </a>
                            </li>
                            <li>
                                <a href="#" className="cursor-pointer hover:text-midnightblue">
                                    Membership
                                </a>
                            </li>
                            <li>
                                <a href="#" className="cursor-pointer hover:text-midnightblue">
                                    Membership Brochure
                                </a>
                            </li>
                            <li>
                                <a href="#" className="cursor-pointer hover:text-midnightblue">
                                    Contact
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <p className="text-midnightblue">Contact</p>
                        <ul>
                            <li>
                                <a
                                    href="tel:+194125YACHT"
                                    className="cursor-pointer hover:text-midnightblue"
                                >
                                    (941) 25-YACHT
                                </a>
                            </li>
                            <li>
                                <a
                                    href="tel:+19412592248"
                                    className="cursor-pointer hover:text-midnightblue"
                                >
                                    (941) 259-2248
                                </a>
                            </li>
                            <li>
                                <a
                                    href="mailto:Info@KokomoYachtClub.vip"
                                    className="cursor-pointer hover:text-midnightblue"
                                >
                                    Info@KokomoYachtClub.vip
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://maps.google.com/?q=1000 Boulevard of the Arts, Sarasota, FL"
                                    target="_blank"
                                    className="cursor-pointer hover:text-midnightblue"
                                >
                                    1000 Boulevard of the Arts, Sarasota, FL
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* logo section */}
                <div className="flex flex-col items-center gap-4 lg:items-start lg:w-1/2">
                    <img
                        className="w-[249px] h-[110.1px] object-cover"
                        width={249}
                        height={110}
                        alt=""
                        src={logo}
                    />
                    <p className="text-center text-gray-600">
                        SWFL's luxury boat club providing the pure joy of boating without the
                        hassles.
                    </p>
                </div>
            </div>

            <div
                className={`flex flex-col md:flex-row items-center justify-between w-full mx-auto px-8 py-6 bg-darkslateblue-100 gap-4 border-t border-gray-500 text-white font-dm-sans`}
            >
                <div className="text-smi">
                    Copyright © 2024
                </div>
                <div className="text-smi">
                    Powered by IUS Digital Solutions
                </div>
                <div className="flex items-center space-x-3">
                    <a className="hover:bg-opacity-80 cursor-pointer rounded-2xl bg-myGray w-8 h-8 flex items-center justify-center">
                        <FaFacebookF className='text-black' />
                    </a>
                    <a className="hover:bg-opacity-80 cursor-pointer rounded-2xl bg-myGray w-8 h-8 flex items-center justify-center">
                        <FaTwitter className='text-black' />
                    </a>
                    <a className="hover:bg-opacity-80 cursor-pointer rounded-2xl bg-myGray w-8 h-8 flex items-center justify-center">
                        <FaInstagram className='text-black' />
                    </a>
                    <a className="hover:bg-opacity-80 cursor-pointer rounded-2xl bg-myGray w-8 h-8 flex items-center justify-center">
                        <FaYoutube className='text-black' />
                    </a>
                </div>
            </div>
        </>
    )
}

export default footer
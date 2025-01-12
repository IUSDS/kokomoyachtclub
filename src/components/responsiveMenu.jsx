import { motion, AnimatePresence } from "framer-motion";
import React from "react";
import { Link } from "react-router-dom";

const ResponsiveMenu = ({ open }) => {
  return (
    <AnimatePresence mode="wait">
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -100 }}
          className="absolute top-30 left-0 w-full h-screen bg-black/70 z-40"
        >
          <div className="texl-xl uppercase font-semibold text-white bg-midnightblue py-8 m-6 rounded-3xl">
            <ul className="flex flex-col items-center justify-center gap-10">
              <li className="cursor-pointer hover:text-gray-300">
                <Link to="/">Home</Link>
              </li>
              <li className="cursor-pointer hover:text-gray-300">
                <Link to="/founders">From the Founder</Link>
              </li>
              <li className="cursor-pointer hover:text-gray-300">
                <Link to="/fleet">Fleet</Link>
              </li>
              <li className="cursor-pointer hover:text-gray-300">
                <Link to="/members">Membership</Link>
              </li>
              <li className="cursor-pointer hover:text-gray-300">
                <Link to="/contact">Contact</Link>
              </li>
              <li className="cursor-pointer hover:text-gray-300">
                <a
                  href="/contact"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Become a Member
                </a>
              </li>
              <li className="cursor-pointer hover:text-gray-300">
                <Link to="/login">Login</Link>
              </li>
            </ul>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ResponsiveMenu;

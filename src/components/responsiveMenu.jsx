import { motion, AnimatePresence } from "framer-motion";
import React from "react";
import { Link } from "react-router-dom";
import useAuthStore from "../authStore";
import { li } from "framer-motion/client";

const ResponsiveMenu = ({ open, setOpen }) => {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const logout = useAuthStore((state) => state.logout);
  const handleLogout = () => {
    logout();
    setOpen(false)
  };
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
                <Link onClick={() => setOpen(false)} to="/">Home</Link>
              </li>
              <li className="cursor-pointer hover:text-gray-300">
                <Link onClick={() => setOpen(false)} to="/founders">From the Founder</Link>
              </li>
              <li className="cursor-pointer hover:text-gray-300">
                <Link onClick={() => setOpen(false)} to="/fleet">Fleet</Link>
              </li>
              <li className="cursor-pointer hover:text-gray-300">
                <Link onClick={() => setOpen(false)} to="/members">Membership</Link>
              </li>
              <li className="cursor-pointer hover:text-gray-300">
                <Link onClick={() => setOpen(false)} to="/contact">Contact</Link>
              </li>
              <li className="cursor-pointer hover:text-gray-300">
                <a
                  href="/contact"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                >
                  Become a Member
                </a>
              </li>
              <li className="cursor-pointer hover:text-gray-300">
                <Link onClick={() => setOpen(false)} to="/login">Login</Link>
              </li>
              {isLoggedIn && (
                <li className="cursor-pointer hover:text-gray-300" onClick={handleLogout}>
                  Log out
                </li>
              )}
            </ul>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ResponsiveMenu;

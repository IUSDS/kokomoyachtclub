import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import useAuthStore from "../authStore";
import { li } from "framer-motion/client";
import React, { useEffect } from "react";

const ResponsiveMenu = ({ open, setOpen }) => {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const logout = useAuthStore((state) => state.logout);
  const user_type = useAuthStore((state) => state.user_type);
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
          className="absolute top-[120px] left-0 w-full h-screen z-40"
        >
          <div className="texl-xl uppercase font-semibold text-white bg-midnightblue py-8 m-6 rounded-3xl">
            <ul className="flex flex-col items-center justify-center gap-10">
              <li className="cursor-pointer hover:text-gray-300">
                <Link onClick={() => setOpen(false)} to="/">Home</Link>
              </li>
              <li className="cursor-pointer hover:text-gray-300">
                <Link onClick={() => setOpen(false)} to="/events">Events</Link>
              </li>
              <li className="cursor-pointer hover:text-gray-300">
                <Link onClick={() => setOpen(false)} to="/fleet">Fleet</Link>
              </li>
              <li className="cursor-pointer hover:text-gray-300">
                <Link onClick={() => setOpen(false)} to="/membership">Membership</Link>
              </li>
              <li className="cursor-pointer hover:text-gray-300">
                <Link onClick={() => setOpen(false)} to="/list-your-yacht">List Your Yacht</Link>
              </li>
              <li className="cursor-pointer hover:text-gray-300">
                <Link onClick={() => setOpen(false)} to="/founders">Founder</Link>
              </li>
              <li className="cursor-pointer hover:text-gray-300">
                <Link onClick={() => setOpen(false)} to="/private-dining">Private Dining</Link>
              </li>
              <li className="cursor-pointer hover:text-gray-300">
                <Link onClick={() => setOpen(false)} to="/contact">Contact</Link>
              </li>
              {isLoggedIn && user_type && (
                user_type.toLowerCase() === "user" ? (
                  <>
                    <li className="cursor-pointer hover:text-gray-300">
                      <Link onClick={() => setOpen(false)} to="/member-portal">Dashboard</Link>
                    </li>
                  </>
                ) : user_type.toLowerCase() === "admin" ? (
                  <>
                    <li className="cursor-pointer hover:text-gray-300">
                      <Link onClick={() => setOpen(false)} to="/admin">Admin Services</Link>
                    </li>
                  </>
                ) : null
              )}

              {!isLoggedIn && (
                <>
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
                    <Link onClick={() => setOpen(false)} to="/login">
                      Login
                    </Link>
                  </li>
                </>
              )}
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

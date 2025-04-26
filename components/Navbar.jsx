import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.jpg"; // Ensure the logo exists

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => setIsOpen(!isOpen);
  const closeNavbar = () => setIsOpen(false);

  return (
    <nav className="bg-gradient-to-r from-blue-600 via-indigo-700 to-purple-700 p-4 shadow-md fixed top-0 w-full z-50 backdrop-blur-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo Section */}
        <div className="flex items-center">
          <img
            src={logo}
            alt="Logo"
            className="h-12 w-12 mr-3 rounded-full shadow-lg"
          />
          <span className="text-white text-2xl font-bold tracking-wide">
            MyApp
          </span>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleNavbar}
          className="text-white lg:hidden focus:outline-none transition-transform transform active:scale-90"
        >
          <svg
            className="h-7 w-7"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            )}
          </svg>
        </button>

        {/* Navbar Links - Desktop & Mobile */}
        <div
          className={`lg:flex lg:items-center lg:w-auto transition-all duration-500 ease-in-out ${
            isOpen
              ? "block absolute top-full left-0 w-full bg-indigo-700 p-5 shadow-xl rounded-b-lg"
              : "hidden lg:block"
          }`}
        >
          <ul className="flex flex-col lg:flex-row text-center lg:text-left space-y-4 lg:space-y-0 lg:space-x-6">
            <li>
              <Link
                to="/home"
                className="text-white text-lg px-5 py-2 block hover:bg-indigo-500 rounded-lg transition-all duration-300"
                onClick={closeNavbar}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="text-white text-lg px-5 py-2 block hover:bg-indigo-500 rounded-lg transition-all duration-300"
                onClick={closeNavbar}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="text-white text-lg px-5 py-2 block hover:bg-indigo-500 rounded-lg transition-all duration-300"
                onClick={closeNavbar}
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                to="/services"
                className="text-white text-lg px-5 py-2 block hover:bg-indigo-500 rounded-lg transition-all duration-300"
                onClick={closeNavbar}
              >
                Services
              </Link>
            </li>
            <li>
              <Link
                to="/qa"
                className="text-white text-lg px-5 py-2 block hover:bg-indigo-500 rounded-lg transition-all duration-300"
                onClick={closeNavbar}
              >
                QA
              </Link>
            </li>
          </ul>

          {/* Auth Buttons */}
          <div className="flex flex-col lg:flex-row lg:space-x-4 lg:ml-6 mt-4 lg:mt-0 text-center">
            <Link
              to="/login"
              className="bg-white text-indigo-700 text-lg px-6 py-2 rounded-lg shadow-md hover:shadow-xl hover:bg-indigo-100 transition-all duration-300"
              onClick={closeNavbar}
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="bg-white text-indigo-700 text-lg px-6 py-2 rounded-lg shadow-md hover:shadow-xl hover:bg-indigo-100 transition-all duration-300"
              onClick={closeNavbar}
            >
              Signup
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

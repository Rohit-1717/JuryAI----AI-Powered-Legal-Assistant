import React, { useState } from "react";
import { MdOutlineBalance } from "react-icons/md";
import { FiMenu, FiX } from "react-icons/fi";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-lg bg-white/30 dark:bg-gray-900/30 border-b border-gray-200/40 dark:border-gray-800/40 px-6 lg:px-10 py-3 lg:py-5 flex items-center justify-between shadow-md">
      {/* Left side: Logo + Nav links */}
      <div className="flex items-center space-x-4">
        <MdOutlineBalance className="text-2xl lg:text-3xl text-slate-600 dark:text-slate-300" />
        <span className="text-lg  font-bold text-gray-900 dark:text-white">
          JuryAI
        </span>
        <div className="hidden md:flex space-x-6 ml-6">
          <a
            href="#"
            className="font-bold text-sm lg:text-md text-gray-700 dark:text-gray-300 hover:text-slate-600 transition"
          >
            News
          </a>
          <a
            href="#"
            className="font-bold text-sm lg:text-md text-gray-700 dark:text-gray-300 hover:text-slate-600 transition"
          >
            About
          </a>
          <a
            href="#"
            className="font-bold text-sm lg:text-md text-gray-700 dark:text-gray-300 hover:text-slate-600 transition"
          >
            Get Advocate
          </a>
          <a
            href="#"
            className="font-bold text-sm lg:text-md text-gray-700 dark:text-gray-300 hover:text-slate-600 transition"
          >
            Drafts
          </a>
        </div>
      </div>

      {/* Right side: Buttons */}
      <div className="hidden md:flex items-center space-x-4">
        <button className="text-sm btn btn-soft lg:text-md font-bold px-4 py-1.5 rounded-md text-gray-800 dark:text-white hover:text-slate-600 transition">
          Login
        </button>
        <button className="text-sm lg:text-md font-bold px-4 py-1.5 rounded-md bg-white text-black hover:bg-zinc-400 transition">
          Get Started
        </button>
      </div>

      {/* Mobile menu icon */}
      <div className="md:hidden flex items-center">
        <button
          onClick={toggleDropdown}
          className="text-gray-800 dark:text-white focus:outline-none"
        >
          {isOpen ? (
            <FiX className="text-2xl" />
          ) : (
            <FiMenu className="text-2xl" />
          )}
        </button>
      </div>

      {/* Mobile Dropdown */}
      <div
        className={`md:hidden absolute top-16 left-4 right-4 z-40 rounded-md shadow-lg backdrop-blur-lg bg-white/90 dark:bg-zinc-900 border-gray-300 dark:border-gray-800 transition-all duration-300 ease-in-out origin-top transform ${
          isOpen
            ? "scale-100 opacity-100"
            : "scale-95 opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col space-y-4 px-6 py-4">
          <a
            href="#"
            className="font-bold text-sm lg:text-md text-gray-800 dark:text-gray-200 hover:text-slate-600 transition"
          >
            Home
          </a>
          <a
            href="#"
            className="font-bold text-sm lg:text-md text-gray-800 dark:text-gray-200 hover:text-slate-600 transition"
          >
            Features
          </a>
          <a
            href="#"
            className="font-bold text-sm lg:text-md text-gray-800 dark:text-gray-200 hover:text-slate-600 transition"
          >
            Pricing
          </a>
          <a
            href="#"
            className="font-bold text-sm lg:text-md text-gray-800 dark:text-gray-200 hover:text-slate-600 transition"
          >
            Contact
          </a>
          <hr className="border-t border-gray-300 dark:border-gray-700" />
          <button className="text-sm btn lg:text-md font-bold text-left text-gray-800 dark:text-white hover:text-slate-600 transition">
            Login
          </button>
          <button className="text-sm btn btn-soft lg:text-md font-bold text-left text-black bg-slate-600 px-4 py-2 rounded-md hover:bg-slate-700 transition">
            Get Started
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

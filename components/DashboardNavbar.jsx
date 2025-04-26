import React, { useContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import { FaBars, FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { UserContext } from "../context/UserContext";

function DashboardNav({ onMenuToggle }) {
  const [currentTime, setCurrentTime] = useState(
    new Date().toLocaleTimeString()
  );
  const { currentUser } = useContext(UserContext);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("currentUser");
      localStorage.removeItem("userProfile");
      navigate("/login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <nav className="bg-gray-800 p-4 shadow-md flex justify-between items-center">
      {/* Hamburger Menu (Mobile) */}
      <button className="md:hidden text-white" onClick={onMenuToggle}>
        <FaBars size={22} />
      </button>

      {/* Dashboard Title */}
      <div className="text-white text-xl">Student Dashboard</div>

      {/* Profile & Logout */}
      <div className="relative">
        <div
          className="flex items-center space-x-4 cursor-pointer"
          onClick={() => setIsProfileOpen(!isProfileOpen)}
        >
          <span className="text-white hidden md:inline">
            {currentUser?.email || "Student"}
          </span>
          <FaUserCircle className="text-white text-2xl" />
        </div>

        {/* Dropdown Menu */}
        {isProfileOpen && (
          <div className="absolute right-0 mt-2 bg-white rounded shadow-md w-48 z-50">
            <ul className="text-gray-700">
              <li
                className="p-2 hover:bg-gray-200 cursor-pointer"
                onClick={handleLogout}
              >
                Logout
              </li>
            </ul>
          </div>
        )}
      </div>

      {/* Current Time */}
      <span className="text-white">{currentTime}</span>
    </nav>
  );
}

export default DashboardNav;

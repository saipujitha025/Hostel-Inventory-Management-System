import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { FaBars, FaTimes, FaChevronDown, FaChevronRight } from "react-icons/fa";

function Sidebar({ role }) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [openSections, setOpenSections] = useState({});

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <>
      {/* Hamburger Button */}
      {!isOpen && (
        <button
          className="md:hidden p-3 text-white bg-gray-800 fixed top-2 left-4 z-50 rounded-full"
          onClick={() => setIsOpen(true)}
        >
          <FaBars size={22} />
        </button>
      )}

      {/* Sidebar */}
      <div
        className={`bg-gray-800 w-64 h-screen p-4 fixed top-0 left-0 transition-transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:relative z-40`}
      >
        {/* Close Button */}
        {isOpen && (
          <button
            className="absolute top-4 right-4 text-white md:hidden"
            onClick={() => setIsOpen(false)}
          >
            <FaTimes size={22} />
          </button>
        )}

        <ul className="mt-10 space-y-4">
          {role === "warden" && (
            <>
              <li className="hover:bg-gray-700 p-2 rounded">
                <Link to="/warden-dashboard/additems" className="text-white">
                  Add Items
                </Link>
              </li>
              <li className="hover:bg-gray-700 p-2 rounded">
                <Link to="/warden-dashboard/search" className="text-white">
                  Search
                </Link>
              </li>

              {/* Stock Management Section */}
              <li>
                <button
                  className="w-full text-left text-white flex justify-between items-center p-2 hover:bg-gray-700 rounded"
                  onClick={() => toggleSection("stock")}
                >
                  Stock Management
                  {openSections.stock ? <FaChevronDown /> : <FaChevronRight />}
                </button>
                {openSections.stock && (
                  <ul className="ml-4 mt-2 space-y-2">
                    <li>
                      <Link
                        to="/warden-dashboard/messstock"
                        className="text-gray-300 hover:text-white"
                      >
                        Mess Stock
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/warden-dashboard/furniturestock"
                        className="text-gray-300 hover:text-white"
                      >
                        Furniture Stock
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/warden-dashboard/electronicstock"
                        className="text-gray-300 hover:text-white"
                      >
                        Electronic Stock
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/warden-dashboard/updatestock"
                        className="text-gray-300 hover:text-white"
                      >
                        Update Stock
                      </Link>
                    </li>
                  </ul>
                )}
              </li>

              {/* Allocation Section */}
              <li>
                <button
                  className="w-full text-left text-white flex justify-between items-center p-2 hover:bg-gray-700 rounded"
                  onClick={() => toggleSection("allocation")}
                >
                  Allocations
                  {openSections.allocation ? (
                    <FaChevronDown />
                  ) : (
                    <FaChevronRight />
                  )}
                </button>
                {openSections.allocation && (
                  <ul className="ml-4 mt-2 space-y-2">
                    <li>
                      <Link
                        to="/warden-dashboard/furniture-allocation"
                        className="text-gray-300 hover:text-white"
                      >
                        Furniture Allocation
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/warden-dashboard/electrical-allocation"
                        className="text-gray-300 hover:text-white"
                      >
                        Electrical Allocation
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/warden-dashboard/mess-allocation"
                        className="text-gray-300 hover:text-white"
                      >
                        Mess Stock Allocation
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/warden-dashboard/messhistory"
                        className="text-white"
                      >
                        Mess History
                      </Link>
                    </li>
                  </ul>
                )}
              </li>

              {/* Store Management Section */}
              <li>
                <button
                  className="w-full text-left text-white flex justify-between items-center p-2 hover:bg-gray-700 rounded"
                  onClick={() => toggleSection("store")}
                >
                  Store Management
                  {openSections.store ? <FaChevronDown /> : <FaChevronRight />}
                </button>
                {openSections.store && (
                  <ul className="ml-4 mt-2 space-y-2">
                    <li>
                      <Link
                        to="/warden-dashboard/store"
                        className="text-gray-300 hover:text-white"
                      >
                        Store
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/warden-dashboard/managestore"
                        className="text-gray-300 hover:text-white"
                      >
                        Manage Store
                      </Link>
                    </li>
                  </ul>
                )}
              </li>

              <li className="hover:bg-gray-700 p-2 rounded">
                <Link to="/warden-dashboard/requests" className="text-white">
                  Requests
                </Link>
              </li>
              <li className="hover:bg-gray-700 p-2 rounded">
                <Link to="/warden-dashboard/roomrequest" className="text-white">
                  Room Requests
                </Link>
              </li>
              <li className="hover:bg-gray-700 p-2 rounded">
                <Link
                  to="/warden-dashboard/furniturerequest"
                  className="text-white"
                >
                  Furniture Requests
                </Link>
              </li>
              <li className="hover:bg-gray-700 p-2 rounded">
                <Link
                  to="/warden-dashboard/elecricalrequest"
                  className="text-white"
                >
                  Elecrical Requests
                </Link>
              </li>

              <li className="hover:bg-gray-700 p-2 rounded">
                <Link to="/warden-dashboard/reports" className="text-white">
                  Reports
                </Link>
              </li>
            </>
          )}

          {role === "user" && (
            <>
              <li className="hover:bg-gray-700 p-2 rounded">
                <Link to="/student-dashboard/myprofile" className="text-white">
                  My Profile
                </Link>
              </li>
              <li className="hover:bg-gray-700 p-2 rounded">
                <Link
                  to="/student-dashboard/editprofile"
                  className="text-white"
                >
                  Edit Profile
                </Link>
              </li>
              <li className="hover:bg-gray-700 p-2 rounded">
                <Link
                  to="/student-dashboard/updateprofile"
                  className="text-white"
                >
                  complete Profile
                </Link>
              </li>
              <li className="hover:bg-gray-700 p-2 rounded">
                <Link
                  to="/student-dashboard/request-item"
                  className="text-white"
                >
                  Request Item
                </Link>
              </li>
              <li className="hover:bg-gray-700 p-2 rounded">
                <Link to="/student-dashboard/complaints" className="text-white">
                  Complaints
                </Link>
              </li>
              <li className="hover:bg-gray-700 p-2 rounded">
                <Link
                  to="/student-dashboard/roomrequests"
                  className="text-white"
                >
                  room requests
                </Link>
              </li>
              <li className="hover:bg-gray-700 p-2 rounded">
                <Link
                  to="/student-dashboard/furniture-request"
                  className="text-white"
                >
                  furniture requests
                </Link>
              </li>
              <li className="hover:bg-gray-700 p-2 rounded">
                <Link
                  to="/student-dashboard/electrical-request"
                  className="text-white"
                >
                  electrical requests
                </Link>
              </li>
            </>
          )}
        </ul>

        {/* Logout Button */}
      </div>
    </>
  );
}

export default Sidebar;

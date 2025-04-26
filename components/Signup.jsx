import React, { useState } from "react";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    role: "student",
    fullName: "",
    email: "",
    password: "",
    phoneNumber: "",
    roomNo: "",
    blockName: "",
    course: "MCA",
    academicYear: "",
    secretKey: "",
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (formData.role === "warden" && formData.secretKey !== "WARDEN123") {
      setError("Invalid Secret Key for Warden");
      setLoading(false);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      const userDoc = {
        fullName: formData.fullName,
        email: formData.email,
        role: formData.role,
      };

      if (formData.role === "student") {
        userDoc.phoneNumber = formData.phoneNumber;
        userDoc.roomNo = formData.roomNo;
        userDoc.blockName = formData.blockName;
        userDoc.course = formData.course;
        userDoc.academicYear = formData.academicYear;
      }

      await setDoc(doc(db, "users", userCredential.user.uid), userDoc);
      navigate("/login");
    } catch (err) {
      setError(err.message);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen py-28 flex items-center justify-center p-6">
      <div className="w-full max-w-lg bg-white p-8 rounded-2xl shadow-xl">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Sign Up
        </h2>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        {/* Role Selection */}
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="w-full p-3 border rounded-md bg-gray-100 focus:outline-none mb-4 text-gray-700"
        >
          <option value="student">Student</option>
          <option value="warden">Warden</option>
        </select>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Student-specific Fields */}
          {formData.role === "student" && (
            <>
              <input
                type="text"
                name="phoneNumber"
                placeholder="Phone Number"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <input
                type="text"
                name="roomNo"
                placeholder="Room Number"
                value={formData.roomNo}
                onChange={handleChange}
                required
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <input
                type="text"
                name="blockName"
                placeholder="Block or premises"
                value={formData.blockName}
                onChange={handleChange}
                required
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <select
                name="course"
                value={formData.course}
                onChange={handleChange}
                className="w-full p-3 border rounded-md bg-gray-100 focus:outline-none text-gray-700"
              >
                <option value="MCA">MCA</option>
                <option value="MBA">MBA</option>
                <option value="MSC">MSC</option>
                <option value="MCOM">MCOM</option>
              </select>

              <input
                type="text"
                name="academicYear"
                placeholder="Academic Year (e.g., 2023-2024)"
                value={formData.academicYear}
                onChange={handleChange}
                required
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </>
          )}

          {/* Warden Secret Key */}
          {formData.role === "warden" && (
            <input
              type="password"
              name="secretKey"
              placeholder="Enter Warden Secret Key"
              value={formData.secretKey}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          )}

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700 transition flex items-center justify-center"
            disabled={loading}
          >
            {loading ? (
              <svg
                className="animate-spin h-5 w-5 mr-2 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                ></path>
              </svg>
            ) : (
              "Sign Up"
            )}
          </button>
        </form>

        <p className="mt-4 text-center">
          Already have an account?{" "}
          <a href="/login" className="text-indigo-500 font-semibold">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;

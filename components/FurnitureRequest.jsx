import React, { useState, useContext } from "react";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { UserContext } from "../context/UserContext";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const FurnitureRequest = () => {
  const { currentUser, userProfile } = useContext(UserContext);
  const [furnitureItem, setFurnitureItem] = useState("");
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await addDoc(collection(db, "furniture_requests"), {
        studentId: currentUser.uid,
        studentName: userProfile.fullName,
        furnitureItem,
        reason,
        status: "pending",
        requestedAt: new Date(),
      });
      setFurnitureItem("");
      setReason("");
      alert("Furniture request submitted successfully!");
    } catch (error) {
      console.error("Error submitting furniture request:", error);
      alert("Failed to submit furniture request. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Request Furniture
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Furniture Item
          </label>
          <input
            type="text"
            value={furnitureItem}
            onChange={(e) => setFurnitureItem(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Reason
          </label>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md text-lg font-semibold flex items-center justify-center"
          disabled={loading}
        >
          {loading ? (
            <AiOutlineLoading3Quarters className="animate-spin mr-3" />
          ) : (
            "Submit Request"
          )}
        </button>
      </form>
    </div>
  );
};

export default FurnitureRequest;

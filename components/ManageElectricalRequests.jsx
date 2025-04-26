import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";

const ManageElectricalRequests = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      const requestsCollection = collection(db, "electrical_requests");
      const snapshot = await getDocs(requestsCollection);
      const requestsList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setRequests(requestsList);
    };

    fetchRequests();
  }, []);

  const handleApprove = async (requestId) => {
    try {
      const requestRef = doc(db, "electrical_requests", requestId);
      await updateDoc(requestRef, { status: "approved" });

      alert("Electrical request approved!");
      setRequests((prev) =>
        prev.map((req) =>
          req.id === requestId ? { ...req, status: "approved" } : req
        )
      );
    } catch (error) {
      console.error("Error approving electrical request:", error);
      alert("Failed to approve electrical request. Please try again.");
    }
  };

  const handleReject = async (requestId) => {
    try {
      const requestRef = doc(db, "electrical_requests", requestId);
      await updateDoc(requestRef, { status: "rejected" });

      alert("Electrical request rejected!");
      setRequests((prev) =>
        prev.map((req) =>
          req.id === requestId ? { ...req, status: "rejected" } : req
        )
      );
    } catch (error) {
      console.error("Error rejecting electrical request:", error);
      alert("Failed to reject electrical request. Please try again.");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Electrical Requests</h2>
      <ul>
        {requests.map((request) => (
          <li key={request.id} className="mb-4 p-4 border rounded-md">
            <p>
              <strong>Requested by:</strong> {request.studentName}
            </p>
            <p>
              <strong>Electrical Item:</strong> {request.electricalItem}
            </p>
            <p>
              <strong>Reason:</strong> {request.reason}
            </p>
            <p>
              <strong>Status:</strong> {request.status}
            </p>
            {request.status === "pending" && (
              <div className="mt-2">
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded-md mr-2"
                  onClick={() => handleApprove(request.id)}
                >
                  Approve
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-md"
                  onClick={() => handleReject(request.id)}
                >
                  Reject
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageElectricalRequests;

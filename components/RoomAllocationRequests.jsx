import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";

const RoomAllocationRequests = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      const requestsCollection = collection(db, "room_allocation_requests");
      const snapshot = await getDocs(requestsCollection);
      const requestsList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setRequests(requestsList);
    };

    fetchRequests();
  }, []);

  const handleApprove = async (requestId, studentId, newRoomNo) => {
    try {
      const requestRef = doc(db, "room_allocation_requests", requestId);
      await updateDoc(requestRef, { status: "approved" });

      const studentRef = doc(db, "users", studentId);
      await updateDoc(studentRef, { roomNo: newRoomNo });

      alert("Room allocation request approved!");
      setRequests((prev) =>
        prev.map((req) =>
          req.id === requestId ? { ...req, status: "approved" } : req
        )
      );
    } catch (error) {
      console.error("Error approving room allocation request:", error);
      alert("Failed to approve room allocation request. Please try again.");
    }
  };

  const handleReject = async (requestId) => {
    try {
      const requestRef = doc(db, "room_allocation_requests", requestId);
      await updateDoc(requestRef, { status: "rejected" });

      alert("Room allocation request rejected!");
      setRequests((prev) =>
        prev.map((req) =>
          req.id === requestId ? { ...req, status: "rejected" } : req
        )
      );
    } catch (error) {
      console.error("Error rejecting room allocation request:", error);
      alert("Failed to reject room allocation request. Please try again.");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Room Allocation Requests</h2>
      <ul>
        {requests.map((request) => (
          <li key={request.id} className="mb-4 p-4 border rounded-md">
            <p>
              <strong>Requested by:</strong> {request.studentName}
            </p>
            <p>
              <strong>Current Room No:</strong> {request.currentRoomNo}
            </p>
            <p>
              <strong>New Room No:</strong> {request.newRoomNo}
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
                  onClick={() =>
                    handleApprove(
                      request.id,
                      request.studentId,
                      request.newRoomNo
                    )
                  }
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

export default RoomAllocationRequests;

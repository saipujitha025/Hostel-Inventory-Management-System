import React, { useContext, useEffect } from "react";
import { AllocationContext } from "../context/AllocationContext";

const RoomUsers = ({ roomNo }) => {
  const { users, loading, fetchUsersForRoom } = useContext(AllocationContext);

  useEffect(() => {
    if (roomNo) {
      fetchUsersForRoom(roomNo);
    }
  }, [roomNo]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h3 className="text-xl font-bold mb-4">Users in Room {roomNo}</h3>
      {users.length === 0 ? (
        <p>No users found for this room.</p>
      ) : (
        <ul className="list-disc pl-5">
          {users.map((user) => (
            <li key={user.id}>
              {user.fullName} ({user.email})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RoomUsers;

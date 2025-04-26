import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";

const MyProfile = () => {
  const { userProfile } = useContext(UserContext);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">My Profile</h2>
      {userProfile ? (
        <div>
          <p>
            <strong>Full Name:</strong> {userProfile.fullName}
          </p>
          <p>
            <strong>Email:</strong> {userProfile.email}
          </p>
          <p>
            <strong>Phone Number:</strong> {userProfile.phoneNumber}
          </p>
          <p>
            <strong>Room No:</strong> {userProfile.roomNo}
          </p>
          <p>
            <strong>Course:</strong> {userProfile.course}
          </p>
          <p>
            <strong>Academic Year:</strong> {userProfile.academicYear}
          </p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default MyProfile;

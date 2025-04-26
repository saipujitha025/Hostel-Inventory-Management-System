import React, { useContext, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import DashboardNavbar from "./DashboardNavbar";
import Sidebar from "./Sidebar";

import { UserContext } from "../context/UserContext";

import Welcome from "./Welcome";
import MyProfile from "./MyProfile";
import UpdateProfile from "./UpdateProfile";
import RequestItem from "./RequestItem";
import Complaints from "./Complaints";
import EditProfile from "./EditProfile";
import RoomAllocationRequest from "./RoomAllocationRequest";
import FurnitureRequest from "./FurnitureRequest";
import ElectricalRequest from "./ElectricalRequest";

function UserDashboard() {
  const { currentUser } = useContext(UserContext);

  return (
    <div>
      <DashboardNavbar />
      <div className="flex">
        <Sidebar role="user" />
        <div className="flex-1 p-4 overflow-y-auto h-screen">
          <Routes>
            <Route path="/" element={<Welcome currentUser={currentUser} />} />
            <Route path="/myprofile" element={<MyProfile />} />
            <Route path="/editprofile" element={<EditProfile />} />
            <Route path="/updateprofile" element={<UpdateProfile />} />
            <Route path="/request-item" element={<RequestItem />} />
            <Route path="/complaints" element={<Complaints />} />
            <Route path="/roomrequests" element={<RoomAllocationRequest />} />
            <Route path="/furniture-request" element={<FurnitureRequest />} />
            <Route path="/electrical-request" element={<ElectricalRequest />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;

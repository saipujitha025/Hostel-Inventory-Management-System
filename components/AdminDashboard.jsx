import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import Sidebar from "./Sidebar";
import { UserContext } from "../context/UserContext";
import AdminWelcome from "./AdminWelcome";
import AdminDashboardNav from "./AdminDashboardNav";

import UpdateStock from "./UpdateStock";
import Requests from "./Requests";
import Reports from "./Reports";
import Store from "./Store";
import AddMessStock from "./AddMessStock";
import AddFurnitureStock from "./AddFurnitureStock";
import AddElectronicsStock from "./AddElectronicStock";
import ManageStore from "./ManageStore";
import FurnitureAllocation from "./FurnitureAllocation";
import ElectricalAllocation from "./ElecricalAllocation";
import AddItems from "./AddItems";
import MessStockAllocation from "./MessStockAllocation";
import MessStockUsageHistory from "./MessStockUsageHistory";
import Search from "./Search";
import RoomAllocationRequests from "./RoomAllocationRequests";
import ManageFurnitureRequests from "./ManageFurnitureRequests";
import ManageElectricalRequests from "./ManageElectricalRequests";

function AdminDashboard() {
  const { currentUser } = useContext(UserContext);

  return (
    <div className="h-screen flex flex-col">
      <AdminDashboardNav />
      <div className="flex flex-1 ">
        {/* Sidebar */}
        <Sidebar role="warden" />

        {/* Content area */}
        <div className="flex-1 p-4 overflow-y-auto h-screen">
          <Routes>
            <Route path="/" element={<AdminWelcome />} />
            <Route path="/search" element={<Search />} />
            <Route path="/additems" element={<AddItems />} />
            <Route path="/messstock" element={<AddMessStock />} />
            <Route path="/furniturestock" element={<AddFurnitureStock />} />
            <Route path="/electronicstock" element={<AddElectronicsStock />} />
            <Route path="/updatestock" element={<UpdateStock />} />
            <Route path="/mess-allocation" element={<MessStockAllocation />} />
            <Route path="/messhistory" element={<MessStockUsageHistory />} />
            <Route path="/roomrequest" element={<RoomAllocationRequests />} />
            <Route
              path="/furniturerequest"
              element={<ManageFurnitureRequests />}
            />
            <Route
              path="/elecricalrequest"
              element={<ManageElectricalRequests />}
            />
            <Route
              path="/furniture-allocation"
              element={<FurnitureAllocation />}
            />
            <Route
              path="/electrical-allocation"
              element={<ElectricalAllocation />}
            />
            <Route path="/requests" element={<Requests />} />
            <Route path="/store" element={<Store />} />
            <Route path="/managestore" element={<ManageStore />} />
            <Route path="/reports" element={<Reports />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;

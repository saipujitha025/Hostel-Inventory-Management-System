import React, { useContext, useState } from "react";
import { AllocationContext } from "../context/AllocationContext";
import RoomUsers from "./RoomUsers";
import StockDisplay from "./StockDisplay";
import { db } from "../firebase";
import { updateDoc, doc } from "firebase/firestore";

const FurnitureAllocation = () => {
  const { rooms, furnitureStock, fetchStock, users } =
    useContext(AllocationContext);
  const [selectedRoom, setSelectedRoom] = useState("");
  const [allocation, setAllocation] = useState(0);
  const [selectedItem, setSelectedItem] = useState("");

  const handleAllocate = async () => {
    const item = furnitureStock.find((item) => item.id === selectedItem);
    const newQuantity = item.quantity - allocation;
    const allocationDetails = {
      roomNo: selectedRoom,
      users: users.map((user) => ({
        fullName: user.fullName,
        email: user.email,
      })),
      allocatedQuantity: allocation,
    };

    // Update stock in Firestore and fetch updated stock.
    const stockDoc = doc(db, "inventory", selectedItem);
    await updateDoc(stockDoc, {
      quantity: newQuantity,
      allocations: [...(item.allocations || []), allocationDetails],
    });
    fetchStock();
  };

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Furniture Allocation
      </h2>
      <div className="mb-4">
        <label className="block mb-2 text-gray-700">Select Room</label>
        <select
          value={selectedRoom}
          onChange={(e) => setSelectedRoom(e.target.value)}
          className="w-full p-3 border rounded-md"
        >
          <option value="">Select Room</option>
          {rooms.map((room) => (
            <option key={room.roomNo} value={room.roomNo}>
              {room.roomNo}
            </option>
          ))}
        </select>
      </div>
      {selectedRoom && <RoomUsers roomNo={selectedRoom} />}
      <div className="mt-4">
        <label className="block mb-2 text-gray-700">
          Select Furniture Item
        </label>
        <select
          value={selectedItem}
          onChange={(e) => setSelectedItem(e.target.value)}
          className="w-full p-3 border rounded-md"
        >
          <option value="">Select Item</option>
          {furnitureStock.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </div>
      <div className="mt-4">
        <label className="block mb-2 text-gray-700">Allocate Quantity</label>
        <input
          type="number"
          value={allocation}
          onChange={(e) => setAllocation(Number(e.target.value))}
          className="w-full p-3 border rounded-md mb-4"
        />
        <button
          onClick={handleAllocate}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
        >
          Allocate
        </button>
      </div>
      <div className="mt-6">
        <StockDisplay category="furniture" />
      </div>
    </div>
  );
};

export default FurnitureAllocation;

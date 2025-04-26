import React, { createContext, useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

const AllocationContext = createContext();

const AllocationProvider = ({ children }) => {
  const [rooms, setRooms] = useState([]);
  const [users, setUsers] = useState([]);
  const [furnitureStock, setFurnitureStock] = useState([]);
  const [electricalStock, setElectricalStock] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRooms = async () => {
      setLoading(true);
      const usersCollection = collection(db, "users");
      const usersSnapshot = await getDocs(usersCollection);
      const usersData = usersSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Extract unique room numbers
      const uniqueRooms = [...new Set(usersData.map((user) => user.roomNo))];
      setRooms(uniqueRooms.map((roomNo) => ({ roomNo })));
      setLoading(false);
    };

    fetchRooms();
  }, []);

  const fetchUsersForRoom = async (roomNo) => {
    setLoading(true);
    const usersCollection = collection(db, "users");
    const q = query(usersCollection, where("roomNo", "==", roomNo));
    const usersSnapshot = await getDocs(q);
    const usersData = usersSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setUsers(usersData);
    setLoading(false);
  };

  const fetchStock = async () => {
    setLoading(true);
    const inventoryCollection = collection(db, "inventory");

    // Fetch furniture stock
    const furnitureQuery = query(
      inventoryCollection,
      where("category", "==", "furniture")
    );
    const furnitureSnapshot = await getDocs(furnitureQuery);
    const furnitureData = furnitureSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setFurnitureStock(furnitureData);

    // Fetch electrical stock
    const electricalQuery = query(
      inventoryCollection,
      where("category", "==", "electronics")
    );
    const electricalSnapshot = await getDocs(electricalQuery);
    const electricalData = electricalSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setElectricalStock(electricalData);

    setLoading(false);
  };

  return (
    <AllocationContext.Provider
      value={{
        rooms,
        users,
        furnitureStock,
        electricalStock,
        loading,
        fetchUsersForRoom,
        fetchStock,
      }}
    >
      {children}
    </AllocationContext.Provider>
  );
};

export { AllocationContext, AllocationProvider };

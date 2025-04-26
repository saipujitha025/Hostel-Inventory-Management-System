import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
  addDoc,
} from "firebase/firestore";

const MessStockAllocation = () => {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState("");
  const [quantityUsed, setQuantityUsed] = useState("");
  const [existingStock, setExistingStock] = useState(null);
  const [price, setPrice] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchItems = async () => {
      const q = query(collection(db, "items"), where("category", "==", "mess"));
      const querySnapshot = await getDocs(q);
      const itemsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setItems(itemsData);
    };

    fetchItems();
  }, []);

  const handleItemChange = async (itemName) => {
    setSelectedItem(itemName);
    const q = query(
      collection(db, "inventory"),
      where("name", "==", itemName),
      where("category", "==", "mess")
    );
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const itemDoc = querySnapshot.docs[0];
      setExistingStock(itemDoc.data().quantity);
      setPrice(itemDoc.data().price);
    } else {
      setExistingStock(null);
      setPrice(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const q = query(
        collection(db, "inventory"),
        where("name", "==", selectedItem),
        where("category", "==", "mess")
      );
      const querySnapshot = await getDocs(q);

      let itemDocId = null;
      querySnapshot.forEach((doc) => {
        itemDocId = doc.id;
      });

      if (itemDocId) {
        const itemDocRef = doc(db, "inventory", itemDocId);

        const newQuantity = existingStock - Number(quantityUsed);
        await updateDoc(itemDocRef, {
          quantity: newQuantity,
        });

        await addDoc(collection(db, "mess_stock_usage"), {
          itemName: selectedItem,
          quantityUsed: Number(quantityUsed),
          date: new Date(),
        });

        setSelectedItem("");
        setQuantityUsed("");
        setExistingStock(null);
        setPrice(null);
        alert("Stock usage recorded successfully!");
      } else {
        alert("Item not found.");
      }
    } catch (error) {
      console.error("Error updating stock item:", error);
      alert("Failed to record stock usage. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Mess Stock Allocation</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Item Name</label>
          <select
            value={selectedItem}
            onChange={(e) => handleItemChange(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            required
          >
            <option value="">Select Item</option>
            {items.map((item) => (
              <option key={item.id} value={item.name}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
        {existingStock !== null && (
          <>
            <div>
              <label className="block text-sm font-medium">
                Existing Stock
              </label>
              <input
                type="number"
                value={existingStock}
                readOnly
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Price</label>
              <input
                type="number"
                value={price}
                readOnly
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Quantity Used</label>
              <input
                type="number"
                value={quantityUsed}
                onChange={(e) => setQuantityUsed(e.target.value)}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                required
              />
            </div>
          </>
        )}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
          disabled={loading}
        >
          {loading ? "Recording..." : "Record Usage"}
        </button>
      </form>
    </div>
  );
};

export default MessStockAllocation;

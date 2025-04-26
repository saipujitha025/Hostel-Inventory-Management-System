import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import ItemList from "./ItemList";

const AddItems = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("furniture");
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const itemsCollection = collection(db, "items");
    const itemsSnapshot = await getDocs(itemsCollection);
    const itemsList = itemsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setItems(itemsList);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (editId) {
        const itemDoc = doc(db, "items", editId);
        await updateDoc(itemDoc, {
          name,
          category,
        });
        setEditId(null);
        alert(`Item updated successfully!`);
      } else {
        await addDoc(collection(db, "items"), {
          name,
          category,
        });
        alert(
          `${
            category.charAt(0).toUpperCase() + category.slice(1)
          } item added successfully!`
        );
      }

      setName("");
      setCategory("furniture");
      fetchItems();
    } catch (error) {
      console.error("Error adding item:", error);
      alert("Failed to add item. Please try again.");
    }

    setLoading(false);
  };

  const handleEdit = (item) => {
    setName(item.name);
    setCategory(item.category);
    setEditId(item.id);
  };

  const handleDelete = async (itemId) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        await deleteDoc(doc(db, "items", itemId));
        fetchItems();
        alert("Item deleted successfully!");
      } catch (error) {
        console.error("Error deleting item:", error);
        alert("Failed to delete item. Please try again.");
      }
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Add New Item</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            required
          >
            <option value="furniture">Furniture</option>
            <option value="electronics">Electronics</option>
            <option value="mess">Mess</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium">Item Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
          disabled={loading}
        >
          {loading ? "Adding..." : editId ? "Updating..." : "Add Item"}
        </button>
      </form>
      <ItemList items={items} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
};

export default AddItems;

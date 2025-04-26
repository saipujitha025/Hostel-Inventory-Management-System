import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

const ManageStore = () => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [category, setCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [editedItem, setEditedItem] = useState({
    name: "",
    price: "",
    quantity: "",
    imageUrl: "",
  });

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      const itemsCollection = collection(db, "inventory");
      const snapshot = await getDocs(itemsCollection);
      const allItems = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setItems(allItems);
      setFilteredItems(allItems);
      setLoading(false);
    };

    fetchItems();
  }, []);

  const applyFilters = () => {
    setLoading(true);
    const filtered = items.filter((item) => {
      return category === "all" ? true : item.category === category;
    });
    setFilteredItems(filtered);
    setLoading(false);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "inventory", id));
    setItems(items.filter((item) => item.id !== id));
    setFilteredItems(filteredItems.filter((item) => item.id !== id));
  };

  const handleEdit = (item) => {
    setCurrentItem(item);
    setEditedItem(item);
    setShowEditModal(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedItem((prev) => ({ ...prev, [name]: value }));
  };

  const saveEdit = async () => {
    const itemDoc = doc(db, "inventory", currentItem.id);
    await updateDoc(itemDoc, editedItem);
    setItems(
      items.map((item) => (item.id === currentItem.id ? editedItem : item))
    );
    setFilteredItems(
      filteredItems.map((item) =>
        item.id === currentItem.id ? editedItem : item
      )
    );
    setShowEditModal(false);
  };

  useEffect(() => {
    applyFilters();
  }, [category]);

  return (
    <div className="p-6 max-w-screen-xl mx-auto bg-gray-900">
      <h2 className="text-3xl font-bold mb-8 text-center text-white">
        Store Inventory
      </h2>
      <div className="mb-8 flex justify-center">
        <select
          onChange={handleCategoryChange}
          className="border-gray-300 rounded-md shadow-sm p-3 text-gray-700 bg-white hover:border-gray-400 focus:outline-none focus:ring focus:ring-blue-200 transition"
        >
          <option value="all">All Categories</option>
          <option value="mess">Mess</option>
          <option value="furniture">Furniture</option>
          <option value="electronics">Electronics</option>
        </select>
      </div>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-blue-500"></div>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-grey-900 ">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="w-1/6 py-3 px-4 uppercase font-semibold text-sm">
                  Image
                </th>
                <th className="w-1/6 py-3 px-4 uppercase font-semibold text-sm">
                  Name
                </th>
                <th className="w-1/6 py-3 px-4 uppercase font-semibold text-sm">
                  Category
                </th>
                <th className="w-1/6 py-3 px-4 uppercase font-semibold text-sm">
                  Price
                </th>
                <th className="w-1/6 py-3 px-4 uppercase font-semibold text-sm">
                  Quantity
                </th>
                <th className="w-1/6 py-3 px-4 uppercase font-semibold text-sm">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {filteredItems.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-4">
                    No items found
                  </td>
                </tr>
              ) : (
                filteredItems.map((item) => (
                  <tr key={item.id} className=" text-white transition">
                    <td className="py-3 px-4">
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                    </td>
                    <td className="py-3 px-4">{item.name}</td>
                    <td className="py-3 px-4">{item.category}</td>
                    <td className="py-3 px-4">₹{item.price}</td>
                    <td className="py-3 px-4">{item.quantity}</td>
                    <td className="py-3 px-4">
                      <button
                        className="bg-red-500 text-white px-3 py-1 rounded mr-2 hover:bg-red-600 transition"
                        onClick={() => handleDelete(item.id)}
                      >
                        Delete
                      </button>
                      <button
                        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition"
                        onClick={() => handleEdit(item)}
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {showEditModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Edit Item</h2>
            <div className="mb-4">
              <label className="block text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                value={editedItem.name}
                onChange={handleEditChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Price</label>
              <input
                type="number"
                name="price"
                value={editedItem.price}
                onChange={handleEditChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Quantity</label>
              <input
                type="number"
                name="quantity"
                value={editedItem.quantity}
                onChange={handleEditChange}
                className="w-full p-2 border rounded"
              />
            </div>

            <div className="flex justify-end">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                onClick={() => setShowEditModal(false)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={saveEdit}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageStore;

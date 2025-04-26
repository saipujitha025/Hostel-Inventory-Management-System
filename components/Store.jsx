import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import ItemDetails from "./ItemDetails";

const Store = () => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [category, setCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

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

  const handleViewMore = (item) => {
    setSelectedItem(item);
    setShowDetails(true);
  };

  const handleCloseDetails = () => {
    setShowDetails(false);
    setSelectedItem(null);
  };

  useEffect(() => {
    applyFilters();
  }, [category]);

  return (
    <div className="p-6 max-w-screen-xl mx-auto bg-gray-900 min-h-screen text-gray-200">
      <h2 className="text-4xl font-extrabold mb-8 text-center text-gray-100 shadow-lg">
        Store
      </h2>
      <div className="mb-8 flex justify-center">
        <select
          onChange={handleCategoryChange}
          className="border-none rounded-lg shadow-lg p-3 text-gray-800 bg-gray-300 hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all transform hover:scale-105"
        >
          <option value="all">All Categories</option>
          <option value="mess">Mess</option>
          <option value="furniture">Furniture</option>
          <option value="electronics">Electronics</option>
        </select>
      </div>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-blue-400"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.length === 0 ? (
            <p className="col-span-full text-center text-gray-400">
              No items found
            </p>
          ) : (
            filteredItems.map((item) => (
              <div
                key={item.id}
                className="p-6 rounded-lg bg-gray-800 shadow-lg transition transform hover:scale-105 hover:shadow-xl text-center"
              >
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-full h-48 object-cover mb-4 rounded-lg shadow-md"
                />
                <h3 className="text-2xl font-semibold text-gray-100">
                  {item.name}
                </h3>
                <p className="text-xl text-gray-400">₹{item.price}</p>
                <p className="text-md text-gray-500">
                  Quantity: {item.quantity}
                </p>
                <button
                  onClick={() => handleViewMore(item)}
                  className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 transition"
                >
                  View More
                </button>
              </div>
            ))
          )}
        </div>
      )}

      {showDetails && selectedItem && (
        <ItemDetails item={selectedItem} onClose={handleCloseDetails} />
      )}
    </div>
  );
};

export default Store;

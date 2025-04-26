import React, { useState, useEffect } from "react";
import { db, storage } from "../firebase";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const UpdateStock = () => {
  const [category, setCategory] = useState("furniture");
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState("");
  const [quantity, setQuantity] = useState("");
  const [alertThreshold, setAlertThreshold] = useState("");
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState(""); // Duration in days
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [existingItem, setExistingItem] = useState(null);

  useEffect(() => {
    if (category) {
      const fetchItems = async () => {
        const q = query(
          collection(db, "items"),
          where("category", "==", category)
        );
        const querySnapshot = await getDocs(q);
        const itemsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setItems(itemsData);
      };

      fetchItems();
    }
  }, [category]);

  const handleItemChange = async (itemName) => {
    setSelectedItem(itemName);
    const q = query(
      collection(db, "inventory"),
      where("name", "==", itemName),
      where("category", "==", category)
    );
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const itemDoc = querySnapshot.docs[0];
      setExistingItem(itemDoc.data());
      setQuantity(itemDoc.data().quantity);
      setAlertThreshold(itemDoc.data().alertThreshold);
      setPrice(itemDoc.data().price);
      setDuration(itemDoc.data().duration || ""); // Set duration if exists
    } else {
      setExistingItem(null);
      setQuantity("");
      setAlertThreshold("");
      setPrice("");
      setDuration("");
    }
  };

  const handleImageUpload = async (file) => {
    const storageRef = ref(storage, `inventory/${file.name}`);
    await uploadBytes(storageRef, file);
    const imageUrl = await getDownloadURL(storageRef);
    return imageUrl;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const q = query(
        collection(db, "inventory"),
        where("name", "==", selectedItem),
        where("category", "==", category)
      );
      const querySnapshot = await getDocs(q);

      let itemDocId = null;
      querySnapshot.forEach((doc) => {
        itemDocId = doc.id;
      });

      const imageUrl = image
        ? await handleImageUpload(image)
        : existingItem.imageUrl;

      if (itemDocId) {
        const itemDocRef = doc(db, "inventory", itemDocId);
        const updateData = {
          quantity: quantity !== "" ? Number(quantity) : existingItem.quantity,
          alertThreshold:
            alertThreshold !== ""
              ? Number(alertThreshold)
              : existingItem.alertThreshold,
          price: price !== "" ? Number(price) : existingItem.price,
          imageUrl,
        };

        if (category === "mess") {
          updateData.duration =
            duration !== "" ? Number(duration) : existingItem.duration;
        }

        await updateDoc(itemDocRef, updateData);

        setSelectedItem("");
        setQuantity("");
        setAlertThreshold("");
        setPrice("");
        setDuration("");
        setImage(null);
        alert(
          `${
            category.charAt(0).toUpperCase() + category.slice(1)
          } stock item updated successfully!`
        );
      } else {
        alert("Item not found.");
      }
    } catch (error) {
      console.error("Error updating stock item:", error);
      alert("Failed to update stock item. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Update Stock Item</h2>
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
        {existingItem && (
          <>
            <div>
              <label className="block text-sm font-medium">Quantity</label>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium">
                Alert Threshold
              </label>
              <input
                type="number"
                value={alertThreshold}
                onChange={(e) => setAlertThreshold(e.target.value)}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Price</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                required
              />
            </div>
            {category === "mess" && (
              <div>
                <label className="block text-sm font-medium">
                  Duration (days)
                </label>
                <input
                  type="number"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                  required
                />
              </div>
            )}
            <div>
              <label className="block text-sm font-medium">Item Image</label>
              <input
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              />
            </div>
          </>
        )}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
          disabled={loading}
        >
          {loading ? "Updating..." : "Update Item"}
        </button>
      </form>
    </div>
  );
};

export default UpdateStock;

import React, { useState, useEffect } from "react";
import { db, storage } from "../firebase";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const AddElectronicsStock = () => {
  const [name, setName] = useState("");
  const [items, setItems] = useState([]);
  const [quantity, setQuantity] = useState(0);
  const [alertThreshold, setAlertThreshold] = useState(0);
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchItems = async () => {
      const q = query(
        collection(db, "items"),
        where("category", "==", "electronics")
      );
      const querySnapshot = await getDocs(q);
      const itemsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setItems(itemsData);
    };

    fetchItems();
  }, []);

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
      const itemsCollection = collection(db, "inventory");
      const q = query(
        itemsCollection,
        where("name", "==", name),
        where("category", "==", "electronics")
      );
      const querySnapshot = await getDocs(q);

      let itemDocId = null;
      querySnapshot.forEach((doc) => {
        itemDocId = doc.id;
      });

      const imageUrl = image ? await handleImageUpload(image) : null;

      if (itemDocId) {
        const itemDocRef = doc(db, "inventory", itemDocId);
        await updateDoc(itemDocRef, {
          quantity: quantity,
          alertThreshold: alertThreshold,
          price: price,
          imageUrl:
            imageUrl ||
            (await getDownloadURL(ref(storage, `inventory/${name}`))),
        });
      } else {
        await addDoc(itemsCollection, {
          name,
          category: "electronics",
          quantity: Number(quantity),
          alertThreshold: Number(alertThreshold),
          price: Number(price),
          imageUrl,
        });
      }

      setName("");
      setQuantity(0);
      setAlertThreshold(0);
      setPrice(0);
      setImage(null);
      alert("Electronics stock item added successfully!");
    } catch (error) {
      console.error("Error adding stock item:", error);
      alert("Failed to add stock item. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">
        Add New Electronics Stock Item
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Item Name</label>
          <select
            value={name}
            onChange={(e) => setName(e.target.value)}
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
          <label className="block text-sm font-medium">Alert Threshold</label>
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
        <div>
          <label className="block text-sm font-medium">Item Image</label>
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Item"}
        </button>
      </form>
    </div>
  );
};

export default AddElectronicsStock;

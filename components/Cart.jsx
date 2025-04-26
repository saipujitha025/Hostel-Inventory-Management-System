import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import Razorpay from "razorpay";

const Cart = () => {
  const { cart, removeFromCart, clearCart } = useContext(CartContext);
  const [loading, setLoading] = useState(false);

  const handlePurchase = async () => {
    setLoading(true);

    // Integrate Razorpay for payment
    const options = {
      key: "YOUR_RAZORPAY_KEY", // Replace with your Razorpay key
      amount:
        cart.reduce((total, item) => total + item.price * item.quantity, 0) *
        100,
      currency: "INR",
      name: "Hostel & Mess Inventory",
      description: "Purchase Items",
      handler: async (response) => {
        try {
          for (const item of cart) {
            await addDoc(collection(db, "inventory"), {
              ...item,
              quantity: item.quantity,
            });
          }
          clearCart();
          alert("Purchase successful!");
        } catch (error) {
          console.error("Error adding items to inventory:", error);
          alert("Failed to add items to inventory. Please try again.");
        }
      },
      prefill: {
        name: "Warden",
        email: "warden@example.com",
        contact: "9999999999",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp = new Razorpay(options);
    rzp.open();

    setLoading(false);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Cart</h2>
      <ul>
        {cart.map((item) => (
          <li key={item.id} className="mb-4 p-4 border rounded-md">
            <p>
              <strong>{item.name}</strong>
            </p>
            <p>
              ${item.price} x {item.quantity}
            </p>
            <button
              onClick={() => removeFromCart(item.id)}
              className="bg-red-500 text-white px-4 py-2 rounded-md mt-2"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
      {cart.length > 0 && (
        <button
          onClick={handlePurchase}
          className="bg-green-500 text-white px-4 py-2 rounded-md mt-4"
          disabled={loading}
        >
          {loading ? "Processing..." : "Purchase"}
        </button>
      )}
    </div>
  );
};

export default Cart;

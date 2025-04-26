import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

const MessStockUsageHistory = () => {
  const [usageHistory, setUsageHistory] = useState([]);

  useEffect(() => {
    const fetchUsageHistory = async () => {
      const usageCollection = collection(db, "mess_stock_usage");
      const usageSnapshot = await getDocs(usageCollection);
      const usageData = usageSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsageHistory(usageData);
    };

    fetchUsageHistory();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Mess Stock Usage History</h2>
      {usageHistory.length === 0 ? (
        <p>No usage history found.</p>
      ) : (
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2">Item Name</th>
              <th className="py-2">Quantity Used</th>
              <th className="py-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {usageHistory.map((usage) => (
              <tr key={usage.id}>
                <td className="border px-4 py-2">{usage.itemName}</td>
                <td className="border px-4 py-2">{usage.quantityUsed}</td>
                <td className="border px-4 py-2">
                  {new Date(usage.date.seconds * 1000).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MessStockUsageHistory;

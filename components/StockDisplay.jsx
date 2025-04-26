import React, { useContext, useEffect } from "react";
import { AllocationContext } from "../context/AllocationContext";

const StockDisplay = ({ category }) => {
  const { furnitureStock, electricalStock, loading, fetchStock } =
    useContext(AllocationContext);

  useEffect(() => {
    fetchStock();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const stock = category === "furniture" ? furnitureStock : electricalStock;

  return (
    <div>
      <h3 className="text-xl font-bold mb-4">Current Stock ({category})</h3>
      {stock.length === 0 ? (
        <p>No stock available for {category}.</p>
      ) : (
        <ul className="list-disc pl-5">
          {stock.map((item) => (
            <li key={item.id}>
              {item.name}: {item.quantity}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default StockDisplay;

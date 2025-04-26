import React, { useContext, useEffect, useState } from "react";
import { AllocationContext } from "../context/AllocationContext";
import {
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
} from "recharts";

const Widgets = () => {
  const {
    rooms,
    users,
    furnitureStock,
    electricalStock,
    loading,
    fetchUsersForRoom,
    fetchStock,
  } = useContext(AllocationContext);

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  useEffect(() => {
    fetchStock();
  }, []);
  console.log(furnitureStock, electricalStock, "furtistock");
  if (loading) {
    return <div>Loading...</div>;
  }

  const totalFurniture = furnitureStock.reduce(
    (acc, item) => acc + item.quantity,
    0
  );
  const totalElectronics = electricalStock.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  const pieData = [
    { name: "Furniture", value: totalFurniture },
    { name: "Electronics", value: totalElectronics },
  ];

  const lineData = [
    { name: "Furniture", quantity: totalFurniture },
    { name: "Electronics", quantity: totalElectronics },
  ];

  const barData = [
    { name: "Furniture", quantity: totalFurniture },
    { name: "Electronics", quantity: totalElectronics },
  ];

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Inventory Widgets</h2>

      <div className="flex justify-between items-center mb-8">
        <div>
          <h3 className="text-lg font-semibold mb-2">Pie Chart</h3>
          <PieChart width={400} height={400}>
            <Pie
              data={pieData}
              cx={200}
              cy={200}
              labelLine={false}
              label={({ name, percent }) =>
                `${name}: ${(percent * 100).toFixed(0)}%`
              }
              outerRadius={150}
              fill="#8884d8"
              dataKey="value"
            >
              {pieData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Line Chart</h3>
          <LineChart width={500} height={300} data={lineData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="quantity"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Bar Chart</h3>
          <BarChart width={500} height={300} data={barData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="quantity" fill="#8884d8" />
          </BarChart>
        </div>
      </div>
    </div>
  );
};

export default Widgets;

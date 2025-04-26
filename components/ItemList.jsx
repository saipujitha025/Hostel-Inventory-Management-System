import React from "react";

const ItemList = ({ items, onEdit, onDelete }) => {
  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold mb-4">Item List</h3>
      {items.length === 0 ? (
        <p className="text-gray-500">No items found.</p>
      ) : (
        <ul className="space-y-4">
          {items.map((item) => (
            <li
              key={item.id}
              className="flex justify-between items-center bg-gray-100 p-4 rounded-md shadow-sm"
            >
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-gray-600">
                  Category: {item.category}
                </p>
              </div>
              <div className="space-x-2">
                <button
                  onClick={() => onEdit(item)}
                  className="bg-yellow-400 text-white px-4 py-2 rounded-md"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(item.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-md"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ItemList;

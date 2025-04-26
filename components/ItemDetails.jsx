import React from "react";

const ItemDetails = ({ item, onClose }) => {
  if (!item) {
    return (
      <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50">
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-lg w-full relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-white"
          >
            &times;
          </button>
          <h2 className="text-2xl font-bold mb-4 text-gray-100">
            No Item Details Available
          </h2>
          <p className="text-lg text-gray-400">No items are still allocated.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-lg w-full relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          &times;
        </button>
        <h2 className="text-3xl font-bold mb-4 text-gray-100">{item.name}</h2>
        <p className="text-lg text-gray-300 mb-4">Price: ₹{item.price}</p>
        <p className="text-lg text-gray-300 mb-4">
          Total Quantity: {item.quantity}
        </p>
        <p className="text-lg text-gray-300 mb-4">
          Alert Threshold: {item.alertThreshold}
        </p>
        {item.imageUrl ? (
          <img
            src={item.imageUrl}
            alt={item.name}
            className="w-full h-48 object-cover mb-4 rounded-lg shadow-md"
          />
        ) : (
          <p className="text-gray-400 mb-4">No image available</p>
        )}

        <h3 className="text-2xl font-bold mb-4 text-gray-100">Allocations</h3>
        {Array.isArray(item.allocations) && item.allocations.length > 0 ? (
          item.allocations.map((allocation, index) => (
            <div key={index} className="mb-4">
              <h4 className="text-xl font-semibold text-gray-100">
                Room {allocation.roomNo}
              </h4>
              <p className="text-md text-gray-300">
                Allocated Quantity: {allocation.allocatedQuantity}
              </p>
              <h5 className="text-lg font-semibold text-gray-200 mt-2">
                Users in Room {allocation.roomNo}
              </h5>
              {Array.isArray(allocation.users) &&
              allocation.users.length > 0 ? (
                <ul className="list-disc list-inside text-gray-300">
                  {allocation.users.map((user, userIndex) => (
                    <li key={userIndex}>
                      {user.fullName} ({user.email})
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-400">No users found</p>
              )}
            </div>
          ))
        ) : (
          <p className="text-gray-400">No allocations found</p>
        )}
      </div>
    </div>
  );
};

export default ItemDetails;

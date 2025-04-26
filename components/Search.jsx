import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

const Search = () => {
  const [queryText, setQueryText] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!queryText) return;

    setLoading(true);
    const allResults = [];

    // Search by item name
    const nameQuery = query(
      collection(db, "inventory"),
      where("name", "==", queryText)
    );
    const nameSnapshot = await getDocs(nameQuery);
    const nameResults = nameSnapshot.docs.map((doc) => ({
      ...doc.data(),
      collection: "inventory",
    }));
    allResults.push(...nameResults);

    // Search by category
    const categoryQuery = query(
      collection(db, "inventory"),
      where("category", "==", queryText)
    );
    const categorySnapshot = await getDocs(categoryQuery);
    const categoryResults = categorySnapshot.docs.map((doc) => ({
      ...doc.data(),
      collection: "inventory",
    }));
    allResults.push(...categoryResults);

    setResults(allResults);
    setLoading(false);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Search Inventory</h2>
      <form onSubmit={handleSearch} className="mb-4">
        <input
          type="text"
          value={queryText}
          onChange={(e) => setQueryText(e.target.value)}
          placeholder="Search by item name or category..."
          className="border p-2 w-full mb-4"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Search
        </button>
      </form>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {results.length === 0 ? (
            <div>No results found</div>
          ) : (
            <table className="min-w-full bg-white border">
              <thead>
                <tr>
                  <th className="border px-4 py-2">Field</th>
                  <th className="border px-4 py-2">Value</th>
                </tr>
              </thead>
              <tbody>
                {results.map((item, index) => (
                  <React.Fragment key={index}>
                    {Object.entries(item).map(([key, value], idx) => (
                      <tr key={idx}>
                        <td className="border px-4 py-2">{key}</td>
                        <td className="border px-4 py-2">{value.toString()}</td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
};

export default Search;

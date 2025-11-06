import { useState } from "react";
import React from "react";

const Dressstock = () => {
  // Sample data
  const sampleData = [
    { id: 1, name: "Shirt", quantity: 10, guardName: "John", itemDistributed: "Shirt" },
    { id: 2, name: "Pants", quantity: 3, guardName: "Mike", itemDistributed: "Pants" },
    { id: 3, name: "Jacket", quantity: 0, guardName: "Sara", itemDistributed: "Jacket" },
    { id: 4, name: "Cap", quantity: 8, guardName: "Anna", itemDistributed: "Cap" },
    { id: 5, name: "Belt", quantity: 12, guardName: "Tom", itemDistributed: "Belt" },
  ];

  const [data, setData] = useState(sampleData);
  const [isCheckedad, setIsCheckedad] = useState(Array(sampleData.length).fill(true));
  const [view, setView] = useState("inventry"); // "inventry" or "distributed"
  const [search, setSearch] = useState("");

  const handleCheckboxClickad = (index) => {
    setIsCheckedad((prev) => {
      const newChecked = [...prev];
      newChecked[index] = !newChecked[index];
      return newChecked;
    });
  };

  const handleSelectAll = () => setIsCheckedad(Array(data.length).fill(true));
  const handleDeselectAll = () => setIsCheckedad(Array(data.length).fill(false));

  const filteredData = data.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.guardName.toLowerCase().includes(search.toLowerCase()) ||
      item.id.toString().includes(search)
  );

  return (
    <div className="w-full h-full p-4 overflow-hidden bg-white dark:bg-[#212528] shadow-xl rounded-xl flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold dark:text-white">Dress Stock</h2>
        <input
          type="text"
          placeholder="Search by name, ID, or guard"
          className="border border-gray-300 dark:border-gray-700 rounded-lg p-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-[#2b2e33] dark:text-white"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Tabs & Bulk Actions */}
      <div className="flex items-center space-x-4 mb-3">
        <button
          className={`px-4 py-2 rounded-lg font-semibold ${
            view === "inventry"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-white"
          }`}
          onClick={() => setView("inventry")}
        >
          Inventory Stock
        </button>
        <button
          className={`px-4 py-2 rounded-lg font-semibold ${
            view === "distributed"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-white"
          }`}
          onClick={() => setView("distributed")}
        >
          Distributed to Guard
        </button>

        <div className="ml-auto flex space-x-2">
          <button
            className="px-3 py-1 rounded-lg bg-green-500 text-white hover:bg-green-600"
            onClick={handleSelectAll}
          >
            Select All
          </button>
          <button
            className="px-3 py-1 rounded-lg bg-red-500 text-white hover:bg-red-600"
            onClick={handleDeselectAll}
          >
            Deselect All
          </button>
        </div>
      </div>

      {/* Table Content */}
      <div className="flex-1 overflow-auto border border-gray-200 dark:border-gray-700 rounded-lg p-2">
        <div className="overflow-auto max-h-[500px]">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-100 dark:bg-gray-800 sticky top-0">
              <tr>
                <th className="px-4 py-2">
                  <input type="checkbox" disabled />
                </th>
                {view === "inventry" ? (
                  <>
                    <th className="px-4 py-2 text-left">Item Name</th>
                    <th className="px-4 py-2 text-left">Quantity</th>
                    <th className="px-4 py-2 text-left">Status</th>
                    <th className="px-4 py-2 text-left">Actions</th>
                  </>
                ) : (
                  <>
                    <th className="px-4 py-2 text-left">Guard Name</th>
                    <th className="px-4 py-2 text-left">Item Distributed</th>
                    <th className="px-4 py-2 text-left">Quantity</th>
                    <th className="px-4 py-2 text-left">Status</th>
                  </>
                )}
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item, i) => (
                <tr
                  key={item.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <td className="px-4 py-2">
                    <input
                      type="checkbox"
                      checked={isCheckedad[i]}
                      onChange={() => handleCheckboxClickad(i)}
                    />
                  </td>
                  {view === "inventry" ? (
                    <>
                      <td className="px-4 py-2">{item.name}</td>
                      <td className="px-4 py-2">{item.quantity}</td>
                      <td className="px-4 py-2">
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            item.quantity < 5
                              ? "bg-red-200 text-red-800"
                              : "bg-green-200 text-green-800"
                          }`}
                        >
                          {item.quantity < 5 ? "Low" : "Sufficient"}
                        </span>
                      </td>
                      <td className="px-4 py-2 flex space-x-2">
                        <button className="text-blue-500 hover:underline">
                          Edit
                        </button>
                        <button className="text-green-500 hover:underline">
                          Distribute
                        </button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="px-4 py-2">{item.guardName}</td>
                      <td className="px-4 py-2">{item.itemDistributed}</td>
                      <td className="px-4 py-2">{item.quantity}</td>
                      <td className="px-4 py-2">
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            item.quantity < 5
                              ? "bg-red-200 text-red-800"
                              : "bg-green-200 text-green-800"
                          }`}
                        >
                          {item.quantity < 5 ? "Low" : "Sufficient"}
                        </span>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dressstock;

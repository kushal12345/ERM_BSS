import React, { useState } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const InventoryManagement = () => {
  const initialInventory = [
    { id: 1, name: "Uniform Shirt", category: "Uniform", quantity: 100, status: "Available" },
    { id: 2, name: "Boots", category: "Footwear", quantity: 50, status: "Available" },
    { id: 3, name: "Cap", category: "Accessories", quantity: 30, status: "Low Stock" },
  ];

  const [inventory, setInventory] = useState(initialInventory);
  const [formData, setFormData] = useState({ name: "", category: "", quantity: "", status: "Available" });
  const [filter, setFilter] = useState({ name: "", category: "", status: "" });
  const [editId, setEditId] = useState(null);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Add or Update item
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editId) {
      setInventory((prev) =>
        prev.map((item) => (item.id === editId ? { ...item, ...formData, quantity: Number(formData.quantity) } : item))
      );
      setEditId(null);
    } else {
      const newItem = {
        ...formData,
        id: Date.now(),
        quantity: Number(formData.quantity),
      };
      setInventory((prev) => [...prev, newItem]);
    }
    setFormData({ name: "", category: "", quantity: "", status: "Available" });
  };

  // Edit item
  const handleEdit = (item) => {
    setFormData({ name: item.name, category: item.category, quantity: item.quantity, status: item.status });
    setEditId(item.id);
  };

  // Delete item
  const handleDelete = (id) => {
    setInventory((prev) => prev.filter((item) => item.id !== id));
  };

  // Apply filters
  const filteredInventory = inventory.filter((item) => {
    return (
      (filter.name ? item.name.toLowerCase().includes(filter.name.toLowerCase()) : true) &&
      (filter.category ? item.category.toLowerCase().includes(filter.category.toLowerCase()) : true) &&
      (filter.status ? item.status === filter.status : true)
    );
  });

  // Export to Excel
  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(filteredInventory);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Inventory");
    XLSX.writeFile(wb, "Inventory.xlsx");
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white dark:bg-[#212528] rounded-xl shadow-xl space-y-6">
      <h2 className="text-3xl font-bold dark:text-white text-center mb-4">Inventory Management</h2>

      {/* Add/Edit Inventory Form */}
      <div className="p-6 bg-gray-50 dark:bg-[#1f2226] rounded-xl shadow-md">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Item Name"
            required
            className="p-3 border rounded-lg dark:bg-[#2b2e33] dark:text-white focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="Category"
            required
            className="p-3 border rounded-lg dark:bg-[#2b2e33] dark:text-white focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            placeholder="Quantity"
            required
            className="p-3 border rounded-lg dark:bg-[#2b2e33] dark:text-white focus:ring-2 focus:ring-blue-400"
          />
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="p-3 border rounded-lg dark:bg-[#2b2e33] dark:text-white focus:ring-2 focus:ring-blue-400"
          >
            <option value="Available">Available</option>
            <option value="Low Stock">Low Stock</option>
            <option value="Out of Stock">Out of Stock</option>
          </select>

          <button
            type="submit"
            className="col-span-full md:col-span-4 p-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700"
          >
            {editId ? "Update Item" : "Add Item"}
          </button>
        </form>
      </div>

      {/* Filter & Export */}
      <div className="flex flex-wrap gap-4 items-center">
        <input
          type="text"
          placeholder="Search by Name"
          value={filter.name}
          onChange={(e) => setFilter({ ...filter, name: e.target.value })}
          className="p-2 border rounded-lg dark:bg-[#2b2e33] dark:text-white"
        />
        <input
          type="text"
          placeholder="Filter by Category"
          value={filter.category}
          onChange={(e) => setFilter({ ...filter, category: e.target.value })}
          className="p-2 border rounded-lg dark:bg-[#2b2e33] dark:text-white"
        />
        <select
          value={filter.status}
          onChange={(e) => setFilter({ ...filter, status: e.target.value })}
          className="p-2 border rounded-lg dark:bg-[#2b2e33] dark:text-white"
        >
          <option value="">All Status</option>
          <option value="Available">Available</option>
          <option value="Low Stock">Low Stock</option>
          <option value="Out of Stock">Out of Stock</option>
        </select>
        <button
          onClick={exportToExcel}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          Export Excel
        </button>
      </div>

      {/* Inventory Table */}
      <div className="overflow-auto max-h-[500px] mt-4">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              <th className="px-4 py-2 text-left">Item Name</th>
              <th className="px-4 py-2 text-left">Category</th>
              <th className="px-4 py-2 text-left">Quantity</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {filteredInventory.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-4 dark:text-gray-300">
                  No items found.
                </td>
              </tr>
            ) : (
              filteredInventory.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-4 py-2">{item.name}</td>
                  <td className="px-4 py-2">{item.category}</td>
                  <td className="px-4 py-2">{item.quantity}</td>
                  <td
                    className={`px-4 py-2 font-semibold ${
                      item.status === "Available"
                        ? "text-green-600 dark:text-green-400"
                        : item.status === "Low Stock"
                        ? "text-yellow-500 dark:text-yellow-400"
                        : "text-red-600 dark:text-red-400"
                    }`}
                  >
                    {item.status}
                  </td>
                  <td className="px-4 py-2 flex space-x-2">
                    <button
                      onClick={() => handleEdit(item)}
                      className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InventoryManagement;

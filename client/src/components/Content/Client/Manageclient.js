import React, { useState, useEffect } from "react";
import { Datepicker } from "flowbite-react";
import api from "../../../utils/api";
import { fetchClient } from "../../Fetch/FetchClient";

// Example staff assignment for each client and service type
const assignedStaff = {
  1: {
    NSG: ["Ram Thapa", "Sita Lama"],
    NCleaner: ["Hari Gurung"],
    NBouncer: ["Bikash Shrestha"],
    NEP: ["Mina Gurung"],
    NES: ["Kiran Magar"],
  },
  2: {
    NSG: ["Anil KC"],
    NCleaner: ["Sita Rai"],
    NBouncer: [],
    NEP: [],
    NES: ["Prakash Thapa"],
  },
};

const ManageClient = () => {
  const [activeTab, setActiveTab] = useState("AddClient");
  const [clients, setClients] = useState([]);
  const [newClient, setNewClient] = useState({
    Oname: "",
    Pno: "",
    OAdd: "",
    Cname: "",
    Phno: "",
    Ann: 0,
    dashbon: false,
    vat: false,
    constdate: "",
    conendate: "",
    NSG: 0,
    NCleaner: 0,
    NBouncer: 0,
    NEP: 0,
    NES: 0,
    file_contract: null,
  });
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchClient(setClients);
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setNewClient((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : type === "file"
          ? files[0]
          : type === "number"
          ? Number(value)
          : value,
    }));
  };

  const handleDateChange = (date, name) => {
    setNewClient((prev) => ({
      ...prev,
      [name]: date,
    }));
  };

  const handleAddClient = async (e) => {
    e.preventDefault();
    if (!newClient.Oname || !newClient.Cname) {
      alert("Office name and Client name required");
      return;
    }
    const formData = new FormData();
    for (let key in newClient) {
      if (newClient[key] !== "" && newClient[key] !== null)
        formData.append(key, newClient[key]);
    }
    try {
      const res = await api.post("/api/client/add", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log(res.data);
      fetchClient(setClients);
      setNewClient({
        Oname: "",
        Pno: "",
        OAdd: "",
        Cname: "",
        Phno: "",
        Ann: 0,
        dashbon: false,
        vat: false,
        constdate: "",
        conendate: "",
        NSG: 0,
        NCleaner: 0,
        NBouncer: 0,
        NEP: 0,
        NES: 0,
        file_contract: null,
      });
      alert("Client added successfully!");
    } catch (error) {
      console.error(error);
    }
  };

  const filteredClients = clients.filter((c) =>
    c.Cname.toLowerCase().includes(search.toLowerCase())
  );

  const renderStaffNames = (clientId, type) => {
    const staff = assignedStaff[clientId]?.[type];
    if (!staff || staff.length === 0) return "N/A";
    return staff.join(", ");
  };

  return (
    <div className="p-4 bg-gray-50 dark:bg-[#212528] min-h-screen">
      {/* Tabs */}
      <div className="flex gap-2 mb-4">
        {["AddClient", "ListClients"].map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 rounded ${
              activeTab === tab
                ? "bg-blue-600 text-white"
                : "bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab === "AddClient" ? "Add Client" : "List Clients"}
          </button>
        ))}
      </div>

      {/* Add Client Form */}
      {activeTab === "AddClient" && (
        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
          <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
            Add Client
          </h2>
          <form className="space-y-4" onSubmit={handleAddClient}>
            <div className="flex gap-4 flex-wrap">
              <input
                type="text"
                name="Oname"
                value={newClient.Oname}
                onChange={handleInputChange}
                placeholder="Office Name"
                className="p-2 border rounded w-80"
                required
              />
              <input
                type="text"
                name="Cname"
                value={newClient.Cname}
                onChange={handleInputChange}
                placeholder="Client Name"
                className="p-2 border rounded w-80"
                required
              />
              <input
                type="text"
                name="OAdd"
                value={newClient.OAdd}
                onChange={handleInputChange}
                placeholder="Office Address"
                className="p-2 border rounded w-80"
              />
              <input
                type="number"
                name="Pno"
                value={newClient.Pno}
                onChange={handleInputChange}
                placeholder="Pan Number"
                className="p-2 border rounded w-80"
              />
            </div>

            <div className="flex gap-4 flex-wrap">
              <input
                type="number"
                name="NSG"
                value={newClient.NSG}
                onChange={handleInputChange}
                placeholder="No of Security Guards"
                className="p-2 border rounded w-60"
              />
              <input
                type="number"
                name="NCleaner"
                value={newClient.NCleaner}
                onChange={handleInputChange}
                placeholder="No of Cleaners"
                className="p-2 border rounded w-60"
              />
              <input
                type="number"
                name="NBouncer"
                value={newClient.NBouncer}
                onChange={handleInputChange}
                placeholder="No of Bouncers"
                className="p-2 border rounded w-60"
              />
              <input
                type="number"
                name="NEP"
                value={newClient.NEP}
                onChange={handleInputChange}
                placeholder="No of EPs"
                className="p-2 border rounded w-60"
              />
              <input
                type="number"
                name="NES"
                value={newClient.NES}
                onChange={handleInputChange}
                placeholder="No of Event Security"
                className="p-2 border rounded w-60"
              />
            </div>

            <div className="flex gap-4 flex-wrap items-center">
              <div>
                <label className="text-gray-900 dark:text-white">
                  Contract Start Date
                </label>
                <Datepicker
                  value={newClient.constdate}
                  onSelectedDateChanged={(date) =>
                    handleDateChange(date, "constdate")
                  }
                />
              </div>
              <div>
                <label className="text-gray-900 dark:text-white">
                  Contract End Date
                </label>
                <Datepicker
                  value={newClient.conendate}
                  onSelectedDateChanged={(date) =>
                    handleDateChange(date, "conendate")
                  }
                />
              </div>
              <div>
                <label className="text-gray-900 dark:text-white">
                  Upload Contract
                </label>
                <input
                  type="file"
                  name="file_contract"
                  onChange={handleInputChange}
                  className="p-2 border rounded"
                />
              </div>
            </div>

            <div className="flex gap-4 items-center">
              <label className="text-gray-900 dark:text-white">
                <input
                  type="checkbox"
                  name="dashbon"
                  checked={newClient.dashbon}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                Dashain Bonus
              </label>
              <label className="text-gray-900 dark:text-white">
                <input
                  type="checkbox"
                  name="vat"
                  checked={newClient.vat}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                Include VAT
              </label>
            </div>

            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Add Client
            </button>
          </form>
        </div>
      )}

      {/* List Clients */}
      {activeTab === "ListClients" && (
        <div>
          <h2 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
            List of Clients
          </h2>
          <input
            type="text"
            placeholder="Search Clients..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="mb-4 p-2 border rounded w-full max-w-md"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredClients.map((c) => (
              <div
                key={c.id}
                className="bg-white dark:bg-gray-800 p-4 rounded shadow"
              >
                <h3 className="font-bold text-gray-900 dark:text-white">
                  {c.Cname}
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Office: {c.Oname} ({c.OAdd})
                </p>
                <div className="text-gray-700 dark:text-gray-300 space-y-1">
                  {c.NSG > 0 && (
                    <p>
                      Security Guard ({c.NSG}): {renderStaffNames(1, "NSG")}
                    </p>
                  )}
                  {c.NCleaner > 0 && (
                    <p>
                      Cleaner ({c.NCleaner}): {renderStaffNames(c.id, "NCleaner")}
                    </p>
                  )}
                  {c.NBouncer > 0 && (
                    <p>
                      Bouncer ({c.NBouncer}): {renderStaffNames(c.id, "NBouncer")}
                    </p>
                  )}
                  {c.NEP > 0 && (
                    <p>
                      EP ({c.NEP}): {renderStaffNames(c.id, "NEP")}
                    </p>
                  )}
                  {c.NES > 0 && (
                    <p>
                      Event Security ({c.NES}): {renderStaffNames(c.id, "NES")}
                    </p>
                  )}
                </div>
                <p className="text-gray-700 dark:text-gray-300">
                  Contract: {c.constdate?.split("T")[0]} to{" "}
                  {c.conendate?.split("T")[0]}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageClient;

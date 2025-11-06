import React, { useState, useMemo } from "react";

// Dummy data
const dummyGuards = Array.from({ length: 200 }, (_, i) => ({
  id: i + 1,
  name: `Guard ${i + 1}`,
  status: ["Available", "Working", "Holiday"][i % 3],
  shiftStart: `${8 + (i % 3) * 4}:00`,
  shiftEnd: `${12 + (i % 3) * 4}:00`,
}));

const initialClients = [
  { id: 1, location: "Boudha Complex", guardId: 1, shift: 12 },
  { id: 2, location: "Machhapokhari Gate", guardId: 2, shift: 8 },
  { id: 3, location: "Airport Zone A", guardId: 3, shift: 24 },
];

export default function StaffClientDashboard() {
  const [activeTab, setActiveTab] = useState("clients");
  const [clients, setClients] = useState(initialClients);
  const [guards, setGuards] = useState(dummyGuards);
  const [searchGuard, setSearchGuard] = useState("");
  const [searchClient, setSearchClient] = useState("");
  const [replacementModal, setReplacementModal] = useState({ open: false, client: null });

  // FILTERED DATA
  const filteredGuards = useMemo(() => 
    guards.filter(g => g.name.toLowerCase().includes(searchGuard.toLowerCase())), 
    [guards, searchGuard]
  );

  const filteredClients = useMemo(() =>
    clients.filter(c => c.location.toLowerCase().includes(searchClient.toLowerCase())), 
    [clients, searchClient]
  );

  // KEY ACTIONS
  const toggleHoliday = (guardId) => {
    setGuards(prev => prev.map(g => g.id === guardId ? { ...g, status: g.status === "Holiday" ? "Available" : "Holiday" } : g));
  };

  const updateGuard = (clientId, newGuardId) => {
    setClients(prev => prev.map(c => c.id === clientId ? { ...c, guardId: newGuardId } : c));
  };

  const addNewClient = () => {
    const newId = clients.length + 1;
    setClients([
      ...clients,
      {
        id: newId,
        location: `Client Site ${newId}`,
        guardId: guards[0].id,
        shift: [8, 12, 24][newId % 3],
      },
    ]);
  };

  const availableGuards = guards.filter(g => g.status === "Available");

  // STATS
  const stats = useMemo(() => ({
    totalClients: clients.length,
    totalGuards: guards.length,
    working: guards.filter(g => g.status === "Working").length,
    holiday: guards.filter(g => g.status === "Holiday").length,
    available: guards.filter(g => g.status === "Available").length,
    replacementNeeded: clients.filter(c => guards.find(g => g.id === c.guardId)?.status === "Holiday").length
  }), [clients, guards]);

  return (
    <div className="h-[calc(100vh-70px)] px-4 bg-gray-100 dark:bg-[#18191A] rounded-xl flex flex-col gap-4">
      {/* DASHBOARD HEADER */}
      <div className="flex justify-between items-center ">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Staff Management Dashboard</h1>
        <div className="flex gap-4">
          <div className="text-sm text-gray-700 dark:text-gray-300">
            Clients: {stats.totalClients} | 
          </div>
          <div className="text-sm text-gray-700 dark:text-gray-300">
            Guards: {stats.totalGuards} | Working: {stats.working} | Holiday: {stats.holiday} | Available: {stats.available} | Replacement Needed: {stats.replacementNeeded}
          </div>
        </div>
      </div>

      {/* TABS */}
      <div className="flex gap-4 border-b dark:border-gray-700">
        <button
          className={`px-4 py-2 rounded-md font-medium ${activeTab === "clients" ? "bg-blue-600 text-white" : "bg-gray-200 dark:bg-[#2a2b2e] dark:text-gray-200"}`}
          onClick={() => setActiveTab("clients")}
        >
          Client Locations
        </button>
        <button
          className={`px-4 py-2 rounded-md font-medium ${activeTab === "guards" ? "bg-blue-600 text-white" : "bg-gray-200 dark:bg-[#2a2b2e] dark:text-gray-200"}`}
          onClick={() => setActiveTab("guards")}
        >
          Guards Overview
        </button>
      </div>

      {/* TABS CONTENT */}
      <div className="flex-1 flex gap-4 overflow-hidden">
        {/* CLIENT LOCATIONS TAB */}
        {activeTab === "clients" && (
          <>
            {/* LEFT: Guards Sidebar */}
            <aside className="w-1/4 bg-white dark:bg-[#1f2124] rounded-2xl shadow-md border border-gray-200 dark:border-gray-700 flex flex-col">
              <div className="p-4 border-b dark:border-gray-700">
                <h2 className="font-semibold text-gray-900 dark:text-gray-100 text-lg mb-2">Guards</h2>
                <input
                  type="text"
                  placeholder="Search guard..."
                  className="w-full p-2 text-sm rounded-lg bg-gray-100 dark:bg-[#2a2b2e] text-gray-800 dark:text-gray-100"
                  value={searchGuard}
                  onChange={(e) => setSearchGuard(e.target.value)}
                />
              </div>
              <div className="flex-1 overflow-y-auto p-3 space-y-2">
                {filteredGuards.slice(0, 50).map(g => (
                  <div key={g.id} className={`flex justify-between items-center p-3 rounded-xl border ${g.status === "Holiday" ? "bg-red-100 dark:bg-red-800/60 border-red-300 dark:border-red-700" : g.status === "Working" ? "bg-blue-100 dark:bg-blue-800/60 border-blue-300 dark:border-blue-700" : "bg-green-100 dark:bg-green-800/60 border-green-300 dark:border-green-700"}`}>
                    <div>
                      <p className="font-medium text-sm text-gray-900 dark:text-gray-100">{g.name}</p>
                      <p className="text-xs opacity-80">{g.status}</p>
                    </div>
                    <button onClick={() => toggleHoliday(g.id)} className="text-xs px-2 py-1 rounded-md bg-gray-800 text-white hover:bg-gray-700">
                      {g.status === "Holiday" ? "Return" : "Holiday"}
                    </button>
                  </div>
                ))}
              </div>
            </aside>

            {/* RIGHT: Clients Panel */}
            <main className="flex-1 bg-white dark:bg-[#1f2124] rounded-2xl shadow-md border border-gray-200 dark:border-gray-700 flex flex-col overflow-y-auto p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Client Locations</h2>
                <div className="flex gap-3">
                  <input
                    type="text"
                    placeholder="Search location..."
                    className="p-2 rounded-lg bg-gray-100 dark:bg-[#2a2b2e] text-gray-900 dark:text-gray-100"
                    value={searchClient}
                    onChange={(e) => setSearchClient(e.target.value)}
                  />
                  <button onClick={addNewClient} className="px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow">+ Add Client</button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {filteredClients.map(client => {
                  const guard = guards.find(g => g.id === client.guardId);
                  const isHoliday = guard?.status === "Holiday";
                  return (
                    <div key={client.id} className="p-4 rounded-2xl border shadow-sm bg-gray-50 dark:bg-[#242526] dark:border-gray-700 hover:shadow-lg transition">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-semibold text-gray-900 dark:text-white text-base">{client.location}</h3>
                        <span className={`px-3 py-1 text-xs rounded-full ${isHoliday ? "bg-red-200 text-red-800 dark:bg-red-800 dark:text-white" : "bg-green-200 text-green-800 dark:bg-green-800 dark:text-white"}`}>
                          {isHoliday ? "Replacement Needed" : "Active"}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">Assigned Guard: <span className="font-medium">{guard?.name}</span></p>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">Working Hours: <span className="font-medium">{client.shift} hrs</span></p>
                      <div className="flex gap-2">
                        <button onClick={() => updateGuard(client.id, availableGuards[Math.floor(Math.random() * availableGuards.length)]?.id)} className="flex-1 px-3 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-lg">Replace Guard</button>
                        <button onClick={() => alert(`Viewing report for ${client.location}`)} className="flex-1 px-3 py-2 text-sm bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-100 rounded-lg">View Report</button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </main>
          </>
        )}

        {/* GUARDS GRID TAB */}
        {activeTab === "guards" && (
          <div className="flex-1 grid grid-cols-10 gap-2 p-4 overflow-y-auto">
            {filteredGuards.map(g => (
              <div key={g.id} className={`rounded-lg text-center p-3 text-sm shadow-sm border cursor-pointer ${g.status === "Holiday" ? "bg-red-100 dark:bg-red-800/50 border-red-400" : g.status === "Working" ? "bg-blue-100 dark:bg-blue-800/50 border-blue-400" : "bg-green-100 dark:bg-green-800/50 border-green-400"}`} onClick={() => toggleHoliday(g.id)}>
                <p className="font-medium text-gray-800 dark:text-gray-100">{g.name}</p>
                <p className="text-xs opacity-70">{g.status}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";

/* ===================== STAFF ===================== */
const staffData = {
  bs: [
    { name: "Ramesh Shrestha", phone: "9841449298", duty: "Samakhusi, KTM" },
    { name: "Anita Gurung", phone: "9808123456", duty: "Baneshwor, KTM" },
    { name: "Kiran Basnet", phone: "9811122334", duty: "Maharajgunj, KTM" },
  ],
  ad: [
    { name: "Hari Sharma", phone: "9841223344", duty: "Lazimpat, KTM" },
    { name: "Sita Karki", phone: "9811772233", duty: "New Road, KTM" },
  ],
};

/* ===================== DEMO PAYMENTS ===================== */
const demoPayments = [
  {
    date: "2026-01-03",
    month: "Falgun",
    employee: "Ramesh Shrestha",
    amount: 5000,
    reason: "Emergency medical expense",
  },
  {
    date: "2026-01-07",
    month: "Falgun",
    employee: "Ramesh Shrestha",
    amount: 3000,
    reason: "Travel advance",
  },
  {
    date: "2026-01-12",
    month: "Falgun",
    employee: "Anita Gurung",
    amount: 4500,
    reason: "Family function",
  },
  {
    date: "2026-01-18",
    month: "Falgun",
    employee: "Kiran Basnet",
    amount: 2000,
    reason: "Food & daily expenses",
  },
  {
    date: "2026-01-22",
    month: "Falgun",
    employee: "Ramesh Shrestha",
    amount: 6000,
    reason: "House rent support",
  },
];

export default function AdvancePayment() {
  const [active] = useState("bs");
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [amount, setAmount] = useState("");
  const [reason, setReason] = useState("");
  const [allPayments, setAllPayments] = useState(demoPayments);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const staffList = staffData[active];

  /* ===================== AUTOCOMPLETE ===================== */
  const filteredEmployees = useMemo(() => {
    if (!selectedEmployee) return [];
    return staffList.filter((s) =>
      s.name.toLowerCase().includes(selectedEmployee.toLowerCase())
    );
  }, [selectedEmployee, staffList]);

  /* ===================== EMPLOYEE HISTORY ===================== */
  const employeeHistory = useMemo(() => {
    if (!selectedEmployee) return [];
    return allPayments.filter((p) => p.employee === selectedEmployee);
  }, [selectedEmployee, allPayments]);

  /* ===================== SUBMIT ===================== */
  const handleSubmit = () => {
    if (!selectedEmployee || !amount || !reason) {
      alert("Please fill all fields");
      return;
    }

    const newPayment = {
      month: active === "bs" ? "Falgun" : "March",
      employee: selectedEmployee,
      amount: Number(amount),
      reason,
      date: new Date().toLocaleDateString(),
    };

    setAllPayments([newPayment, ...allPayments]);
    setAmount("");
    setReason("");
    setShowSuggestions(false);
  };

  return (
    <div className="p-6 h-[90vh] overflow-y-auto space-y-6 bg-white dark:bg-[#0f1115] rounded-xl">

      {/* ===================== HEADER ===================== */}
      <div>
        <h1 className="text-2xl font-bold">Advanced Payment</h1>
        <p className="text-muted-foreground font-semibold">
          Month: {active === "bs" ? "Falgun" : "March"}
        </p>
      </div>

      {/* ===================== FORM + HISTORY ===================== */}
      <div className="grid grid-cols-5 gap-4">

        {/* FORM */}
        <motion.div className="col-span-3" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <Card>
            <CardContent className="p-4 grid grid-cols-2 gap-2">

              {/* EMPLOYEE */}
              <div className="relative col-span-2">
                <p className="text-sm font-semibold mb-1">Select Employee</p>
                <Input
                  placeholder="Type employee name"
                  value={selectedEmployee}
                  onChange={(e) => {
                    setSelectedEmployee(e.target.value);
                    setShowSuggestions(true);
                  }}
                  onFocus={() => setShowSuggestions(true)}
                  onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
                />

                {showSuggestions && filteredEmployees.length > 0 && (
                  <div className="absolute z-10 w-full bg-white dark:bg-gray-800 border rounded-md mt-1 max-h-40 overflow-y-auto shadow">
                    {filteredEmployees.map((e, i) => (
                      <div
                        key={i}
                        onMouseDown={() => {
                          setSelectedEmployee(e.name);
                          setShowSuggestions(false);
                        }}
                        className="px-3 py-2 cursor-pointer hover:bg-blue-100 dark:hover:bg-gray-700"
                      >
                        {e.name} ({e.phone})
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* AMOUNT */}
              <div>
                <p className="text-sm font-semibold mb-1">Amount</p>
                <Input
                  type="number"
                  placeholder="Enter amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>

              {/* REASON */}
              <div className="col-span-2">
                <p className="text-sm font-semibold mb-1">Reason</p>
                <Input
                  placeholder="Reason for advance"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                />
              </div>

              <div className="col-span-2 flex justify-end">
                <Button onClick={handleSubmit}>Submit Advanced Payment</Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* MONTH HISTORY */}
        <motion.div className="col-span-2" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <Card>
            <CardContent className="p-4">
              <p className="text-sm font-semibold mb-3">This Month History</p>

              {employeeHistory.length === 0 ? (
                <p className="text-sm text-gray-500">No advanced payments yet</p>
              ) : (
                <div className="max-h-52 overflow-y-auto space-y-2">
                  {employeeHistory.map((p, i) => (
                    <div key={i} className="border rounded-lg p-2 bg-gray-50">
                      <div className="flex justify-between text-xs text-gray-600">
                        <span>{p.date}</span>
                        <span className="font-semibold text-green-600">
                          Rs. {p.amount}
                        </span>
                      </div>
                      <p className="text-sm">{p.reason}</p>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* ===================== ALL PAYMENTS ===================== */}
      <Card>
        <CardContent className="p-3">
          <p className="font-semibold mb-2">All Advanced Payments</p>
          <table className="w-full text-sm border">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-2 py-1">Date</th>
                <th className="border px-2 py-1">Employee</th>
                <th className="border px-2 py-1">Amount</th>
                <th className="border px-2 py-1">Reason</th>
              </tr>
            </thead>
            <tbody>
              {allPayments.map((p, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="border px-2 py-1">{p.date}</td>
                  <td className="border px-2 py-1">{p.employee}</td>
                  <td className="border px-2 py-1">Rs. {p.amount}</td>
                  <td className="border px-2 py-1">{p.reason}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}

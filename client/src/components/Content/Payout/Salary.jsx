import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, Upload } from "lucide-react";
import { Card, CardContent } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Badge } from "../../../components/ui/badge";
import { Switch } from "../../../components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
const staffData = {
  bs: [
    { name: "Ramesh Shrestha", phone: "9841449298", duty: "Samakhusi, KTM", salary: 15000 },
    { name: "Anita Gurung", phone: "9808123456", duty: "Baneshwor, KTM", salary: 18000 },
    { name: "Kiran Basnet", phone: "9811122334", duty: "Maharajgunj, KTM", salary: 17000 },
  ],
  ad: [
    { name: "Hari Sharma", phone: "9841223344", duty: "Lazimpat, KTM", salary: 20000 },
    { name: "Sita Karki", phone: "9811772233", duty: "New Road, KTM", salary: 16000 },
  ],
};

export default function SalaryRec() {
  const [active, setActive] = useState("bs");
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState({});
  const [voucher, setVoucher] = useState({});
  const [filter, setFilter] = useState("all");

  const list = staffData[active];

  const filtered = useMemo(() => {
    return list.filter((s, i) => {
      const matchName = s.name.toLowerCase().includes(search.toLowerCase());
      const paid = status[`${active}-${i}`];
      const matchStatus =
        filter === "all" ||
        (filter === "paid" && paid) ||
        (filter === "unpaid" && !paid);
      return matchName && matchStatus;
    });
  }, [search, filter, status, active]);

  const summary = useMemo(() => {
    const total = list.length;
    const paid = list.filter((_, i) => status[`${active}-${i}`]).length;
    const unpaid = total - paid;
    const amount = list.reduce((a, b) => a + b.salary, 0);
    return { total, paid, unpaid, amount };
  }, [status, active]);

  return (
<div className="p-6 h-[90vh] overflow-y-auto space-y-6 bg-slate-50 dark:bg-[#0f1115] rounded-xl">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Salary Payout</h1>
          <p className="text-muted-foreground font-semibold">
            {active === "bs" ? "Month: Falgun" : "Month: March"}
          </p>
        </div>

        <div className="flex gap-2">
          <Button variant={active === "bs" ? "default" : "secondary"} onClick={() => setActive("bs")}>B.S</Button>
          <Button variant={active === "ad" ? "default" : "secondary"} onClick={() => setActive("ad")}>A.D</Button>
        </div>
      </div>

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          ["Total Staff", summary.total],
          ["Paid", summary.paid],
          ["Unpaid", summary.unpaid],
          ["Total Amount", `Rs. ${summary.amount}`],
        ].map(([t, v]) => (
          <Card key={t}>
            <CardContent className="p-2">
              <p className="text-sm text-muted-foreground">{t}</p>
              <p className="text-xl font-bold">{v}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* SEARCH + FILTER */}
      <div className="flex flex-wrap gap-3">
        <div className="relative w-full md:w-64">
          <Search className="absolute left--2 top-2.5 text-gray-400" size={18} />
          <Input
            className="pl-10 "
            placeholder="Search staff..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex gap-2">
  {["all", "paid", "unpaid"].map((f) => (
    <Button
      key={f}
      variant={filter === f ? "default" : "outline"}
      onClick={() => setFilter(f)}
    >
      {f.charAt(0).toUpperCase() + f.slice(1)}
    </Button>
  ))}
</div>

      </div>

      {/* STAFF LIST */}
      <div className="space-y-3">
        {filtered.map((s, i) => {
          const key = `${active}-${i}`;
          return (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card>
                <CardContent className="p-2 flex flex-col md:flex-row justify-between gap-4">
                  <div>
                    <p className="font-semibold">{s.name}</p>
                    <p className="text-sm text-muted-foreground">{s.duty}</p>
                    <p className="text-xs text-muted-foreground">📞 {s.phone}</p>
                  </div>

                  <div className="text-right">
                    <p className="text-sm">Salary</p>
                    <p className="font-bold">Rs. {s.salary}</p>
                  </div>

                  <div className="flex items-center gap-3">
                    {/* Voucher */}
                    <label className="cursor-pointer">
                      <input
                        type="file"
                        hidden
                        onChange={(e) =>
                          setVoucher({ ...voucher, [key]: e.target.files[0] })
                        }
                      />
                      <Button size="sm" variant="outline" className="flex items-center">
                        <Upload size={14} className="mr-1" />
                        {voucher[key] ? "Uploaded" : "Upload"}
                      </Button>
                    </label>

                    {/* Status */}
                    <Switch
                      checked={status[key] || false}
                      onCheckedChange={(v) =>
                        setStatus({ ...status, [key]: v })
                      }
                    />

                    <Badge variant={status[key] ? "success" : "destructive"}>
                      {status[key] ? "Paid" : "Unpaid"}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

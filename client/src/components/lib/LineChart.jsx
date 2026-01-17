import {
  LineChart,
  Line,
  XAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Mon", clicks: 400 },
  { name: "Tue", clicks: 300 },
  { name: "Wed", clicks: 500 },
  { name: "Thu", clicks: 200 },
  { name: "Fri", clicks: 600 },
  { name: "Sat", clicks: 450 },
  { name: "Sun", clicks: 700 },
];

const datay = [
  { name: "Mon", clicks: 400 },
  { name: "Tue", clicks: 300 },
  { name: "Wed", clicks: 500 },
  { name: "Thu", clicks: 200 },
  { name: "Fri", clicks: 600 },
  { name: "Sat", clicks: 450 },
  { name: "Sun", clicks: 700 },
];

export default function ClicksLineChart() {
  return (
    <div className="w-full h-[260px] mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis dataKey="name" />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="clicks"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

import React from "react";
import Chart from "react-apexcharts";

const ColumnChart = () => {
  const options = {
    chart: {
      type: "bar",
      toolbar: { show: false }
    },
    xaxis: {
      categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    },
    dataLabels: { enabled: false }
  };

  const series = [
    {
      name: "Leads",
      data: [120, 200, 150, 80, 70, 110, 130]
    }
  ];

  return <Chart options={options} series={series} type="bar" height={250} />;
};

export default ColumnChart;

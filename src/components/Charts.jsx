import React from "react";
import Chart from "react-apexcharts";

const MainChart = () => {
  const chartOptions = {
    chart: {
      id: "basic-line-chart",
      toolbar: {
        show: false, // Hides toolbar for better fit
      },
    },
    xaxis: {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
      labels: {
        style: {
          colors: "gray", // Text color (e.g., Tailwind's 'indigo-600')
          fontSize: "9px",
          fontFamily: "Inter, sans-serif", // Matches Tailwind's default font
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: "gray", // Text color (same as x-axis for consistency)
          fontSize: "9px",
          fontFamily: "Inter, sans-serif",
        },
      },
    },
    title: {
      text: "Forecast",
      align: "center",
      style: {
        fontSize: "14px", // Slightly larger for the title
        color: "gray", // Text color (e.g., Tailwind's 'purple-600')
        fontFamily: "Inter, sans-serif",
        fontWeight: "600", // Matches Tailwind's font-semibold
      },
    },
    grid: {
      padding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      },
    },
  };

  const chartSeries = [
    {
      name: "Sales",
      data: [-30, -20, -10, 0, 10, 20, 30],
    },
  ];

  return (
    <div className="h-full w-full">
      <Chart
        options={chartOptions}
        series={chartSeries}
        type="line"
        height="100%" // Adjust height to parent div
        width="100%" // Adjust width to parent div
      />
    </div>
  );
};

export default MainChart;

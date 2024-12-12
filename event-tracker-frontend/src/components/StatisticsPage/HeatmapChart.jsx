import React, { useEffect, useState } from "react";
import { Bubble } from "react-chartjs-2";
import Chart from "chart.js/auto";
import axios from "axios";

const WeeklyHeatmap = () => {
  const [heatmapData, setHeatmapData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/events/statistics/weekly-heatmap")
      .then((response) => {
        setHeatmapData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching heatmap data:", error);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;

  const bubbleData = heatmapData.flatMap((week, weekIndex) =>
    week.map((count, dayIndex) => ({
      x: dayIndex + 1, // Day of the week (1 = Sunday, 7 = Saturday)
      y: weekIndex + 1, // Week of the year
      r: Math.sqrt(count) * 5, // Bubble radius based on event count
    }))
  );

  const chartData = {
    datasets: [
      {
        label: "Weekly Event Count",
        data: bubbleData,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
      },
    ],
  };

  const options = {
    scales: {
      x: {
        title: {
          display: true,
          text: "Day of the Week (1 = Sunday, 7 = Saturday)",
        },
        ticks: {
          stepSize: 1,
          min: 1,
          max: 7,
        },
      },
      y: {
        title: {
          display: true,
          text: "Week of the Year",
        },
        ticks: {
          stepSize: 1,
          min: 1,
          max: 52,
        },
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: (context) => `Count: ${Math.pow(context.raw.r / 5, 2).toFixed(0)}`,
        },
      },
    },
  };

  return (
    <div>
      <h2>Weekly Event Count Heatmap</h2>
      <Bubble data={chartData} options={options} />
    </div>
  );
};

export default WeeklyHeatmap;

import React from "react";
import EventCountChart from "../components/StatisticsPage/EventCountChart";
import CategoryDistributionChart from "../components/StatisticsPage/CategoryChart";
import TopCategoriesChart from "../components/StatisticsPage/LineChart";
import WeeklyHeatmap from "../components/StatisticsPage/HeatmapChart";

import "./StatisticsPage.css"; // Import the CSS file

const StatisticsPage = () => {
  return (
    <div className="statistics-page">
      <h2 className="statistics-header">Event Statistics</h2>
      <div className="chart-section">
        <EventCountChart />
      </div>
      <div className="chart-section">
        <CategoryDistributionChart />
      </div>
      <div className="chart-section">
        <TopCategoriesChart />
      </div>
      <div className="chart-section">
        <WeeklyHeatmap />
      </div>
    </div>
  );
};

export default StatisticsPage;

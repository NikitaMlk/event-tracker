const express = require('express');
const router = express.Router();
const Event = require('../models/event');

router.get("/statistics/events", async (req, res) => {
    try {
      const eventsPerMonth = await Event.aggregate([
        {
          $addFields: {
            date: { $toDate: "$date" }
          },
        },
        {
          $group: {
            _id: { $month: "$date" },
            count: { $sum: 1 },
          },
        },
        {
          $sort: { _id: 1 },
        },
      ]);
  
      const statistics = eventsPerMonth.map((item) => ({
        month: item._id,
        count: item.count,
      }));
  
      res.json(statistics);
    } catch (error) {
      console.error("Error fetching statistics:", error);
      res.status(500).json({ error: "Failed to fetch statistics" });
    }
  });

  router.get("/statistics/categories", async (req, res) => {
    try {
      const categoryDistribution = await Event.aggregate([
        {
          $group: {
            _id: "$category",
            count: { $sum: 1 },
          },
        },
        {
          $sort: { count: -1 },
        },
      ]);
  
      const statistics = categoryDistribution.map((item) => ({
        category: item._id,
        count: item.count,
      }));
  
      res.json(statistics);
    } catch (error) {
      console.error("Error fetching category statistics:", error);
      res.status(500).json({ error: "Failed to fetch category statistics" });
    }
  });
  
  router.get("/statistics/top-categories", async (req, res) => {
    try {
      const topCategories = await Event.aggregate([
        {
          $group: {
            _id: "$category",
            count: { $sum: 1 },
          },
        },
        {
          $sort: { count: -1 },
        },
        {
          $limit: 5,
        },
      ]);
  
      const topCategoryNames = topCategories.map((item) => item._id);
  
      const categoryMonthlyCounts = await Event.aggregate([
        {
          $addFields: {
            date: { $toDate: "$date" },
          },
        },
        {
          $project: {
            category: 1,
            month: { $month: "$date" },
          },
        },
        {
          $match: {
            category: { $in: topCategoryNames },
          },
        },
        {
          $group: {
            _id: { category: "$category", month: "$month" },
            count: { $sum: 1 },
          },
        },
        {
          $sort: { "_id.category": 1, "_id.month": 1 },
        },
      ]);
  
      const formattedData = topCategoryNames.map((category) => ({
        category,
        monthlyCounts: Array.from({ length: 12 }, (_, i) => {
          const monthData = categoryMonthlyCounts.find(
            (item) => item._id.category === category && item._id.month === i + 1
          );
          return monthData ? monthData.count : 0;
        }),
      }));
  
      res.json(formattedData);
    } catch (error) {
      console.error("Error fetching top categories statistics:", error);
      res.status(500).json({ error: "Failed to fetch top categories statistics" });
    }
  });


  router.get("/statistics/weekly-heatmap", async (req, res) => {
    try {
      const weeklyHeatmapData = await Event.aggregate([
        {
          $addFields: {
            date: { $toDate: "$date" },
          },
        },
        {
          $project: {
            week: { $week: "$date" },
            dayOfWeek: { $dayOfWeek: "$date" },
          },
        },
        {
          $group: {
            _id: { week: "$week", dayOfWeek: "$dayOfWeek" },
            count: { $sum: 1 },
          },
        },
        {
          $sort: { "_id.week": 1, "_id.dayOfWeek": 1 },
        },
      ]);
  
      const weeksInYear = 52;
      const daysInWeek = 7;
  
      const heatmap = Array.from({ length: weeksInYear }, () =>
        Array(daysInWeek).fill(0)
      );
  
      weeklyHeatmapData.forEach(({ _id: { week, dayOfWeek }, count }) => {
        if (week <= weeksInYear && dayOfWeek <= daysInWeek) {
          heatmap[week - 1][dayOfWeek - 1] = count;
        }
      });
  
      res.json(heatmap);
    } catch (error) {
      console.error("Error fetching weekly heatmap data:", error);
      res.status(500).json({ error: "Failed to fetch weekly heatmap data" });
    }
  });
  

  module.exports = router;
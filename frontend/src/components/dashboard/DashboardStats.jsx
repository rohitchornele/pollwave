import React from "react";
import StatCard from "./StatCard";

const DashboardStats = ({ stats }) => {
  return (
    <div className="stats-grid">
      {stats.map((stat, index) => (
        <StatCard
          key={stat.id}
          stat={stat}
          delay={index * 80}
        />
      ))}
    </div>
  );
};

export default DashboardStats;
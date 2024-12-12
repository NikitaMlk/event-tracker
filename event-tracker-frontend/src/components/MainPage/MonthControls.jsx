import React from "react";

const MonthControls = ({ currentMonth, currentYear, handleNextMonth, handlePreviousMonth }) => {
  return (
    <div className="month-controls">
      <button onClick={handlePreviousMonth}>Previous</button>
      <span>
        {new Date(currentYear, currentMonth).toLocaleString("default", {
          month: "long",
          year: "numeric",
        })}
      </span>
      <button onClick={handleNextMonth}>Next</button>
    </div>
  );
};

export default MonthControls;
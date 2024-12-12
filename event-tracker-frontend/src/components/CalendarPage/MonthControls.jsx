// MonthControls.js
const MonthControls = ({ currentMonth, currentYear, onPrevious, onNext }) => {
    return (
      <div className="month-controls">
        <button onClick={onPrevious}>Previous</button>
        <span>
          {new Date(currentYear, currentMonth).toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </span>
        <button onClick={onNext}>Next</button>
      </div>
    );
  };
  
  export default MonthControls;
  
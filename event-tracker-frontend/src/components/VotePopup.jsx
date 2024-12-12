import React, { useState } from "react";
import "./VotePopup.css";

const VotePopup = ({ eventName, status, onSubmit, onClose }) => {
  const [email, setEmail] = useState("");

  const handleSubmit = async () => {
    if (!email.trim()) {
      alert("Email is required!");
      return;
    }

    try {
      await onSubmit(email); // Ensure the parent handles the request properly
      onClose(); // Close popup only after submission is successful
    } catch (error) {
      alert("Error submitting vote. Please try again.");
      console.error("Error in VotePopup:", error);
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2>Vote: {eventName}</h2>
        <p>Status: {status}</p>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={handleSubmit}>Submit</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default VotePopup;

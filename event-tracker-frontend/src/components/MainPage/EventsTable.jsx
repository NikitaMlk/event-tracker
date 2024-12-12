import React from "react";

const EventsTable = ({ events, handleVote, handleEventClick }) => {
  const displayEvents = [...events];
  while (displayEvents.length < 10) {
    displayEvents.push({ title: "", date: "", category: "", _id: `empty-${displayEvents.length}` });
  }

  return (
    <div className="events-table-container">
      <table className="events-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Date</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {displayEvents.map((event) => (
            <tr 
              key={event._id} 
              onClick={() => event.title && handleEventClick(event._id)} // Navigate to details page
              style={{ cursor: event.title ? "pointer" : "default" }} // Pointer cursor for clickable rows
            >
              <td>{event.title || "No event"}</td>
              <td>{event.date ? new Date(event.date).toLocaleDateString() : ""}</td>
              <td>{event.category || ""}</td>
              <td>
                {event.title && (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent row click when clicking the button
                        handleVote(event.title, "Going");
                      }}
                    >
                      Going
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent row click when clicking the button
                        handleVote(event.title, "Not Going");
                      }}
                    >
                      Not Going
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EventsTable;

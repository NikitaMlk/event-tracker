// EventList.js
const EventList = ({ events }) => {
    return (
      <div className="events-list-container">
        <h2>Events this Month</h2>
        <ul className="events-list">
          {events.length === 0 ? (
            <li>No events for this month.</li>
          ) : (
            events.map((event) => (
              <li key={event._id} title={event.title}>
                {event.title} - {new Date(event.date).toLocaleDateString()}
              </li>
            ))
          )}
        </ul>
      </div>
    );
  };
  
  export default EventList;
  
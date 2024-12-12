const EventCalendar = ({ currentMonth, currentYear, events }) => {
  const daysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  const filteredEvents = events.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getMonth() === currentMonth &&
      eventDate.getFullYear() === currentYear
    );
  });

  const getEventColor = (goingCount) => {
    console.log(goingCount);
    if (goingCount >= 10) return '#4CAF50';  // Green for 10 or more attendees
    if (goingCount >= 5) return '#FFEB3B';   // Yellow for 5-9 attendees
    return '#F44336';                       // Red for less than 5 attendees
  };

  const generateCalendar = () => {
    const totalDays = daysInMonth(currentMonth, currentYear);
    const calendar = [];
    let dayCounter = 1;

    for (let row = 0; row < 6; row++) {
      const week = [];
      for (let col = 0; col < 7; col++) {
        if (row === 0 && col < firstDayOfMonth) {
          week.push(<td key={`empty-${row}-${col}`} className="empty"></td>);
        } else if (dayCounter > totalDays) {
          week.push(<td key={`empty-${row}-${col}`} className="empty"></td>);
        } else {
          const eventsForDay = filteredEvents.filter((event) => {
            const eventDate = new Date(event.date);
            return eventDate.getDate() === dayCounter;
          });

          // Add a class to highlight the day if it has events
          const dayClass = eventsForDay.length > 0 ? 'day event-day' : 'day';

          week.push(
            <td key={`day-${row}-${col}`} className={dayClass}>
              <div className="day-number">{dayCounter}</div>
              {eventsForDay.length > 0 && (
                <ul className="events-list">
                  {eventsForDay.map((event) => (
                    <li
                      key={event._id}
                      title={event.title}
                      style={{
                        backgroundColor: getEventColor(event.goingCount), // Set the background color dynamically
                      }}
                    >
                      {event.title}
                    </li>
                  ))}
                </ul>
              )}
            </td>
          );
          dayCounter++;
        }
      }
      calendar.push(<tr key={`week-${row}`}>{week}</tr>);
    }

    return calendar;
  };

  return (
    <table className="calendar-table">
      <thead>
        <tr>
          <th>Sun</th>
          <th>Mon</th>
          <th>Tue</th>
          <th>Wed</th>
          <th>Thu</th>
          <th>Fri</th>
          <th>Sat</th>
        </tr>
      </thead>
      <tbody>{generateCalendar()}</tbody>
    </table>
  );
};

export default EventCalendar;

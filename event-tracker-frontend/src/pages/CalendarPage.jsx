import { useState, useEffect } from "react";
import axios from "axios";
import MonthControls from "../components/CalendarPage/MonthControls";
import EventCalendar from "../components/CalendarPage/EventCalendar";
import EventList from "../components/CalendarPage/EventList";
import "./CalendarPage.css";

const CalendarPage = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        // Fetch base event data (without goingCount)
        const response = await axios.get("http://localhost:5000/api/events");
        setEvents(response.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const eventIds = events
          .filter((event) => {
            const eventDate = new Date(event.date);
            return (
              eventDate.getMonth() === currentMonth &&
              eventDate.getFullYear() === currentYear
            );
          })
          .map((event) => event._id);

        if (eventIds.length === 0) return;

        console.log(eventIds);

        // Make a POST request with an array of event IDs
        const response = await axios.post(
          "http://localhost:5000/api/events/goingCount",
          { eventIds }
        );

        // Merge detailed event data with existing events
        const goingCounts = response.data;
        setEvents((prevEvents) =>
          prevEvents.map((event) => {
            const goingCountData = goingCounts.find(
              (gc) => gc.eventId.toString() === event._id.toString()
            );
            return goingCountData
              ? { ...event, goingCount: goingCountData.goingCount }
              : event;
          })
        );
      } catch (error) {
        console.error("Error fetching detailed events:", error);
      }
    };

    if (events.length > 0) {
      fetchEventDetails();
    }
  }, [events, currentMonth, currentYear]);

  const handleNextMonth = () => {
    setCurrentMonth((prev) => (prev === 11 ? 0 : prev + 1));
    if (currentMonth === 11) setCurrentYear((prev) => prev + 1);
  };

  const handlePreviousMonth = () => {
    setCurrentMonth((prev) => (prev === 0 ? 11 : prev - 1));
    if (currentMonth === 0) setCurrentYear((prev) => prev - 1);
  };

  const filteredEvents = events.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getMonth() === currentMonth &&
      eventDate.getFullYear() === currentYear
    );
  });

  if (loading) {
    return <p>Loading events...</p>;
  }

  return (
    <div className="calendar-page">
      <h1>Event Calendar</h1>
      <MonthControls
        currentMonth={currentMonth}
        currentYear={currentYear}
        onPrevious={handlePreviousMonth}
        onNext={handleNextMonth}
      />
      <EventCalendar
        currentMonth={currentMonth}
        currentYear={currentYear}
        events={filteredEvents}
      />
      <EventList events={filteredEvents} />
    </div>
  );
};

export default CalendarPage;

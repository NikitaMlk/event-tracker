import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import MonthControls from "../components/MainPage/MonthControls";
import EventsTable from "../components/MainPage/EventsTable";
import VotePopup from "../components/VotePopup";

const MainPage = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [popupData, setPopupData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/events");
        setEvents(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching events:", error);
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const filteredEvents = events.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getMonth() === currentMonth &&
      eventDate.getFullYear() === currentYear
    );
  });

  const handleNextMonth = () => {
    setCurrentMonth((prev) => (prev === 11 ? 0 : prev + 1));
    if (currentMonth === 11) setCurrentYear((prev) => prev + 1);
  };

  const handlePreviousMonth = () => {
    setCurrentMonth((prev) => (prev === 0 ? 11 : prev - 1));
    if (currentMonth === 0) setCurrentYear((prev) => prev - 1);
  };

  const handleVote = (eventName, status) => {
    setPopupData({ eventName, status }); // Show the popup
  };

  const handleSubmitVote = async (email) => {
    try {
      const { eventName, status } = popupData;
      const response = await axios.post(
        `http://localhost:5000/api/votes/${encodeURIComponent(eventName)}/vote`,
        { status, email }
      );
      console.log("Vote recorded:", response.data);
      setPopupData(null); // Close the popup after successful submission
    } catch (error) {
      console.error("Error recording vote:", error.response?.data || error.message);
    }
  };

  const handleEventClick = (eventId) => {
    navigate(`/events/${eventId}`);
  };

  if (loading) {
    return <p>Loading events...</p>;
  }

  return (
    <div className="main-page">
      <h1>Events</h1>
      <MonthControls
        currentMonth={currentMonth}
        currentYear={currentYear}
        handleNextMonth={handleNextMonth}
        handlePreviousMonth={handlePreviousMonth}
      />
      <EventsTable
        events={filteredEvents}
        handleVote={handleVote}
        handleEventClick={handleEventClick}
        currentMonth={currentMonth}
        currentYear={currentYear}
      />
      {popupData && (
        <VotePopup
          eventName={popupData.eventName}
          status={popupData.status}
          onSubmit={handleSubmitVote}
          onClose={() => setPopupData(null)}
        />
      )}
    </div>
  );
};

export default MainPage;

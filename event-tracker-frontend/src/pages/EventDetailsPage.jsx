import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './EventDetailsPage.css'; // Import the CSS file

const EventDetailsPage = () => {
    const { id } = useParams(); // Get the event ID from the URL
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchEventDetails = async () => {
        try {
          // Fetch event details using the event ID from the URL
          const response = await axios.get(`http://localhost:5000/api/events/${id}`);
          setEvent(response.data);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching event details:', error);
          setLoading(false);
        }
      };
  
      fetchEventDetails();
    }, [id]);
  
    if (loading) return <p>Loading event details...</p>;
  
    if (!event) return <p>Event not found.</p>;
  
    return (
      <div className="event-details">
        <h1 className="event-title">{event.title}</h1>
        <p>{event.description}</p>
        <div className="event-info">
          <p>{new Date(event.date).toLocaleString()}</p>
          <p>{event.location}</p>
          <p>{event.category}</p>
        </div>
        <div className="votes-info">
          <h3>Guest Votes</h3>
          <p><strong>Going:</strong> {event.goingCount || 0}</p>
        </div>
        <div className="image-placeholder">
          <p>Image Placeholder</p>
        </div>
      </div>
    );
  };
  
export default EventDetailsPage;

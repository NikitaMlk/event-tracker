import { useParams } from "react-router-dom";

const EventDetailsPage = () => {
  const { id } = useParams();
  const event = events.find((e) => e.id === parseInt(id));

  if (!event) return <p>Event not found</p>;

  return (
    <div>
      <h1>{event.title}</h1>
      <p>{event.description}</p>
      <p>Going: {event.goingCount}</p>
      <p>Not Going: {event.notGoingCount}</p>
    </div>
  );
};

export default EventDetailsPage;

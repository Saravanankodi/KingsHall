import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "../css/components/event-details.css";
import axios from "axios";
import { parseISO, isAfter } from "date-fns";

function EventDetails({ name }) {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);
  const Location = useLocation();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(
          `https://wqy9bxpoui.execute-api.us-east-1.amazonaws.com/prod/Halls_Details?hall_name=${name}`
        );

        console.log("API response data:", response.data);
        const eventData = Array.isArray(response.data.data)
          ? response.data.data
          : [];
        setEvents(eventData);
      } catch (err) {
        console.error("Error fetching events:", err);
        setError("Failed to fetch events. Please try again later.");
      }
    };

    fetchEvents();
  }, [name]);

  const formatDate = (isoString) => {
    if (!isoString) return "N/A";
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(isoString).toLocaleDateString(undefined, options);
  };


const filteredEvents =
  Location.pathname === "login/incharge"
    ? events
    : events.filter((event) => {
        const eventEndDate = event.event_end?.S ? parseISO(event.event_end.S) : null;
        const today = new Date();
        return eventEndDate && isAfter(eventEndDate, today);
      });

    return (
    <section className="event-details">
      <h1 className="welcome-text">Welcome to {name} hall</h1>
      {error ? (
        <p className="error-text">{error}</p>
      ) : events.length === 0 ? (
        <p>No approved events found for {name}!</p>
      ) : (
        <table className="event-details-table" border={1} cellPadding={10}>
          <thead>
            <tr>
              <th className="table-heading">Staff Name</th>
              <th className="table-heading">Booking Date</th>
              <th className="table-heading">Event Starts</th>
              <th className="table-heading">Event Ends</th>
              <th className="table-heading">Event Details</th>
            </tr>
          </thead>
          <tbody>
          {filteredEvents.map((event, index) => (
              <tr key={index}>
                <td className="table-text">{event.name?.S || "N/A"}</td>
                <td className="table-text">{formatDate(event.booking_date?.S || "N/A")}</td>
                <td className="table-text">{formatDate(event.event_start?.S || "N/A")}</td>
                <td className="table-text">{formatDate(event.event_end?.S || "N/A")}</td>
                <td className="table-text">{event.event_detail?.S || "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}

export default EventDetails;

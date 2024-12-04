import { useEffect, useState } from "react";
import axios from "axios";
import "../css/components/event-history.css";
import approve from "../assets/img/Done.png";
import decline from "../assets/img/Multiply.png";
import icon from "../assets/img/Back Arrow.png";
import Header from "./Header";
import emailjs from "emailjs-com";

function BookingNotification() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await axios.get(
        "https://wqy9bxpoui.execute-api.us-east-1.amazonaws.com/prod/Hall_Booking_Details"
      );

      const data = response.data.data || [];

      const filteredData = data.filter(
        (booking) => booking.status?.S !== "approved" && booking.status?.S !== "declined"
      );

      const sortedBookings = sortBookings(filteredData);
      setBookings(sortedBookings);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  const sortBookings = (data) => {
    return data.sort((a, b) => {
      const dateA = new Date(a.booking_date.S);
      const dateB = new Date(b.booking_date.S);
      return dateA - dateB;
    });
  };

  const sendEmail = (email, status, name, hall_name) => {
    const templateParams = {
      email,
      hall_name,
      name,
      status,
      message: `Your booking for the hall "${hall_name}" has been ${status}.`,
    };

    emailjs
      .send(
        "service_0hjq4xo", 
        "template_cm8c2h6", 
        templateParams,
        "8tkaRIcvb5aMznHbw"
      )
      .then((response) => {
        console.log("Email sent successfully", response.status, response.text);
      })
      .catch((error) => {
        console.error("Error sending email:", error);
      });
  };

  const handleApprove = async (hall_Id, email, name, hall_name) => {
    try {
      await axios.put(
        "https://wqy9bxpoui.execute-api.us-east-1.amazonaws.com/prod/Hall_Booking_Status",
        {
          hall_Id,
          status: "approved",
        }
      );

      sendEmail(email, "approved", name, hall_name);

      const updatedBookings = bookings.map((booking) =>
        booking.hall_Id.N === hall_Id
          ? { ...booking, status: { S: "approved" } }
          : booking
      );
      setBookings(updatedBookings);

      console.log(`Booking ${hall_Id} approved.`);
    } catch (error) {
      console.error("Error approving booking:", error);
    }
  };

  const handleDecline = async (hall_Id, email, hall_name, name) => {
    if (window.confirm("Are you sure you want to decline this booking?")) {
      try {
        await axios.put(
          "https://wqy9bxpoui.execute-api.us-east-1.amazonaws.com/prod/Hall_Booking_Status",
          {
            hall_Id,
            status: "declined",
          }
        );

        sendEmail(email, "declined", name, hall_name);

        const updatedBookings = bookings.map((booking) =>
          booking.hall_Id.N === hall_Id
            ? { ...booking, status: { S: "declined" } }
            : booking
        );
        setBookings(updatedBookings);

        console.log(`Booking ${hall_Id} declined.`);
      } catch (error) {
        console.error("Error declining booking:", error);
      }
    }
  };

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

  return (
    <>
      <Header icon={icon} />
      <section className="event-history">
        <h1 className="welcome-text">Hall Booking Details</h1>
        <table className="event-history-table" border={1} cellPadding={10}>
          <thead>
            <tr>
              <th className="table-heading-notification">Staff Name</th>
              <th className="table-heading-notification">Department</th>
              <th className="table-heading-notification">Hall</th>
              <th className="table-heading-notification">Event Details</th>
              <th className="table-heading-notification">Event Start Date</th>
              <th className="table-heading-notification">Event End Date</th>
              <th className="table-heading-notification">Booking Date</th>
              <th className="table-heading-notification">Approval</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => {
              const status = booking.status?.S;
              return (
                <tr key={booking.hall_Id.N}>
                  <td className="table-text">{booking.name.S}</td>
                  <td className="table-text">{booking.department.S}</td>
                  <td className="table-text">{booking.hall_name.S}</td>
                  <td className="table-text">{booking.event_detail.S}</td>
                  <td className="table-text">{formatDate(booking.event_start.S)}</td>
                  <td className="table-text">{formatDate(booking.event_end.S)}</td>
                  <td className="table-text">{formatDate(booking.booking_date.S)}</td>
                  <td className="table-text approvel">
                    {status === "approved" ? (
                      <span className="approve">Approved</span>
                    ) : status === "declined" ? (
                      <span className="decline">Declined</span>
                    ) : (
                      <div className="cheack-btns">
                        <button
                          onClick={() =>
                            handleApprove(booking.hall_Id.N, booking.email.S, booking.name.S,booking.hall_name.S )}>
                          <img src={approve} alt="Approve" />
                        </button>
                        <button
                          onClick={() =>
                            handleDecline(booking.hall_Id.N, booking.email.S,booking.hall_name.S,booking.name.S)}>
                          <img src={decline} alt="Decline" />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
    </>
  );
}

export default BookingNotification;


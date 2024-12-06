import '../css/components/bookingform.css';
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from 'sweetalert2';

function BookingForm({ hallName }) {
  const [name, setName] = useState('');
  const [department, setDepartment] = useState('');
  const [phone, setPhone] = useState('');
  const [event_detail, setEventDetail] = useState('');
  const [event_start, setEventStart] = useState('');
  const [event_end, setEventEnd] = useState('');
  const [booking_date, setBookingDate] = useState('');
  const [email, setEmail] = useState('');
  const [hall_Id, setHallId] = useState(1); 

  useEffect(() => {
    const now = new Date();
    const FormattedDateTime = now.toLocaleString("sv-SE", {
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: undefined,
    }).replace(" ", "T");
    setBookingDate(FormattedDateTime);
  }, []);

  const isValidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };
  
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (new Date(event_start).toDateString() === new Date(event_end).toDateString() && new Date(event_start).getTime() >= new Date(event_end).getTime()) {
      return Swal.fire('Error', 'Event end time must be after event start time on the same day.', 'error');
    }
    if (new Date(booking_date) >= new Date(event_start)) {
      return Swal.fire('Error', 'Booking date must be before event start date.', 'error');
    }
    if (!isValidEmail(email)) {
      return Swal.fire('Error', 'Please enter a valid email address.', 'error');
    }

    const requestData = {
      email,
      department,
      name,
      event_detail,
      event_end,
      event_start,
      phone,
      booking_date,
      hall_name: hallName,
    };

    console.log("Request Data:", requestData); 

    try {
      const checkOverlapResponse = await axios.post(
        'https://wqy9bxpoui.execute-api.us-east-1.amazonaws.com/prod/Check_Overlap',
        { event_start, event_end, hall_name: hallName },
        { headers: { 'Content-Type': 'application/json' } }
      );

      console.log("Overlap Check Response:", checkOverlapResponse);

      if (checkOverlapResponse?.data?.overlap) {
        return Swal.fire(
          'Error',
          'The selected time slot is already booked. Please choose a different time.',
          'error'
        );
      }

      const bookingResponse = await axios.post(
        'https://wqy9bxpoui.execute-api.us-east-1.amazonaws.com/prod/Hall_Booking',
        requestData,
        { headers: { 'Content-Type': 'application/json' } }
      );

      console.log("Response from server:", bookingResponse); 

      if (bookingResponse?.status === 200 || bookingResponse?.status === 201) {
        Swal.fire({
          title: "Your Booking Was Sent Successfully",
          icon: "success",
          customClass: {
            title: "popup-message",
            popup: "popup-container",
            confirmButton: "popup-close",
            actions: "popup-action",
          },
        }).then(() => {
          // Reset form fields
          setName('');
          setDepartment('');
          setPhone('');
          setEventDetail('');
          setEventStart('');
          setEventEnd('');
          setEmail('');
          setBookingDate(''); 
        });
      } else {
        Swal.fire('Error', 'Booking failed: ' + (bookingResponse.data.message || bookingResponse.data), 'error');
      }
    } catch (error) {
      console.error("Error during booking:", error); 
      Swal.fire('Error', 'An error occurred: ' + (error.response?.data?.message || error.message), 'error');
    }
  };

  return (
    <section className="hallbooking">
      <h1 className="hallbooking-heading">Enter Your Hall Booking Details</h1>
      <form onSubmit={handleSubmit} className="hallbooking-form">
        <div className="hallbooking-form-left hallbooking-form-comdent">
          <div className="input-container">
            <label className="text">Your name</label>
            <input type="text" placeholder='Enter your name' className="input-box" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className="input-container">
            <label className="text">Your Department</label>
            <input type="text" placeholder='Enter your Department' className="input-box" value={department} onChange={(e) => setDepartment(e.target.value)} required />
          </div>
          <div className="input-container">
            <label className="text">Your Contact No</label>
            <input type="number"  placeholder='Enter your phone no' className="input-box" value={phone} onChange={(e) => setPhone(e.target.value)} required />
          </div>
          <div className="input-container">
            <label className="text">Your Mail</label>
            <input type="email" placeholder='example@mail.com' className="input-box" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="input-container">
            <label className="text">Your Event Details</label>
            <input type="text" placeholder='Enter your Hall Booking purpose' className="input-box" value={event_detail} onChange={(e) => setEventDetail(e.target.value)} required />
          </div>
        </div>
        <div className="hallbooking-form-right hallbooking-form-comdent">
          <div className="input-container">
            <label className="text">Event start date</label>
            <input type="datetime-local" className="input-box" value={event_start} onChange={(e) => setEventStart(e.target.value)} required />
          </div>
          <div className="input-container">
            <label className="text">Event end date</label>
            <input type="datetime-local" className="input-box" value={event_end} onChange={(e) => setEventEnd(e.target.value)} required />
          </div>
          <div className="input-container">
            <label className="text">Event booking date</label>
            <input type='datetime-local' id='datetime' className="input-box" value={booking_date} readOnly required />
          </div>
        </div>
        <button type="submit" className='booking-btn'>SUBMIT</button>
      </form>
    </section>
  );
}

export default BookingForm;

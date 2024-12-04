import BookingForm from "../components/BookingForm"
import EventDetails from "../components/EventDetails"
import Header from "../components/Header"
import vector from '../assets/img/download__6_-removebg-preview 1.png'
import icon from '../assets/img/Back Arrow.png'
function PallavaHallBooking() {
  return (
    <>
        <Header vector={vector} icon={icon} />
        <EventDetails name ='Pallava'/>
        <BookingForm hallName='Pallava'/>
    </>
  )
}

export default PallavaHallBooking
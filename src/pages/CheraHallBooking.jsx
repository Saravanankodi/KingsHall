import Header from '../components/Header'
import BookingForm from '../components/BookingForm'
import EventDetails from '../components/EventDetails'
import vector from '../assets/img/download__5_-removebg-preview 1.png'
import icon from '../assets/img/Back Arrow.png'

function CheraHallBooking() {
  return (
    <>
        <Header vector={vector} icon ={icon}/>
        <EventDetails name='Chera'/>
        <BookingForm hallName='Chera'/>
    </>
  )
}

export default CheraHallBooking
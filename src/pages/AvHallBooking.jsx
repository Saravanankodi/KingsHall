import Header from '../components/Header'
import EventDetails from '../components/EventDetails'
import BookingForm from '../components/BookingForm'
import vector from '../assets/img/AV-removebg-preview 1.png'
import icon from '../assets/img/Back Arrow.png'
function AvHallBooking() {
  return (
    <>
        <Header 
          vector ={vector}
          icon ={icon}  
        />
        <EventDetails name='AV'/>
        <BookingForm hallName ='AV'/>
    </>
  )
}

export default AvHallBooking

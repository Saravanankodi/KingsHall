import EventHistory from '../components/EventHistory'
import Header from '../components/Header'
import icon from '../assets/img/Back Arrow.png'
function AvBookingHistory() {
  return (
    <>
        <Header icon ={icon}/>
        <EventHistory hallname='Av'/>
    </>
  )
}

export default AvBookingHistory
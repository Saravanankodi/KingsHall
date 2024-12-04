import EventHistory from '../components/EventHistory'
import Header from '../components/Header'
import icon from '../assets/img/Back Arrow.png'
function CheraBookingHistory() {
  return (
    <>
        <Header icon ={icon}/>
        <EventHistory hallname = 'Chera'/>
    </>
  )
}

export default CheraBookingHistory
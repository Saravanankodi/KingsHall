import EventHistory from '../components/EventHistory'
import Header from '../components/Header'
import icon from '../assets/img/Back Arrow.png'
function PallavaBookingHistory() {
  return (
    <>
        <Header icon ={icon}/>
        <EventHistory hallname ='Pallava'/>
    </>
  )
}

export default PallavaBookingHistory
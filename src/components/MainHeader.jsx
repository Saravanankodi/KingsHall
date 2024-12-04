import '../css/components/header.css'
import logo from '../assets/img/23KINGSLOGO-removebg-preview 2.png'

function MainHeader() {
  return (
    <>
    <section className="hallbooking-header">
        <div className="logo">
            <img src={logo} alt="" className="logo-img" />
        </div>
        <div className="heading">
            <h1 className="heading-name">
                Kings Halls Bookings system
            </h1>
        </div>
    </section>
    </>
  )
}

export default MainHeader
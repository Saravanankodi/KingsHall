import '../css/components/header.css'
import logo from '../assets/img/23KINGSLOGO-removebg-preview 2.png'

function Header(propes) {
  return (
    <>
    <section className="hallbooking-header">
        {/* <a href="/" className="privious-btn">
          <img src={propes.icon} alt="" className="btn-icon" />
        </a> */}
        <div className="logo">
            <img src={logo} alt="" className="logo-img" />
        </div>
        <div className="heading">
            <h1 className="heading-name">
                Kings Hall Booking System 
            </h1>
        </div>
        <img src={propes.vector} alt="" className='vector-img'/>
    </section>
    </>
  )
}

export default Header

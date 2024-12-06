import '../css/pages/home.css'
import chera from '../assets/img/download__5_-removebg-preview 1.png'
import pallava from '../assets/img/download__6_-removebg-preview 1.png'
import av from '../assets/img/AV-removebg-preview 1.png'
import icon from '../assets/img/Next page.png'
import MainHeader from '../components/MainHeader'
function Home() {
  return (
    <>
    <section className="hallbooking-homepage">
        <MainHeader/>
        <main className="homepage-main">
            <h2 className="wellcome-text">
            WELCOME TO ALL
            </h2>
            <div className="hallnames">
                <a href='/hallbooking/chera' className="hall">
                    <img src={chera} alt="" className="hall-logo" />
                    <p className="hall-name">CHERA HALL</p>
                </a>
                <a href='/hallbooking/pallava' className="hall">
                    <img src={pallava} alt="" className="hall-logo" />
                    <p className="hall-name">PALLAVA HALL </p>
                </a>
                <a href='/hallbooking/av' className="hall">
                    <img src={av} alt="" className="hall-logo" />
                    <p className="hall-name">AV HALL</p>
                </a>
            </div>
        </main>
        <div className="login-btns">
            <a href="/login" className="btn">
                Admin Login
                <img src={icon} alt="" className="btn-icon" />
            </a>
            <a href="/login" className="btn">
                Hall Incharge Login
                <img src={icon} alt="" className="btn-icon" />
            </a>
        </div>
    </section>
    </>
  )
}

export default Home

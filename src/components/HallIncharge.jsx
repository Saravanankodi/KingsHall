import '../css/pages/home.css'
import chera from '../assets/img/download__5_-removebg-preview 1.png'
import pallava from '../assets/img/download__6_-removebg-preview 1.png'
import av from '../assets/img/AV-removebg-preview 1.png'
function HallIncharge() {
  return (
    <>
      <main className="homepage-main">
            <h2 className="wellcome-text">
            Welcome to all
            </h2>
            <div className="hallnames">
                <a href='/login/admin/chera' className="hall">
                    <img src={chera} alt="" className="hall-logo" />
                    <p className="hall-name">Chera hall</p>
                </a>
                <a href='/login/admin/pallava' className="hall">
                    <img src={pallava} alt="" className="hall-logo" />
                    <p className="hall-name">Pallava hall </p>
                </a>
                <a href='/login/admin/av' className="hall">
                    <img src={av} alt="" className="hall-logo" />
                    <p className="hall-name">AV hall</p>
                </a>
            </div>
        </main>
    </>
  )
}

export default HallIncharge

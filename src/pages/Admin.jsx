import vectorimg from '../assets/img/Name.png'
import previousIcon from '../assets/img/Back Arrow.png'
import '../css/pages/admin.css'
import bellIcon from '../assets/img/Notification.png'
import chera from '../assets/img/download__5_-removebg-preview 1.png'
import pallava from '../assets/img/download__6_-removebg-preview 1.png'
import av from '../assets/img/AV-removebg-preview 1.png'
import MainHeader from "../components/MainHeader"
function Admin(){
    return(
        <>
            <section className="admin-page">
                <header className="admin-header">
                    <MainHeader/>
                    <a href="/login/admin/notification" className="notification">
                        <img src={bellIcon} alt="" className="notification-icon" />
                    </a>
                </header>
                <main className="admin-main">
                    <div className="left">
                            <div className="heading">
                                <a href="/" className="privious-link">
                                    <img src={previousIcon} alt="" className="previous-icon" />
                                </a>
                                <h1 className="heading-text">
                                    Admin Page
                                </h1>
                            </div>
                            <img src={vectorimg} alt="" className="vector-img" />
                            <p className="name">Name: <span>Dr. J. Arputha Vijaya Selvi</span></p>
                    </div>
                    <div className="right">
                        <div className="img-container">
                            <a href="/login/admin/chera" className="hall-link hall1">
                                <img src={chera} alt="" className="hall-img" />
                                chera hall
                            </a>
                            <a href="/login/admin/av" className="hall-link hall1">
                                <img src={av} alt="" className="hall-img" />
                                AV hall
                            </a>
                            <a href="/login/admin/pallava" className="hall-link hall2">    
                                <img src={pallava} alt="" className="hall-img" />
                                Pallava hall 
                            </a>
                        </div>
                    </div>
                </main>
            </section>
        </>
    )
}
export default Admin
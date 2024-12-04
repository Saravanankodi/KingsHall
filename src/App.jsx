import './App.css'
import AvHallBooking from './pages/AvHallBooking'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './pages/Home'
import CheraHallBooking from './pages/CheraHallBooking'
import PallavaHallBooking from './pages/PallavaHallBooking'
import Admin from './pages/Admin'
import Login from './pages/Login'
import BookingNotification from './components/BookingNotification'
import InchargeHome from './pages/InchargeHome'
import CheraBookingHistory from './pages/CheraBookingHistory'
import AvBookingHistory from './pages/AvBookingHistory'
import PallavaBookingHistory from './pages/PallavaBookingHistory'
import logo from './assets/desflyer.png'
function App() {
  return (
    <>
      <aside className="brand">
        <a href='https://www.desflyer.tech/' className="brand-name">
          Designed by DesFlyer
          <img src={logo} alt="" />
        </a>
      </aside>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/hallbooking/av' element={<AvHallBooking/>}/>
          <Route path='/hallbooking/chera' element={<CheraHallBooking/>}/>
          <Route path='/hallbooking/pallava' element={<PallavaHallBooking/>}/>
          <Route path='/login/admin' element={<Admin/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/login/incharge' element={<InchargeHome/>}/>
          <Route path='/login/admin/chera/' element={<CheraBookingHistory/>}/>
          <Route path='/login/admin/av/' element={<AvBookingHistory/>}/>
          <Route path='/login/admin/pallava/' element={<PallavaBookingHistory/>}/>
          <Route path='/login/admin/notification/' element={<BookingNotification/>}/>
        </Routes>
      </BrowserRouter>
      
    </>
  )
}

export default App

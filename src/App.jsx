import './App.css';
import LoginPage from "./pages/login";
import MembershipPage from "./pages/membershipPage";
import AdminPage from "./pages/admin";
import PlanYourExpriences from "./pages/planExperience";
import PreviousBookings from './pages/previousBooking';
import Navbar from './components/navbar'
import Footer from './components/footer'
import Home from './pages/home';
import Fleet from './pages/fleet';
import Membership from './pages/membership';
import Founders from './pages/founders';
import Contact from './pages/contact';
import ForgotPassword from './pages/ForgotPassword';
import NewPassword from './pages/NewPassword';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden font-jakarta">
      <Navbar />
      <div className="flex-grow">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/founders' element={<Founders />} />
          <Route path='/fleet' element={<Fleet />} />
          <Route path='/members' element={<Membership />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/membership' element={<MembershipPage />} />
          <Route path='/membership/plan_experiences' element={<PlanYourExpriences />} />
          <Route path='/membership/previous_booking' element={<PreviousBookings />} />
          <Route path='/admin' element={<AdminPage />} />
          <Route path='/forgot_password' element={<ForgotPassword />} />
          <Route path='/new_password' element={<NewPassword />} />
        </Routes>
      </div>
      <Footer />
    </div>
  )
}

export default App;
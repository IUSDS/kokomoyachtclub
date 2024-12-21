import './App.css'
import LoginPage from "./pages/login"
import MembershipPage from "./pages/membershipPage";
import AdminPage from "./pages/admin";
import Navbar from './components/navbar'
import Footer from './components/footer'
import { Routes,Route } from 'react-router-dom'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='/membership' element={<MembershipPage /> } />
        <Route path='/admin' element={<AdminPage />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App

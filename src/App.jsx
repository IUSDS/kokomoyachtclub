import './App.css'
import LoginPage from "./pages/login"
import MembershipPage from "./pages/membershipPage";
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
      </Routes>
      <Footer />
    </>
  )
}

export default App

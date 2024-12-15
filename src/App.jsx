import { useState } from 'react'
import './App.css'
import LoginPage from "./pages/login"
import Navbar from './components/navbar'
import Footer from './components/footer'
import { Routes,Route } from 'react-router-dom'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<LoginPage />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App

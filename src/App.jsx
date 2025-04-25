import "./App.css";
import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import useAuthStore from "./authStore";

// Pages & Components
import LoginPage from "./pages/login";
import MembershipPage from "./pages/membershipPage";
import AdminPage from "./pages/admin";
import PlanYourExpriences from "./pages/planExperience";
import PreviousBookings from "./pages/previousBooking";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import Home from "./pages/home";
import Fleet from "./pages/fleet";
import Membership from "./pages/membership";
import Founders from "./pages/founders";
import Contact from "./pages/contact";
import ForgotPassword from "./pages/ForgotPassword";
import NewPassword from "./pages/NewPassword";
import ListYourYacht from "./pages/ListYourYacht";
import ProtectedRoute from "./components/ProtectedRoute";
import PrivacyPolicy from "./pages/PrivacyPolicy";

function App() {
  const checkSession = useAuthStore((state) => state.checkSession);
  const sessionChecked = useAuthStore((state) => state.sessionChecked);

  useEffect(() => {
    if (!sessionChecked) {
      checkSession();
    }
  }, [sessionChecked, checkSession]);

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden font-jakarta">
      <Navbar />
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/founders" element={<Founders />} />
          <Route path="/fleet" element={<Fleet />} />
          <Route path="/members" element={<Membership />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          
          {/* Protected Routes */}
          <Route
            path="/membership"
            element={
              <ProtectedRoute requiredRole="user">
                <MembershipPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/membership/plan_experiences"
            element={
              <ProtectedRoute requiredRole="user">
                <PlanYourExpriences />
              </ProtectedRoute>
            }
          />
          <Route
            path="/membership/previous_booking"
            element={
              <ProtectedRoute requiredRole="user">
                <PreviousBookings />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminPage />
              </ProtectedRoute>
            }
          />
          
          {/* Other Pages */}
          <Route path="/forgot_password" element={<ForgotPassword />} />
          <Route path="/new_password" element={<NewPassword />} />
          <Route path="/list-your-yacht" element={<ListYourYacht />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;

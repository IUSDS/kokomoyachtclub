// App.jsx
import "./App.css";
import { useEffect } from "react";
import { Routes, Route,Navigate } from "react-router-dom";
import useAuthStore from "./authStore";

// Toastify imports
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Pages & Components
import LoginPage from "./pages/login";
import AdminPage from "./pages/admin";
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
import NewMemberPortal from "./pages/NewMemberPortal";
import Seo from "./components/Seo";
import Event from "./pages/Event";
import PrivateDining from "./pages/PrivateDining";

function ExternalRedirect({ url }) {
  useEffect(() => {
    
    window.location.replace(url);
  }, [url]);
  return null;
}

function App() {
  const checkSession = useAuthStore((state) => state.checkSession);
  const sessionChecked = useAuthStore((state) => state.sessionChecked);

  useEffect(() => {
    if (!sessionChecked) {
      checkSession();
    }
  }, [sessionChecked, checkSession]);

  const DOCUSIGN_URL = "https://us.services.docusign.net/webforms-ux/v1.0/forms/690282cb4272b0df7605b26ae28788f2";

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden font-jakarta">
      <Seo /> 
      <Navbar />
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/founders" element={<Founders />} />
          <Route path="/fleet" element={<Fleet />} />
          <Route path="/membership" element={<Membership />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/new-member-portal" element={<NewMemberPortal />} />
          <Route path="/events" element={<Event />} />
          <Route path="/private-dining" element={<PrivateDining />} />
          {/* Protected Routes */}
          <Route 
            path="/member-portal"
            element={
              <ProtectedRoute requiredRole="user">
                <NewMemberPortal />
              </ProtectedRoute>
          } 
          />

          <Route
            path="/apply-for-membership"
            element={
              <ExternalRedirect url={DOCUSIGN_URL} />
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

      {/* Toast Container */}
      <ToastContainer
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        style={{
          position: "fixed",
          top: "60%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "500px",
          height: "150px",
          maxWidth: "100%",
          zIndex: 9999,
        }}
        toastStyle={{
          width: "100%",
          maxWidth: "100%",
        }}
        closeOnClick={false}
      />
    </div>
  );
}

export default App;

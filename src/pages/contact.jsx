import React, { useState, useEffect } from "react";
import { wanderlust, giddy_up } from "../assets/images";
import ScrollReveal from "scrollreveal";
import ReCAPTCHA from "react-google-recaptcha";
import { useLocation } from "react-router-dom";
import Testimonial from "../components/TestimonialsSection";
import CustomAlert from "../components/CustomAlert";
import { div } from "framer-motion/client";
import Swal from "sweetalert2";

const Contact = () => {
  const [isVerified, setIsVerified] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [organization, setOrganization] = useState("");
  const [help, setHelp] = useState("I Want to Join the Yacht Club");
  const [message, setMessage] = useState("");
  const [alertopen, setAlertOpen] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [alertBody, setAlertBody] = useState("");
  const location = useLocation();
  const [emailConsent, setEmailConsent] = useState(false);
  const [smsConsent, setSmsConsent] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  useEffect(() => {
    // Restore scroll position
    const storedScrollPosition = sessionStorage.getItem(location.pathname);
    if (storedScrollPosition) {
      window.scrollTo(0, parseInt(storedScrollPosition, 10));
    } else {
      window.scrollTo(0, 0);
    }

    return () => {
      sessionStorage.setItem(location.pathname, window.scrollY);
    };
  }, [location]);

  useEffect(() => {
    const sr = ScrollReveal({
      opacity: 0,
      duration: 1000,
      distance: "0px",
      scale: 1,
      easing: "ease-in-out",
      reset: false,
    });

    sr.reveal(".fade-in", {
      interval: 200,
    });

    return () => sr.destroy();
  }, []);

  const handleCaptcha = () => {
    setIsVerified(true);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleAlertColse = () => {
    setAlertOpen(false);
  };

  const API_BASE = import.meta.env.DEV
    ? "http://localhost:8000"
    : "https://api.kokomoyachtclub.vip";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsButtonDisabled(true); 

    try {
      // Your existing validation checks
      if (!/^\d{10}$/.test(phone)) {
        setAlertTitle("Invalid Number!");
        setAlertBody("Please enter a 10-digit mobile number.");
        setAlertOpen(true);
        setIsButtonDisabled(false); // Re-enable button on validation error
        return;
      }

      if (!validateEmail(email)) {
        setAlertTitle("Invalid Email!");
        setAlertBody("Please enter a valid email.");
        setAlertOpen(true);
        setIsButtonDisabled(false); // Re-enable button on validation error
        return;
      }

      // Submit form
      const response = await fetch(`${API_BASE}/visitors/become-a-member`, {
        method: "POST",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          visitor_name: name,
          phone_no: phone,
          req_help: help,
          ques: message,
          email_consent: emailConsent,
          sms_consent: smsConsent,
          organization: organization,
        }),
      });

      if (!response.ok) {
        throw new Error("Error submitting form");
      }

      await Swal.fire({
        html: `
        <div class="swal-custom-container relative w-full max-w-lg mx-auto bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white rounded-2xl shadow-2xl overflow-hidden p-8 backdrop-blur-sm">
          <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 via-white to-blue-400"></div>
          <div class="absolute -top-20 -right-20 w-40 h-40 bg-blue-500 rounded-full opacity-10 blur-3xl"></div>
          <div class="absolute -bottom-20 -left-20 w-40 h-40 bg-white rounded-full opacity-5 blur-3xl"></div>

          <h2 class="text-3xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent mb-12 text-center">
  Thank You for Reaching Out!
</h2>
<p class="text-blue-100 text-2xl text-center mb-8">
  We appreciate your interest in the <strong>Kokomo Yacht Club</strong>.
</p>
<p class="text-blue-100 mb-6 text-lg text-center">
  Our team will be in touch with you shortly regarding your inquiry or membership application.
</p>


          <div class="text-center mt-6">
            <button id="swal-close-btn" class="bg-white text-slate-900 px-6 py-3 rounded-xl font-semibold hover:bg-blue-100 transition-all duration-300">
              Got it
            </button>
          </div>
        </div>
      `,
        background: "transparent",
        showConfirmButton: false,
        customClass: {
          popup: "p-0 bg-transparent shadow-none",
        },
        didOpen: () => {
          const btn = document.getElementById("swal-close-btn");
          if (btn) btn.addEventListener("click", () => Swal.close());
        },
      });

      // Clear form fields
      setName("");
      setPhone("");
      setEmail("");
      setHelp("I Want to Join the Yacht Club");
      setMessage("");
      setIsVerified(false);
      setEmailConsent(false);
      setSmsConsent(false);
      setOrganization("");
    } catch (error) {
      console.error(error);
      setAlertTitle("Submission Failed!");
      setAlertBody("Could not submit form. Please try again.");
      setAlertOpen(true);
    } finally {
      setIsButtonDisabled(false);
    }
  };

  return (
    <div>
      <div className="space-y-16">
        {/* Hero Section */}
        <div
          className="fade-in relative w-full bg-cover bg-center py-16"
          style={{
            backgroundImage: `url(${wanderlust})`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-midnightblue to-transparent"></div>
          <div className="z-10 px-6 md:px-20">
            <p className="text-3xl md:text-5xl text-white text-center md:text-left drop-shadow-md">
              Contact Us
            </p>
          </div>
        </div>

        {/* Contact Section */}
        <div className="flex flex-col md:flex-row space-y-6">
          {/* Image */}
          <div className="md:w-1/2 flex justify-center items-center">
            <img
              src={giddy_up}
              className="xl:w-[600px] w-[350px] rounded-lg"
              alt=""
            />
          </div>
          {/* Content */}
          <div className="md:w-1/2 flex flex-col px-6 space-y-4">
            <p className="text-2xl md:text-4xl text-midnightblue">Contact Us</p>
            <div className="flex justify-start">
              <div className="w-3 rounded-full mr-2 bg-blue-500"></div>
              <p>
                If you have questions or would like to apply for a yacht club
                membership, fill out this form and we'll reach out to you soon.
              </p>
            </div>

            {/* Form Section */}
            <div>
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name Field */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Name"
                  />
                </div>

                {/* Phone Field */}
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Phone"
                  />
                </div>

                {/* Email Field */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Email"
                  />
                </div>

                {/* Consent for receiving email notifications */}
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="emailConsent"
                    name="emailConsent"
                    checked={emailConsent}
                    onChange={(e) => setEmailConsent(e.target.checked)}
                    className="mt-1 mr-2"
                  />
                  <label
                    htmlFor="emailConsent"
                    className="text-sm text-gray-700"
                  >
                    Sign up for news and updates
                  </label>
                </div>

                {/* Industry/Organization Field (optional field) */}
                <div>
                  <label
                    htmlFor="organization"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Organization <span className="text-slate-600 ml-1">*(optional)</span>
                  </label>
                  <input
                    type="text"
                    id="organization"
                    name="organization"
                    value={organization}
                    onChange={(e) => setOrganization(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Organization"
                  />
                </div>

                {/* Dropdown - How Can We Help? */}
                <div className="space-y-2 relative">
                  <label
                    htmlFor="help"
                    className="block text-sm font-medium text-gray-700"
                  >
                    How Can We Help?
                  </label>
                  <select
                    id="help"
                    name="help"
                    required
                    value={help}
                    onChange={(e) => setHelp(e.target.value)}
                    className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-midnightblue/80 w-full"
                  >
                    <option value="I Want to Join the Yacht Club">
                      I Want to Join the Yacht Club
                    </option>
                    <option value="I Have a Question">I Have a Question</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* Message Field */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Anything to Add?
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows="4"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Message"
                    style={{ resize: "none" }}
                  ></textarea>
                </div>

                {/* Consent for receiving text messages */}
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="smsConsent"
                    name="smsConsent"
                    checked={smsConsent}
                    onChange={(e) => setSmsConsent(e.target.checked)}
                    className="mt-1 mr-2"
                  />
                  <label htmlFor="smsConsent" className="text-sm text-gray-700">
                    <p className="text-md">Yes, please text me!</p>
                    <p className="text-sm">
                      By signing up for text messages you agree to receive
                      messages from Kokomo Yacht Club at the number provided,
                      including automated reminders and marketing messages.
                      Message frequency varies. Msg & data rates may apply.
                      Reply STOP to unsubscribe. View our Privacy Policy.
                    </p>
                  </label>
                </div>

                {/* reCAPTCHA */}
                {/* <ReCAPTCHA
                  sitekey="YOUR_SITE_KEY"
                // onChange={handleCaptcha}
                /> */}

                {/* Submit Button */}
                <div className="mt-6">
                  <button
                    type="submit"
                    disabled={isButtonDisabled}
                    className={`w-full bg-blue-600 text-white rounded-full py-2 font-semibold hover:bg-blue-700 ${
                      isButtonDisabled ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    {isButtonDisabled ? "Please wait..." : "Send"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <Testimonial />
      </div>

      {/* Custom Alert Section */}
      <CustomAlert
        onClose={handleAlertColse}
        isVisible={alertopen}
        title={alertTitle}
        body={alertBody}
      />
    </div>
  );
};

export default Contact;

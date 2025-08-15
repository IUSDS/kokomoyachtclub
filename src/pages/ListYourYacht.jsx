import React, { useState } from "react";
import { list_yacht } from "../assets/images";
import { RiCloseLine } from "react-icons/ri";
import Swal from "sweetalert2";
import { srqLogo } from "../assets/logos";

const ListYourYacht = () => {
  const [formOpen, setFormOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  // Form state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    countryCode: "+1",
    phone: "",
    model: "",
    year: "",
    size: "",
    message: "",
  });

  // Handle form input changes
  const handleInputChange = (e) => {
    const { id, value } = e.target;

    // Map form field IDs to the formData state object keys
    const fieldMap = {
      first_name: "firstName",
      last_name: "lastName",
      email: "email",
      phone: "phone",
      model: "model",
      year: "year",
      size: "size",
      message: "message",
    };

    setFormData({
      ...formData,
      [fieldMap[id] || id]: value,
    });
  };

  // Handle country code selection
  const handleCountryCodeChange = (e) => {
    setFormData({
      ...formData,
      countryCode: e.target.value,
    });
  };

  // Toggle form modal
  const handleForm = () => {
    setFormOpen(!formOpen);
  };

  // Close form modal when clicking outside
  const closeForm = (e) => {
    if (e.target.id === "formOverlay") {
      setFormOpen(false);
    }
  };

  // Reset form after submission
  const resetForm = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      countryCode: "+1",
      phone: "",
      model: "",
      year: "",
      size: "",
      message: "",
    });
  };

  // Submit form to backend
  const submitForm = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    const API_BASE = import.meta.env.DEV
      ? "http://localhost:8000"
      : "https://api.kokomoyachtclub.vip";

    try {
      const submissionData = {
        visitor_first_name: formData.firstName,
        visitor_last_name: formData.lastName,
        visitor_email: formData.email,
        visitor_phone_number: `${formData.countryCode}${formData.phone}`,
        yacht_model: formData.model,
        yacht_manufacture_year: parseInt(formData.year),
        yacht_size: parseInt(formData.size),
        visitor_message: formData.message || "",
      };

      const response = await fetch(`${API_BASE}/visitors/add-yacht-visitor`, {
        method: "POST",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submissionData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(
          errorData?.detail || `Submission failed: ${response.status}`
        );
      }

      // ✅ Backend submission done
      const data = await response.json();
      console.log("Submission successful:", data);
      setSubmitSuccess(true);
      resetForm(); // clear form values
      setIsSubmitting(false); // re-enable submit button

      // ✅ Close modal only if it's open (i.e., popup form)
      if (formOpen) {
        setFormOpen(false);
        setSubmitSuccess(false);
      }

      // ✅ Show success Swal
      await Swal.fire({
        html: `
    <div id="swal-custom-card" class="relative w-full max-w-lg mx-auto bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white rounded-2xl shadow-2xl overflow-hidden p-8 backdrop-blur-sm">

      <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 via-white to-blue-400"></div>
      <div class="absolute -top-20 -right-20 w-40 h-40 bg-blue-500 rounded-full opacity-10 blur-3xl"></div>
      <div class="absolute -bottom-20 -left-20 w-40 h-40 bg-white rounded-full opacity-5 blur-3xl"></div>

      <h2 class="text-3xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent mb-12 text-center">
        Details Submitted!
      </h2>
      <p class="text-blue-100 text-2xl text-center mb-8">
        Thank you for your interest in <br/> <strong>Kokomo Yacht Club</strong>.
      </p>
      <p class="text-blue-100 mb-6 text-lg text-center">
        Your brochure has been opened in a new tab.
      </p>

      <div class="text-center mt-6">
        <button id="swal-close-button" class="bg-white text-slate-900 px-6 py-3 rounded-xl font-semibold hover:bg-blue-100 transition-all duration-300">
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
          const btn = document.getElementById("swal-close-button");
          if (btn) btn.addEventListener("click", () => Swal.close());
        },
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitError(error.message || "Failed to submit. Please try again.");
      setIsSubmitting(false);
    }
  };

  // Validate form before submission
  const validateForm = () => {
    // Phone validation - must be 10 digits
    const phoneValid = /^\d{10}$/.test(formData.phone);

    // Simple email validation
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);

    return (
      formData.firstName.trim() !== "" &&
      formData.lastName.trim() !== "" &&
      emailValid &&
      phoneValid &&
      formData.model.trim() !== "" &&
      formData.year.trim() !== "" &&
      formData.size.trim() !== ""
    );
  };

  // Render form fields for both popup and main form
  const renderFormFields = (formType) => {
    const bgClass = formType === "popup" ? "" : "bg-blue-100";

    return (
      <>
        <div className="grid grid-cols-2 gap-1">
          <div className="mb-4">
            <label htmlFor="first_name" className="block text-sm font-medium">
              First Name*
            </label>
            <input
              type="text"
              id="first_name"
              value={formData.firstName}
              onChange={handleInputChange}
              className={`mt-1 p-2 w-full rounded-md text-black ${bgClass}`}
              placeholder="Enter your first name"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="last_name" className="block text-sm font-medium">
              Last Name*
            </label>
            <input
              type="text"
              id="last_name"
              value={formData.lastName}
              onChange={handleInputChange}
              className={`mt-1 p-2 w-full rounded-md text-black ${bgClass}`}
              placeholder="Enter your last name"
              required
            />
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium">
            Email*
          </label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={handleInputChange}
            className={`mt-1 p-2 w-full rounded-md text-black ${bgClass}`}
            placeholder="Enter your email"
            required
          />
          {formData.email &&
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) && (
              <p className="mt-1 text-sm text-red-500">
                Please enter a valid email address*
              </p>
            )}
        </div>

        <div className="mb-4">
          <label htmlFor="phone" className="block text-sm font-medium">
            Phone*
          </label>
          <div className="flex gap-2">
            <select
              className={`p-2 rounded-md text-black ${bgClass}`}
              value={formData.countryCode}
              onChange={handleCountryCodeChange}
            >
              <option value="+1">+1 (USA)</option>
              {/* <option value="+44">+44 (UK)</option>
              <option value="+33">+33 (France)</option>
              <option value="+39">+39 (Italy)</option>
              <option value="+34">+34 (Spain)</option>
              <option value="+49">+49 (Germany)</option> */}
              {/* Add more countries as needed */}
            </select>
            <input
              type="number"
              id="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className={`p-2 w-full rounded-md text-black ${bgClass}`}
              placeholder="Enter your number"
              required
            />
          </div>
          {formData.phone && !/^\d{10}$/.test(formData.phone) && (
            <p className="mt-1 text-sm text-red-500">
              Please enter a 10-digit phone number*
            </p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="model" className="block text-sm font-medium">
            Model*
          </label>
          <input
            type="text"
            id="model"
            value={formData.model}
            onChange={handleInputChange}
            className={`mt-1 p-2 w-full rounded-md text-black ${bgClass}`}
            placeholder="Enter your yacht model"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="year" className="block text-sm font-medium">
            Year*
          </label>
          <input
            type="number"
            id="year"
            value={formData.year}
            onChange={handleInputChange}
            className={`mt-1 p-2 w-full rounded-md text-black ${bgClass}`}
            placeholder="Enter year of manufacture"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="size" className="block text-sm font-medium">
            Size*
          </label>
          <input
            type="number"
            id="size"
            value={formData.size}
            onChange={handleInputChange}
            className={`mt-1 p-2 w-full rounded-md text-black ${bgClass}`}
            placeholder="Enter your yacht's size"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="message" className="block text-sm font-medium">
            Message
          </label>
          <input
            type="text"
            id="message"
            value={formData.message}
            onChange={handleInputChange}
            className={`mt-1 p-2 w-full rounded-md text-black ${bgClass}`}
            placeholder=""
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting || !validateForm()}
          className={`${formType === "popup" ? "w-full" : "w-1/3 mx-auto"} 
    py-2 rounded-md font-bold transition-all duration-300
    ${
      isSubmitting || !validateForm()
        ? "bg-gray-400 text-gray-700 cursor-not-allowed"
        : "bg-white text-midnightblue hover:bg-gray-200"
    }`}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </>
    );
  };

  return (
    <div className="w-full">
      {/* Hero Section */}
      {/* Hero Section */}
      <div className="relative h-[600px] md:h-[800px] overflow-hidden">
        {/* BG image fills the container */}
        <img
          className="absolute inset-0 w-full h-full object-cover"
          src={list_yacht}
          alt="Hero"
          loading="lazy"
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/60" />

        {/* Centered content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-8 px-8 md:px-20 text-center">
          <img
            src={srqLogo}
            alt="SRQ Logo"
            className="h-32 md:h-34 lg:h-40 w-auto object-contain"
          />

          <h1 className="text-white font-bold text-3xl md:text-5xl leading-tight">
            SRQ Yacht Management
          </h1>

          <p className="text-white text-base md:text-xl max-w-3xl">
            Own a Yacht? Let it work for you when you’re not using it! SRQ Yacht
            Management is now accepting select yachts to join our exclusive
            fleet, giving yacht owners the opportunity to earn income
            hassle-free while we handle the bookings, guests, and operations.
          </p>

          <button
            className="text-white bg-midnightblue px-10 py-4 rounded-md shadow-lg hover:shadow-2xl font-bold hover:bg-white hover:text-midnightblue transition-all duration-300"
            onClick={handleForm}
          >
            Join Us
          </button>
        </div>
      </div>

      {/* Hero Section Form */}
      {formOpen && (
        <div
          id="formOverlay"
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={closeForm}
        >
          <div
            className="relative bg-midnightblue text-white p-6 rounded-lg w-full max-w-lg shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-2 text-white bg-red-500 p-1 rounded-full"
              onClick={() => setFormOpen(false)}
            >
              <RiCloseLine />
            </button>
            <h2 className="text-2xl font-bold mb-4">Partner With Us</h2>
            <form onSubmit={submitForm}>{renderFormFields("popup")}</form>
          </div>
        </div>
      )}

      {/* Procedure Section */}
      <div className="bg-midnightblue text-white grid grid-cols-1 md:grid-cols-2 items-center gap-4 py-10 md:py-20">
        <div>
          <p className="text-3xl md:text-5xl xl:text-6xl text-center">
            How It Works?
          </p>
        </div>
        <div>
          <ol className="list-decimal list-inside space-y-2 md:text-lg px-10">
            <li>
              <span className="font-bold">Submit Your Boat</span> – Fill out the
              form below with your boat details.
            </li>
            <li>
              <span className="font-bold">We Review & Approve</span> – Our team
              ensures it meets our standards.
            </li>
            <li>
              <span className="font-bold">Start Earning</span> – We promote your
              boat, book charters, and manage the rest!
            </li>
          </ol>
        </div>
      </div>

      {/* Main Form Section */}
      <div className="flex flex-col items-center justify-center text-white gap-8 py-10">
        <h1 className="text-midnightblue text-3xl md:text-5xl xl:text-6xl font-semibold">
          Ready to Get Started?
        </h1>
        <div className="flex flex-col bg-midnightblue mx-4 xl:w-1/2 p-8 rounded-md">
          <h2 className="text-2xl font-bold mb-4">Partner With Us</h2>
          <form onSubmit={submitForm}>{renderFormFields("main")}</form>
        </div>
      </div>

      {/* Call Section */}
      <div className="flex flex-col items-center gap-8 py-10 bg-midnightblue">
        <h1 className="text-white text-3xl md:text-5xl xl:text-6xl font-semibold">
          Have Questions?
        </h1>
        <button className="px-4 py-2 rounded-lg bg-white border-2 border-white text-midnightblue font-semibold hover:bg-midnightblue hover:text-white transition-all duration-300">
          Call Us Anytime
        </button>
      </div>
    </div>
  );
};

export default ListYourYacht;

import React, { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { home5 } from '../assets/images';

const ContactForm = () => {
  const [isVerified, setIsVerified] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleCaptcha = (value) => {
    console.log("Captcha value:", value);
    setIsVerified(true);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if (!isVerified) {
    //   alert("Please verify that you are not a robot!");
    //   return;
    // }

    if (phone.length != 10) {
      alert(`Please enter 10 digits mobile number!`);
    } else if (!(validateEmail(email))) {
      alert(`Please enter a valid email!`);
    } else {
      try {
        const response = await fetch('http://3.27.181.229/vistors/add-visitor', {
          method: 'POST',
          headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email,
            visitor_name: `${firstName} ${lastName}`,
            phone_no: phone,
            ques: message,
          }),
        });

        if (!response.ok) {
          throw new Error('Error submitting form');
        }

        console.log('Form submitted successfully!');
        setFirstName('');
        setLastName('');
        setPhone('');
        setEmail('');
        setMessage('');
        setIsVerified(false);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="flex flex-col xl:flex-row">
      <div className="fade-in relative xl:h-screen inset-0 bg-cover bg-center xl:w-1/2">
        <img src={home5} alt="Contact Us" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-midnightblue bg-opacity-30"></div>
      </div>
      <div className="fade-in xl:w-1/2 flex flex-col items-start py-10 px-8 gap-4 bg-midnightblue text-white">
        <p className="text-3xl md:text-4xl">Contact Us</p>
        <hr className="border-t-2 z-10 border-white" />
        {/* Form */}
        <form onSubmit={handleSubmit} className="w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 w-full">
            <div className="flex flex-col py-2">
              <label htmlFor="first_name">First Name</label>
              <input
                type="text"
                name="first_name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="rounded-md h-10 px-4 text-black focus:outline-none"
                placeholder="First Name"
                required
              />
            </div>
            <div className="flex flex-col py-2">
              <label htmlFor="last_name">Last Name</label>
              <input
                type="text"
                name="last_name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="rounded-md h-10 px-4 text-black focus:outline-none"
                placeholder="Last Name"
                required
              />
            </div>
            <div className="flex flex-col py-2">
              <label htmlFor="phone">Phone</label>
              <input
                type="number"
                name="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="rounded-md h-10 px-4 text-black focus:outline-none"
                placeholder="Phone"
                required
              />
            </div>
            <div className="flex flex-col py-2">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="rounded-md h-10 px-4 text-black focus:outline-none"
                placeholder="Email"
                required
              />
            </div>
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="message">Message</label>
            <textarea
              name="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="rounded-md h-20 px-4 py-2 text-black focus:outline-none"
              placeholder="Message"
              required
            ></textarea>
          </div>
          <div className="mt-4">
            <ReCAPTCHA
              sitekey="YOUR_SITE_KEY"
              onChange={handleCaptcha}
            />
          </div>
          <button
            type="submit"
            className="mt-4 px-2 py-2 w-full rounded-full bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;

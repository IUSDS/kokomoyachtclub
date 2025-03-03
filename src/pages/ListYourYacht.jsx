import React, { useState } from "react";
import { list_yacht } from "../assets/images";
import { RiCloseLine } from "react-icons/ri";

const ListYourYacht = () => {
  const [formOpen, setFormOpen] = useState(false);
  const [phone, setPhone] = useState();

  const handleForm = () => {
    setFormOpen(!formOpen);
  };

  const closeForm = (e) => {
    if (e.target.id === "formOverlay") {
      setFormOpen(false);
    }
  };

  return (
    <div className="w-full">
      {/* Hero Section */}
      <div className="relative">
        <img
          className="w-full h-[500px] object-cover"
          src={list_yacht}
          alt="Hero"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <div className="absolute top-[10%] xl:top-[30%] flex flex-col items-center gap-6 px-8 md:px-20 w-full">
          <p className="text-white font-bold text-center text-3xl md:text-5xl w-full">
            List Your Yacht With Kokomo Yacht Club
          </p>
          <p className="text-white text-center text-base md:text-xl w-full max-w-3xl">
            Are you a yacht owner looking to turn your prized possession into a
            source of passive income? Kokomo Yacht Club invites you to join our
            exclusive network of partners and put your yacht to work when you're
            not using it.
          </p>
          <button
            className="text-white bg-midnightblue px-6 py-3 rounded-md shadow-lg hover:shadow-2xl hover:bg-white hover:text-midnightblue transition-all duration-300"
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
            <div className="grid grid-cols-2 gap-1">
              <div className="mb-4">
                <label
                  htmlFor="first_name"
                  className="block text-sm font-medium"
                >
                  First Name*
                </label>
                <input
                  type="text"
                  id="first_name"
                  className="mt-1 p-2 w-full rounded-md text-black"
                  placeholder="Enter your first name"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="last_name"
                  className="block text-sm font-medium"
                >
                  Last Name*
                </label>
                <input
                  type="text"
                  id="last_name"
                  className="mt-1 p-2 w-full rounded-md text-black"
                  placeholder="Enter your last name"
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
                className="mt-1 p-2 w-full rounded-md text-black"
                placeholder="Enter your email"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="phone" className="block text-sm font-medium">
                Phone*
              </label>
              <div className="flex gap-2">
                <select className="p-2 rounded-md text-black">
                  <option value="+1">+1 (USA)</option>
                  {/* Add more countries as needed */}
                </select>
                <input
                  type="number"
                  id="phone"
                  className="p-2 w-full rounded-md text-black"
                  placeholder="Enter your number"
                />
              </div>
            </div>
            <div className="mb-4">
              <label htmlFor="model" className="block text-sm font-medium">
                Model*
              </label>
              <input
                type="text"
                id="model"
                className="mt-1 p-2 w-full rounded-md text-black"
                placeholder="Enter your yacht model"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="year" className="block text-sm font-medium">
                Year*
              </label>
              <input
                type="number"
                id="year"
                className="mt-1 p-2 w-full rounded-md text-black"
                placeholder="Enter year of manufacture"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="size" className="block text-sm font-medium">
                Size*
              </label>
              <input
                type="number"
                id="size"
                className="mt-1 p-2 w-full rounded-md text-black"
                placeholder="Enter your yacht's size"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="message" className="block text-sm font-medium">
                Message
              </label>
              <input
                type="text"
                id="message"
                className="mt-1 p-2 w-full rounded-md text-black"
                placeholder=""
              />
            </div>
            <button
              type="submit"
              className="w-full bg-white text-midnightblue py-2 rounded-md font-bold hover:bg-gray-200 transition-all duration-300"
            >
              Submit
            </button>
          </div>
        </div>
      )}

      {/* Procedure Section */}
      <div className="bg-midnightblue text-white grid grid-cols-1 md:grid-cols-2 items-center gap-4 py-10 md:py-20">
        <div>
          <p className="text-3xl md:text-5xl xl:text-6xl text-center">How It Works?</p>
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
        <h1 className="text-midnightblue text-3xl md:text-5xl xl:text-6xl font-semibold">Ready to Get Started?</h1>
        <div className="flex flex-col bg-midnightblue mx-4 xl:w-1/2 p-8 rounded-md">
          <h2 className="text-2xl font-bold mb-4">Partner With Us</h2>
          <div className="grid grid-cols-2 gap-1">
            <div className="mb-4">
              <label htmlFor="first_name" className="block text-sm font-medium">
                First Name*
              </label>
              <input
                type="text"
                id="first_name"
                className="mt-1 p-2 w-full rounded-md text-black bg-blue-100"
                placeholder="Enter your first name"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="last_name" className="block text-sm font-medium">
                Last Name*
              </label>
              <input
                type="text"
                id="last_name"
                className="mt-1 p-2 w-full rounded-md text-black bg-blue-100"
                placeholder="Enter your last name"
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
              className="mt-1 p-2 w-full rounded-md text-black bg-blue-100"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="phone" className="block text-sm font-medium">
              Phone*
            </label>
            <div className="flex gap-2">
              <select className="p-2 rounded-md text-black bg-blue-100">
                <option value="+1">+1 (USA)</option>
                {/* Add more countries as needed */}
              </select>
              <input
                type="number"
                id="phone"
                className="p-2 w-full rounded-md text-black bg-blue-100"
                placeholder="Enter your number"
              />
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="model" className="block text-sm font-medium">
              Model*
            </label>
            <input
              type="text"
              id="model"
              className="mt-1 p-2 w-full rounded-md text-black bg-blue-100"
              placeholder="Enter your yacht model"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="year" className="block text-sm font-medium">
              Year*
            </label>
            <input
              type="number"
              id="year"
              className="mt-1 p-2 w-full rounded-md text-black bg-blue-100"
              placeholder="Enter year of manufacture"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="size" className="block text-sm font-medium">
              Size*
            </label>
            <input
              type="number"
              id="size"
              className="mt-1 p-2 w-full rounded-md text-black bg-blue-100"
              placeholder="Enter your yacht's size"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="message" className="block text-sm font-medium">
              Message
            </label>
            <input
              type="text"
              id="message"
              className="mt-1 p-2 w-full rounded-md text-black bg-blue-100"
              placeholder=""
            />
          </div>
          <button
            type="submit"
            className="w-1/3 mx-auto bg-white text-midnightblue py-2 rounded-md font-bold hover:bg-gray-200 transition-all duration-300"
          >
            Submit
          </button>
        </div>
      </div>

      {/* Call Section */}
      <div className="flex flex-col items-center gap-8 py-10 bg-midnightblue">
        <h1 className="text-white text-3xl md:text-5xl xl:text-6xl font-semibold">Have Questions?</h1>
        <button className="px-4 py-2 rounded-lg bg-white border-2 border-white text-midnightblue font-semibold hover:bg-midnightblue hover:text-white transition-all duration-300">Call Us Anytime</button>
      </div>
    </div>
  );
};

export default ListYourYacht;

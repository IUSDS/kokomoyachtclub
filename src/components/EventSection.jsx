import React from 'react';
import { saks, kyc, ritz, oceanprime } from '../assets/logos';

const details = [
  { label: 'Date', value: 'August 14, 2025' },
  { label: 'Time', value: '4:00 PM – 8:00 PM' },
  {
    label: 'Location',
    value: 'The Ritz-Carlton Residences, 475 Quay Commons, Sarasota, FL',
  },
];

const logos = [
  { src: ritz, alt: "Ritz Residences Logo" },
  { src: kyc, alt: "KYC Logo" },
  { src: oceanprime, alt: "Ocean Prime Logo" },
  { src: saks, alt: "Saks Logo" }
];

const DetailItem = ({ label, value }) => (
  <div className="text-left">
    <p className="text-xs sm:text-sm uppercase text-white mb-1 font-extrabold">{label}</p>
    {Array.isArray(value) ? (
      value.map((line, i) => (
        <p key={i} className="text-sm sm:text-base">{line}</p>
      ))
    ) : (
      <p className="text-xl sm:text-2xl text-white">{value}</p>
    )}
  </div>
);

export default function EventSection({showForm}) {
  return (
    <section className="px-6 md:px-10 space-y-4 flex flex-col items-center">
      <div className="max-w-5xl mx-auto text-center">
        <p className="text-xs sm:text-sm uppercase text-gray-600 mb-4">Exclusive Invitation</p>
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light mb-6 font-great">
          Anchors Away & <span className="font-normal">Luxury All Day</span>
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-gray-700 mx-auto max-w-3xl leading-relaxed">
          Experience an exclusive afternoon where nautical elegance meets curated luxury. Set against the backdrop of Sarasota Bay, this invitation-only event brings together the refined lifestyle of The Ritz-Carlton Residences with the fashion-forward sophistication of the 5th Avenue Club.
        </p>
        <p className="text-base sm:text-lg md:text-xl text-gray-700 mx-auto max-w-3xl leading-relaxed mt-4">
          Enjoy private, harborside yacht tours by Kokomo Yacht Club and a taste of Ocean Prime's signature hospitality.
        </p>
      {/* CTA */}
      <button
        onClick={showForm}
        className="mt-12 text-white font-semibold w-fit md:w-[250px] text-lg md:text-2xl bg-midnightblue px-6 py-4 rounded-full shadow-lg hover:scale-105 transition-all duration-300"
      >
        RSVP NOW
      </button>
      </div>

      <div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-1 lg:gap-6">
          {logos.map((logo, index) => (
            <div key={index} className="flex items-center justify-center">
              <img
                src={logo.src}
                alt={logo.alt}
                className="max-w-full max-h-[200px] md:max-h-full object-contain"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="mx-10 bg-midnightblue shadow-xl p-6 sm:p-8 md:p-10 lg:p-12 border rounded-lg">
        <div className='flex flex-col w-fit items-start justify-center'>
          <h2 className="text-2xl sm:text-3xl md:text-4xl text-left mb-6 font-bold text-white">
            Event Details
          </h2>
          <div className='bg-white h-[1px] w-[60%]'></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mt-6">
          {details.map((d, i) => (
            <DetailItem key={i} {...d} />
          ))}
        </div>
      </div>
    </section>
  );
}

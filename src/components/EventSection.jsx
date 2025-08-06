import React from 'react';
import { brandlogo } from '../assets/images';

const details = [
  { label: 'Date', value: 'August 14, 2025' },
  { label: 'Time', value: '4:00 PM – 8:00 PM' },
  {
    label: 'Location',
    value: 'The Ritz-Carlton Residences, 475 Quay Commons, Sarasota, FL',
  },
];

const DetailItem = ({ label, value }) => (
  <div className="text-center">
    <p className="text-xs sm:text-sm uppercase text-white mb-1">{label}</p>
    {Array.isArray(value) ? (
      value.map((line, i) => (
        <p key={i} className="text-sm sm:text-base">{line}</p>
      ))
    ) : (
      <p className="text-xl sm:text-2xl font-light text-white">{value}</p>
    )}
  </div>
);

export default function EventSection() {
  return (
    <section className="px-4 sm:px-6 md:px-8 lg:px-16">
      <div className="max-w-5xl mx-auto text-center">
        <p className="text-xs sm:text-sm uppercase text-gray-600 mb-4">Exclusive Invitation</p>
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light mb-6 font-great">
          Anchors Away & <span className="font-normal">Luxury All Day</span>
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-gray-700 mx-auto max-w-3xl leading-relaxed">
          Experience an exclusive afternoon where nautical elegance meets curated luxury. Set against the backdrop of Sarasota Bay, this invitation-only event brings together the refined lifestyle of The Ritz-Carlton Residences with the fashion-forward sophistication of the 5th Avenue Club.
        </p>
      </div>

      <div className="flex justify-center">
        <img
          src={brandlogo}
          alt="Event Branding"
          className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-xl"
        />
      </div>

      <div className="bg-midnightblue p-6 sm:p-8 md:p-10 lg:p-12 border rounded-lg">
        <h2 className="text-2xl sm:text-3xl md:text-4xl text-center mb-6 font-light text-white">
          Event Details
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {details.map((d, i) => (
            <DetailItem key={i} {...d} />
          ))}
        </div>
      </div>
    </section>
  );
}

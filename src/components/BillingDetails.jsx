import React from 'react'

const BillingDetails = ({ contractStart, nextBilling, duration }) => {
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-gray-600 font-medium">Contract Start Date:</span>
          <span className="text-midnightblue font-semibold">{contractStart}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600 font-medium">Next Billing Date:</span>
          <span className="text-midnightblue font-semibold">{nextBilling}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600 font-medium">Duration of Contract:</span>
          <span className="text-midnightblue font-semibold">{duration}</span>
        </div>
      </div>
    );
  };
  
  export default BillingDetails;
  
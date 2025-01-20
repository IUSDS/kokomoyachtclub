import React, { useState } from 'react';
import { Plus } from 'lucide-react';

const BookingTable = () => {
  const addRow = () => {
    const newRow = {
      id: rows.length + 1,
      particulars: '',
      amount: 0
    };
    setRows([...rows, newRow]);
  };

  const handleInputChange = (id, field, value) => {
    setRows(rows.map(row => 
      row.id === id ? { ...row, [field]: value } : row
    ));
  };

  return (
      <div className="rounded-lg shadow-sm w-full">
        <table className="w-full ">
          <thead>
            <tr className="border-b">
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                Time Slot
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                Particulars
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                Booking Id
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                Amenities
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                Points Deducted
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                Outstanding Balance
              </th>
            </tr>
          </thead>
          <tbody>

          </tbody>
        </table>
      </div>
  );
};

export default BookingTable;
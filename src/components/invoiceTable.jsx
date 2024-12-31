import React, { useState } from 'react';
import { Plus } from 'lucide-react';

const InvoiceTable = () => {
  const [rows, setRows] = useState([
    { id: 1, particulars: '', amount: 0 }
  ]);

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

  const calculateTotal = () => {
    return rows.reduce((sum, row) => sum + Number(row.amount), 0);
  };

  return (
    <div className="flex flex-col md:flex-row items-center md:items-end mx-auto md:mx-0">
      {/* Table */}
      <div className="md:w-4/5 bg-white rounded-lg shadow-sm">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                Serial No.
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                Particulars
              </th>
              <th className="px-6 py-3 text-right text-sm font-medium text-gray-500">
                Amount
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={row.id} className="border-b text-gray-500">
                <td className="px-6 py-4 text-sm">
                  {row.id}
                </td>
                <td className="px-6 py-4">
                  <input
                    type="text"
                    value={row.particulars}
                    onChange={(e) => handleInputChange(row.id, 'particulars', e.target.value)}
                    className="w-full bg-transparent focus:outline-none"
                    placeholder="Enter particulars"
                  />
                </td>
                <td className="px-6 py-4 flex items-center">
                  <input
                    type="number"
                    value={`${row.amount}`}
                    onChange={(e) => handleInputChange(row.id, 'amount', e.target.value)}
                    className="w-full bg-transpredarent focus:outline-none text-right"
                    placeholder="0"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        <div className="flex justify-center py-4 border-b">
          <button 
            onClick={addRow}
            className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-midnightblue/90 text-white hover:bg-midnightblue"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </div>
      
      {/* Total amount & Buttons */}
      <div className="mt-4 space-y-2 flex flex-col w-full md:w-1/5 md:px-4">
        <div className='flex justify-between text-gray-500'>
          <span className='font-semibold'>Total:</span>
          <span className='font-semibold'>${calculateTotal()}</span>
        </div>
        <button 
          className="py-2 px-4 w-full bg-midnightblue/90 text-white rounded-lg hover:bg-midnightblue"
          onClick={() => console.log('Submit clicked')}
        >
          Submit
        </button>
        <button 
          className="py-2 px-4 w-full bg-midnightblue/90 text-white rounded-lg hover:bg-midnightblue"
          onClick={() => console.log('Print clicked')}
        >
          Print
        </button>
      </div>
    </div>
  );
};

export default InvoiceTable;
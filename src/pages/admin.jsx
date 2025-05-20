import React, { useState } from 'react';
import AddPoints from '../components/addPointsForm';
import UpdateMembership from '../components/updateMembershipForm';
import UpdateUserDetails from '../components/updateUserDetailsForm';
import AddRemoveMembers from '../components/addremoveMembersForm';
import CreateInvoice from '../components/createInvoiceForm';
import PreviousBookings from '../components/PreviousBookings';
import ExportData from '../components/ExportData';

const Admin = () => {
  const [activeComponent, setActiveComponent] = useState(null);

  // Mapping buttons to components
  const componentsMap = {
    addPoints: <AddPoints />,
    updateMembership: <UpdateMembership />,
    updateUserDetails: <UpdateUserDetails />,
    addRemoveMembers: <AddRemoveMembers />,
    createInvoice: <CreateInvoice />,
    previousBookings: <PreviousBookings />,
    exportData: <ExportData />
  };

  // Buttons
  const actions = [
    { label: 'Adjust Points', type: 'addPoints' },
    // { label: 'Update Membership', type: 'updateMembership' },
    { label: 'Update User Details', type: 'updateUserDetails' },
    { label: 'Add/Remove Members', type: 'addRemoveMembers' },
    // { label: 'Create Invoice', type: 'createInvoice' },
    { label: 'Bookings', type: 'previousBookings' },
    { label: 'Export Data', type: 'exportData' },
  ];

  // Handle button click to switch active component
  const handleOnClick = (action) => {
    try {
      setSelectUser(true);
      setActiveComponent(action.type);
    } catch (e) {
      console.error("Error handling click:", e);
    }
  };

  return (
    <div className="flex flex-col space-y-4 text-midnightblue px-16">
      <h1 className="text-center md:text-left font-bold mt-8 text-2xl md:text-4xl">
        Admin Dashboard
      </h1>

      <hr className="border-t-2 border-midnightblue" />

      {/* Dashboard buttons */}
      <div className="md:h-16 flex gap-2 flex-col md:flex-row">
        {actions.map((action) => (
          <button
            key={action.type}
            className={`py-2 px-4 border rounded-lg transition-colors duration-200
              ${activeComponent === action.type 
                ? 'bg-midnightblue text-white border-midnightblue'
                : 'bg-midnightblue/10 hover:bg-midnightblue/20 border-midnightblue'
              }`}
            onClick={() => setActiveComponent(action.type)}
          >
            {action.label}
          </button>
        ))}
      </div>

      <hr className='border-t-2 border-midnightblue' />

      {/* Render the active component */}
      <div className=''>
        {activeComponent && componentsMap[activeComponent]}
      </div>
    </div>
  );
};

export default Admin;

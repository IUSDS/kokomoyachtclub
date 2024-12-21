import React, { useState } from 'react';
import AddPoints from '../components/addPointsForm';
import UpdateMembership from '../components/updateMembershipForm';
import UpdateUserDetails from '../components/updateUserDetailsForm';
import AddRemoveMembers from '../components/addremoveMembersForm';
import CreateInvoice from '../components/createInvoiceForm';

const Admin = () => {
  const [activeComponent, setActiveComponent] = useState(null);

  // Mapping buttons to components
  const componentsMap = {
    addPoints: <AddPoints />,
    updateMembership: <UpdateMembership />,
    updateUserDetails: <UpdateUserDetails />,
    addRemoveMembers: <AddRemoveMembers />,
    createInvoice: <CreateInvoice />,
  };

  return (
    <div className="flex flex-col space-y-4 text-midnightblue px-16">
      <h1 className="text-center md:text-left font-bold mt-8 text-2xl md:text-4xl">
        Admin Dashboard
      </h1>

      <hr className="border-t-2 border-midnightblue" />

      {/* Dashboard buttons */}
      <div className="md:h-16 flex gap-2 flex-col md:flex-row">
        <button
          className="py-2 px-4 border bg-midnightblue/10 hover:bg-midnightblue/20 rounded-lg border-midnightblue"
          onClick={() => setActiveComponent('addPoints')}
        >
          Add Points
        </button>
        <button
          className="py-2 px-4 border bg-midnightblue/10 hover:bg-midnightblue/20 rounded-lg border-midnightblue"
          onClick={() => setActiveComponent('updateMembership')}
        >
          Update Membership
        </button>
        <button
          className="py-2 px-4 border bg-midnightblue/10 hover:bg-midnightblue/20 rounded-lg border-midnightblue"
          onClick={() => setActiveComponent('updateUserDetails')}
        >
          Update User Details
        </button>
        <button
          className="py-2 px-4 border bg-midnightblue/10 hover:bg-midnightblue/20 rounded-lg border-midnightblue"
          onClick={() => setActiveComponent('addRemoveMembers')}
        >
          Add/Remove Members
        </button>
        <button
          className="py-2 px-4 border bg-midnightblue/10 hover:bg-midnightblue/20 rounded-lg border-midnightblue"
          onClick={() => setActiveComponent('createInvoice')}
        >
          Create Invoice
        </button>
      </div>

      {/* Render the active component */}
      <div className="mt-8">{componentsMap[activeComponent] || <p className='text-center md:text-left'>Select an action to get started</p>}</div>
    </div>
  );
};

export default Admin;

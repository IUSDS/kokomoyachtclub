import React, { useState } from 'react';
import AddPoints from '../components/addPointsForm';
import UpdateMembership from '../components/updateMembershipForm';
import UpdateUserDetails from '../components/updateUserDetailsForm';
import AddRemoveMembers from '../components/addremoveMembersForm';
import CreateInvoice from '../components/createInvoiceForm';
import EditInfoCard from '../components/editInfoCard';

const Admin = () => {
  const [activeComponent, setActiveComponent] = useState(null);
  const [selectUser, setSelectUser] = useState(false);
  const [userData, setUserData] = useState(true); // set this to null when api is ready

  // Mapping buttons to components
  const componentsMap = {
    addPoints: <AddPoints />,
    updateMembership: <UpdateMembership />,
    updateUserDetails: <UpdateUserDetails />,
    addRemoveMembers: <AddRemoveMembers />,
    createInvoice: <CreateInvoice />,
  };

  // Buttons
  const actions = [
    { label: 'Add Points', type: 'addPoints' },
    { label: 'Update Membership', type: 'updateMembership' },
    { label: 'Update User Details', type: 'updateUserDetails' },
    { label: 'Add/Remove Members', type: 'addRemoveMembers' },
    { label: 'Create Invoice', type: 'createInvoice' },
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

  // Fetch user data from server
  const fetchUserData = async (username) => {
    try {
      const response = await fetch(`/api/getUserData?username=${username}`);
      if (!response.ok) {
        throw new Error('User not found');
      }
      const data = await response.json();
      console.log(data);
      setUserData(data);
    } catch (err) {
      console.error("Error fetching user data:", err.message);
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
            className="py-2 px-4 border bg-midnightblue/10 hover:bg-midnightblue/20 rounded-lg border-midnightblue"
            onClick={() => handleOnClick(action)}
          >
            {action.label}
          </button>
        ))}
      </div>

      {/* Context section */}
      <div className="py-4 flex flex-col md:flex-row">
        <div className='md:w-1/3'>
          {/* Select user component */}
          {selectUser && (
            <EditInfoCard fetchUserData={fetchUserData} />
          )}
        </div>

        {/* Render the active component */}
        <div className='md:w-2/3'>
          {userData && componentsMap[activeComponent]}
        </div>

        {/* Display user data if available */}
        {/* {userData && (
          <div className="mt-4">
            <h3>User Data:</h3>
            <pre>{JSON.stringify(userData, null, 2)}</pre>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default Admin;

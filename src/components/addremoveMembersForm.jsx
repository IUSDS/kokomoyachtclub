import React, { useState } from 'react'
import { API_URL } from '../constant';
import { button, div } from 'framer-motion/client';

const PersonalInfoTab = ({ next }) => {
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dl, setDl] = useState('');
  const [password, setPassword] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [membershipType, setMembershipType] = useState('');
  const [points, setPoints] = useState('');
  const [picture, setPicture] = useState(null);
  const [referral, setReferral] = useState('');

  const handlePictureChange = (e) => setPicture(e.target.files[0]);

  const isFormComplete = () => {
    return (
      username &&
      firstName &&
      lastName &&
      dl &&
      password &&
      address1 &&
      city &&
      state &&
      zip &&
      phoneNumber &&
      email &&
      membershipType &&
      points
    );
  };

  return (
    <div>
      {[
        { label: 'Username', value: username, setter: setUsername },
        { label: 'First Name', value: firstName, setter: setFirstName },
        { label: 'Last Name', value: lastName, setter: setLastName },
        { label: 'DL', value: dl, setter: setDl },
        { label: 'Password', value: password, setter: setPassword, type: 'password' },
        { label: 'Address 1', value: address1, setter: setAddress1 },
        { label: 'Address 2', value: address2, setter: setAddress2 },
        { label: 'City', value: city, setter: setCity },
        { label: 'State', value: state, setter: setState },
        { label: 'Zip', value: zip, setter: setZip },
        { label: 'Phone Number', value: phoneNumber, setter: setPhoneNumber },
        { label: 'Email', value: email, setter: setEmail, type: 'email' },
        { label: 'Membership Type', value: membershipType, setter: setMembershipType, isDropdown: true },
        { label: 'Points', value: points, setter: setPoints, type: 'number' },
        { label: 'Picture', value: picture, setter: setPicture, isFile: true },
        { label: 'Referral Information', value: referral, setter: setReferral }
      ].map(({ label, value, setter, type = 'text', isDropdown, isFile }) => (
        <div className="flex flex-col px-2 py-2" key={label}>
          <p className="text-sm">{label}</p>
          {isDropdown ? (
            <select
              value={value}
              onChange={(e) => setter(e.target.value)}
              className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-midnightblue w-full"
            >
              <option value="">Select {label}</option>
              <option value="Silver">Silver</option>
              <option value="Gold">Gold</option>
              <option value="Platinum">Platinum</option>
              <option value="Premium">Premium</option>
            </select>
          ) : isFile ? (
            <div>
              <input
                type="file"
                id="picture"
                accept="image/*"
                onChange={handlePictureChange}
                className="file-input"
              />
            </div>
          ) : (
            <input
              type={type}
              value={value}
              onChange={(e) => setter(e.target.value)}
              placeholder={`Enter ${label.toLowerCase()}`}
              className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-midnightblue w-full"
            />
          )}
        </div>
      ))}
      <button
        disabled={!isFormComplete()}
        className={`mt-4 px-4 py-2 rounded-md w-full ${isFormComplete() ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        onClick={() => alert('Next button clicked!')}
      >
        Next
      </button>
    </div>
  );
};

const FamilyInfoTab = ({ next }) => {
  const [spouse, setSpouse] = useState('');
  const [spouseMobile, setSpouseMobile] = useState('');
  const [spouseEmail, setSpouseEmail] = useState('');
  const [children, setChildren] = useState([
    { name: '', dob: '', mobile: '', email: '' },
    { name: '', dob: '', mobile: '', email: '' },
    { name: '', dob: '', mobile: '', email: '' },
    { name: '', dob: '', mobile: '', email: '' },
  ]);

  const handleChildChange = (index, field, value) => {
    const updatedChildren = [...children];
    updatedChildren[index][field] = value;
    setChildren(updatedChildren);
  };

  const isFormComplete = () => {
    const isChildrenComplete = children.every(
      (child) => child.name && child.dob && child.mobile && child.email
    );
    return (
      spouse &&
      spouseMobile &&
      spouseEmail &&
      isChildrenComplete
    );
  };

  return (
    <div>
      {/* Spouse Fields */}
      <div className="flex flex-col px-2 py-2">
        <p className="text-sm">Spouse</p>
        <input
          type="text"
          value={spouse}
          onChange={(e) => setSpouse(e.target.value)}
          placeholder="Enter spouse's name"
          className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-midnightblue w-full"
        />
      </div>
      <div className="flex flex-col px-2 py-2">
        <p className="text-sm">Spouse Mobile</p>
        <input
          type="text"
          value={spouseMobile}
          onChange={(e) => setSpouseMobile(e.target.value)}
          placeholder="Enter spouse's mobile number"
          className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-midnightblue w-full"
        />
      </div>
      <div className="flex flex-col px-2 py-2">
        <p className="text-sm">Spouse Email</p>
        <input
          type="email"
          value={spouseEmail}
          onChange={(e) => setSpouseEmail(e.target.value)}
          placeholder="Enter spouse's email"
          className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-midnightblue w-full"
        />
      </div>

      {/* Children Fields */}
      {children.map((child, index) => (
        <div key={index} className="space-y-2">
          <h4 className="text-sm font-semibold">Child {index + 1}</h4>
          <div className="flex flex-col px-2 py-2">
            <p className="text-sm">Name</p>
            <input
              type="text"
              value={child.name}
              onChange={(e) => handleChildChange(index, 'name', e.target.value)}
              placeholder="Enter child's name"
              className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-midnightblue w-full"
            />
          </div>
          <div className="flex flex-col px-2 py-2">
            <p className="text-sm">Date of Birth</p>
            <input
              type="date"
              value={child.dob}
              onChange={(e) => handleChildChange(index, 'dob', e.target.value)}
              className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-midnightblue w-full"
            />
          </div>
          <div className="flex flex-col px-2 py-2">
            <p className="text-sm">Mobile</p>
            <input
              type="text"
              value={child.mobile}
              onChange={(e) => handleChildChange(index, 'mobile', e.target.value)}
              placeholder="Enter child's mobile number"
              className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-midnightblue w-full"
            />
          </div>
          <div className="flex flex-col px-2 py-2">
            <p className="text-sm">Email</p>
            <input
              type="email"
              value={child.email}
              onChange={(e) => handleChildChange(index, 'email', e.target.value)}
              placeholder="Enter child's email"
              className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-midnightblue w-full"
            />
          </div>
        </div>
      ))}

      {/* Next Button */}
      <button
        disabled={!isFormComplete()}
        className={`mt-4 px-4 py-2 rounded-md w-full ${isFormComplete() ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
        onClick={next}
      >
        Next
      </button>
    </div>
  );
};

const EmergencyInfoTab = ({ submit }) => {
  const [emergencyContactName, setEmergencyContactName] = useState('');
  const [emergencyEmail, setEmergencyEmail] = useState('');
  const [emergencyPhone, setEmergencyPhone] = useState('');

  const isFormComplete = () => {
    return emergencyContactName && emergencyEmail && emergencyPhone;
  };

  return (
    <div>
      <h3 className="text-lg font-medium">Emergency Information</h3>

      {/* Emergency Contact Name */}
      <div className="flex flex-col px-2 py-2">
        <p className="text-sm">Emergency Contact Name</p>
        <input
          type="text"
          value={emergencyContactName}
          onChange={(e) => setEmergencyContactName(e.target.value)}
          placeholder="Enter emergency contact name"
          className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-midnightblue w-full"
        />
      </div>

      {/* Emergency Email */}
      <div className="flex flex-col px-2 py-2">
        <p className="text-sm">Emergency Email</p>
        <input
          type="email"
          value={emergencyEmail}
          onChange={(e) => setEmergencyEmail(e.target.value)}
          placeholder="Enter emergency contact email"
          className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-midnightblue w-full"
        />
      </div>

      {/* Emergency Phone */}
      <div className="flex flex-col px-2 py-2">
        <p className="text-sm">Emergency Phone</p>
        <input
          type="text"
          value={emergencyPhone}
          onChange={(e) => setEmergencyPhone(e.target.value)}
          placeholder="Enter emergency contact phone number"
          className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-midnightblue w-full"
        />
      </div>

      {/* Submit Button */}
      <button
        disabled={!isFormComplete()}
        className={`mt-4 px-4 py-2 rounded-md w-full ${isFormComplete() ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        onClick={submit}
      >
        Add Member
      </button>
    </div>
  );
};

const AchInfoTab = ({ next }) => {
  const [depositoryName, setDepositoryName] = useState('');
  const [branch, setBranch] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');
  const [routingNumber, setRoutingNumber] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [nameOnAccount, setNameOnAccount] = useState('');
  const [accountType, setAccountType] = useState(''); // Checking or Savings

  const isFormComplete = () => {
    return (
      depositoryName &&
      branch &&
      city &&
      state &&
      zip &&
      routingNumber &&
      accountNumber &&
      nameOnAccount &&
      accountType
    );
  };

  return (
    <div>
      <h3 className="text-lg font-medium">ACH Information</h3>

      {/* Depository Name */}
      <div className="flex flex-col px-2 py-2">
        <p className="text-sm">Depository Name</p>
        <input
          type="text"
          value={depositoryName}
          onChange={(e) => setDepositoryName(e.target.value)}
          placeholder="Enter depository name"
          className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-midnightblue w-full"
        />
      </div>

      {/* Branch */}
      <div className="flex flex-col px-2 py-2">
        <p className="text-sm">Branch</p>
        <input
          type="text"
          value={branch}
          onChange={(e) => setBranch(e.target.value)}
          placeholder="Enter branch"
          className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-midnightblue w-full"
        />
      </div>

      {/* City */}
      <div className="flex flex-col px-2 py-2">
        <p className="text-sm">City</p>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city"
          className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-midnightblue w-full"
        />
      </div>

      {/* State */}
      <div className="flex flex-col px-2 py-2">
        <p className="text-sm">State</p>
        <input
          type="text"
          value={state}
          onChange={(e) => setState(e.target.value)}
          placeholder="Enter state"
          className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-midnightblue w-full"
        />
      </div>

      {/* Zip */}
      <div className="flex flex-col px-2 py-2">
        <p className="text-sm">Zip</p>
        <input
          type="text"
          value={zip}
          onChange={(e) => setZip(e.target.value)}
          placeholder="Enter zip code"
          className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-midnightblue w-full"
        />
      </div>

      {/* Routing Number */}
      <div className="flex flex-col px-2 py-2">
        <p className="text-sm">Routing Number</p>
        <input
          type="text"
          value={routingNumber}
          onChange={(e) => setRoutingNumber(e.target.value)}
          placeholder="Enter routing number"
          className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-midnightblue w-full"
        />
      </div>

      {/* Account Number */}
      <div className="flex flex-col px-2 py-2">
        <p className="text-sm">Account Number</p>
        <input
          type="text"
          value={accountNumber}
          onChange={(e) => setAccountNumber(e.target.value)}
          placeholder="Enter account number"
          className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-midnightblue w-full"
        />
      </div>

      {/* Name on Account */}
      <div className="flex flex-col px-2 py-2">
        <p className="text-sm">Name on Account</p>
        <input
          type="text"
          value={nameOnAccount}
          onChange={(e) => setNameOnAccount(e.target.value)}
          placeholder="Enter name on account"
          className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-midnightblue w-full"
        />
      </div>

      {/* Account Type (Radio Buttons) */}
      <div className="flex flex-col px-2 py-2">
        <p className="text-sm">Account Type</p>
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              value="Checking"
              checked={accountType === 'Checking'}
              onChange={(e) => setAccountType(e.target.value)}
              className="focus:ring-midnightblue"
            />
            Checking Account
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              value="Savings"
              checked={accountType === 'Savings'}
              onChange={(e) => setAccountType(e.target.value)}
              className="focus:ring-midnightblue"
            />
            Savings Account
          </label>
        </div>
      </div>

      {/* Next Button */}
      <button
        disabled={!isFormComplete()}
        className={`mt-4 px-4 py-2 rounded-md w-full ${isFormComplete() ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        onClick={next}
      >
        Next
      </button>
    </div>
  );
};

const AddRemoveMembersForm = () => {
  const [activeComponent, setActiveComponent] = useState(null);
  const [infoTab, setInfoTab] = useState('personal');

  const actions = [
    { label: 'Add Member', type: 'addMember' },
    { label: 'Remove Member', type: 'removeMember' },
  ];

  const typeOfInfo = [
    { label: 'Personal', type: 'personal' },
    { label: 'Family', type: 'family' },
    { label: 'ACH', type: 'ach' },
    { label: 'Emergency Contact', type: 'emergency' },
  ]

  const handleSubmit = (e) => {
    e.preventDefault();
    if (activeComponent === 'addMember') {
      handleAddMember();
    } else if (activeComponent === 'removeMember') {
      handleRemoveMember();
    }
    setSuccessMessage(true);

    setTimeout(() => {
      setSuccessMessage(false);
      setUsername('');
      setFirstName('');
      setLastName('');
      setPassword('');
      setAddress('');
      setPhoneNumber('');
      setEmergencyPhoneNumber('');
      setEmail('');
      setMembershipType('');
      setPoints('');
      setPicture('');
    }, 3000);
  };

  const handleCancel = () => {
    setUsername('');
    setFirstName('');
    setLastName('');
    setPassword('');
    setAddress('');
    setPhoneNumber('');
    setEmergencyPhoneNumber('');
    setEmail('');
    setMembershipType('');
    setPoints('');
    setPicture('');
    setSuccessMessage(false);
  };

  const handleRemoveMember = async () => {
    try {
      const formData = new URLSearchParams();
      formData.append('username', username);

      const response = await fetch(`https://api.kokomoyachtclub.vip/update/delete/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'accept': 'application/json',
        },
        body: formData.toString(),
      });

      const result = await response.json();

      if (response.ok) {
        setSuccessMessage('Member removed successfully!');
        handleCancel();
      } else {
        alert(result.message || 'Failed to remove member. Please try again.');
      }
    } catch (error) {
      console.error('Error removing member:', error);
      alert('Failed to remove member. Please try again.');
    }
  };

  const handlePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) setPicture(file);
  };


  const handleAddMember = async () => {
    try {
      const formData = new FormData();
      formData.append('username', username);
      formData.append('password', password);
      formData.append('first_name', firstName);
      formData.append('last_name', lastName);
      formData.append('phone_number', phoneNumber);
      formData.append('emergency_phone_number', emergencyPhoneNumber);
      formData.append('address', address);
      formData.append('email_id', email);
      formData.append('membership_type', membershipType);
      formData.append('points', points);
      if (picture) formData.append('file', picture);

      const response = await fetch(`https://api.kokomoyachtclub.vip/create-member/add-member/`, {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      console.log(result);

      if (response.ok) {
        alert(result.message || 'Member added successfully!');
        handleCancel();
      } else {
        alert(result.message || 'Failed to add member. Please try again.');
      }
    } catch (error) {
      console.error('Error adding member:', error);
      alert('Failed to add member. Please try again.');
    }
  };

  const handleNext = (nextTab) => {
    setInfoTab(nextTab);
  }

  return (
    <div className='flex flex-col md:flex-row'>

      {/* Left Section */}
      <div className='flex flex-col gap-2 md:w-1/2 md:mx-2 md:my-2'>

        {/* Select action */}
        <div className="h-fit text-midnightblue mx-auto w-full bg-white p-6 rounded-2xl shadow-xl space-y-6">
          <h2 className="text-xl font-semibold flex text-center md:text-left items-center">
            Add/Remove Members
          </h2>
          <div className="flex gap-2 flex-col md:flex-row">
            {actions.map((action) => (
              <button
                key={action.type}
                className={`p-4 border rounded-lg transition-colors duration-200
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
        </div>
      </div>

      {/* Right Section */}

      {activeComponent === 'addMember' && (
        <div className='flex flex-col md:w-1/2'>
          {/* Information Type */}
          {activeComponent === 'addMember' && (
            <div className='flex gap-2 flex-col md:flex-row h-fit text-midnightblue mx-auto w-full bg-white p-6 rounded-2xl shadow-xl' >
              {typeOfInfo.map((item, index) => (
                <button
                  key={index}
                  className={`px-4 py-2 border rounded-lg transition-colors duration-200 border-midnightblue ${infoTab === item.type
                    ? 'bg-midnightblue text-white'
                    : 'bg-midnightblue/10 hover:bg-midnightblue/20'
                    }`}
                  onClick={() => setInfoTab(item.type)}
                >
                  {item.label}
                </button>
              ))}

            </div>
          )}

          {/* Form Section */}
          <div className="md:my-2 my-4 text-midnightblue mx-auto w-full bg-white p-6 rounded-2xl shadow-xl space-y-6">
            {infoTab === 'personal' && (
              <PersonalInfoTab next={handleNext} />
            )}
            {infoTab === 'family' && (
              <FamilyInfoTab next={handleNext} />
            )}
            {infoTab === 'ach' && (
              <AchInfoTab next={handleNext} />
            )}
            {infoTab === 'emergency' && (
              <EmergencyInfoTab next={handleNext} />
            )}
          </div>
        </div>

      )}
      {activeComponent === 'removeMember' && (
        <div className='md:w-1/2 Nmd:mx-2 md:my-2 my-4 text-midnightblue mx-auto w-full bg-white p-6 rounded-2xl shadow-xl space-y-6'>
          <h3 className="text-lg font-medium">Remove a Member</h3>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-midnightblue w-full"
            />
            <div className="flex justify-end space-x-2 mt-4">
              <button
                type="button"
                className="p-3 bg-gray-200 rounded-md"
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="p-3 bg-red-600 text-white rounded-md"
              >
                Remove Member
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default AddRemoveMembersForm;

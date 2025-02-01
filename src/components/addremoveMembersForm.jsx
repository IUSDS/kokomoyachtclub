import React, { useState, useEffect } from 'react'
import { API_URL } from '../constant';
import { button, div, p } from 'framer-motion/client';
import useFormStore from '../useFormStore';
import CustomAlert from '../components/CustomAlert';

const PersonalInfoTab = ({ next }) => {
  const {
    username, setUsername,
    firstName, setFirstName,
    lastName, setLastName,
    dl, setDl,
    company, setCompany,
    password, setPassword,
    address1, setAddress1,
    address2, setAddress2,
    city, setCity,
    state, setState,
    zip, setZip,
    phoneNumber, setPhoneNumber,
    email, setEmail,
    membershipType, setMembershipType,
    points, setPoints,
    picture, setPicture,
    referral, setReferral,
    usernameAvailable, setUsernameAvailable,
    emailAvailable, setEmailAvailable
  } = useFormStore();
  const [usernameVerificationMessage, setUsernameVerificationMessage] = useState("");
  const [emailVerificationMessage, setEmailVerificationMessage] = useState("");

  const handlePictureChange = (e) => setPicture(e.target.files[0]);

  const isFormComplete = () => {
    return (
      username &&
      firstName &&
      lastName &&
      password &&
      address1 &&
      city &&
      state &&
      zip &&
      phoneNumber &&
      email &&
      membershipType &&
      points &&
      usernameAvailable &&
      emailAvailable
    );
  };

  const handleValidate = async (field, value) => {
    try {
      let endpoint = "";
      if (field === "Username") {
        endpoint = `https://api.kokomoyachtclub.vip/create-member/validate-member/?username=${value}`;
        const response = await fetch(endpoint, {
          method: "GET", // Use GET since you're passing parameters in the URL
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();
        console.log(data);

        if (data.status === 'success') {
          setUsernameVerificationMessage(`${field} is available.`);
          setUsernameAvailable(true);
        } else {
          setUsernameVerificationMessage(`${field} already exists.`);
          setUsernameAvailable(false);
        }
      } else if (field === "Email") {
        endpoint = `https://api.kokomoyachtclub.vip/create-member/validate-member/?email=${value}`; const response = await fetch(endpoint, {
          method: "GET", // Use GET since you're passing parameters in the URL
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();
        console.log(data);

        if (data.status === 'success') {
          setEmailVerificationMessage(`${field} is available.`);
          setEmailAvailable(true);
        } else {
          setEmailVerificationMessage(`${field} already exists.`);
          setEmailAvailable(false);
        }
      }
    } catch (error) {
      console.error("Error during verification:", error);
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <div>
      {[
        { label: 'Username', value: username, setter: setUsername, required: true, validate: true },
        { label: 'First Name', value: firstName, setter: setFirstName, required: true },
        { label: 'Last Name', value: lastName, setter: setLastName, required: true },
        { label: 'DL', value: dl, setter: setDl, required: false },
        { label: 'Company', value: company, setter: setCompany, required: false },
        { label: 'Password', value: password, setter: setPassword, type: 'password', required: true },
        { label: 'Address 1', value: address1, setter: setAddress1, required: true },
        { label: 'Address 2', value: address2, setter: setAddress2, required: false },
        { label: 'City', value: city, setter: setCity, required: true },
        { label: 'State', value: state, setter: setState, required: true },
        { label: 'Zip', value: zip, setter: setZip, required: true },
        { label: 'Phone Number', type: 'number', value: phoneNumber, setter: setPhoneNumber, required: true },
        { label: 'Email', value: email, setter: setEmail, type: 'email', required: true, validate: true },
        { label: 'Membership Type', value: membershipType, setter: setMembershipType, isDropdown: true, required: true },
        { label: 'Points', value: points, setter: setPoints, type: 'number', required: true },
        { label: 'Picture', value: picture, setter: setPicture, isFile: true, required: false },
        { label: 'Referral Information', value: referral, setter: setReferral, required: false }
      ].map(({ label, value, setter, type = 'text', isDropdown, isFile, required, validate }) => (
        <div className="flex flex-col px-2 py-2" key={label}>
          <div className='flex justify-between items-center'>
            <p className="text-sm">{label}{required ? "*" : ""}</p>
            {validate && (
              <span
                className="text-midnightblue text-sm text-right cursor-pointer hover:text-blue-600 w-fit"
                onClick={() => handleValidate(label, value)} // Pass label and value
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    handleValidate(label, value); // Pass label and value
                  }
                }}
              >
                Validate
              </span>
            )}
          </div>
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
              <option value="Diamond">Diamond</option>
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
          {/* Display verification message */}
          {validate && label === "Username" && usernameVerificationMessage && (
            <p className="text-sm text-gray-600 mt-1">{usernameVerificationMessage}</p>
          )}
          {validate && label === "Email" && emailVerificationMessage && (
            <p className="text-sm text-gray-600 mt-1">{emailVerificationMessage}</p>
          )}
        </div>
      ))}
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

const FamilyInfoTab = ({ next }) => {
  const {
    spouse, setSpouse,
    spouseMobile, setSpouseMobile,
    spouseEmail, setSpouseEmail,
    childNum, setChildNum,
    children, setChildren
  } = useFormStore();

  // Handle changes in the number of children
  const handleChildNumChange = (e) => {
    const num = parseInt(e.target.value, 10);
    setChildNum(num);
  };

  // Handle changes in child fields
  const handleChildChange = (index, field, value) => {
    const updatedChildren = [...children];
    updatedChildren[index][field] = value;
    setChildren(updatedChildren);
  };

  // Check if the form is complete
  const isFormComplete = () => {
    // Check if spouse fields are filled
    const isSpouseComplete = spouse && spouseMobile && spouseEmail;

    // Check if the required number of child fields are filled
    const isChildrenComplete = children
      .slice(0, childNum) // Only check the first `childNum` children
      .every((child) => child.name && child.dob && child.mobile && child.email);

    return isSpouseComplete && isChildrenComplete;
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

      {/* Number of Children Dropdown */}
      <div className="flex flex-col px-2 py-2">
        <p className="text-sm">Number of Children</p>
        <select
          value={childNum}
          onChange={handleChildNumChange}
          className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-midnightblue w-full"
        >
          <option value={0}>Select number of children</option>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
        </select>
      </div>

      {/* Children Fields */}
      {Array.from({ length: childNum }).map((_, index) => (
        <div key={index} className="space-y-2">
          <h4 className="text-sm font-semibold">Child {index + 1}</h4>
          <div className="flex flex-col px-2 py-2">
            <p className="text-sm">Name</p>
            <input
              type="text"
              value={children[index].name}
              onChange={(e) => handleChildChange(index, 'name', e.target.value)}
              placeholder="Enter child's name"
              className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-midnightblue w-full"
            />
          </div>
          <div className="flex flex-col px-2 py-2">
            <p className="text-sm">Date of Birth</p>
            <input
              type="date"
              value={children[index].dob}
              onChange={(e) => handleChildChange(index, 'dob', e.target.value)}
              className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-midnightblue w-full"
            />
          </div>
          <div className="flex flex-col px-2 py-2">
            <p className="text-sm">Mobile</p>
            <input
              type="text"
              value={children[index].mobile}
              onChange={(e) => handleChildChange(index, 'mobile', e.target.value)}
              placeholder="Enter child's mobile number"
              className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-midnightblue w-full"
            />
          </div>
          <div className="flex flex-col px-2 py-2">
            <p className="text-sm">Email</p>
            <input
              type="email"
              value={children[index].email}
              onChange={(e) => handleChildChange(index, 'email', e.target.value)}
              placeholder="Enter child's email"
              className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-midnightblue w-full"
            />
          </div>
        </div>
      ))}

      {/* Next Button */}
      <button
        // disabled={!isFormComplete()}
        className={`mt-4 px-4 py-2 rounded-md w-full bg-blue-500 text-white`}
        onClick={next}
      >
        Next
      </button>
    </div>
  );
};

const EmergencyInfoTab = () => {
  const {
    // Personal Info
    username, firstName, lastName, password, dl, company, referral,
    address1, address2, city, state, zip, phoneNumber, email, membershipType, points,
    picture,

    // Family Info
    spouse, spouseMobile, spouseEmail, childNum, children,

    // Emergency Contact Info
    emergencyContactName, emergencyEmail, emergencyPhone,

    // ACH Info
    depositoryName, branch, achCity, achState, achZip,
    routingNumber, accountNumber, nameOnAccount, accountType,

    // Zustand store functions
    isPersonalInfoComplete, isAchInfoComplete, resetForm
  } = useFormStore();

  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const isButtonEnabled = isPersonalInfoComplete() && isAchInfoComplete();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!/^\d{10}$/.test(phoneNumber)) {
      setAlertTitle("Invalid Number!");
      setAlertBody("Please enter a 10-digit mobile number.");
      setAlertOpen(true);
      return;
    }

    if (!validateEmail(email)) {
      setAlertTitle("Invalid Email!");
      setAlertBody("Please enter a valid email.");
      setAlertOpen(true);
      return;
    }
    if (!isButtonEnabled) {
      setMessage({ type: "error", text: "Please complete all required fields before submitting." });
      return;
    }

    setLoading(true);
    setMessage(null);

    // Create FormData object for multipart/form-data
    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);
    formData.append("first_name", firstName);
    formData.append("last_name", lastName);
    formData.append("phone_number", phoneNumber);
    formData.append("email_id", email); // API expects "email_id" instead of "email"
    formData.append("membership_type", membershipType);
    formData.append("points", points);
    formData.append("file", picture); // Ensure the file is sent
    formData.append("dl", dl || ""); // Driver's License
    formData.append("referral_information", referral || ""); // Referral Info
    formData.append("company_name", company || ""); // Company Name
    formData.append("member_address1", address1); // API uses "member_address1"
    formData.append("member_address2", address2 || ""); // API uses "member_address2"
    formData.append("member_city", city); // API uses "member_city"
    formData.append("member_state", state); // API uses "member_state"
    formData.append("member_zip", zip); // API uses "member_zip"
    formData.append("branch", branch);
    formData.append("depository_name", depositoryName);
    formData.append("routing_no", routingNumber);
    formData.append("acc_no", accountNumber);
    formData.append("name_on_acc", nameOnAccount);
    formData.append("type_of_acc", accountType);
    formData.append("date_sub", "2025-01-31"); // Static Date for submission
    formData.append("zip_code", zip);

    // Family Info
    formData.append("spouse", spouse);
    formData.append("spouse_phone", spouseMobile);
    formData.append("spouse_email", spouseEmail);
    formData.append("child_num", childNum);

    // Append children details dynamically
    formData.append("child_names", children.map((child) => child.name).join(","));
    formData.append("child_dobs", children.map((child) => child.dob).join(","));
    formData.append("child_phone_numbers", children.map((child) => child.mobile).join(","));
    formData.append("child_emails", children.map((child) => child.email).join(","));

    // Emergency Contact Info
    formData.append("emergency_name", emergencyContactName);
    formData.append("emergency_email", emergencyEmail);
    formData.append("emergency_contact", emergencyPhone);
    formData.append("emergency_relationship", "friend"); // Static Relationship as per cURL

    try {
      const response = await fetch("http://api.kokomoyachtclub.vip/add-member/", {
        method: "POST",
        body: formData, // Sending FormData
      });

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        setMessage({ type: "success", text: "Member added successfully!" });
        // resetForm(); // Reset form on success
      } else {
        setMessage({ type: "error", text: data.message || "Failed to add member." });
      }
    } catch (error) {
      setMessage({ type: "error", text: "Network error. Please try again." });
    } finally {
      setLoading(false);
    }
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

      {/* Success/Error Message */}
      {message && (
        <p className={`text-sm mt-2 ${message.type === "success" ? "text-green-500" : "text-red-500"}`}>
          {message.text}
        </p>
      )}

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        disabled={!isButtonEnabled || loading}
        className={`mt-4 px-4 py-2 rounded-md w-full ${isButtonEnabled && !loading ? "bg-midnightblue text-white" : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
      >
        {loading ? "Submitting..." : "Add Member"}
      </button>
    </div>
  );
};

const AchInfoTab = ({ next }) => {
  const {
    depositoryName, setDepositoryName,
    branch, setBranch,
    achCity, setAchCity,
    achState, setAchState,
    achZip, setAchZip,
    routingNumber, setRoutingNumber,
    accountNumber, setAccountNumber,
    nameOnAccount, setNameOnAccount,
    accountType, setAccountType
  } = useFormStore();

  const isFormComplete = () => {
    return (
      depositoryName &&
      branch &&
      achCity &&
      achState &&
      achZip &&
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
        <p className="text-sm">Depository Name*</p>
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
        <p className="text-sm">Branch*</p>
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
        <p className="text-sm">City*</p>
        <input
          type="text"
          value={achCity}
          onChange={(e) => setAchCity(e.target.value)}
          placeholder="Enter city"
          className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-midnightblue w-full"
        />
      </div>

      {/* State */}
      <div className="flex flex-col px-2 py-2">
        <p className="text-sm">State*</p>
        <input
          type="text"
          value={achState}
          onChange={(e) => setAchState(e.target.value)}
          placeholder="Enter state"
          className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-midnightblue w-full"
        />
      </div>

      {/* Zip */}
      <div className="flex flex-col px-2 py-2">
        <p className="text-sm">Zip*</p>
        <input
          type="text"
          value={achZip}
          onChange={(e) => setAchZip(e.target.value)}
          placeholder="Enter zip code"
          className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-midnightblue w-full"
        />
      </div>

      {/* Routing Number */}
      <div className="flex flex-col px-2 py-2">
        <p className="text-sm">Routing Number*</p>
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
        <p className="text-sm">Account Number*</p>
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
        <p className="text-sm">Name on Account*</p>
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
        <p className="text-sm">Account Type*</p>
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
  const [alertopen, setAlertOpen] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertBody, setAlertBody] = useState('');

  const actions = [
    { label: 'Add Member', type: 'addMember' },
    { label: 'Remove Member', type: 'removeMember' },
  ];

  const typeOfInfo = [
    { label: 'Personal', type: 'personal' },
    { label: 'Family', type: 'family' },
    { label: 'ACH', type: 'ach' },
    { label: 'Emergency Contact', type: 'emergency' },
  ];

  const handleNext = () => {
    const tabs = ['personal', 'family', 'ach', 'emergency'];
    const currentIndex = tabs.indexOf(infoTab);
    if (currentIndex < tabs.length - 1) {
      setInfoTab(tabs[currentIndex + 1]);
    }
  };

  const handleAlertColse = () => {
    setAlertOpen(false);
  }

  useEffect(() => {
    // console.log("Current tab:", infoTab);
  }, [infoTab]);

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
          <div className='flex gap-2 flex-col md:flex-row h-fit text-midnightblue mx-auto w-full bg-white p-6 rounded-2xl shadow-xl'>
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

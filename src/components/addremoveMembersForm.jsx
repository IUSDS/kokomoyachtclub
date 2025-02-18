import React, { useState, useEffect } from 'react';
import useFormStore from '../useFormStore';
import CustomAlert from './CustomAlert';

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
    referral, setReferral,
    usernameAvailable, setUsernameAvailable,
    emailAvailable, setEmailAvailable,
    membershipID, setMembershipID,
  } = useFormStore();

  const [usernameVerificationMessage, setUsernameVerificationMessage] = useState("");
  const [emailVerificationMessage, setEmailVerificationMessage] = useState("");
  const [alertopen, setAlertOpen] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertBody, setAlertBody] = useState('');

  const [errors, setErrors] = useState({
    email: "",
    phoneNumber: "",
  });

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
      emailAvailable &&
      errors.email === "" &&
      errors.phoneNumber === ""
    );
  };

  const handleValidate = async (field, value) => {
    console.log(value);
    try {
      let endpoint = "";
      if (field === "Username") {
        endpoint = `https://api.kokomoyachtclub.vip/create-member/validate-member/?username=${value}`;
        const response = await fetch(endpoint, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();
        console.log(data);

        if (data.status === 'success') {
          setUsernameVerificationMessage(`${field} is available`);
          setUsernameAvailable(true);
        } else {
          setUsernameVerificationMessage(`${field} already exists`);
          setUsernameAvailable(false);
          setTimeout(() => {
            setUsernameVerificationMessage('');
          }, 5000);
        }
      } else if (field === "Email") {
        endpoint = `https://api.kokomoyachtclub.vip/create-member/validate-member/?email=${value}`; const response = await fetch(endpoint, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();
        console.log(data);

        if (data.status === 'success') {
          setEmailVerificationMessage(`${field} is available`);
          setEmailAvailable(true);
        } else {
          setEmailVerificationMessage(`${field} already exists`);
          setEmailAvailable(false);
          setTimeout(() => {
            setEmailVerificationMessage('');
          }, 5000);
        }
      }
    } catch (error) {
      console.error("Error during verification:", error);
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setAlertTitle("Invalid Email!");
      setAlertBody("Please enter a valid email address.");
      setAlertOpen(true);
      return false;
    }
    return true;
  };

  const validateNumber = (phone) => {
    if (!/^\d{10}$/.test(phone)) {
      setAlertTitle("Invalid Number!");
      setAlertBody("Please enter a 10-digit mobile number.");
      setAlertOpen(true);
      return false;
    }
    return true;
  };

  const handleAlertColse = () => {
    setAlertOpen(false);
  }

  return (
    <div>
      <div>
        {/* Membership ID */}
        <div className="flex flex-col px-2 py-2">
          <p className="text-sm">Membership ID</p>
          <input
            type="text" // Keep as text
            value={membershipID}
            onChange={(e) => {
              const val = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
              setMembershipID(val); // Store as string
            }}
            className="border rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-midnightblue"
          />
        </div>

        {/* Username */}
        <div className="flex flex-col px-2 py-2">
          <div className="flex justify-between items-center">
            <p className="text-sm">Username*</p>
            <button
              className="text-blue-500 text-sm cursor-pointer hover:text-blue-700"
              onClick={() => handleValidate("Username", username)}
            >
              Validate
            </button>
          </div>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-midnightblue"
          />
          {usernameVerificationMessage && <p className="text-gray-600 text-sm mt-1">{usernameVerificationMessage}</p>}
        </div>

        {/* First Name */}
        <div className="flex flex-col px-2 py-2">
          <p className="text-sm">First Name*</p>
          <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)}
            className="border rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-midnightblue" />
        </div>

        {/* Last Name */}
        <div className="flex flex-col px-2 py-2">
          <p className="text-sm">Last Name*</p>
          <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)}
            className="border rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-midnightblue" />
        </div>

        {/* DL */}
        <div className="flex flex-col px-2 py-2">
          <p className="text-sm">DL</p>
          <input type="text" value={dl} onChange={(e) => setDl(e.target.value)}
            className="border rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-midnightblue" />
        </div>

        {/* Company */}
        <div className="flex flex-col px-2 py-2">
          <p className="text-sm">Company</p>
          <input type="text" value={company} onChange={(e) => setCompany(e.target.value)}
            className="border rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-midnightblue" />
        </div>

        {/* Password */}
        <div className="flex flex-col px-2 py-2">
          <p className="text-sm">Password*</p>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
            className="border rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-midnightblue" />
        </div>

        {/* Address 1 */}
        <div className="flex flex-col px-2 py-2">
          <p className="text-sm">Address 1*</p>
          <input type="text" value={address1} onChange={(e) => setAddress1(e.target.value)}
            className="border rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-midnightblue" />
        </div>

        {/* Address 2 */}
        <div className="flex flex-col px-2 py-2">
          <p className="text-sm">Address 2</p>
          <input type="text" value={address2} onChange={(e) => setAddress2(e.target.value)}
            className="border rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-midnightblue" />
        </div>

        {/* City */}
        <div className="flex flex-col px-2 py-2">
          <p className="text-sm">City*</p>
          <input type="text" value={city} onChange={(e) => setCity(e.target.value)}
            className="border rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-midnightblue" />
        </div>

        {/* State */}
        <div className="flex flex-col px-2 py-2">
          <p className="text-sm">State*</p>
          <input type="text" value={state} onChange={(e) => setState(e.target.value)}
            className="border rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-midnightblue" />
        </div>

        {/* Zip */}
        <div className="flex flex-col px-2 py-2">
          <p className="text-sm">Zip*</p>
          <input type="number" value={zip} onChange={(e) => setZip(e.target.value)}
            className="border rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-midnightblue" />
        </div>

        {/* Phone Number */}
        <div className="flex flex-col px-2 py-2">
          <p className="text-sm">Phone Number*</p>
          <input
            type="tel"
            value={phoneNumber}
            onChange={(e) => {
              const val = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
              setPhoneNumber(val);
              setErrors((prev) => ({ ...prev, phoneNumber: val.length === 10 ? "" : "Phone number must be exactly 10 digits" }));
            }}
            className={`border rounded-md p-2 w-full focus:outline-none focus:ring-2 ${errors.phoneNumber ? "border-red-500 focus:ring-red-500" : "focus:ring-midnightblue"
              }`}
          />
          {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber}</p>}
        </div>

        {/* Email */}
        <div className="flex flex-col px-2 py-2">
          <div className="flex justify-between items-center">
            <p className="text-sm">Email*</p>
            <button
              className="text-blue-500 text-sm cursor-pointer hover:text-blue-700"
              onClick={() => handleValidate("Email", email)}
            >
              Validate
            </button>
          </div>
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
              setErrors((prev) => ({ ...prev, email: emailRegex.test(e.target.value) ? "" : "Invalid email format" }));
            }}
            className={`border rounded-md p-2 w-full focus:outline-none focus:ring-2 ${errors.email ? "border-red-500 focus:ring-red-500" : "focus:ring-midnightblue"
              }`}
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          {emailVerificationMessage && <p className="text-gray-600 text-sm mt-1">{emailVerificationMessage}</p>}
        </div>

        {/* Membership Type (Dropdown) */}
        <div className="flex flex-col px-2 py-2">
          <p className="text-sm">Membership Type*</p>
          <select value={membershipType} onChange={(e) => setMembershipType(e.target.value)}
            className="border rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-midnightblue">
            <option value="">Select Membership Type</option>
            <option value="Silver">Silver</option>
            <option value="Gold">Gold</option>
            <option value="Platinum">Platinum</option>
            <option value="Diamond">Diamond</option>
          </select>
        </div>

        {/* Points */}
        <div className="flex flex-col px-2 py-2">
          <p className="text-sm">Points*</p>
          <input
            type="text" // Keep as text
            value={points}
            onChange={(e) => {
              const val = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
              setPoints(val);
            }}
            className="border rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-midnightblue"
          />
        </div>

        {/* Referral Information */}
        <div className="flex flex-col px-2 py-2">
          <p className="text-sm">Referral Information</p>
          <input type="text" value={referral} onChange={(e) => setReferral(e.target.value)}
            className="border rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-midnightblue" />
        </div>
      </div>

      <p className="text-gray-400 text-sm mt-2">Please validate username and email before clicking next.</p>
      <button
        disabled={!isFormComplete()}
        className={`mt-4 px-4 py-2 rounded-md w-full ${isFormComplete() ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        onClick={() => {
          const isEmailValid = validateEmail(email);
          const isPhoneValid = validateNumber(phoneNumber);
          // console.log('next is clicked!!!')

          // Only proceed to the next tab if both email and phone number are valid
          if (isEmailValid && isPhoneValid) {
            next();
          }
        }}
      >
        Next
      </button>
      <CustomAlert onClose={handleAlertColse} isVisible={alertopen} title={alertTitle} body={alertBody} />
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
          type="number"
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
              type="number"
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

const EmergencyInfoTab = ({ next }) => {
  const {
    emergencyContactName, setEmergencyContactName,
    emergencyPhone, setEmergencyPhone,
    emergencyRelationship, setEmergencyRelationship,
  } = useFormStore();

  const [phoneError, setPhoneError] = useState("");

  // Validate Phone Number (Only 10 digits)
  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
    setEmergencyPhone(value);

    if (value.length !== 10) {
      setPhoneError("Phone number must be exactly 10 digits.");
    } else {
      setPhoneError("");
    }
  };

  return (
    <div>
      <h3 className="text-lg font-medium">Emergency Information</h3>

      {/* Emergency Contact Name */}
      <div className="flex flex-col px-2 py-2">
        <p className="text-sm">Emergency Contact Name*</p>
        <input
          type="text"
          value={emergencyContactName}
          onChange={(e) => setEmergencyContactName(e.target.value)}
          placeholder="Enter name"
          className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-midnightblue w-full"
        />
      </div>

      {/* Emergency Phone */}
      <div className="flex flex-col px-2 py-2">
        <p className="text-sm">Emergency Contact Number*</p>
        <input
          type="text"
          value={emergencyPhone}
          onChange={handlePhoneChange}
          placeholder="Enter number"
          className={`border rounded-md p-2 focus:outline-none focus:ring-2 w-full ${phoneError ? "border-red-500 focus:ring-red-500" : "focus:ring-midnightblue"
            }`}
        />
        {phoneError && <p className="text-red-500 text-sm">{phoneError}</p>}
      </div>

      {/* Emergency Relationship */}
      <div className="flex flex-col px-2 py-2">
        <p className="text-sm">Emergency Relationship*</p>
        <input
          type="text"
          value={emergencyRelationship}
          onChange={(e) => setEmergencyRelationship(e.target.value)}
          placeholder="Enter relationship"
          className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-midnightblue w-full"
        />
      </div>

      {/* Next Button */}
      <button
        className={`mt-4 px-4 py-2 rounded-md w-full bg-blue-500 text-white`}
        onClick={next}
      >
        Next
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

  const [routingError, setRoutingError] = useState("");

  const isFormComplete = () => {
    return (
      depositoryName &&
      branch &&
      routingNumber.length === 9 &&
      accountNumber &&
      nameOnAccount &&
      accountType
    );
  };

  // Validate if the routing number is exactly 9 digits
  const handleRoutingChange = (e) => {
    const value = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
    setRoutingNumber(value);

    if (value.length !== 9) {
      setRoutingError("Routing number must be exactly 9 digits.");
    } else {
      setRoutingError("");
    }
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
        <p className="text-sm">City</p>
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
        <p className="text-sm">State</p>
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
        <p className="text-sm">Zip</p>
        <input
          type="number"
          value={achZip}
          onChange={(e) => setAchZip(e.target.value)}
          placeholder="Enter zip code"
          className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-midnightblue w-full"
        />
      </div>

      {/* Routing Number */}
      <div className="flex flex-col px-2 py-2">
        <p className="text-sm">Routing Number (9 digits)*</p>
        <input
          type="text"
          value={routingNumber}
          onChange={handleRoutingChange}
          placeholder="Enter routing number"
          className={`border rounded-md p-2 focus:outline-none focus:ring-2 w-full ${routingError ? "border-red-500 focus:ring-red-500" : "focus:ring-midnightblue"
            }`}
        />
        {routingError && <p className="text-red-500 text-sm">{routingError}</p>}
      </div>

      {/* Account Number */}
      <div className="flex flex-col px-2 py-2">
        <p className="text-sm">Account Number*</p>
        <input
          type="number"
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
    </div>
  );
};

const AddRemoveMembersForm = () => {
  const {
    // Personal Info
    username, firstName, lastName, password, dl, company, referral,
    address1, address2, city, state, zip, phoneNumber, email, membershipType, points,
    picture, setPicture, setUsername, membershipID,

    // Family Info
    spouse, spouseMobile, spouseEmail, childNum, children,

    // Emergency Contact Info
    emergencyContactName, emergencyEmail, emergencyPhone, emergencyRelationship,

    // ACH Info
    depositoryName, branch, achCity, achState, achZip,
    routingNumber, accountNumber, nameOnAccount, accountType,

    // Zustand store functions
    isPersonalInfoComplete, isAchInfoComplete, isEmergencyInfoComplete, resetForm
  } = useFormStore();

  const [activeComponent, setActiveComponent] = useState(null);
  const [infoTab, setInfoTab] = useState('personal');
  const [alertopen, setAlertOpen] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertBody, setAlertBody] = useState('');
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const isButtonEnabled = isPersonalInfoComplete() && isAchInfoComplete() && isEmergencyInfoComplete();

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
    formData.append("email_id", email);
    formData.append("membership_type", membershipType);
    // formData.append("points", points);
    // Convert membershipID and points to integers safely before appending
    formData.append("membershipID", membershipID ? parseInt(membershipID, 10) : 0);
    formData.append("points", points ? parseInt(points, 10) : 0);
    formData.append("file", picture);
    formData.append("dl", dl || "");
    // formData.append('membershipID', membershipID);
    formData.append("referral_information", referral || "");
    formData.append("company_name", company || "");
    formData.append("member_address1", address1);
    formData.append("member_address2", address2 || "");
    formData.append("member_city", city);
    formData.append("member_state", state);
    formData.append("member_zip", zip);
    formData.append("branch", branch);
    formData.append("city", achCity);
    formData.append("zip_code", achZip);
    formData.append("state", achState);
    formData.append("depository_name", depositoryName);
    formData.append("routing_no", routingNumber);
    formData.append("acc_no", accountNumber);
    formData.append("name_on_acc", nameOnAccount);
    formData.append("type_of_acc", accountType);
    // formData.append("date_sub", "2025-01-31");
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
    formData.append("emergency_relationship", emergencyRelationship);

    try {
      const response = await fetch("https://api.kokomoyachtclub.vip/create-member/add-member/", {
        method: "POST",
        body: formData,
        headers: {
          "Accept": "application/json",
        },
      });

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        setMessage({ type: "success", text: "Member added successfully!" });
        setTimeout(() => {
          setMessage(null);
        }, 4000);
        resetForm(); // Reset form on success
        setPicture('');
      } else {
        setMessage({ type: "error", text: data.message || "Failed to add member." });
      }
    } catch (error) {
      setMessage({ type: "error", text: "Network error. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  const handlePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPicture(file); // Zustand will convert it to Base64
    }
  };

  const actions = [
    { label: 'Add Member', type: 'addMember' },
    { label: 'Remove Member', type: 'removeMember' },
  ];

  const typeOfInfo = [
    { label: 'Personal', type: 'personal' },
    { label: 'Family', type: 'family' },
    { label: 'Emergency Contact', type: 'emergency' },
    { label: 'ACH', type: 'ach' },
  ];

  const handleNext = () => {
    const tabs = ['personal', 'family', 'emergency', 'ach'];
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

  const handleCancel = () => {
    setUsername('');
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

          {/* Success/Error Message */}
          {message && (
            <p className={`text-center text-sm mt-2 ${message.type === "success" ? "text-green-500" : "text-red-500"}`}>
              {message.text}
            </p>
          )}

          {/* Image Upload Section */}
          <div className="text-midnightblue mx-auto w-full bg-white p-6 rounded-2xl shadow-xl space-y-4">
            <h3 className="text-lg font-medium">Upload Member's Profile Picture</h3>

            <label className="cursor-pointer bg-blue-700 hover:bg-midnightblue text-white font-medium py-2 px-4 rounded-md shadow-sm inline-block">
              Choose File
              <input
                type="file"
                accept="image/*"
                onChange={handlePictureChange}
                className="hidden"
              />
            </label>

            {/* Display Selected File Name */}
            {picture ? (
              <p className="text-gray-600 text-sm mt-2">{picture.name || "File selected"}</p>
            ) : (
              <p className="text-gray-400 text-sm mt-2">No file chosen</p>
            )}

            {/* Disclaimer */}
            <p className="text-gray-400 text-sm mt-2">Only PNG and JPEG image formats are allowed, and the file size must be under 1MB.</p>

            {/* Image Preview */}
            {/* {picture && (
              <img src={picture} alt="Uploaded" className="w-32 h-32 object-cover rounded-md shadow-md border border-gray-300 mt-2" />
            )} */}
          </div>


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
      <CustomAlert onClose={handleAlertColse} isVisible={alertopen} title={alertTitle} body={alertBody} />
    </div>
  );
};

export default AddRemoveMembersForm;

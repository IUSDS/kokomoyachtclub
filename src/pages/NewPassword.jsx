import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { TiTick } from 'react-icons/ti';
import CustomAlert from '../components/CustomAlert';
import { useNavigation } from 'react-router-dom';

const NewPassword = () => {
  const { search } = useLocation(); // get query string, e.g. "?token=981d15d2b17e45..."
  const queryParams = new URLSearchParams(search);
  const token = queryParams.get('token');
  const navigate = useNavigation();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [successMsg, setSuccessMsg] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertBody, setAlertBody] = useState('');

  // const handleResetReq = async () => {
  //   try {
  //     const response = await fetch('https://api.kokomoyachtclub.vip/forgot/reset-password', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         token: tokenFromURL,   // e.g. extracted from query params
  //         new_password: password // your new password state variable
  //       }),
  //     });
  
  //     if (!response.ok) {
  //       // Handle error
  //       const errorData = await response.json();
  //       console.error(errorData);
  //       // Show some error message in the UI
  //       return;
  //     }
  //     // If successful
  //     console.log('Password reset success');
  //   } catch (error) {
  //     console.error('Error:', error);
  //   }
  // };
  
  const handleResetReq = async () => {
    try {
      if (password !== confirmPassword) {
        setAlertTitle('Try again');
        setAlertBody('Please make sure your passwords match!');
        setAlertOpen(true);
        return;
      }
      console.log(token);
      console.log('working!')
      const response = await fetch('https://api.kokomoyachtclub.vip/forgot/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: token,
          new_password: password
        }),
      });
      if (!response.ok) {
        // Handle error (e.g. invalid token, token expired, etc.)
        const errorData = await response.json();
        setAlertTitle('Error');
        setAlertBody(errorData.detail);
        setAlertOpen(true);
        return;
      }
      const data = response.json();
      console.log(data);
      // If password reset is successfull
      setSuccessMsg(true);
      setTimeout(() => {
        setSuccessMsg(false);
      }, 5000);
      navigate('/login');
    } catch (error) {
      setAlertTitle('Error');
      setAlertBody(error.message || 'An error occurred.');
      setAlertOpen(true);
    }
  };

  const handleAlertClose = () => {
    setAlertOpen(false);
  };

  return (
    <div className='flex flex-col justify-center items-center gap-2 py-20'>
      <p className='font-semibold md:text-2xl text-xl'>Enter New Password</p>
      <p className='px-4 text-center'>
        Your password must contain at least one uppercase, one lowercase, and one special character.
      </p>
      <div className='flex flex-col gap-6 md:w-[600px] mt-6'>
        <form
          className="w-full flex flex-col items-center justify-start gap-3"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            className="font-plus-jakarta-sans px-3 text-mini [outline:none] bg-steelblue rounded-2xl self-stretch h-10 placeholder-gray-300"
            type="password"
            placeholder="Enter New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            className="font-plus-jakarta-sans px-3 text-mini [outline:none] bg-steelblue rounded-2xl self-stretch h-10 placeholder-gray-300"
            type="password"
            placeholder="Re-Enter New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </form>
        <button
          className="w-full cursor-pointer py-2 rounded-2xl hover:bg-opacity-80 transform duration-200 [border:none] text-center text-sm font-medium font-plus-jakarta-sans text-gray-100 bg-midnightblue"
          onClick={handleResetReq}
        >
          Change Password
        </button>
      </div>
      <div className='h-4'>
        {successMsg && (
          <div className='text-green-600 flex items-center justify-center'>
            <TiTick size={30} /> Password Changed Successfully
          </div>
        )}
      </div>

      {/* Custom Alert Section */}
      <CustomAlert
        onClose={handleAlertClose}
        isVisible={alertOpen}
        title={alertTitle}
        body={alertBody}
      />
    </div>
  );
};

export default NewPassword;

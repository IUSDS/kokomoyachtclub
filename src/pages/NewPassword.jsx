import React, { useState } from 'react'
import { TiTick } from "react-icons/ti";
import CustomAlert from '../components/CustomAlert';

const NewPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [successMsg, setSuccessMsg] = useState(false);
  const [alertopen, setAlertOpen] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertBody, setAlertBody] = useState('');
  const handleResetReq = () => {
    if (password !== confirmPassword) {
      setAlertTitle('Try again');
      setAlertBody('Please enter you password carefully!')
      setAlertOpen(true);
    }
    setSuccessMsg(true);
    setTimeout(() => {
      setSuccessMsg(false);
    }, 3000)
  }
  const handleAlertColse = () => {
    setAlertOpen(false);
  }
  return (
    <div className='flex flex-col justify-center items-center gap-2 py-20'>
      <p className='font-semibold md:text-2xl text-xl'>Enter New Password</p>
      <p className='px-4 text-center'>Your password must contain atleast one uppercase, one lowercase and one special character.</p>
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
      <CustomAlert onClose={handleAlertColse} isVisible={alertopen} title={alertTitle} body={alertBody} />
    </div>
  )
}

export default NewPassword;
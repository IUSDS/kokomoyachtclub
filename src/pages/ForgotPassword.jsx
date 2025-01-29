import React, { useState } from 'react'
import { TiTick } from "react-icons/ti";

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [successMsg, setSuccessMsg] = useState(false);
  const handleResetReq = () => {
    setSuccessMsg(true);
    setTimeout(() => {
      setSuccessMsg(false);
    }, 3000)
  }
  return (
    <div className='flex flex-col justify-center items-center gap-2 py-20'>
      <p className='font-semibold md:text-2xl text-xl'>Forgot Your Password?</p>
      <p className='px-4 text-center'>Enter your email address below and we'll send you a link to reset your password.</p>
      <div className='flex flex-col gap-6 md:w-[600px] mt-6'>
        <form
          className="w-full flex flex-col items-center justify-start gap-3"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            className="font-plus-jakarta-sans px-3 text-mini [outline:none] bg-steelblue rounded-2xl self-stretch h-10 placeholder-gray-300"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </form>
        <button
          className="w-full cursor-pointer py-2 rounded-2xl hover:bg-opacity-80 transform duration-200 [border:none] text-center text-sm font-medium font-plus-jakarta-sans text-gray-100 bg-midnightblue"
          onClick={handleResetReq}
        >
          Send Reset Link
        </button>
      </div>
      <div className='h-4'>
        {successMsg && (
          <div className='text-green-600 flex items-center justify-center'>
            <TiTick size={30} /> Link Sent
          </div>
        )}
      </div>
    </div>
  )
}

export default ForgotPassword;
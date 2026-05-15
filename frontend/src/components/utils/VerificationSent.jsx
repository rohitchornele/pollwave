import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { Link, useLocation } from "react-router-dom";
import authService from '../../services/authService';
import { ArrowLeft, Loader2, RefreshCcw } from 'lucide-react';

const VerificationSent = () => {

  const location = useLocation();

  const email = location.state?.email || "Your registered email"

  const [isResending, setIsResending] = useState(false)
  const [countDown, setCountDown] = useState(0)

  useEffect(() => {
    let timer;

    if(countDown > 0) {
      timer = setTimeout(() => setCountDown(countDown -1), 1000)
    }
    return () => clearTimeout(timer)
  }, [countDown])

  const handleResendEmail = async () => {
    if(!location.state?.email) {
      toast.error("Security session expired, please re-register")
    }

    setIsResending(true);

    try {
      await authService.resendVerification(email)
    } catch (error) {
      toast.error(error.response?.data.message || "Rate limit reached")
    }
  }


  return (
    <div className="min-h-screen flex items-center justify-center bg-[#111111] text-white px-4">

      <div className="max-w-md w-full bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 text-center shadow-lg">

        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-full bg-orange-500/20 flex items-center justify-center">
            <svg
              className="w-8 h-8 text-orange-500"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 8l9 6 9-6M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>
        </div>

        {/* Heading */}
        <h2 className="text-2xl font-semibold mb-3">
          Verify Your Email
        </h2>

        {/* Description */}
        <p className="text-gray-300 text-sm mb-6">
          A verification link has been sent to your registered email address.
          Please check your inbox and click the link to activate your account.
        </p>

        {/* Buttons */}
        <div className="space-y-3">

          <button onClick={handleResendEmail} disabled={isResending || countDown > 0}
            className="w-full bg-orange-500 hover:bg-orange-600 transition py-2 rounded-lg text-white font-medium flex justify-center items-center gap-4"
          >
            {isResending ? <Loader2 size={18} /> : <RefreshCcw size={16} className={countDown > 0 ? "opacity-20" : ""} />}
            { countDown === 0 ? `Retry in ${countDown} seconds` : "Resend Verification Email"}
          </button>

          <Link
            to="/login"
            className="text-sm text-orange-400 hover:underline flex justify-center items-center gap-4 mt-6"
          >
            <ArrowLeft size={16} /> Back to Login
          </Link>

        </div>

      </div>
    </div>
  )
}

export default VerificationSent
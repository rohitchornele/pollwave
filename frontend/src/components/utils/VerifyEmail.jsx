import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import authService from "../../services/authService";
import toast from "react-hot-toast";

const VerifyEmail = () => {

  const { token } = useParams();
  const navigate = useNavigate();

  const [status, setStatus] = useState("verifying");
  const [seconds, setSeconds] = useState(9);

  const verificationStarted = useRef(false);

  // useEffect(() => {
  //   if (status === "loading") return;

  //   const timer = setInterval(() => {
  //     setSeconds((prev) => prev - 1);
  //   }, 1000);

  //   return () => clearInterval(timer);
  // }, [status]);


  // useEffect(() => {
  //   if (seconds === 0) {
  //     if (status === "success") {
  //       navigate("/dashboard");
  //     } else if (status === "error") {
  //       navigate("/login");
  //     }
  //   }
  // }, [seconds, status, navigate]);

  useEffect(() => {
    if (verificationStarted.current) return;

    verificationStarted.current = true;

    const verify = async () => {
      try {
        const response = await authService.emailVerification(token);
        setStatus("success");
        toast.success(response?.message || "Email verified successfully")

        setTimeout(() => navigate("/dashboard", { replace: true }), 8000);
      } catch (error) {
        setStatus("error");
        const message = error.response?.data?.message || "Verification Protocol Failed";
        toast.error(message)
        setTimeout(() => navigate("/login", { replace: true }), 8000);
      }
    }

    verify();
  }, [token, navigate])
  

  useEffect(() => {
  let timer = setInterval(() => {
    setSeconds(prev => prev - 1);
  }, 1000);

  return () => clearInterval(timer);
}, []);



  return (
    <div className="min-h-screen flex items-center justify-center bg-[#111111] text-white px-6">

      <div className="max-w-md w-full text-center bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 shadow-lg">

        {/* Loading State */}
        {status === "verifying" && (
          <>
            <div className="flex justify-center mb-6">
              <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
            </div>

            <h2 className="text-xl font-semibold mb-2">
              Verifying Email...
            </h2>

            <p className="text-gray-400 text-sm">
              Please wait while we verify your email address.
            </p>
          </>
        )}

        {/* Success State */}
        {status === "success" && (
          <>
            <div className="flex justify-center mb-6">
              <div className="w-14 h-14 flex items-center justify-center rounded-full bg-green-500/20">
                <svg
                  className="w-8 h-8 text-green-400"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>

            <h2 className="text-xl font-semibold mb-2">
              Email Verified Successfully
            </h2>

            <p className="text-gray-400 text-sm mb-6">
              Your account has been verified. You can now access your dashboard.
            </p>

            <Link
              to="/dashboard"
              className="bg-orange-500 hover:bg-orange-600 px-5 py-2 rounded-lg text-white transition"
            >
              Go to Dashboard
            </Link>
            <p className="text-gray-300 text-sm my-6">
              Redirecting to dashboard in{" "}
              <span className="text-orange-500 font-semibold">
                {seconds}
              </span>{" "}
              seconds...
            </p>
          </>
        )}

        {/* Error State */}
        {status === "error" && (
          <>
            <div className="flex justify-center mb-6">
              <div className="w-14 h-14 flex items-center justify-center rounded-full bg-red-500/20">
                <svg
                  className="w-8 h-8 text-red-400"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
            </div>

            <h2 className="text-xl font-semibold mb-2">
              Verification Failed
            </h2>

            <p className="text-gray-400 text-sm mb-6">
              This verification link is invalid or has expired.
            </p>

            <Link
              to="/login"
              className="bg-orange-500 hover:bg-orange-600 px-5 py-2 rounded-lg text-white transition"
            >
              Back to Login
            </Link>
            <p className="text-gray-300 text-sm my-6">
              Redirecting to login in{" "}
              <span className="text-orange-500 font-semibold">
                {seconds}
              </span>{" "}
              seconds...
            </p>
          </>
        )}

      </div>
    </div>
  );
};

export default VerifyEmail;
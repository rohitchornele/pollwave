import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import authService from "../../services/authService";
import toast from "react-hot-toast";

const ForgotPassword = () => {

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [errorText, setErrorText] = useState("");
  const [successText, setSuccessText] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrorText("");
    setSuccessText("");
    setLoading(true);

    try {

      const response = await authService.forgotPassword({email});
      console.log("Response = ", response)
      setSuccessText(
        response?.message || "Password reset link has been sent to your email."
      );
      toast.success(response?.message || successText)
      setIsSubmitted(true);
      setEmail("");

    } catch (error) {
      setErrorText(
        error.response?.data?.message || "Failed to send reset email, please try again"
      );
      toast.error(error.response.data.message || errorText)
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#111111] text-white px-6">

      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-2xl p-8">

        <h2 className="text-2xl font-bold text-center mb-2">
          Forgot Password
        </h2>

        <p className="text-gray-400 text-center mb-6 text-sm">
          Enter your registered email and we'll send you a password reset link.
        </p>

        {errorText && (
          <div className="bg-red-500/20 text-red-400 text-sm p-3 rounded mb-4">
            {errorText}
          </div>
        )}

        {successText && (
          <div className="bg-green-500/20 text-green-400 text-sm p-3 rounded mb-4">
            {successText}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Enter your email"
            required
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-[#111111]/40 border border-white/20 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-orange-500 outline-none"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>

        </form>

        <p className="text-sm text-gray-400 text-center mt-6">
          Remember your password?{" "}
          <Link
            to="/login"
            className="text-orange-500 font-medium hover:underline"
          >
            Back to Login
          </Link>
        </p>

      </div>

    </div>
  );
};

export default ForgotPassword;
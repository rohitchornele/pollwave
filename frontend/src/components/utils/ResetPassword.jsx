import React, { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import authService from "../../services/authService";
import toast from "react-hot-toast";

const ResetPassword = () => {

  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrorText("");

    if (password.length < 6) {
      setErrorText("Passwords must be at least 6 characters");
      return;
    }

    if (password !== confirmPassword) {
      setErrorText("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const response = await authService.resetPassword({
        token,
        password,
      });

      const message = response?.message || "Password reset successfully";

      toast.success(message);

      setTimeout(() => {
        navigate("/login", { replace: true })
      }, 2000);

    } catch (error) {

      const message = error.response?.data?.message || "Token Verification Failed";

      setErrorText(message);
      toast.error(message);

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#111111] text-white px-6">

      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-2xl p-8">

        <h2 className="text-2xl font-bold text-center mb-2">
          Reset Password
        </h2>

        <p className="text-gray-400 text-center mb-6 text-sm">
          Enter your new password below
        </p>

        {errorText && (
          <div className="bg-red-500/20 text-red-400 text-sm p-3 rounded mb-4">
            {errorText}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Password */}
          <input
            type="password"
            placeholder="New Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-[#111111]/40 border border-white/20 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-orange-500 outline-none"
          />

          {/* Confirm Password */}
          <input
            type="password"
            placeholder="Confirm Password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full bg-[#111111]/40 border border-white/20 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-orange-500 outline-none"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition"
          >
            {loading ? "Resetting..." : "Reset Password"}
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

export default ResetPassword;
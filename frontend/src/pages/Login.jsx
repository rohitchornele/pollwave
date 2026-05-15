
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import { BarChart2, ArrowRight, Eye, EyeOff, AlertCircle } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { login, user, isAuthenticated } = useAuth();

  const from = location.state?.from?.pathname || "/dashboard";

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorText("");

    try {
      const response = await login({ email, password });
      console.log("login response = ", response)
      toast.success(`Welcome back ${response.data?.user?.name.split(" ")[0]}!`);
      navigate(from, { replace: true });
    } catch (err) {
      console.error(err);
      const message = err.response?.data?.message || "Invalid credentials. Please try again.";
      setErrorText(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated && user) {
      navigate("/dashboard", { replace: true });
    }
  }, [isAuthenticated, user, navigate, from]);

  return (
    <>

      {/* ── PAGE SHELL ── */}
      <div className="grain grid-bg font-dm min-h-screen w-full bg-[#0a0a0a] flex items-center justify-center px-4 py-12 relative">

        {/* Decorative glow */}
        <div className="hero-glow" />

        {/* ── CARD ── */}
        <div className="relative z-10 w-full max-w-2xl flex rounded-2xl overflow-hidden border border-white/[0.07] shadow-2xl">

          {/* ── FORM PANEL ── */}
          <div className="flex-1 bg-[#111111] flex flex-col justify-center px-8 py-12 lg:px-12">

            {/* Mobile logo */}
            <div className="flex items-center gap-2 mb-8 lg:hidden fade-up-1">
              <div className="relative w-6 h-6">
                <div className="w-6 h-6 bg-orange-600 rounded-md rotate-12" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <BarChart2 size={11} className="text-white" />
                </div>
              </div>
              <span className="font-syne text-base font-bold text-[#f0ece4]">PollWave</span>
            </div>

            {/* Heading */}
            <div className="mb-8 fade-up-1">
              <p className="text-[11px] font-bold tracking-[0.12em] uppercase text-orange-500 mb-3">
                Welcome back
              </p>
              <h1 className="font-syne text-3xl font-extrabold text-[#f0ece4] leading-tight tracking-tight">
                Sign in to your<br />
                <span className="text-orange-500">workspace.</span>
              </h1>
              <p className="text-[#57534e] text-sm mt-3">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="text-orange-500 font-medium hover:text-orange-400 transition-colors underline underline-offset-2 decoration-orange-500/30"
                >
                  Create one free
                </Link>
              </p>
            </div>

            {/* Error banner */}
            {errorText && (
              <div className="fade-up-2 flex items-start gap-3 bg-red-500/10 border border-red-500/25 text-red-400 text-sm px-4 py-3 rounded-xl mb-6">
                <AlertCircle size={15} className="mt-0.5 shrink-0" />
                <span>{errorText}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">

              {/* Email */}
              <div className="fade-up-3">
                <label className="block text-[11px] font-semibold tracking-widest uppercase text-[#57534e] mb-2">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="you@company.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="
                    w-full bg-white/3 border border-white/10rounded-xl px-4 py-3
                    text-[#e8e4dc] text-sm font-dm transition-all duration-200
                    placeholder:text-[#57534e]
                    focus:outline-none focus:border-orange-600/60 focus:ring-2 focus:ring-orange-600/12
                  "
                />
              </div>

              {/* Password */}
              <div className="fade-up-4">
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-[11px] font-semibold tracking-widest uppercase text-[#57534e]">
                    Password
                  </label>
                  <Link
                    to="/forgot-password"
                    className="text-[11px] text-[#57534e] hover:text-orange-400 transition-colors"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••••"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="
                      w-full bg-white/3 border border-white/10 rounded-xl px-4 py-3 pr-11
                      text-[#e8e4dc] text-sm font-dm transition-all duration-200
                      placeholder:text-[#57534e]
                      focus:outline-none focus:border-orange-600/60 focus:ring-2 focus:ring-orange-600/12
                    "
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    className="
                      absolute right-3.5 top-1/2 -translate-y-1/2
                      bg-transparent border-none cursor-pointer p-0
                      text-[#57534e] hover:text-[#a8a29e]
                      flex items-center transition-colors duration-200
                    "
                  >
                    {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <div className="pt-2 fade-up-5">
                <button
                  type="submit"
                  disabled={loading}
                  className="
                    submit-btn w-full flex items-center justify-center gap-2.5
                    bg-orange-600 hover:bg-orange-700 disabled:bg-orange-900 disabled:cursor-not-allowed
                    text-white font-syne font-semibold text-[15px] tracking-tight
                    py-3.5 rounded-xl transition-all duration-300
                    hover:scale-[1.02] active:scale-[0.99]
                  "
                >
                  {loading ? (
                    <>
                      <span className="spinner" />
                      <span>Signing in…</span>
                    </>
                  ) : (
                    <>
                      Sign In
                      <ArrowRight size={16} />
                    </>
                  )}
                </button>
              </div>

            </form>

            {/* Divider */}
            <div className="fade-up-6 flex items-center gap-3 my-7">
              <div className="flex-1 h-px bg-white/6" />
              <span className="text-[11px] text-[#3c3836] tracking-widest uppercase">or continue with</span>
              <div className="flex-1 h-px bg-white/6" />
            </div>

            {/* OAuth buttons */}
            <div className="fade-up-6 grid grid-cols-2 gap-3">
              {[
                { label: "Google", icon: "G" },
                {
                  label: "GitHub",
                  icon: (
                    <svg viewBox="0 0 16 16" className="w-4 h-4" fill="currentColor">
                      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
                    </svg>
                  ),
                },
              ].map(({ label, icon }) => (
                <button
                  key={label}
                  type="button"
                  className="
                    flex items-center justify-center gap-2.5
                    bg-white/3 hover:bg-white/6
                    border border-white/8 hover:border-white/[0.14]
                    text-[#a8a29e] hover:text-[#e8e4dc]
                    text-sm font-medium py-3 rounded-xl
                    transition-all duration-200 font-dm
                  "
                >
                  <span className="font-syne font-bold text-sm">
                    {typeof icon === "string" ? icon : icon}
                  </span>
                  {label}
                </button>
              ))}
            </div>

            {/* Footer */}
            <p className="text-[11px] text-[#3c3836] text-center mt-8 fade-up-6">
              By signing in, you agree to our{" "}
              <a href="/terms" className="text-[#57534e] hover:text-orange-400 transition-colors">
                Terms
              </a>{" "}
              and{" "}
              <a href="/privacy" className="text-[#57534e] hover:text-orange-400 transition-colors">
                Privacy Policy
              </a>.
            </p>

          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
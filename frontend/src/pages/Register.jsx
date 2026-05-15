import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import authService from "../services/authService";

const Register = () => {
    
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name : "",
        email : "",
        password : "",
        confirmPassword : ""
    })

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [showPassword, setShowPassword] =useState(false)


    const { name, email, password, confirmPassword} = formData;


    const onChange = (e) => {
        setFormData({...formData, [e.target.name] : e.target.value});
        if(error) setError("");
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if(password !== confirmPassword) {
            setError("Security password do not match")
            return
        }

        if(password.length < 6) {
            setError("Password must be 6 characters")
            return 
        }

        try {
            setLoading(true);
            const response = await authService.register({name, email, password});
            toast.success(response.message || "Registration Successfull");

            setTimeout(() => {
                navigate("/verification-sent", { state : {email}, replace : true});
            }, 1000)
        } catch (error) {
            const message = error.response?.data?.message || "Registration failed, check your details";
            setError(message);
            toast.error(message)
        }
    }


    const isFormValid = (
        name &&
        email &&
        password &&
        confirmPassword &&
        password === confirmPassword
    );

    // const handleSubmit = async (e) => {
    //     e.preventDefault();

    //     if (!isFormValid) return;

    //     setLoading(true);
    //     setError("");
    //     setSuccess("");

    //     try {
    //         const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/register`,
    //             {
    //                 name,
    //                 email,
    //                 password,
    //             },
    //             { withCredentials: true }
    //         );

    //         setSuccess(res.data.message || "Registration successful");

    //         setName("");
    //         setEmail("");
    //         setPassword("");
    //         setConfirmPassword("");

    //     } catch (err) {
    //         setError(err.response?.data?.message || "Registration failed");
    //     }

    //     setLoading(false);
    // };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#111111] text-white">

            <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-2xl p-8">

                <h2 className="text-2xl font-bold text-center mb-2">
                    Create Account
                </h2>

                <p className="text-gray-300 text-center mb-6">
                    Start planning your trips with friends
                </p>

                {error && (
                    <div className="bg-red-500/20 text-red-400 text-sm p-3 rounded mb-4">
                        {error}
                    </div>
                )}

                {success && (
                    <div className="bg-green-500/20 text-green-400 text-sm p-3 rounded mb-4">
                        {success}
                    </div>
                )}

                <form onSubmit={onSubmit} className="space-y-4">

                    <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        value={name}
                        onChange={onChange}
                        className="w-full bg-[#111111]/40 border border-white/20 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-orange-500 outline-none"
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={email}
                        onChange={onChange}
                        className="w-full bg-[#111111]/40 border border-white/20 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-orange-500 outline-none"
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={password}
                        onChange={onChange}
                        className="w-full bg-[#111111]/40 border border-white/20 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-orange-500 outline-none"
                    />

                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={onChange}
                        className="w-full bg-[#111111]/40 border border-white/20 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-orange-500 outline-none"
                    />

                    {/* Password mismatch message */}
                    {confirmPassword && password !== confirmPassword && (
                        <p className="text-red-400 text-sm">
                            Passwords do not match
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={!isFormValid || loading}
                        className={`w-full py-2 rounded-lg text-white transition 
              ${isFormValid
                                ? "bg-orange-500 hover:bg-orange-600 cursor-pointer"
                                : "bg-gray-600"
                            }`}
                    >
                        {loading ? "Creating account..." : "Register"}
                    </button>

                </form>

                <p className="text-sm text-gray-400 text-center mt-6">
                    Already have an account?{" "}
                    <Link
                        to="/login"
                        className="text-orange-500 font-medium hover:underline"
                    >
                        Login
                    </Link>
                </p>

            </div>
        </div>
    );
};

export default Register;
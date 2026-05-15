import React from 'react'
import { useAuth } from '../../context/AuthContext'
import { Link, Navigate } from 'react-router-dom';
import { ShieldX } from 'lucide-react';

const RoleBasedRoute = ({ children, requiredRole }) => {

    const { user, isAuthenticated, loading } = useAuth();

    if (loading) {
        return (
            <>
                <div className='flex flex-col items-center justify-center min-h-screen bg-white'>
                    <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600'></div>
                    <p className='mt-6 text-slate-400 font-black tracking-[0.2em] uppercase text-lg'>
                        Verifying Permissions....
                    </p>

                </div>
            </>
        )
    }


    if (!isAuthenticated) {
        return <Navigate to="/login" replace />
    }

    if (user?.role !== requiredRole) {
        return <div className="min-h-screen flex items-center justify-center bg-[#111111] text-white px-6">

            <div className="w-full max-w-lg bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-2xl p-10 text-center">

                {/* Icon */}
                <div className="flex justify-center mb-6">
                    <ShieldX size={60} className="text-orange-500" />
                </div>

                {/* Title */}
                <h1 className="text-3xl font-bold mb-2">
                    Access Denied
                </h1>

                {/* Description */}
                <p className="text-gray-400 mb-8">
                    You don’t have permission to access this page.
                    Please check your account permissions or login again.
                </p>

                {/* Buttons */}
                <div className="flex justify-center gap-4">

                    <Link
                        to="/dashboard"
                        className="bg-orange-500 hover:bg-orange-600 transition px-6 py-2 rounded-lg text-white font-medium"
                    >
                        Go to Dashboard
                    </Link>

                    <Link
                        to="/login"
                        className="border border-white/30 hover:bg-white/10 transition px-6 py-2 rounded-lg"
                    >
                        Login Again
                    </Link>

                </div>

            </div>

        </div>
    }

    return children

}

export default RoleBasedRoute
import React from 'react'
import { useAuth } from '../../context/AuthContext'
import { Navigate, useLocation } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

const ProtectedRoute = ({ children }) => {

    const { isAuthenticated, loading } = useAuth();
    const location = useLocation();


    if (loading) {
        return (
            // <div className='flex flex-col items-center justify-center min-h-screen bg-white'>
            //     <div className="relative">
            //         <Loader2 className='w-12 h-12 text-indigo-600 animate-spin' strokeWidth={2.5} />

            //         <div className='absolute inset-0 blur-xl bg-indigo-400/20 animate-pulse rounded-full'></div>
            //     </div>
            //     <p className='mt-6 text-slate-400 font-black tracking-[0.2em] uppercase text-lg'>
            //         Verifying Identity Node....
            //     </p>

            // </div>

            <div className="flex items-center justify-center min-h-screen">

                <Loader2
                    className="animate-spin"
                    size={40}
                />

            </div>
        )
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />
    }

    return children;
}


export default ProtectedRoute
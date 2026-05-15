import React from "react";
import { Link, useNavigate } from "react-router-dom";

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#111111] text-white px-6">

            <div className="text-center max-w-lg">

                {/* 404 Number */}
                <h1 className="text-7xl font-bold text-orange-500 mb-4">
                    404
                </h1>

                {/* Title */}
                <h2 className="text-2xl font-semibold mb-3">
                    Page Not Found
                </h2>

                {/* Message */}
                <p className="text-gray-400 mb-8">
                    The page you are looking for doesn’t exist or may have been moved.
                </p>

                {/* Buttons */}
                <div className="flex justify-center gap-4">

                    <Link
                        to="/"
                        className="bg-orange-500 hover:bg-orange-600 transition px-6 py-2 rounded-lg text-white"
                    >
                        Go Home
                    </Link>

                    <button
                        onClick={() => navigate(-1)}
                        className="border border-gray-600 hover:border-orange-500 transition px-6 py-2 rounded-lg"
                    >
                        Go Back
                    </button>

                </div>

            </div>

        </div>
    );
};

export default NotFound;
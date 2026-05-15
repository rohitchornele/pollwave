import React, { useCallback, useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import authService from '../services/authService';
import toast from 'react-hot-toast';
import Navbar from '../components/homepage/Navbar';
import DashNavbar from '../components/dashboard/DashNavbar';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {

    const { user: currentUser } = useAuth();

    const [dashboardData, setDashboardData] = useState({ totalUsers: 0, users: [] });

    const [loading, setLoading] = useState(true);
    const [deleteModel, setDeletModel] = useState({ show: false, user: null });
    const [deleting, setDeleting] = useState(false);
    const [searchTerm, setSerachTerm] = useState("")

    const fetchAdminData = useCallback(async () => {
        try {
            const data = await authService.getAdminDashboard();
            console.log("data = ", data)
            setDashboardData(data || { totalUsers: 0, users: [] });
        } catch (error) {
            console.error("Admin fetch error ", error.response);
            let status = error?.response?.status;

            if (status === 403) {
                toast.error("Access Denied : you do-not have admin previlleges")
            } else if (status = 401) {
                toast.error("Session expired : please login again");
            } else {
                toast.error("System unauthorized")
            }
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchAdminData();
    }, [fetchAdminData])

    const handleDeleteUser = async (userid) => {
        if (userid === currentUser._id || userid === currentUser?.id) {
            toast.error("Operation denied : self termination restricted");
            setDeletModel({ show: false, user: null })
            return;
        }


        setDeleting(true);
        try {
            await authService.deleteUSer(userid);
            toast.success("user deleted successfully")
            setDeletModel({ show: false, user: null })
            fetchAdminData();
        } catch (error) {
            toast.error(error.response?.data?.message || "deletion failed");
        } finally {
            setDeleting(false);
        }
    }

    const filteredUsers = dashboardData.users?.filter((u) =>
            u.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            u.email?.toLowerCase().includes(searchTerm.toLowerCase())) || [];

    const adminCount = dashboardData.users?.filter((u) => u.role === "admin").length || 0;

    const verifiedCount = dashboardData.users?.filter((u) => u.isEmailVerified).length || 0;

    // if (loading) {
    //     <div className='min-h-screen bg-gray-200'>
    //         <DashNavbar />
    //         <div className='flex flex-col items-center justify-center h-[70vh]'>

    //             <Loader2 className='w-10 h-10 text-indigo-600 animate-spin mb-4' strokeWidth={2} />

    //             <p className='mt-6 text-slate-500 font-black tracking-widest uppercase text-lg'>
    //                 Accessing system vault......
    //             </p>
    //         </div>

    //     </div>
    // }

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p className="text-lg font-semibold">Loading Dashboard...</p>
            </div>
        );
    }

    return (
        <div className="p-6 bg-gray-100 min-h-screen">

            {/* Heading */}
            <DashNavbar/>
            <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
            <Link to="/dashboard" className='bg-[#111111]/80 px-4 py-2 text-white cursor-pointer rounded-xl'>Go to User Dashboard</Link>
            </div>

            {/* Stats Cards */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">

                <div className="bg-white shadow rounded-xl p-6">
                    <p className="text-gray-500">Total Users</p>
                    <h2 className="text-3xl font-bold">{dashboardData?.totalUsers}</h2>
                </div>

                <div className="bg-white shadow rounded-xl p-6">
                    <p className="text-gray-500">Admins</p>
                    <h2 className="text-3xl font-bold">{adminCount}</h2>
                </div>

                <div className="bg-white shadow rounded-xl p-6">
                    <p className="text-gray-500">Verified Users</p>
                    <h2 className="text-3xl font-bold">{verifiedCount}</h2>
                </div>

            </div>

            {/* Search */}
            <div className="bg-white shadow rounded-xl p-4 mb-6">
                <input
                    type="text"
                    placeholder="Search users..."
                    className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={searchTerm}
                    onChange={(e) => setSerachTerm(e.target.value)}
                />
            </div>

            {/* Users Table */}
            <div className="bg-white shadow rounded-xl overflow-x-auto">
                <table className="w-full">

                    <thead className="bg-gray-200">
                        <tr>
                            <th className="p-3 text-left">Name</th>
                            <th className="p-3 text-left">Email</th>
                            <th className="p-3 text-left">Role</th>
                            <th className="p-3 text-left">Verified</th>
                            <th className="p-3 text-left">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {filteredUsers.length > 0 ? (
                            filteredUsers.map((user) => (
                                <tr
                                    key={user._id}
                                    className="border-t hover:bg-gray-50"
                                >
                                    <td className="p-3">{user.name}</td>
                                    <td className="p-3">{user.email}</td>

                                    <td className="p-3">
                                        <span
                                            className={`px-3 py-1 rounded-full text-sm ${user.role === "admin"
                                                    ? "bg-purple-100 text-purple-700"
                                                    : "bg-gray-100 text-gray-700"
                                                }`}
                                        >
                                            {user.role}
                                        </span>
                                    </td>

                                    <td className="p-3">
                                        {user.isEmailVerified ? (
                                            <span className="text-green-600 font-semibold">
                                                Verified
                                            </span>
                                        ) : (
                                            <span className="text-red-500">Pending</span>
                                        )}
                                    </td>

                                    <td className="p-3">
                                        <button
                                            onClick={() =>
                                                setDeletModel({ show: true, user })
                                            }
                                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan="5"
                                    className="text-center p-6 text-gray-500"
                                >
                                    No users found
                                </td>
                            </tr>
                        )}
                    </tbody>

                </table>
            </div>
        </div>
    );
}

export default AdminDashboard
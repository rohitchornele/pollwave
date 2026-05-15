// import React from 'react'
// import { useAuth } from '../../context/AuthContext';
// import { useNavigate } from 'react-router-dom';
// import { Plus } from 'lucide-react';


// const DashNavbar = () => {

//   const {user, logout, isAuthenticated} = useAuth();
//   const navigate = useNavigate();

//   return (
//     <div className="flex justify-between items-center border-b dark:border-b-neutral-600 px-8 py-4 ">

//       <div className='flex flex-col items-start'>
//         <h2 className="text-xl font-semibold text-white">
//           Welcome back, <span className='text-orange-400'>{user?.name}</span>
//         </h2>

//         <p className="text-sm text-slate-500">
//           Plan your next adventure
//         </p>
//       </div>

//       <button className="bg-orange-500 hover:bg-orange-600 hover:scale-105 transition-all duration-500 ease-in-out
//        text-white px-5 py-2 rounded-full flex items-center gap-2">

//         <Plus/> New Trip
//       </button>

//     </div>
//   );
// };


// export default DashNavbar;
import React from 'react'


const UserProfileCard = ({ user }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border">

      <h3 className="font-semibold mb-6">
        Account Information
      </h3>

      <div className="space-y-4 text-sm">

        <div className="flex justify-between">
          <span className="text-gray-500">Name</span>
          <span>{user?.name}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-500">Email</span>
          <span>{user?.email}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-500">Role</span>
          <span>{user?.role}</span>
        </div>

      </div>

    </div>
  );
};

export default UserProfileCard;
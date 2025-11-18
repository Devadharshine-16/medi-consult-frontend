import React from "react";
import { Link } from "react-router-dom";

function UserProfileCard({ user }) {
  if (!user) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="bg-gradient-to-r from-blue-500 to-teal-400 p-4">
        <div className="flex items-center">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-blue-500 text-2xl font-bold">
            {user.name ? user.name.charAt(0).toUpperCase() : "U"}
          </div>
          <div className="ml-4 text-white">
            <h3 className="text-xl font-semibold">{user.name}</h3>
            <p className="text-blue-100">{user.email}</p>
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-gray-50 p-3 rounded">
            <p className="text-xs text-gray-500">Phone</p>
            <p className="font-medium">{user.phone || "Not provided"}</p>
          </div>
          <div className="bg-gray-50 p-3 rounded">
            <p className="text-xs text-gray-500">Member Since</p>
            <p className="font-medium">
              {user.createdAt 
                ? new Date(user.createdAt).toLocaleDateString() 
                : new Date().toLocaleDateString()}
            </p>
          </div>
        </div>
        
        <Link 
          to="/profile" 
          className="block w-full text-center bg-blue-50 hover:bg-blue-100 text-blue-600 py-2 rounded transition"
        >
          View Full Profile
        </Link>
      </div>
    </div>
  );
}

export default UserProfileCard;
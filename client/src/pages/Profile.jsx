import React from "react";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";

const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12 flex justify-center items-start">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white w-full max-w-md rounded-2xl shadow-xl p-8 border border-gray-100"
      >
        <h1 className="text-3xl font-bold text-center text-primary mb-6">
          👤 My Profile
        </h1>

        {user ? (
          <div className="space-y-4 text-gray-700">
            <div className="flex items-center justify-between">
              <span className="font-semibold">Name:</span>
              <span>{user.name || "N/A"}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-semibold">Email:</span>
              <span>{user.email}</span>
            </div>
            <div className="text-sm text-gray-400 text-right pt-2">
              User ID: <span className="text-gray-500">{user._id}</span>
            </div>
          </div>
        ) : (
          <p className="text-red-600 text-center font-medium">
            User not logged in.
          </p>
        )}
      </motion.div>
    </div>
  );
};

export default Profile;

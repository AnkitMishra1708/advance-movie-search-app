import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import { FetchCurrentUser } from "../Helper/FetchCurrentUser";

const ProfilePage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function currentUser() {
      try {
        const userdata = await FetchCurrentUser();
        console.log("userdata", userdata);
        setUser(userdata);
      } catch (err) {
        console.error("Error fetching current user:", err);
      }
    }
    currentUser();
  }, []);

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-950 text-white px-4 py-10">
        <div className="max-w-3xl mx-auto">

          <div className="flex flex-col items-center mb-10">
            <div className="w-24 h-24 rounded-full bg-green-500 flex items-center justify-center text-4xl font-bold">
              {user?.fullName?.charAt(0).toUpperCase() || "U"}
            </div>

            <h2 className="text-3xl font-bold mt-4">
              Hey, {user?.fullName || "User"}
            </h2>

            <p className="text-gray-400 mt-1">
              Welcome back Chief 🫡
            </p>
          </div>

          <div className="bg-gray-900 rounded-2xl p-6 sm:p-8 shadow-lg space-y-6">
            <div>
              <p className="text-gray-400 text-sm">User Name</p>
              <p className="text-lg font-semibold">
                {user?.fullName || "N/A"}
              </p>
            </div>

            <div>
              <p className="text-gray-400 text-sm">Email Address</p>
              <p className="text-lg font-semibold wrap-break-word">
                {user?.email || "N/A"}
              </p>
            </div>

            <div>
              <p className="text-gray-400 text-sm">Phone Number</p>
              <p className="text-lg font-semibold">
                {user?.number || "N/A"}
              </p>
            </div>

            <div>
              <p className="text-gray-400 text-sm">Account Created</p>
              <p className="text-lg font-semibold">
                {user?.createdAt
                  ? new Date(user.createdAt).toLocaleDateString()
                  : "N/A"}
              </p>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default ProfilePage;

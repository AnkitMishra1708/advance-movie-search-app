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

      <div className="min-h-screen bg-gray-950 text-white mx-auto px-4">
        <h2 className="text-3xl font-bold text-center pt-10 mb-10">
          Hey, {user?.fullName || "User"} 👋
        </h2>
        <div className="text-2xl px-10 mt-10 space-y-10">
          <div>
            <span> User: </span><br />
            <span> {user?.fullName} </span>
          </div>
          <div>
            <span> Your email: </span><br />
            <span> {user?.email} </span>
          </div>
          <div>
            <span> Your Number: </span><br />
            <span> {user?.number} </span>
          </div>
          <div>
            <span> Account Created: </span><br />
            <span>{user?.createdAt} </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;

import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FetchCurrentUser, FetchLogoutUser } from "../Helper/FetchCurrentUser";
import { Toaster, toast } from "react-hot-toast";
import SearchBar from "./SearchBar.jsx";

const Navbar = () => {
  const navigate = useNavigate();
  const [openProfile, setOpenProfile] = useState(false);
  const dropdownRef = useRef(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function currentUser() {
      const userdata = await FetchCurrentUser();
      setUser(userdata);
    }
    currentUser();
  }, []);

  const logout = async () => {
    await FetchLogoutUser();
    setTimeout(() => {
      toast.success("User logged out Successfully!");
      navigate("/");
    }, 700);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenProfile(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleRefresh = () => {
    window.location.reload();
  };
  return (
    <>
      <div>
        <Toaster />
      </div>
      <div className="bg-black sticky top-0 z-50 ">
        <nav className="w-full text-white bg-black/70 backdrop-blur-md shadow-2xl shadow-gray-800 px-6 py-4 flex justify-between items-center">
          <Link to="/home">
            <h1
              onClick={handleRefresh}
              className="text-2xl font-bold rounded cursor-pointer text-White"
            >
              PotatoFilms
            </h1>
          </Link>

          <SearchBar />

          <div className="flex items-center font-medium gap-6">
            <NavLink
              to="/home"
              className={({ isActive }) =>
                `cursor-pointer ${
                  isActive
                    ? "text-gray-600 font-semibold"
                    : "hover:text-gray-600"
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/favourite-list"
              className={({ isActive }) =>
                `cursor-pointer ${
                  isActive
                    ? "text-gray-600 font-semibold"
                    : "hover:text-gray-600"
                }`
              }
            >
              FavouriteList
            </NavLink>
            <NavLink
              to="/watch-list"
              className={({ isActive }) =>
                `cursor-pointer ${
                  isActive
                    ? "text-gray-600 font-semibold"
                    : "hover:text-gray-600"
                }`
              }
            >
              WatchList
            </NavLink>
            <NavLink
              to="/reviews"
              className={({ isActive }) =>
                `cursor-pointer ${
                  isActive
                    ? "text-gray-600 font-semibold"
                    : "hover:text-gray-600"
                }`
              }
            >
              Reviews
            </NavLink>
            <div className="relative cursor-pointer" ref={dropdownRef}>
              <div
                onClick={() => setOpenProfile(!openProfile)}
                className="w-10 h-10 bg-green-500 text-white flex items-center justify-center rounded-full cursor-pointer"
              >
                {user?.fullName?.charAt(0).toUpperCase() || "U"}
              </div>

              {openProfile && (
                <div className="absolute right-0 mt-3 w-44 bg-gray-800 rounded-lg shadow-lg border">
                  <NavLink
                    to="/profile-page"
                    className={({ isActive }) =>
                      `cursor-pointer ${
                        isActive
                          ? "text-gray-600 font-semibold"
                          : "hover:text-gray-600"
                      }`
                    }
                  >
                    <button className="w-full text-left px-4 py-2 cursor-pointer hover:bg-gray-200">
                      Profile
                    </button>
                  </NavLink>
                  <button
                    onClick={logout}
                    className="w-full text-left px-4 py-2 cursor-pointer text-red-500 hover:bg-gray-200"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navbar;

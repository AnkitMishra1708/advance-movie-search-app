import React, { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FetchCurrentUser, FetchLogoutUser } from "../Helper/FetchCurrentUser";
import { Toaster, toast } from "react-hot-toast";
import SearchBar from "./SearchBar.jsx";

const Navbar = () => {
  const navigate = useNavigate();
  const [openProfile, setOpenProfile] = useState(false);
  const dropdownRef = useRef(null);
  const [user, setUser] = useState(null);
  const [mobileMenu, setMobileMenu] = useState(false);

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
      navigate("/login");
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
        <nav className="w-full text-white bg-black/70 backdrop-blur-md shadow-2xl shadow-gray-800 px-4 md:px-6 py-4">

          <div className="flex justify-between items-center">
            <h1
              onClick={handleRefresh}
              className="text-xl md:text-2xl font-bold cursor-pointer"
            >
              PotatoFilms
            </h1>

            <div className="hidden md:flex flex-1 justify-center px-6">
              <SearchBar />
            </div>

            <div className="hidden md:flex items-center font-medium gap-6">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "text-gray-400 font-semibold"
                    : "hover:text-gray-400"
                }
              >
                Home
              </NavLink>

              <NavLink
                to="/favourite-list"
                className={({ isActive }) =>
                  isActive
                    ? "text-gray-400 font-semibold"
                    : "hover:text-gray-400"
                }
              >
                FavouriteList
              </NavLink>

              <NavLink
                to="/watch-list"
                className={({ isActive }) =>
                  isActive
                    ? "text-gray-400 font-semibold"
                    : "hover:text-gray-400"
                }
              >
                WatchList
              </NavLink>

              <NavLink
                to="/reviews"
                className={({ isActive }) =>
                  isActive
                    ? "text-gray-400 font-semibold"
                    : "hover:text-gray-400"
                }
              >
                Reviews
              </NavLink>

              <div className="relative cursor-pointer" ref={dropdownRef}>
                <div
                  onClick={() => setOpenProfile(!openProfile)}
                  className="w-10 h-10 bg-green-500 text-white flex items-center justify-center rounded-full"
                >
                  {user?.fullName?.charAt(0).toUpperCase() || "U"}
                </div>

                {openProfile && (
                  <div className="absolute right-0 mt-3 w-44 bg-gray-800 rounded-lg shadow-lg border">
                    <NavLink to="/profile-page">
                      <button className="w-full text-left px-4 py-2 hover:bg-gray-200 hover:text-black text-white">
                        Profile
                      </button>
                    </NavLink>

                    <button
                      onClick={logout}
                      className="w-full text-left px-4 py-2 text-red-500 hover:bg-gray-200"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>

            <button
              className="md:hidden"
              onClick={() => setMobileMenu(!mobileMenu)}
            >
              {mobileMenu ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>

          <div className="mt-4 md:hidden">
            <SearchBar />
          </div>

          {mobileMenu && (
            <div className="md:hidden flex flex-col gap-4 mt-5 border-t border-gray-700 pt-4">

              <NavLink to="/" onClick={() => setMobileMenu(false)}>
                Home
              </NavLink>

              <NavLink
                to="/favourite-list"
                onClick={() => setMobileMenu(false)}
              >
                FavouriteList
              </NavLink>

              <NavLink
                to="/watch-list"
                onClick={() => setMobileMenu(false)}
              >
                WatchList
              </NavLink>

              <NavLink
                to="/reviews"
                onClick={() => setMobileMenu(false)}
              >
                Reviews
              </NavLink>

              <NavLink
                to="/profile-page"
                onClick={() => setMobileMenu(false)}
              >
                Profile
              </NavLink>

              <button
                onClick={logout}
                className="text-left text-red-500"
              >
                Logout
              </button>
            </div>
          )}
        </nav>
      </div>
    </>
  );
};

export default Navbar;

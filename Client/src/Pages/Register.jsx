import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Api from "../Helper/Api.jsx";
import { Toaster, toast } from "react-hot-toast";

export default function Register() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    number: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value.toString() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await Api.post("/users/register", form);
      const res = data.data;

      if (res) {
        toast.success(res.message);
        console.log("Register response:", res.message);
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    } catch (err) {
      const message = err.response.data.message;
      toast.error(message);
      console.log("Register Error:", message);
    }
  };

  return (
    <>
      <div>
        <Toaster />
      </div>

      <div className="min-h-screen bg-gray-900 text-white">
        <nav className="w-full bg-gray-950 shadow p-4 flex justify-between items-center">
          <h1 className="text-xl cursor-pointer font-bold">PotatoFilms</h1>
          <Link to="/">
            <button className="px-4 py-2 bg-blue-500 cursor-pointer text-white rounded-lg hover:bg-blue-600">
              Login
            </button>
          </Link>
        </nav>

        <div className="text-center mt-10">
          <h2 className="text-4xl font-bold">Register</h2>
        </div>

        <div className="max-w-md mx-auto bg-gray-900 p-6 mt-10 rounded-xl shadow">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block mb-1 font-medium">Full Name</label>
              <input
                onChange={handleChange}
                type="text"
                name="fullName"
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Email</label>
              <input
                type="email"
                name="email"
                onChange={handleChange}
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Phone Number</label>
              <input
                type="tel"
                name="number"
                onChange={handleChange}
                pattern="[0-9]{10}"
                maxLength={10}
                minLength={10}
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your phone number"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Password</label>
              <div className="relative">
                <input
                  onChange={handleChange}
                  name="password"
                  type={showPassword ? "text" : "password"}
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter your password"
                />
                <span
                  className="absolute right-3 top-2 cursor-pointer select-none text-gray-600"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "🙈" : "👁️"}
                </span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 cursor-pointer text-white py-2 rounded-lg hover:bg-blue-600"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

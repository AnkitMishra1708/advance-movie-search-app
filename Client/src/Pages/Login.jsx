import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import Api from "../Helper/Api.jsx";

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
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
      const data = await Api.post("/users/login", form);
      const res = data.data;

      toast.success(res.message);

      setTimeout(() => {
        navigate("/home");
      }, 1000);
    } catch (err) {
      const message = err.response.data.message;
      toast.error(message);
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

          <Link to="/register">
            <button className="px-4 py-2 bg-blue-500 cursor-pointer text-white rounded-lg hover:bg-blue-600">
              Create an account
            </button>
          </Link>
        </nav>

        <div className="text-center mt-10">
          <h2 className="text-4xl font-bold">Log In</h2>
        </div>

        <div className="max-w-md mx-auto bg-gray-900 text-white p-6 mt-10 rounded-xl shadow">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block mb-1 font-medium">Email</label>
              <input
                onChange={handleChange}
                type="email"
                name="email"
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your email"
              />
              <center>
                <b>OR</b>
              </center>
              <label className="block mb-1 font-medium">Number</label>
              <input
                onChange={handleChange}
                type="text"
                name="number"
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your number"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Password</label>
              <div className="relative">
                <input
                  onChange={handleChange}
                  type={showPassword ? "text" : "password"}
                  name="password"
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
              className="w-full cursor-pointer bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
            >
              Log in
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

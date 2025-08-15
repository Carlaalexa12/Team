import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [user, setUser] = useState(null); // Track current user
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("user", JSON.stringify(formData));
    setUser(formData); // Update local state
    navigate("/"); // Optional: You can remove this if you want to stay on the same page
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setFormData({ name: "", email: "" });
  };

  return (
    <div className="max-w-xl mx-auto py-16">
      {!user ? (
        <>
          <h2 className="text-3xl font-bold mb-6 text-center">Login</h2>
          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-xl shadow space-y-5"
          >
            <div>
              <label htmlFor="name" className="block text-sm font-medium">
                Name
              </label>
              <input
                name="name"
                id="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full mt-1 border rounded-md px-3 py-2"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium">
                Email
              </label>
              <input
                name="email"
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full mt-1 border rounded-md px-3 py-2"
              />
            </div>

            <button
              type="submit"
              className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
            >
              Save & Continue
            </button>
          </form>
        </>
      ) : (
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-semibold">
            Welcome, {user.name}!
          </h2>
          <p className="text-gray-600">Email: {user.email}</p>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

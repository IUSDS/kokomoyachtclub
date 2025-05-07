import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../authStore";
import { loginImg } from "../assets/images";

// pick your API base from env (Vite / CRA)
const API_BASE = import.meta.env.DEV
  ? "http://localhost:8000"
  : "https://api.kokomoyachtclub.vip";

export default function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const loginStore = useAuthStore((s) => s.login);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // 1️⃣ Validate credentials
      const payload = new FormData();
      payload.append("username", form.username);
      payload.append("password", form.password);

      const res = await fetch(`${API_BASE}/validate-user/validate-user/`, {
        method: "POST",
        body: payload,
        credentials: "include",
      });
      const data = await res.json();

      if (!res.ok || data.status !== "SUCCESS") {
        throw new Error(data.detail || "Invalid credentials");
      }

      // 2️⃣ Fetch current user to confirm session
      const userRes = await fetch(`${API_BASE}/validate-user/current-user/`, {
        method: "GET",
        credentials: "include",
      });
      if (!userRes.ok) {
        throw new Error("Session could not be established");
      }
      const userData = await userRes.json();

      // 3️⃣ Store in Zustand & redirect
      loginStore(userData, data.user_type);
      const route =
        data.user_type.toLowerCase() === "admin"
          ? "/admin"
          : "/new-member-portal";
      navigate(route);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero */}
      <div className="relative h-80 w-full">
        <img src={loginImg} alt="Hero" className="object-cover w-full h-full" />
        <div className="absolute inset-0 bg-black opacity-20" />
        <h1 className="absolute inset-0 flex items-center text-center px-4 justify-center text-white xl:text-6xl text-4xl font-bold">
          Welcome to Kokomo Yacht Club
        </h1>
      </div>

      {/* Form */}
      <main className="flex-grow flex flex-col items-center justify-center p-4">
        <h1 className="flex items-center text-center px-4 justify-center text-black md:text-4xl text-xl font-bold">
          Welcome to Kokomo Yacht Club
        </h1>
        <p className="text-gray-600 text-center">Please log in to continue</p>
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md space-y-6 p-8 rounded-xl"
        >
          <input
            name="username"
            type="text"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            disabled={loading}
            className="w-full px-4 py-2 bg-gray-100 rounded-md outline-none"
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            disabled={loading}
            className="w-full px-4 py-2 bg-gray-100 rounded-md outline-none"
          />

          <p className="h-4 text-red-500 text-sm text-center">
            {error || "\u00A0"}
          </p>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 rounded-md bg-blue-600 text-white disabled:opacity-50"
          >
            {loading ? "Logging in…" : "Log In"}
          </button>

          <p
            onClick={() => navigate("/forgot_password")}
            className="text-sm text-center text-blue-600 hover:underline cursor-pointer"
          >
            Forgot Password?
          </p>
        </form>
      </main>
    </div>
  );
}

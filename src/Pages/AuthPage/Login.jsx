import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await fetch("https://resturant-backend-chi.vercel.app/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (!res.ok) return alert(data.message);

    login(data);
    alert("Login Success");

    navigate("/");
  };

  return (
    <form className="flex flex-col gap-4">
      <input
        name="email"
        placeholder="Email"
        onChange={handleChange}
        className="border p-3 rounded"
      />

      <input
        name="password"
        type="password"
        placeholder="Password"
        onChange={handleChange}
        className="border p-3 rounded"
      />

      <button className="bg-orange-500 text-white py-3 rounded" onClick={handleLogin}>
        Login
      </button>

      <p>
        No account? <Link to="/auth/register">Register</Link>
      </p>
    </form>
  );
};
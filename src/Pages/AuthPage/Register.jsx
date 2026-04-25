import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Upload image to imgbb
  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    const res = await fetch(
      `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_KEY}`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();
    return data.data.url;
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    let imageUrl = "";

    if (file) {
      imageUrl = await uploadImage(file);
    }

    const res = await fetch("https://resturant-backend-chi.vercel.app/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        image: imageUrl,
      }),
    });

    const data = await res.json();

    if (!res.ok) return alert(data.message);

    alert("Registered Successfully");

    navigate("/auth/login");
  };

  return (
    <form className="flex flex-col gap-4">

      <input
        name="name"
        placeholder="Name"
        onChange={handleChange}
        className="border p-3 rounded"
      />

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

      {/* IMAGE */}
      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
        className="border p-2"
      />

      {file && (
        <img
          src={URL.createObjectURL(file)}
          className="w-20 h-20 rounded-full mx-auto"
        />
      )}

      <button className="bg-orange-500 text-white py-3 rounded" onClick={handleRegister}>
        Register
      </button>

      <p>
        Already have account? <Link to="/auth/login">Login</Link>
      </p>

    </form>
  );
};
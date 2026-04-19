import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";

export default function AddMenuItem() {
  // 🧠 form state
  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    mealTimes: [],
  });

  // ===============================
  // 📥 FETCH MEAL TIMES FROM BACKEND
  // ===============================
  const fetchMealTimes = async () => {
    const res = await fetch("http://localhost:5000/api/time/meal-times");
    if (!res.ok) throw new Error("Failed to fetch meal times");
    return res.json();
  };

  const { data: mealTimes = [] } = useQuery({
    queryKey: ["meal-times"],
    queryFn: fetchMealTimes,
  });

  // ===============================
  // 🔥 MUTATION (CREATE MENU ITEM)
  // ===============================
  const mutation = useMutation({
    mutationFn: async (data) => {
      const res = await fetch("http://localhost:5000/api/menu/menu-items-create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error("Failed to create menu item");
      }

      return res.json();
    },

    onSuccess: () => {
      alert("✅ Menu Item Added Successfully!");

      setForm({
        name: "",
        price: "",
        description: "",
        mealTimes: [],
      });
    },

    onError: (err) => {
      alert(err.message);
    },
  });

  // ===============================
  // ✍️ HANDLE INPUT CHANGE
  // ===============================
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // ===============================
  // 🍔 TOGGLE MEAL TIME SELECT
  // ===============================
  const toggleMealTime = (id) => {
    setForm((prev) => {
      const exists = prev.mealTimes.includes(id);

      return {
        ...prev,
        mealTimes: exists
          ? prev.mealTimes.filter((x) => x !== id)
          : [...prev.mealTimes, id],
      };
    });
  };

  // ===============================
  // 🚀 SUBMIT
  // ===============================
  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      name: form.name,
      price: Number(form.price),
      description: form.description,
      mealTimes: form.mealTimes,
    };

    mutation.mutate(payload);
  };

  // ===============================
  // 🎨 UI
  // ===============================
  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-50 p-6">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">

        <h2 className="text-2xl font-bold text-center mb-6">
          🍔 Add Menu Item
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          {/* NAME */}
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Item Name"
            className="border p-3 rounded"
            required
          />

          {/* PRICE */}
          <input
            name="price"
            value={form.price}
            onChange={handleChange}
            placeholder="Price"
            type="number"
            className="border p-3 rounded"
            required
          />

          {/* DESCRIPTION */}
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
            className="border p-3 rounded"
          />

          {/* =============================== */}
          {/* 🍽️ MEAL TIME MULTI SELECT */}
          {/* =============================== */}
          <div>
            <p className="font-semibold mb-2">Meal Times</p>

            <div className="flex flex-wrap gap-2">
              {mealTimes.map((meal) => (
                <button
                  type="button"
                  key={meal._id}
                  onClick={() => toggleMealTime(meal._id)}
                  className={`px-4 py-2 rounded-full border text-sm transition ${
                    form.mealTimes.includes(meal._id)
                      ? "bg-orange-500 text-white"
                      : "bg-white text-black"
                  }`}
                >
                  {meal.name}
                </button>
              ))}
            </div>
          </div>

          {/* SUBMIT */}
          <button
            type="submit"
            disabled={mutation.isPending}
            className="bg-orange-500 text-white py-3 rounded font-semibold"
          >
            {mutation.isPending ? "Adding..." : "Add Menu Item"}
          </button>

        </form>
      </div>
    </div>
  );
}
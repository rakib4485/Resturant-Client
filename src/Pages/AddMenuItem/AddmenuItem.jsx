import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";

export default function AddMenuItem() {
  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    mealTimes: [],
    image: null, // 🖼️ new
  });

  // ===============================
  // 📥 FETCH MEAL TIMES
  // ===============================
  const fetchMealTimes = async () => {
    const res = await fetch("https://resturant-backend-chi.vercel.app/api/time/meal-times");
    if (!res.ok) throw new Error("Failed to fetch meal times");
    return res.json();
  };

  const { data: mealTimes = [] } = useQuery({
    queryKey: ["meal-times"],
    queryFn: fetchMealTimes,
  });

  // ===============================
  // 🔥 MUTATION
  // ===============================
  const mutation = useMutation({
    mutationFn: async (data) => {
      // 🖼️ STEP 1: Upload image to imagebb
      let imageUrl = "";

      if (form.image) {
        const imgData = new FormData();
        imgData.append("image", form.image);

        const res = await fetch(
          `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_KEY}`,
          {
            method: "POST",
            body: imgData,
          }
        );

        const imgRes = await res.json();

        if (!imgRes.success) {
          throw new Error("Image upload failed");
        }

        imageUrl = imgRes.data.url;
      }

      // 🧠 STEP 2: send to backend
      const payload = {
        name: data.name,
        price: Number(data.price),
        description: data.description,
        mealTimes: data.mealTimes,
        image: imageUrl, // 👈 send image url
      };

      const response = await fetch(
        "https://resturant-backend-chi.vercel.app/api/menu/menu-items-create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create menu item");
      }

      return response.json();
    },

    onSuccess: () => {
      alert("✅ Menu Item Added!");

      setForm({
        name: "",
        price: "",
        description: "",
        mealTimes: [],
        image: null,
      });
    },

    onError: (err) => {
      alert(err.message);
    },
  });

  // ===============================
  // HANDLERS
  // ===============================
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    setForm({
      ...form,
      image: e.target.files[0],
    });
  };

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

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(form);
  };

  // ===============================
  // UI
  // ===============================
  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-50 p-6">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">

        <h2 className="text-2xl font-bold text-center mb-6">
          🍔 Add Menu Item
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Item Name"
            className="border p-3 rounded"
            required
          />

          <input
            name="price"
            value={form.price}
            onChange={handleChange}
            type="number"
            placeholder="Price"
            className="border p-3 rounded"
            required
          />

          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
            className="border p-3 rounded"
          />

          {/* 🖼️ IMAGE INPUT */}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="border p-2 rounded"
          />

          {/* 🍽️ MEAL TIMES */}
          <div>
            <p className="font-semibold mb-2">Meal Times</p>

            <div className="flex flex-wrap gap-2">
              {mealTimes.map((meal) => (
                <button
                  type="button"
                  key={meal._id}
                  onClick={() => toggleMealTime(meal._id)}
                  className={`px-4 py-2 rounded-full border ${
                    form.mealTimes.includes(meal._id)
                      ? "bg-orange-500 text-white"
                      : "bg-white"
                  }`}
                >
                  {meal.name}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={mutation.isPending}
            className="bg-orange-500 text-white py-3 rounded"
          >
            {mutation.isPending ? "Uploading..." : "Add Item"}
          </button>
        </form>
      </div>
    </div>
  );
}
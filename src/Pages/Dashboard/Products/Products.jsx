import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { FaEdit } from "react-icons/fa";

export default function Products() {
  const queryClient = useQueryClient();

  const [editingItem, setEditingItem] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  // ===============================
  // 📥 FETCH PRODUCTS
  // ===============================
  const fetchProducts = async () => {
    const res = await fetch(
      "http://localhost:5000/api/menu/menu-items"
    );
    if (!res.ok) throw new Error("Failed to fetch products");
    return res.json();
  };

  const { data: products = [] } = useQuery({
    queryKey: ["menu-items"],
    queryFn: fetchProducts,
  });

  // ===============================
  // 🍽 FETCH MEAL TIMES
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
  // 🖼 IMAGE UPLOAD (ImageBB)
  // ===============================
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

  // ===============================
  // 🔥 UPDATE MUTATION
  // ===============================
  const updateMutation = useMutation({
    mutationFn: async (data) => {
      const res = await fetch(
        `http://localhost:5000/api/menu/menu-items/${data._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!res.ok) throw new Error("Update failed");
      return res.json();
    },

    onSuccess: () => {
      alert("✅ Updated successfully");
      setEditingItem(null);
      setImageFile(null);
      queryClient.invalidateQueries(["menu-items"]);
    },

    onError: (err) => {
      alert(err.message);
    },
  });

  // ===============================
  // 📝 HANDLE INPUT
  // ===============================
  const handleChange = (e) => {
    setEditingItem({
      ...editingItem,
      [e.target.name]: e.target.value,
    });
  };

  // ===============================
  // 🍔 TOGGLE MEAL TIME
  // ===============================
  const toggleMealTime = (id) => {
    setEditingItem((prev) => {
      const exists = prev.mealTimes?.includes(id);

      return {
        ...prev,
        mealTimes: exists
          ? prev.mealTimes.filter((x) => x !== id)
          : [...(prev.mealTimes || []), id],
      };
    });
  };

  // ===============================
  // 🚀 UPDATE
  // ===============================
  const handleUpdate = async (e) => {
    e.preventDefault();

    let imageUrl = editingItem.image;

    if (imageFile) {
      imageUrl = await uploadImage(imageFile);
    }

    const payload = {
      ...editingItem,
      image: imageUrl,
      price: Number(editingItem.price),
      mealTimes: editingItem.mealTimes,
    };

    updateMutation.mutate(payload);
  };

  return (
    <div className="p-6 bg-orange-50 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-center">
        🍽 Menu Items
      </h2>

      {/* =============================== */}
      {/* PRODUCT GRID */}
      {/* =============================== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((item) => (
          <div
            key={item._id}
            className="bg-white shadow-lg rounded-xl p-4 relative"
          >
            {/* EDIT BUTTON */}
            <FaEdit
              className="absolute top-3 right-3 cursor-pointer text-gray-500 hover:text-orange-500"
              onClick={() => {
                setEditingItem({
                  ...item,
                  mealTimes: item.mealTimes?.map((m) =>
                    typeof m === "object" ? m._id : m
                  ),
                });
                setImageFile(null);
              }}
            />

            {/* IMAGE */}
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-40 object-cover rounded mb-3"
            />

            <h3 className="text-xl font-bold">{item.name}</h3>
            <p className="text-gray-500 text-sm">{item.description}</p>

            <p className="text-orange-500 font-bold mt-2">
              ৳ {item.price}
            </p>
          </div>
        ))}
      </div>

      {/* =============================== */}
      {/* ✏️ EDIT MODAL */}
      {/* =============================== */}
      {editingItem && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-md">

            <h3 className="text-xl font-bold mb-4">
              ✏️ Edit Product
            </h3>

            <form onSubmit={handleUpdate} className="flex flex-col gap-3">

              {/* NAME */}
              <input
                name="name"
                value={editingItem.name}
                onChange={handleChange}
                className="border p-2 rounded"
              />

              {/* PRICE */}
              <input
                name="price"
                value={editingItem.price}
                onChange={handleChange}
                type="number"
                className="border p-2 rounded"
              />

              {/* DESCRIPTION */}
              <textarea
                name="description"
                value={editingItem.description}
                onChange={handleChange}
                className="border p-2 rounded"
              />

              {/* CURRENT IMAGE */}
              <img
                src={editingItem.image}
                className="w-full h-40 object-cover rounded"
              />

              {/* IMAGE INPUT */}
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files[0])}
                className="border p-2 rounded"
              />

              {/* MEAL TIMES */}
              <div>
                <p className="font-semibold mb-2">Meal Times</p>

                <div className="flex flex-wrap gap-2">
                  {mealTimes.map((meal) => (
                    <button
                      type="button"
                      key={meal._id}
                      onClick={() => toggleMealTime(meal._id)}
                      className={`px-3 py-1 rounded-full border text-sm ${
                        editingItem.mealTimes?.includes(meal._id)
                          ? "bg-orange-500 text-white"
                          : "bg-white text-black"
                      }`}
                    >
                      {meal.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* BUTTONS */}
              <div className="flex gap-2 mt-3">
                <button
                  type="submit"
                  className="bg-orange-500 text-white px-4 py-2 rounded"
                >
                  {updateMutation.isPending
                    ? "Updating..."
                    : "Update"}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setEditingItem(null);
                    setImageFile(null);
                  }}
                  className="bg-gray-300 px-4 py-2 rounded"
                >
                  Cancel
                </button>
              </div>

            </form>
          </div>
        </div>
      )}
    </div>
  );
}
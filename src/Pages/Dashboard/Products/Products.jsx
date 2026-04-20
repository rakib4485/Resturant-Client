import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { FaEdit } from "react-icons/fa";

export default function Products() {
  const queryClient = useQueryClient();

  const [editingItem, setEditingItem] = useState(null);

  // ===============================
  // 📥 FETCH PRODUCTS
  // ===============================
  const fetchProducts = async () => {
    const res = await fetch("https://resturant-backend-chi.vercel.app/api/menu/menu-items");
    if (!res.ok) throw new Error("Failed to fetch products");
    return res.json();
  };

  const { data: products = [] } = useQuery({
    queryKey: ["menu-items"],
    queryFn: fetchProducts,
  });

  // ===============================
  // 🔥 UPDATE MUTATION
  // ===============================
  const updateMutation = useMutation({
    mutationFn: async (data) => {
      const res = await fetch(
        `https://resturant-backend-chi.vercel.app/api/menu/menu-items/${data._id}`,
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

      // 🔥 auto refresh list
      queryClient.invalidateQueries(["menu-items"]);
    },
  });

  // ===============================
  // 📝 HANDLE CHANGE
  // ===============================
  const handleChange = (e) => {
    setEditingItem({
      ...editingItem,
      [e.target.name]: e.target.value,
    });
  };

  // ===============================
  // 🚀 SUBMIT UPDATE
  // ===============================
  const handleUpdate = (e) => {
    e.preventDefault();

    const payload = {
      ...editingItem,
      price: Number(editingItem.price),
    };

    updateMutation.mutate(payload);
  };

  return (
    <div className="p-6 bg-orange-50 min-h-screen">

      <h2 className="text-3xl font-bold mb-6 text-center">
        🍽 Menu Items
      </h2>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((item) => (
          <div
            key={item._id}
            className="bg-white shadow-lg rounded-xl p-4 relative"
          >
            {/* EDIT ICON */}
            <FaEdit
              className="absolute top-3 right-3 cursor-pointer text-gray-500 hover:text-orange-500"
              onClick={() => setEditingItem(item)}
            />
            <div className="w-full h-40 mb-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-40 object-cover rounded"
              />
            </div>

            <h3 className="text-xl font-bold">{item.name}</h3>
            <p className="text-gray-500 text-sm">{item.description}</p>

            <p className="text-orange-500 font-bold mt-2">
              ${item.price}
            </p>
          </div>
        ))}
      </div>

      {/* =============================== */}
      {/* ✏️ EDIT MODAL */}
      {/* =============================== */}
      {editingItem && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">

          <div className="bg-white p-6 rounded-xl w-full max-w-md">

            <h3 className="text-xl font-bold mb-4">
              ✏️ Edit Product
            </h3>

            <form onSubmit={handleUpdate} className="flex flex-col gap-3">

              <input
                name="name"
                value={editingItem.name}
                onChange={handleChange}
                className="border p-2 rounded"
              />

              <input
                name="price"
                value={editingItem.price}
                onChange={handleChange}
                type="number"
                className="border p-2 rounded"
              />

              <textarea
                name="description"
                value={editingItem.description}
                onChange={handleChange}
                className="border p-2 rounded"
              />

              <div className="flex gap-2 mt-3">
                <button
                  type="submit"
                  className="bg-orange-500 text-white px-4 py-2 rounded"
                >
                  {updateMutation.isPending ? "Updating..." : "Update"}
                </button>

                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
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
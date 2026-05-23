import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const AdminSettings = () => {
  const queryClient = useQueryClient();
  const [imageFile, setImageFile] = useState(null);

  // ===============================
  // 📥 FETCH SETTINGS
  // ===============================
  const fetchSettings = async () => {
    const res = await fetch("http://localhost:5000/api/settings");
    return res.json();
  };

  const { data: settings, isLoading } = useQuery({
    queryKey: ["settings"],
    queryFn: fetchSettings,
  });

  const [form, setForm] = useState({});

  // Sync data
  React.useEffect(() => {
    if (settings) setForm(settings);
  }, [settings]);

  // ===============================
  // 🖼 IMAGE UPLOAD (imgbb)
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
  // 🔥 UPDATE
  // ===============================
  const updateMutation = useMutation({
    mutationFn: async (data) => {
      const res = await fetch("http://localhost:5000/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      return res.json();
    },

    onSuccess: () => {
      alert("✅ Settings Updated");
      queryClient.invalidateQueries(["settings"]);
    },
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSave = async () => {
    let logoUrl = form.logo;

    if (imageFile) {
      logoUrl = await uploadImage(imageFile);
    }

    updateMutation.mutate({
      ...form,
      logo: logoUrl,
    });
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      <h1 className="text-3xl font-bold mb-6">⚙️ Settings</h1>

      <div className="grid md:grid-cols-2 gap-6">

        {/* STORE */}
        <div className="bg-white p-5 rounded-xl shadow">
          <h2 className="font-bold mb-4">Store</h2>

          <input
            name="storeName"
            value={form.storeName || ""}
            onChange={handleChange}
            className="w-full border p-2 mb-2 rounded"
          />

          <input
            type="file"
            onChange={(e) => setImageFile(e.target.files[0])}
            className="mb-2"
          />

          {form.logo && (
            <img src={form.logo} className="w-20 mb-2" />
          )}

          <select
            name="currency"
            value={form.currency}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option value="BDT">BDT</option>
            <option value="USD">USD</option>
          </select>
        </div>

        {/* ORDER */}
        <div className="bg-white p-5 rounded-xl shadow">
          <h2 className="font-bold mb-4">Order</h2>

          <input
            type="number"
            name="tax"
            value={form.tax || 0}
            onChange={handleChange}
            className="w-full border p-2 mb-2 rounded"
          />

          <label className="flex justify-between mb-2">
            Auto Print
            <input
              type="checkbox"
              name="autoPrint"
              checked={form.autoPrint}
              onChange={handleChange}
            />
          </label>

          <label className="flex justify-between">
            Daily Token Reset
            <input
              type="checkbox"
              name="dailyResetToken"
              checked={form.dailyResetToken}
              onChange={handleChange}
            />
          </label>
        </div>

      </div>

      <button
        onClick={handleSave}
        className="mt-6 bg-green-500 text-white px-6 py-2 rounded"
      >
        Save Settings
      </button>
    </div>
  );
};
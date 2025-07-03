"use client";

import Modal from "./modal";
import useEditPetForm from "hooks/useEditPetForm";
import {
  colorOptions,
  nationalityOptions,
} from "@/modules/admin/constants/PetsOptions";
import { useEffect, useState } from "react";

export default function EditPetModal({
  pet,
  isOpen,
  onClose,
  onSubmit,
}) {
  const {
    form,
    handleChange,
    imageFile,
    handleFileChange,
    handleSubmit,
    uploading,
  } = useEditPetForm(pet);
  const [codeOptions, setCodeOptions] = useState([]);
  useEffect(() => {
    const fetchCodes = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/pets/codes/all`
        );
        const data = await res.json();

        // Chờ form.code sẵn sàng rồi mới filter
        if (form.code) {
          const filtered = data.filter((p) => p.code !== form.code);
          setCodeOptions(filtered);
        }
      } catch (err) {
        console.error("Lỗi khi fetch code-name:", err.message);
      }
    };

    if (isOpen && form.code) {
      fetchCodes();
    }
  }, [isOpen, form.code]);
  
  const handleSave = async () => {
    try {
      const payload = await handleSubmit();
      await onSubmit(pet._id, payload); // truyền lên parent xử lý API và noti
    } catch (err) {
      console.error("Update failed:", err.message);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="space-y-5 w-full max-w-2xl mx-auto px-4">
        <h2 className="text-lg font-bold text-center">Cập nhật Thú Cưng</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Code */}
          <div>
            <label className="block font-semibold mb-1">Code</label>
            <input
              type="text"
              value={form.code}
              disabled
              className="w-full border px-3 py-2 rounded bg-gray-100 text-gray-500"
            />
          </div>

          {/* Name */}
          <div>
            <label className="block font-semibold mb-1">Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          {/* Gender */}
          <div>
            <label className="block font-semibold mb-1">Gender</label>
            <select
              name="gender"
              value={form.gender}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          {/* Birth Date */}
          <div>
            <label className="block font-semibold mb-1">Birth Date</label>
            <input
              type="date"
              name="birthDate"
              value={form.birthDate}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          {/* Color */}
          <div>
            <label className="block font-semibold mb-1">Color</label>
            <select
              name="color"
              value={form.color}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            >
              <option value="">-- Chọn màu --</option>
              {colorOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            {form.color && (
              <div
                className={`inline-block mt-2 px-3 py-1 rounded-full text-sm ${
                  colorOptions.find((c) => c.value === form.color)?.bg
                } ${colorOptions.find((c) => c.value === form.color)?.text}`}
              >
                {form.color}
              </div>
            )}
          </div>

          {/* Weight */}
          <div>
            <label className="block font-semibold mb-1">Weight (kg)</label>
            <input
              type="number"
              name="weight"
              value={form.weight}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          {/* Father */}
          <div>
            <label className="block font-semibold mb-1">Father</label>
            <select
              name="father"
              value={form.father}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            >
              <option value="">-- Chọn cha --</option>
              {codeOptions
                .filter((p) => p.gender === "Male" && p.code !== form.mother)
                .map((f) => (
                  <option key={f.code} value={f.code}>
                    {f.code} - {f.name}
                  </option>
                ))}
            </select>
          </div>

          {/* Mother */}
          <div>
            <label className="block font-semibold mb-1">Mother</label>
            <select
              name="mother"
              value={form.mother}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            >
              <option value="">-- Chọn mẹ --</option>
              {codeOptions
                .filter((p) => p.gender === "Female" && p.code !== form.father)
                .map((f) => (
                  <option key={f.code} value={f.code}>
                    {f.code} - {f.name}
                  </option>
                ))}
            </select>
          </div>

          {/* Nationality */}
          <div>
            <label className="block font-semibold mb-1">Nationality</label>
            <select
              name="nationality"
              value={form.nationality}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            >
              <option value="">-- Chọn quốc tịch --</option>
              {nationalityOptions.map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </div>

          {/* Certificate */}
          <div>
            <label className="block font-semibold mb-1">Certificate</label>
            <input
              name="certificate"
              value={form.certificate}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          {/* Note */}
          <div className="md:col-span-2">
            <label className="block font-semibold mb-1">Note</label>
            <textarea
              name="note"
              value={form.note}
              onChange={handleChange}
              rows={3}
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block font-semibold mb-1">Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(e.target.files[0])}
              className="w-full border px-3 py-2 rounded"
            />
            {form.image && !imageFile && (
              <img
                src={form.image}
                alt="preview"
                className="mt-2 w-32 h-32 object-cover mx-auto"
              />
            )}
            {imageFile && (
              <img
                src={URL.createObjectURL(imageFile)}
                alt="preview"
                className="mt-2 w-32 h-32 object-cover mx-auto"
              />
            )}
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={handleSave}
            disabled={uploading}
            className={`w-full sm:w-auto bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition ${
              uploading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {uploading ? "Đang cập nhật..." : "Lưu thay đổi"}
          </button>
        </div>
      </div>
    </Modal>
  );
}

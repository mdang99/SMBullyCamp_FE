"use client";

import { useEffect, useState } from "react";
import { uploadImageToCloudinary } from "../../utils/cloudinaryService";
import { colorOptions, nationalityOptions } from "../../constants/PetsOptions";

export default function FamilyTreeActions({ onAddFamily, families }) {
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [gender, setGender] = useState("Male");
  const [birthDate, setBirthDate] = useState("");
  const [color, setColor] = useState("");
  const [weight, setWeight] = useState("");
  const [father, setFather] = useState("");
  const [mother, setMother] = useState("");
  const [nationality, setNationality] = useState("");
  const [certificate, setCertificate] = useState("");
  const [note, setNote] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [notify, setNotify] = useState(null); // { message: '', type: 'success' | 'error' }
  const [codeParentOptions, setCodeParentOptions] = useState([]);
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        // --- Gọi API lấy danh sách thú cưng (code-name) ---
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/pets/codes/all`
        );
        const data = await res.json();

        setCodeParentOptions(data);
      } catch (err) {
        console.error("Lỗi khi fetch code-name:", err.message);
      }

      // --- Xử lý sinh mã code tiếp theo từ danh sách families ---
      if (!families || families.length === 0) {
        setCode("SM01");
        return;
      }

      const codes = families
        .map((f) => f.code)
        .filter((c) => /^SM\d+$/i.test(c))
        .map((c) => parseInt(c.replace("SM", "")))
        .sort((a, b) => b - a);

      const nextNumber = codes.length > 0 ? codes[0] + 1 : 1;
      setCode(`SM${nextNumber}`);
    };

    fetchInitialData(); // gọi 1 lần khi mở modal
  }, []);
  

  const handleAdd = async () => {
    if (name.trim().length < 2) {
      setNotify({ message: "Tên phải có ít nhất 2 ký tự", type: "error" });
      return;
    }

    if (!birthDate) {
      setNotify({ message: "Vui lòng chọn ngày sinh", type: "error" });
      return;
    }

    if (!imageFile) {
      setNotify({ message: "Bạn cần chọn 1 ảnh cho thú cưng", type: "error" });
      return;
    }

    try {
      setUploading(true);
      const imageUrl = await uploadImageToCloudinary(imageFile);
      setUploading(false);

      if (!imageUrl) {
        setNotify({ message: "Upload ảnh thất bại", type: "error" });
        return;
      }

      onAddFamily({
        code,
        name: name.trim(),
        gender,
        birthDate,
        color: color.trim(),
        weight: parseFloat(weight) || null,
        father: father.trim() || null,
        mother: mother.trim() || null,
        nationality: nationality.trim(),
        certificate: certificate.trim(),
        note: note.trim(),
        image: imageUrl,
      });


      // Reset form
      setName("");
      setGender("Male");
      setBirthDate("");
      setColor("");
      setWeight("");
      setFather("");
      setMother("");
      setNationality("");
      setCertificate("");
      setNote("");
      setImageFile(null);
      const currentNumber = parseInt(code.replace("SM", "")) || 0;
      setCode(`SM${currentNumber + 1}`);
      setNotify({ message: "Đã thêm thú cưng thành công", type: "success" });

    } catch (error) {
      setUploading(false);
      setNotify({ message: "Có lỗi xảy ra khi thêm thú cưng", type: "error" });
    }
  };

  return (
    <div className="w-full max-w-3xl px-4 mx-auto space-y-6">
      <h2 className="text-xl font-bold text-center">Thêm Thú Cưng</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block mb-1 font-semibold">Code (Tự động)</label>
          <input
            type="text"
            value={code}
            readOnly
            className="w-full border rounded px-3 py-2 bg-gray-100 text-gray-500"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Gender</label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="w-full border rounded px-3 py-2"
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 font-semibold">Birth Date</label>
          <input
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Color</label>
          <select
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="w-full border rounded px-3 py-2"
          >
            <option value="">-- Chọn màu --</option>
            {colorOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          {color && (
            <div
              className={`inline-block mt-2 px-3 py-1 rounded-full text-sm ${
                colorOptions.find((c) => c.value === color)?.bg
              } ${colorOptions.find((c) => c.value === color)?.text}`}
            >
              {color}
            </div>
          )}
        </div>

        <div>
          <label className="block mb-1 font-semibold">Weight (kg)</label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Father</label>
          <select
            value={father}
            onChange={(e) => setFather(e.target.value)}
            className="w-full border rounded px-3 py-2"
          >
            <option value="">-- Chọn cha --</option>
            {codeParentOptions
              .filter((f) => f.gender === "Male")
              .map((f) => (
                <option key={f.code} value={f.code}>
                  {f.code} - {f.name}
                </option>
              ))}
          </select>
        </div>

        <div>
          <label className="block mb-1 font-semibold">Mother</label>
          <select
            value={mother}
            onChange={(e) => setMother(e.target.value)}
            className="w-full border rounded px-3 py-2"
          >
            <option value="">-- Chọn mẹ --</option>
            {codeParentOptions
              .filter((f) => f.gender === "Female")
              .map((f) => (
                <option key={f.code} value={f.code}>
                  {f.code} - {f.name}
                </option>
              ))}
          </select>
        </div>

        <div>
          <label className="block mb-1 font-semibold">Nationality</label>
          <select
            value={nationality}
            onChange={(e) => setNationality(e.target.value)}
            className="w-full border rounded px-3 py-2"
          >
            <option value="">-- Chọn quốc tịch --</option>
            {nationalityOptions.map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1 font-semibold">Certificate</label>
          <input
            type="text"
            value={certificate}
            onChange={(e) => setCertificate(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block mb-1 font-semibold">Note</label>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={3}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block mb-1 font-semibold">Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])}
            className="w-full border rounded px-3 py-2"
          />
          {imageFile && (
            <img
              src={URL.createObjectURL(imageFile)}
              alt="Preview"
              className="mt-2 w-32 h-32 object-cover border rounded mx-auto"
            />
          )}
        </div>
      </div>

      <div className="flex justify-center">
        <button
          onClick={handleAdd}
          disabled={uploading}
          className={`w-full sm:w-auto bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition ${
            uploading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {uploading ? "Đang tải ảnh..." : "Thêm thú cưng"}
        </button>
      </div>
      {/* {notify && (
        <NotificationBadge
          message={notify.message}
          type={notify.type}
          onClose={() => setNotify(null)}
        />
      )} */}
    </div>
  );
}

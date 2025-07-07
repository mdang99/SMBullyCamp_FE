"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function PetDetailPage() {
    const { code } = useParams(); // Lấy mã thú cưng từ URL
    const router = useRouter();
    const [pet, setPet] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
      const fetchPet = async () => {
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/pets/code/${code}`,
            {
              credentials: "include",
            }
          );
          if (!res.ok) throw new Error("Không tìm thấy thú");
          const data = await res.json();
          setPet(data);
        } catch (err) {
          setError(err.message);
        }
      };

      if (code) fetchPet();
    }, [code]);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      timeZone: "Asia/Ho_Chi_Minh",
    });
  };

  if (error) return <div className="p-8 text-red-600">{error}</div>;
  if (!pet) return <div className="p-8">Loading...</div>;

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Pet Details</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white shadow p-6 rounded">
        <div>
          <strong>Code:</strong> {pet.code}
        </div>
        <div>
          <strong>Name:</strong> {pet.name}
        </div>
        <div>
          <strong>Gender:</strong> {pet.gender}
        </div>
        <div>
          <strong>Birth Date:</strong> {formatDate(pet.birthDate)}
        </div>
        <div>
          <strong>Weight:</strong> {pet.weight ? `${pet.weight} kg` : "-"}
        </div>
        <div>
          <strong>Color:</strong> {pet.color || "-"}
        </div>
        <div>
          <strong>Father:</strong> {pet.father || "-"}
        </div>
        <div>
          <strong>Mother:</strong> {pet.mother || "-"}
        </div>
        <div>
          <strong>Nationality:</strong> {pet.nationality || "-"}
        </div>
        <div>
          <strong>Certificate:</strong> {pet.certificate || "-"}
        </div>
        <div>
          <strong>Note:</strong> {pet.note || "-"}
        </div>
        {pet.image && (
          <div className="col-span-full">
            <strong>Image:</strong>
            <img
              src={pet.image}
              alt="Pet"
              className="w-40 h-40 mt-2 object-cover rounded"
            />
          </div>
        )}
      </div>

      <button
        onClick={() => router.back()}
        className="mt-6 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
      >
        Back
      </button>
    </div>
  );
}

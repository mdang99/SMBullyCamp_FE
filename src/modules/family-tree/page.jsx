"use client";

import React, { useEffect, useState } from "react";
import PetList from "./components/PetList";
import useAdminData from "../../../hooks/useAdminData";
import FamilyTreeModal from "../../../components/ui/FamilyTreeModal";
import Pagination from "../../../components/ui/Pagination";
import UserHeader from "../../../components/ui/UserHeader";

const FamilyTreePage = () => {
  const { families, loading, currentPage, totalPages, handlePageChange } =
    useAdminData("family");

  const [selectedCode, setSelectedCode] = useState(null);
  const [selectedPets, setSelectedPets] = useState([]);
  const [showModal, setShowModal] = useState(false);

const handleSelect = async (code) => {
  try {
    const fetchedPets = new Map();

    const fetchPetAndAncestors = async (code, depth = 0, maxDepth = 5) => {
      if (!code || fetchedPets.has(code) || depth > maxDepth) return;
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/pets/code/${code}`
      );
      if (!res.ok) return;

      const pet = await res.json();
      fetchedPets.set(code, pet);

      await Promise.all([
        fetchPetAndAncestors(pet.father, depth + 1, maxDepth),
        fetchPetAndAncestors(pet.mother, depth + 1, maxDepth),
      ]);
    };

    await fetchPetAndAncestors(code);

    const related = Array.from(fetchedPets.values());
    setSelectedCode(code);
    setSelectedPets(related);
    setShowModal(true);
  } catch (err) {
    console.error("Lỗi khi lấy dữ liệu phả hệ:", err.message);
  }
};

  return (
    <>
      <UserHeader /> {/* ✅ Header được thêm ở đây */}
      <div className="p-6 bg-gradient-to-br from-[#f9f1e7] to-[#fdf6f0]">
        <h1 className="text-3xl font-bold text-[#4e342e] mb-6 text-center">
          Danh sách thú cưng
        </h1>

        {loading ? (
          <p>Đang tải dữ liệu thú cưng...</p>
        ) : (
          <>
            <PetList pets={families} onSelect={handleSelect} />
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </>
        )}

        {/* 📌 Modal hiện cây phả hệ */}
        <FamilyTreeModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          pets={selectedPets}
          selectedCode={selectedCode}
        />
      </div>
    </>
  );
};

export default FamilyTreePage;

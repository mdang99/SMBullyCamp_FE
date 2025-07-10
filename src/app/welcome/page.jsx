"use client";

import { PawPrint, Search, Loader2 } from "lucide-react";
import UserHeader from "../../../components/ui/UserHeader";
import FamilyTreeModal from "../../../components/ui/FamilyTreeModal";
import { useState } from "react";
import useNotificationStore from "../../../stores/notificationStore";
import NotificationStack from "../../../components/ui/NotificationStack";

export default function WelcomePage() {
  const [searchText, setSearchText] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedPets, setSelectedPets] = useState([]);
  const [selectedCode, setSelectedCode] = useState(null);
  const { pushNotification, notifications, removeNotification } =
    useNotificationStore();

    const handleSearch = async () => {
      let input = searchText.trim().toUpperCase();

      // Nếu nhập sm1 đến sm9 → chuyển thành SM01 đến SM09
      const match = input.match(/^SM(\d)$/);
      if (match) {
        input = `SM0${match[1]}`;
      }

      if (!input) return;

      setLoading(true);

      try {
        const fetchedPets = new Map();

        const fetchPetAndAncestors = async (code, depth = 0, maxDepth = 5) => {
          if (!code || fetchedPets.has(code) || depth > maxDepth) return;

          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/pets/code/${code}`
          );
          if (!res.ok) return;

          const pet = await res.json();
          if (!pet || !pet._id) return;

          fetchedPets.set(code, pet);

          await Promise.all([
            fetchPetAndAncestors(pet.father, depth + 1, maxDepth),
            fetchPetAndAncestors(pet.mother, depth + 1, maxDepth),
          ]);
        };

        await fetchPetAndAncestors(input);
        await new Promise((resolve) => setTimeout(resolve, 1500)); // Giả lập loading

        const related = Array.from(fetchedPets.values());

        if (related.length === 0) {
          pushNotification("error", `Không tìm thấy mã thú cưng "${input}"`);
          return;
        }

        setSelectedCode(input);
        setSelectedPets(related);
        setShowModal(true);
      } catch (err) {
        console.error("Lỗi khi lấy dữ liệu phả hệ:", err.message);
        pushNotification(
          "error",
          err.message || "Không thể tìm kiếm dữ liệu thú cưng."
        );
      } finally {
        setLoading(false);
      }
    };
      

  return (
    <>
      <UserHeader />

      <main
        className="relative w-full h-[calc(100vh-64px)] flex items-center justify-center overflow-hidden bg-center bg-no-repeat bg-cover bg-[length:140%] sm:bg-[length:60%]"
        style={{
          backgroundImage: `url('/img/logo.png')`,
          backgroundColor: "#1C1105",
        }}
      >
        <div className="absolute inset-0 bg-black/30 z-0" />

        <div className="relative z-10 w-full px-4 sm:px-6 flex justify-center">
          <div className="bg-[#241007]/95 rounded-2xl p-4 sm:p-6 md:p-10 w-full max-w-xl shadow-2xl space-y-6 border border-[#bd9361]/30 text-center animate-fadeIn">
            <div className="space-y-1 sm:space-y-2">
              <h1 className="text-xl sm:text-2xl md:text-4xl font-extrabold text-[#e2b36c] tracking-wide">
                Chào mừng đến với
              </h1>
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-[#ecdac6] drop-shadow-sm">
                SM Bully Camp{" "}
                <PawPrint className="inline-block w-6 sm:w-7 md:w-8 h-auto text-[#e2b36c] -mt-1" />
              </h2>
            </div>

            <a
              href="tel:0902011041"
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#e2b36c] to-[#8a4b1f] hover:from-[#f1cc91] hover:to-[#a45823] text-white font-semibold px-5 py-2 sm:px-6 sm:py-3 rounded-full shadow hover:scale-105 transition-all duration-300 text-sm sm:text-base"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 sm:w-5 sm:h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h1.28a2 2 0 011.94 1.5l.7 2.8a2 2 0 01-.45 1.88l-1.1 1.1a16.001 16.001 0 006.36 6.36l1.1-1.1a2 2 0 011.88-.45l2.8.7A2 2 0 0119 19.72V21a2 2 0 01-2 2h-1C8.82 23 1 15.18 1 6V5a2 2 0 012-2z"
                />
              </svg>
              Gọi ngay: <span className="font-bold">0902011041</span>
            </a>

            <div className="flex flex-col sm:flex-row items-stretch gap-2 w-full">
              <div className="flex items-center px-4 py-2 bg-white rounded-full w-full shadow">
                <Search size={18} className="text-[#e2b36c] mr-2" />
                <input
                  type="text"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSearch();
                  }}
                  placeholder="Tìm kiếm thú cưng theo mã SM01, SM02..."
                  className="flex-grow text-sm text-gray-800 focus:outline-none bg-transparent"
                />
              </div>
              <button
                onClick={handleSearch}
                disabled={loading}
                className="bg-gradient-to-r from-[#e2b36c] to-[#8a4b1f] hover:from-[#f1cc91] hover:to-[#a45823] text-white font-semibold px-5 py-2 rounded-full shadow text-sm transition-colors flex items-center justify-center gap-2 min-w-[100px]"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin w-4 h-4" /> Đang tìm...
                  </>
                ) : (
                  "Tìm"
                )}
              </button>
            </div>
          </div>
        </div>

        <FamilyTreeModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          pets={selectedPets}
          selectedCode={selectedCode}
        />
      </main>

      <NotificationStack
        notifications={notifications}
        onRemove={removeNotification}
      />
    </>
  );
}

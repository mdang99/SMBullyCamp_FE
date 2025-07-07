import React from "react";
import { PawPrint } from "lucide-react";

const PetList = ({ pets, onSelect }) => {
  return (
    <div className="px-4 py-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {pets.map((pet) => (
        <div
          key={pet.code}
          className="
            rounded-2xl 
            border border-[#c9b8a6] 
            bg-gradient-to-br from-[#fdf6f0] to-[#e6d4c4] 
            p-4 
            shadow-lg 
            hover:shadow-2xl hover:scale-105 
            transform transition-all duration-300
          "
        >
          <div
            className="
              w-full h-48 
              overflow-hidden 
              rounded-xl 
              bg-[#f0e6dc] 
              flex items-center justify-center
            "
          >
            {pet.image ? (
              <img
                src={pet.image}
                alt={pet.name}
                className="w-full h-full object-cover rounded-xl"
              />
            ) : (
              <span className="text-5xl text-[#b08968] opacity-70 animate-pulse">
                <PawPrint />
              </span>
            )}
          </div>

          <div className="space-y-1 mt-4">
            <h3 className="text-lg font-semibold text-[#4e342e] truncate">
              {pet.name}
            </h3>
            <p className="text-sm text-[#5d4037]">
              <strong>Mã:</strong> {pet.code}
            </p>
            <p className="text-sm text-[#5d4037]">
              <strong>Giới tính:</strong> {pet.gender}
            </p>
          </div>

          <div className="mt-4">
            <button
              onClick={() => onSelect(pet.code)}
              className="
                w-full px-4 py-2 
                bg-gradient-to-r from-[#a97458] to-[#6d4c41] 
                text-white text-sm font-medium 
                rounded-full 
                hover:opacity-90 
                transition
              "
            >
              Xem cây phả hệ
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PetList;

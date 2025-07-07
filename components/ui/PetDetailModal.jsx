"use client";

import { useEffect, useRef, useState } from "react";
import Modal from "./modal";
import { formatVNDate } from "@/modules/admin/utils/formatVNDate";

export default function PetDetailModal({ isOpen, onClose, pet }) {
  const images = pet?.images || (pet?.image ? [pet.image] : []);
  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    if (isOpen) setActiveImgIndex(0);
  }, [isOpen, pet]);

  useEffect(() => {
    if (!isOpen || images.length < 2) return;
    timerRef.current = setInterval(() => {
      setActiveImgIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(timerRef.current);
  }, [isOpen, images.length]);

  const nextImg = () => setActiveImgIndex((prev) => (prev + 1) % images.length);
  const prevImg = () =>
    setActiveImgIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      {pet ? (
        <div className="p-4 space-y-4 text-sm">
          <h2 className="text-xl font-bold mb-4">Pet Details: {pet.code}</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
            <Detail label="Name" value={pet.name} />
            <Detail label="Gender" value={pet.gender} />
            <Detail label="Birth Date" value={formatVNDate(pet.birthDate)} />
            <Detail
              label="Weight"
              value={pet.weight ? `${pet.weight} kg` : "-"}
            />
            <Detail label="Color" value={pet.color} />
            <Detail label="Father" value={pet.father} />
            <Detail label="Mother" value={pet.mother} />
            <Detail label="Nationality" value={pet.nationality} />
            <Detail label="Certificate" value={pet.certificate} />
            <div className="sm:col-span-2">
              <Detail label="Note" value={pet.note} />
            </div>
          </div>

          {images.length > 0 && (
            <div className="mt-4 text-center relative">
              <img
                src={images[activeImgIndex]}
                alt={`pet-${activeImgIndex}`}
                className="mx-auto w-full max-w-[300px] h-auto rounded border object-cover"
              />

              {images.length > 1 && (
                <>
                  <button
                    onClick={prevImg}
                    className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-700 text-white px-2 py-1 rounded-l hover:bg-gray-800"
                  >
                    ‹
                  </button>
                  <button
                    onClick={nextImg}
                    className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-700 text-white px-2 py-1 rounded-r hover:bg-gray-800"
                  >
                    ›
                  </button>
                  <div className="flex justify-center mt-2 gap-2">
                    {images.map((_, i) => (
                      <button
                        key={i}
                        className={`w-3 h-3 rounded-full ${
                          i === activeImgIndex ? "bg-blue-600" : "bg-gray-300"
                        }`}
                        onClick={() => setActiveImgIndex(i)}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      ) : (
        <div className="text-gray-500 italic p-4">
          Đang tải thông tin thú cưng...
        </div>
      )}
    </Modal>
  );
}

// ✔️ Sub component cho từng dòng
function Detail({ label, value }) {
  return (
    <p className="text-sm">
      <span className="font-semibold">{label}:</span>{" "}
      {value || <span className="text-gray-400 italic">-</span>}
    </p>
  );
}

"use client";

import { formatVNDate } from "@/modules/admin/utils/formatVNDate";
import ConfirmDeleteDialog from "../ConfirmDeleteDialog";

export default function PetTableRow({ pet, onView, onEdit, onDelete }) {
  const {
    _id,
    code,
    name,
    gender,
    birthDate,
    color,
    weight,
    father,
    mother,
    nationality,
    certificate,
    note,
    image,
  } = pet;

  return (
    <>
      {/* Desktop layout */}
      <tr className="border-b hover:bg-[#f6ede4] hidden md:table-row text-[#4e342e]">
        <td className="px-4 py-2">{code}</td>
        <td className="px-4 py-2">{name}</td>
        <td className="px-4 py-2">{gender}</td>
        <td className="px-4 py-2">{formatVNDate(birthDate)}</td>
        <td className="px-4 py-2">{color || "-"}</td>
        <td className="px-4 py-2">{weight ? `${weight} kg` : "-"}</td>
        <td className="px-4 py-2">{father || "-"}</td>
        <td className="px-4 py-2">{mother || "-"}</td>
        <td className="px-4 py-2">{nationality || "-"}</td>
        <td className="px-4 py-2">{certificate || "-"}</td>
        <td className="px-4 py-2">{note || "-"}</td>
        <td className="px-4 py-2">
          {image ? (
            <img
              src={image}
              alt="pet"
              className="w-12 h-12 object-cover rounded"
            />
          ) : (
            "-"
          )}
        </td>
        <td className="px-4 py-2 text-center space-x-2 whitespace-nowrap">
          <button
            onClick={() => onView(code)}
            className="bg-[#a1887f] text-white px-3 py-1 rounded hover:bg-[#8d6e63]"
          >
            View
          </button>
          <button
            onClick={() => onEdit(pet)}
            className="bg-[#fb8c00] text-white px-3 py-1 rounded hover:bg-[#ef6c00]"
          >
            Update
          </button>
          <ConfirmDeleteDialog
            item={pet}
            labelKey="code"
            onConfirm={onDelete}
          />
        </td>
      </tr>

      {/* Mobile layout */}
      <tr className="md:hidden">
        <td colSpan="100%" className="p-4 border-b bg-[#fffaf5] text-[#4e342e]">
          <div className="space-y-2 text-sm">
            <div className="font-bold text-base">
              {name} <span className="text-gray-500">({code})</span>
            </div>
            <div className="grid grid-cols-2 gap-1">
              <span className="text-gray-500">Gender:</span>
              <span>{gender}</span>
              <span className="text-gray-500">Birth:</span>
              <span>{formatVNDate(birthDate)}</span>
              <span className="text-gray-500">Weight:</span>
              <span>{weight ? `${weight} kg` : "-"}</span>
              <span className="text-gray-500">Color:</span>
              <span>{color || "-"}</span>
              <span className="text-gray-500">Father:</span>
              <span>{father || "-"}</span>
              <span className="text-gray-500">Mother:</span>
              <span>{mother || "-"}</span>
              <span className="text-gray-500">Nationality:</span>
              <span>{nationality || "-"}</span>
              <span className="text-gray-500">Certificate:</span>
              <span>{certificate || "-"}</span>
              <span className="text-gray-500">Note:</span>
              <span>{note || "-"}</span>
            </div>

            {image && (
              <div className="text-center mt-2">
                <img
                  src={image}
                  alt="pet"
                  className="w-32 h-32 object-cover rounded border mx-auto"
                />
              </div>
            )}

            <div className="flex justify-center gap-2 pt-3">
              <button
                onClick={() => onView(code)}
                className="bg-[#8D6E63] hover:bg-[#6D4C41] text-white px-3 py-1 rounded-md shadow"
              >
                View
              </button>
              <button
                onClick={() => onEdit(pet)}
                className="bg-[#FFB74D] hover:bg-[#FB8C00] text-white px-3 py-1 rounded-md shadow"
              >
                Update
              </button>
              <ConfirmDeleteDialog
                item={pet}
                labelKey="code"
                onConfirm={onDelete}
              />
            </div>
          </div>
        </td>
      </tr>
    </>
  );
}

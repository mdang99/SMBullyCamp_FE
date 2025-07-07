"use client";

export default function PetTableHead() {
  return (
    <thead className="bg-[#e7d8c9] text-[#5D4037] text-sm hidden md:table-header-group">
      <tr>
        <th className="px-4 py-3 text-left font-semibold">Code</th>
        <th className="px-4 py-3 text-left font-semibold">Name</th>
        <th className="px-4 py-3 text-left font-semibold">Gender</th>
        <th className="px-4 py-3 text-left font-semibold">Birth Date</th>
        <th className="px-4 py-3 text-left font-semibold">Color</th>
        <th className="px-4 py-3 text-left font-semibold">Weight</th>
        <th className="px-4 py-3 text-left font-semibold">Father</th>
        <th className="px-4 py-3 text-left font-semibold">Mother</th>
        <th className="px-4 py-3 text-left font-semibold">Nationality</th>
        <th className="px-4 py-3 text-left font-semibold">Certificate</th>
        <th className="px-4 py-3 text-left font-semibold">Note</th>
        <th className="px-4 py-3 text-left font-semibold">Image</th>
        <th className="px-4 py-3 text-center font-semibold">Actions</th>
      </tr>
    </thead>
  );
}

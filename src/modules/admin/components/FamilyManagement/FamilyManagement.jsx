import { useState } from "react";
import FamilyTreeActions from "../FamilyTrees/FamilyTreeActions";
import Modal from "components/ui/modal";
import PetDetailModal from "components/ui/PetDetailModal";
import EditPetModal from "components/ui/EditPetModal";
import useNotificationStore from "stores/notificationStore";
import PetTableHead from "components/ui/PetTableHead";
import PetTableRow from "components/ui/PetTableRow";

export default function FamilyManagement({
  families,
  onAddFamily,
  onDeleteFamily,
  setFamilies, // cần để cập nhật danh sách khi update
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPet, setSelectedPet] = useState(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editingPet, setEditingPet] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);

  const { pushNotification } = useNotificationStore();

  const openUpdateModal = (pet) => {
    setEditingPet(pet);
    setEditModalOpen(true);
  };

  const handlePetUpdate = async (petId, payload) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/pets/${petId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(payload),
        }
      );

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Cập nhật thất bại");
      }

      const updatedPet = await res.json();

      setFamilies((prev) =>
        prev.map((p) => (p._id === updatedPet._id ? updatedPet : p))
      );

      pushNotification("success", "Cập nhật thành công!");
      setEditModalOpen(false);
    } catch (err) {
      pushNotification("error", err.message || "Lỗi cập nhật thú cưng");
    }
  };

  const handleViewDetails = async (code) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/pets/code/${code}`,
        {
          credentials: "include",
        }
      );
      if (!res.ok) throw new Error("Không tìm thấy pet");
      const data = await res.json();
      setSelectedPet(data);
      setViewModalOpen(true);
    } catch (err) {
      console.error(err);
      alert("Không thể tải dữ liệu thú cưng");
    }
  };

  return (
    <div>
      <button
        onClick={() => setIsModalOpen(true)}
        className="mb-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
      >
        Thêm thú cưng
      </button>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <FamilyTreeActions
          families={families}
          onAddFamily={(family) => {
            onAddFamily(family);
            setIsModalOpen(false);
          }}
        />
      </Modal>

      <h2 className="text-2xl font-semibold mb-4">Danh sách thú cưng</h2>

      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <PetTableHead />
          <tbody className="divide-y divide-gray-100">
            {families.length === 0 ? (
              <tr>
                <td
                  colSpan="14"
                  className="text-center py-4 text-gray-500 italic"
                >
                  No data found.
                </td>
              </tr>
            ) : (
              families.map((family) => (
                <PetTableRow
                  key={family._id}
                  pet={family}
                  onView={handleViewDetails}
                  onEdit={openUpdateModal}
                  onDelete={onDeleteFamily}
                />
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal xem chi tiết */}
      <PetDetailModal
        isOpen={viewModalOpen}
        onClose={() => setViewModalOpen(false)}
        pet={selectedPet}
      />

      <EditPetModal
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        pet={editingPet}
        onSubmit={handlePetUpdate}
      />

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

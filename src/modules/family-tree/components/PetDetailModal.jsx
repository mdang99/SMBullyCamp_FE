// src/modules/familyTree/components/PetDetailModal.jsx
import Modal from "components/ui/modal";

export default function PetDetailModal({ isOpen, onClose, pet }) {
  if (!pet) return null;
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-4 space-y-2 text-sm">
        <h2 className="text-lg font-bold">Thông tin thú cưng</h2>
        <p>
          <strong>Code:</strong> {pet.code}
        </p>
        <p>
          <strong>Name:</strong> {pet.name}
        </p>
        <p>
          <strong>Gender:</strong> {pet.gender}
        </p>
        <p>
          <strong>Birth Date:</strong> {pet.birthDate}
        </p>
        <p>
          <strong>Weight:</strong> {pet.weight}kg
        </p>
        <p>
          <strong>Color:</strong> {pet.color}
        </p>
        <p>
          <strong>Nationality:</strong> {pet.nationality}
        </p>
        <p>
          <strong>Father:</strong> {pet.father}
        </p>
        <p>
          <strong>Mother:</strong> {pet.mother}
        </p>
        <p>
          <strong>Certificate:</strong> {pet.certificate}
        </p>
        <p>
          <strong>Note:</strong> {pet.note}
        </p>
      </div>
    </Modal>
  );
}

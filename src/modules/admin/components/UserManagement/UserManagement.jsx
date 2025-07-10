import { useState } from "react";
import UserActions from "../Users/UserActions";
import UserTableHead from "../../../../../components/ui/UserTableHead";
import UserTableRow from "../../../../../components/ui/UserTableRow";
import Modal from "../../../../../components/ui/modal";

export default function UserManagement({ users, onAddUser, onDeleteUser }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddUser = (user) => {
    const newUser = { id: Date.now(), ...user };
    onAddUser(newUser);
    setIsModalOpen(false);
  };

  return (
    <div>
      {/* Add User Button */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="mb-4 bg-blue-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-700 transition"
      >
        Add User
      </button>

      {/* Modal Add User */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <UserActions
          onAddUser={handleAddUser}
          onClose={() => setIsModalOpen(false)}
        />
      </Modal>

      <h2 className="text-3xl font-semibold mb-6 text-gray-800">
        Danh sách người dùng
      </h2>

      {/* Desktop View */}
      <div className="hidden md:block">
        <div className="overflow-x-auto bg-white shadow-lg rounded-lg border border-gray-200">
          <table className="min-w-full divide-y divide-gray-300">
            <UserTableHead />
            <tbody className="divide-y divide-gray-200">
              {users.length === 0 ? (
                <tr>
                  <td
                    colSpan="5"
                    className="px-6 py-4 text-center text-gray-500 italic"
                  >
                    No users found.
                  </td>
                </tr>
              ) : (
                users.map((user, index) => (
                  <UserTableRow
                    key={user._id}
                    user={user}
                    index={index}
                    onDeleteUser={onDeleteUser}
                    isMobile={false} // dùng cho desktop
                  />
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile View */}
      <div className="md:hidden space-y-4">
        {users.length === 0 ? (
          <p className="text-center text-gray-500 italic">No users found.</p>
        ) : (
          users.map((user, index) => (
            <UserTableRow
              key={user._id}
              user={user}
              index={index}
              onDeleteUser={onDeleteUser}
              isMobile={true} // dùng cho mobile
            />
          ))
        )}
      </div>
    </div>
  );
}

import { useState } from 'react';
import UserActions from '../Users/UserActions';
import Modal from '@/components/ui/modal';
import ConfirmDeleteDialog from '../../../../src/components/ConfirmDeleteDialog';

export default function UserManagement({ users, onAddUser, onDeleteUser }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddUser = (user) => {
    const newUser = { id: Date.now(), ...user };
    onAddUser(newUser);
    setIsModalOpen(false);
  };
  return (
    <div>
      <button
        onClick={() => setIsModalOpen(true)}
        className="mb-4 bg-blue-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-700 transition"
      >
        Add User
      </button>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <UserActions onAddUser={handleAddUser} onClose={() => setIsModalOpen(false)} />
      </Modal>

      <h2 className="text-3xl font-semibold mb-6 text-gray-800">User List</h2>

      <div className="overflow-x-auto bg-white shadow-lg rounded-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wide">
                ID
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wide">
                Username
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wide">
                Email
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wide">
                Role
              </th>
              <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700 uppercase tracking-wide">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {users.length === 0 ? (
              <tr>
                <td colSpan="4" className="px-6 py-4 text-center text-gray-500 italic">
                  No users found.
                </td>
              </tr>
            ) : (
              users.map((user,index) => (
                <tr
                  key={user.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{index + 1}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">{user.username}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-mono">{user.role}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <ConfirmDeleteDialog user={user} onConfirm={onDeleteUser} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

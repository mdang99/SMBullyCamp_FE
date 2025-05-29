import { useState } from 'react'
import FamilyTreeActions from '../FamilyTrees/FamilyTreeActions'
import Modal from '@/components/ui/modal'

export default function FamilyManagement({ families, onAddFamily, onDeleteFamily }) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div>
      <button
        onClick={() => setIsModalOpen(true)}
        className="mb-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
      >
        Add Family Member
      </button>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <FamilyTreeActions
          onAddFamily={(family) => {
            onAddFamily(family)
            setIsModalOpen(false)
          }}
        />
      </Modal>

      <h2 className="text-2xl font-semibold mb-4">Family Tree List</h2>

      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Age</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Type</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Father</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Mother</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {families.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-6 py-4 text-center text-gray-500 italic">
                  No data found.
                </td>
              </tr>
            ) : (families.map((family) => (
                <tr key={family.id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">{family.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{family.age}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{family.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{family.parents?.father || '-'}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{family.parents?.mother || '-'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <button
                      onClick={() => onDeleteFamily(family.id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              )))}
            </tbody>
          </table>
      </div>
    </div>
  )
}

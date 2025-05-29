'use client'

import PropTypes from 'prop-types'
import { Users, Network, LogOut } from 'lucide-react'

const AdminSidebar = ({ activeTab, onTabChange, onLogout }) => {
  const menuItems = [
    { label: 'Users', icon: <Users size={18} />, key: 'users' },
    { label: 'Family Tree', icon: <Network size={18} />, key: 'family' },
  ]

  return (
    <aside className="w-64 bg-white border-r border-gray-200 h-screen p-6 hidden md:block">
      <h2 className="text-2xl font-bold mb-8 text-green-700">Admin Panel</h2>

      <nav className="space-y-3">
        {menuItems.map((item) => (
          <button
            key={item.key}
            onClick={() => onTabChange(item.key)}
            className={`flex items-center gap-3 px-4 py-2 rounded-lg w-full text-left transition-colors duration-200 ${
              activeTab === item.key
                ? 'bg-green-100 text-green-700 font-semibold'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            {item.icon}
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="mt-10 pt-6 border-t border-gray-200">
        <button
          onClick={onLogout}
          className="flex items-center gap-3 text-red-500 hover:text-red-700 px-4 py-2 w-full rounded-lg transition-colors hover:bg-red-50"
        >
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  )
}
export default AdminSidebar

// AdminSidebar.propTypes = {
//   activeTab: PropTypes.string.isRequired,
//   onTabChange: PropTypes.func.isRequired,
//   onLogout: PropTypes.func.isRequired,
// }
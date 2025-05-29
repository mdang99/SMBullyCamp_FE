'use client'

const tabs = [
  { id: 'users', label: '👤 Người dùng' },
  { id: 'families', label: '🌳 Cây phả hệ' },
]

export default function AdminSidebar({ activeTab, onTabChange, onLogout }) {
  return (
    <div className="bg-white w-64 h-screen shadow-md fixed left-0 top-0 flex flex-col p-6">
      <h1 className="text-2xl font-bold text-green-700 mb-8">Quản trị</h1>

      <nav className="flex-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`w-full text-left px-4 py-3 mb-2 rounded-lg font-medium transition-all
              ${activeTab === tab.id ? 'bg-green-200 text-green-800' : 'hover:bg-gray-100 text-gray-700'}
            `}
            onClick={() => onTabChange(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      <button
        onClick={onLogout}
        className="mt-auto px-4 py-3 rounded-lg bg-red-100 hover:bg-red-200 text-red-600 font-semibold"
      >
        🔓 Đăng xuất
      </button>
    </div>
  )
}

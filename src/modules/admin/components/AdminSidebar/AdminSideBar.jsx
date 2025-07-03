"use client";

import PropTypes from "prop-types";
import { Users, Network, LogOut, X } from "lucide-react";
import clsx from "clsx";

const AdminSidebar = ({
  activeTab,
  onTabChange,
  onLogout,
  isOpen,
  onClose,
}) => {
  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:block w-64 bg-[#EFEBE9] border-r border-[#D7CCC8] h-screen p-6">
        <SidebarContent
          activeTab={activeTab}
          onTabChange={onTabChange}
          onLogout={onLogout}
        />
      </aside>

      {/* Mobile Sidebar */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 md:hidden">
          <aside className="absolute left-0 top-0 h-full w-64 bg-[#EFEBE9] shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <button
                onClick={onClose}
                className="text-[#5D4037] hover:text-black transition"
              >
                <X size={22} />
              </button>
            </div>

            <SidebarContent
              activeTab={activeTab}
              onTabChange={onTabChange}
              onLogout={onLogout}
            />
          </aside>
        </div>
      )}
    </>
  );
};

function SidebarContent({ activeTab, onTabChange, onLogout }) {
  const menuItems = [
    { label: "Users", icon: <Users size={18} />, key: "users" },
    { label: "Family Tree", icon: <Network size={18} />, key: "family" },
  ];

  return (
    <>
      {/* Logo section */}
      <div className="flex items-center gap-3 mb-6">
        <img
          src="/img/vector-mau.svg" // Đường dẫn đến logo của bạn
          alt="Logo"
          className="w-10 h-10 rounded"
        />
        <span className="text-xl font-bold text-[#5D4037]">SM Bully Camp</span>
      </div>

      <nav className="space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.key}
            onClick={() => onTabChange(item.key)}
            className={clsx(
              "flex items-center gap-3 px-4 py-2 rounded-lg w-full text-left transition duration-200",
              activeTab === item.key
                ? "bg-[#D7CCC8] text-[#3E2723] font-semibold shadow"
                : "text-[#5D4037] hover:bg-[#E0D7CF]"
            )}
          >
            {item.icon}
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="mt-10 pt-6 border-t border-[#D7CCC8]">
        <button
          onClick={onLogout}
          className="flex items-center gap-3 text-red-600 hover:text-red-800 px-4 py-2 w-full rounded-lg transition hover:bg-red-100"
        >
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>
    </>
  );
}

AdminSidebar.propTypes = {
  activeTab: PropTypes.string.isRequired,
  onTabChange: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
};

export default AdminSidebar;

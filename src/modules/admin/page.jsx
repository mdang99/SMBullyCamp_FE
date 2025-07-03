"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import useNotificationStore from "@stores/notificationStore";

import AdminSidebar from "./components/AdminSidebar/AdminSideBar";
import AdminContent from "./components/AdminContent/AdminContent";
import useAdminData from "hooks/useAdminData";
import NotificationStack from "components/ui/NotificationStack";
import { Menu } from "lucide-react";

export default function AdminDashboard() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tabFromUrl = searchParams.get("tab");
  const [activeTab, setActiveTab] = useState(tabFromUrl || "users");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { notifications, removeNotification } = useNotificationStore();
  
  const {
    users,
    families,
    loading,
    error,
    handleAddUser,
    handleDeleteUser,
    handleAddFamily,
    handleDeleteFamily,
    handleLogout,
    setFamilies,
    setCurrentPage,
    handlePageChange,
    currentPage,
    totalPages,
  } = useAdminData(activeTab);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Đang tải dữ liệu...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600">
        Lỗi: {error}
      </div>
    );
  }

  return (
    <>
      {/* Mobile header */}
      <div className="md:hidden flex items-center justify-between p-4 bg-white border-b shadow-sm sticky top-0 z-40">
        <h1 className="text-lg font-bold text-green-700">Admin SM Bully Camp</h1>
        <button onClick={() => setIsSidebarOpen(true)}>
          <Menu size={24} className="text-gray-700" />
        </button>
      </div>

      <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row">
        <AdminSidebar
          activeTab={activeTab}
          onTabChange={(tab) => {
            setActiveTab(tab);
            setIsSidebarOpen(false);
          }}
          onLogout={handleLogout}
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />

        <main className="flex-1 p-4 md:p-6">
          <AdminContent
            activeTab={activeTab}
            users={users}
            families={families}
            onAddUser={handleAddUser}
            onDeleteUser={handleDeleteUser}
            onAddFamily={handleAddFamily}
            onDeleteFamily={handleDeleteFamily}
            setFamilies={setFamilies}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </main>
      </div>

      {/* Push notification stack */}
      <NotificationStack
        notifications={notifications}
        onRemove={removeNotification}
      />
    </>
  );
}

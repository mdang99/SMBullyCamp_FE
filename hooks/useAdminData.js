"use client";

import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { apiClient } from "../lib/apiClient";
import useNotificationStore from "../stores/notificationStore";

export default function useAdminData(activeTab) {
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [families, setFamilies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const { pushNotification } = useNotificationStore();

  // --- Fetch Users ---
  const fetchUsers = useCallback(
    async (page = 1) => {
      setLoading(true);
      try {
        const res = await apiClient(`/api/users?page=${page}&limit=6`);
        setUsers(res.data);
        setTotalPages(res.totalPages);
      } catch (err) {
        setError(err.message);
        pushNotification("error", "Không thể tải danh sách người dùng");
      } finally {
        setLoading(false);
      }
    },
    [pushNotification]
  );

  // --- Fetch Families ---
  const fetchFamilies = useCallback(
    async (page = 1) => {
      setLoading(true);
      try {
        const res = await apiClient(`/api/pets?page=${page}&limit=6`);
        setFamilies(res.data);
        setTotalPages(res.totalPages);
      } catch (err) {
        setError(err.message);
        pushNotification("error", "Không thể tải danh sách thú cưng");
      } finally {
        setLoading(false);
      }
    },
    [pushNotification]
  );

  // --- Handle pagination ---
  const handlePageChange = useCallback((page) => {
    setCurrentPage(page);
  }, []);

  // --- Fetch data when tab or page changes ---
  useEffect(() => {
    if (activeTab === "users") {
      fetchUsers(currentPage);
    } else if (activeTab === "family") {
      fetchFamilies(currentPage);
    }
  }, [activeTab, currentPage, fetchUsers, fetchFamilies]);

  // --- Reset page when tab changes ---
  useEffect(() => {
    setCurrentPage(1); // reset page về 1 khi đổi tab
  }, [activeTab]);

  // --- CRUD handlers ---
  const handleAddUser = async (newUser) => {
    try {
      const user = await apiClient("/api/users/create", {
        method: "POST",
        body: JSON.stringify(newUser),
      });
      setUsers((prev) => [user, ...prev]);
      pushNotification("success", "Thêm người dùng thành công!");
    } catch (err) {
      pushNotification("error", err.message);
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await apiClient(`/api/users/delete/${id}`, { method: "DELETE" });
      setUsers((prev) => prev.filter((u) => u._id !== id));
      pushNotification("success", "Xoá người dùng thành công!");
    } catch (err) {
      pushNotification("error", err.message);
    }
  };

  const handleAddFamily = async (newPet) => {
    try {
      const pet = await apiClient("/api/pets/create", {
        method: "POST",
        body: JSON.stringify(newPet),
      });
      setFamilies((prev) => [pet, ...prev]);
      pushNotification("success", "Thêm thú cưng thành công!");
    } catch (err) {
      pushNotification("error", err.message);
    }
  };

  const handleDeleteFamily = async (id) => {
    try {
      await apiClient(`/api/pets/${id}`, { method: "DELETE" });
      setFamilies((prev) => prev.filter((p) => p._id !== id));
      pushNotification("success", "Xoá thú cưng thành công!");
    } catch (err) {
      pushNotification("error", err.message);
    }
  };

  const handleLogout = async () => {
    try {
      await apiClient("/api/users/logout", { method: "POST" });
    } finally {
      router.push("/signin");
    }
  };

  return {
    users,
    families,
    loading,
    error,
    currentPage,
    totalPages,
    handlePageChange,
    setUsers,
    setFamilies,
    handleAddUser,
    handleDeleteUser,
    handleAddFamily,
    handleDeleteFamily,
    handleLogout,
  };
}

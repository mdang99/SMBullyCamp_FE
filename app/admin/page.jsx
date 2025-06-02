// admin/page.js (Hoặc AdminDashboard component của bạn)
'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import AdminContent from './components/Content/AdminContent'
import AdminSidebar from './components/Sidebar/AdminSideBar'
// import Cookies from 'js-cookie' // KHÔNG CẦN NỮA VÌ TOKEN LÀ HTTPONLY

const AdminDashboard = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const tabFromUrl = searchParams.get('tab')
  const [activeTab, setActiveTab] = useState(tabFromUrl || 'users')

  const [users, setUsers] = useState([])
  const [families, setFamilies] = useState([])
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- HÀM TẢI DỮ LIỆU BAN ĐẦU (FETCH ALL USERS / FAMILIES) ---
  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // ✅ Không cần lấy token từ Cookies.get() nữa.
      // Trình duyệt sẽ tự động gửi HttpOnly cookie 'token' cho request này.
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users`, {
        // method: 'GET' (mặc định)
        headers: {
          'Content-Type': 'application/json',
        },
        // ✅ Cần thêm credentials: 'include' để đảm bảo cookies được gửi
        credentials: 'include'
      });
      if (!response.ok) {
        // Nếu backend trả về 401/403, có thể token không hợp lệ hoặc không có quyền.
        // Middleware Next.js lẽ ra đã chặn điều này, nhưng đây là fallback.
        if (response.status === 401 || response.status === 403) {
          router.push('/signin'); // Chuyển hướng về đăng nhập
          throw new Error('Unauthorized or Forbidden access. Please sign in again.');
        }
        throw new Error('Failed to fetch users');
      }
      const data = await response.json();
      setUsers(data);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching users:', err);
    } finally {
      setLoading(false);
    }
  }, [router]); // Loại bỏ getToken khỏi dependency array

  const fetchFamilies = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/pets`, { // Thay bằng API families của bạn
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include' // ✅ Cần thêm credentials: 'include'
      });
      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          router.push('/signin');
          throw new Error('Unauthorized or Forbidden access. Please sign in again.');
        }
        throw new Error('Failed to fetch families');
      }
      const data = await response.json();
      setFamilies(data);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching families:', err);
    } finally {
      setLoading(false);
    }
  }, [router]); // Loại bỏ getToken khỏi dependency array

  // --- useEffect để tải dữ liệu khi component mount hoặc tab thay đổi ---
  useEffect(() => {
    if (activeTab === 'users') {
      fetchUsers();
    } else if (activeTab === 'families') {
      fetchFamilies();
    }
  }, [activeTab ]);
// fetchUsers, fetchFamilies

  // --- Cập nhật URL khi activeTab thay đổi ---
  useEffect(() => {
    if (activeTab !== tabFromUrl) {
      const params = new URLSearchParams(window.location.search)
      params.set('tab', activeTab)
      const newUrl = `${window.location.pathname}?${params.toString()}`
      router.replace(newUrl, { scroll: false })
    }
  }, [activeTab, tabFromUrl, router])


  // --- HÀM THAO TÁC API ---
  const handleAddUser = async (newUser) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // ✅ Cần thêm credentials: 'include'
        body: JSON.stringify({ ...newUser, role: newUser.role || 'user' }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add user');
      }
      const addedUser = await response.json();
      setUsers((prev) => [...prev, addedUser]);
    } catch (err) {
      console.error('Error adding user:', err);
      setError(err.message);
    }
  };

  const handleDeleteUser = async (id) => {
    console.log(id,"id")
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/delete/${id}`, {
        method: 'DELETE',
        credentials: 'include', // ✅ Cần thêm credentials: 'include'
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete user');
      }
      setUsers((prev) => prev.filter((user) => user._id !== id));
    } catch (err) {
      console.error('Error deleting user:', err);
      setError(err.message);
    }
  };

  const handleAddFamily = async (newFamily) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/pets`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // ✅ Cần thêm credentials: 'include'
        body: JSON.stringify(newFamily),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add family');
      }
      const addedFamily = await response.json();
      setFamilies((prev) => [...prev, addedFamily]);
    } catch (err) {
      console.error('Error adding family:', err);
      setError(err.message);
    }
  };

  const handleDeleteFamily = async (id) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/pets/${id}`, {
        method: 'DELETE',
        credentials: 'include', // ✅ Cần thêm credentials: 'include'
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete family');
      }
      setFamilies((prev) => prev.filter((family) => family._id !== id));
    } catch (err) {
      console.error('Error deleting family:', err);
      setError(err.message);
    }
  };

  const handleLogout = async () => {
    try {
      // Gửi yêu cầu logout đến backend
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/logout`, {
        method: 'POST',
        credentials: 'include' // ✅ Quan trọng để gửi cookie 'token' cho backend xóa
      });
      // Backend sẽ xử lý xóa HttpOnly cookie.
      // Không cần Cookies.remove('token') nữa ở đây nếu cookie là HttpOnly.
      router.push('/signin');
    } catch (err) {
      console.error('Logout error:', err);
      router.push('/signin'); // Vẫn chuyển hướng dù có lỗi logout để đảm bảo người dùng thoát
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Đang tải dữ liệu...</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center text-red-500">Lỗi: {error}</div>;

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <AdminSidebar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onLogout={handleLogout} />
      <main className='flex-1'>
        <div className="flex p-6">
          <AdminContent
            activeTab={activeTab}
            users={users}
            families={families}
            onAddUser={handleAddUser}
            onDeleteUser={handleDeleteUser}
            onAddFamily={handleAddFamily}
            onDeleteFamily={handleDeleteFamily}
          />
        </div>
      </main>
    </div>
  )
}

export default AdminDashboard
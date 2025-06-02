// app/signin/page.js
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
// import Cookies from 'js-cookie' // Không cần thiết nếu backend đặt HttpOnly cookie

export default function SignIn() {
  const router = useRouter()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  function validateUsername(name) {
    return name.trim().length >= 3
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')

    if (!validateUsername(username)) {
      setError('Username phải có ít nhất 3 ký tự')
      return
    }
    if (password.length < 6) {
      setError('Mật khẩu phải ít nhất 6 ký tự')
      return
    }

    setLoading(true)
    
    // Lưu lại thời điểm bắt đầu request
    const startTime = Date.now(); 

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
        credentials:'include',
      })
      
      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.message || 'Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.')
      }

      const data = await res.json();
      const userRole = data.user?.role;
      // Tính toán thời gian còn lại cần chờ để đủ 3 giây
      const elapsedTime = Date.now() - startTime;
      const remainingTime = 1500 - elapsedTime; // 3000ms = 3s

      // Đảm bảo spinner quay ít nhất 3 giây
      await new Promise(resolve => setTimeout(resolve, remainingTime > 0 ? remainingTime : 0));

      if (userRole === 'admin') {
        router.push('/admin');
      } else {
        router.push('/welcome');
      }

    } catch (err) {
      setError(err.message)
      console.error("Login error:", err);
      setLoading(false);

    } finally {
      // setLoading(false) // Không đặt ở đây nữa, vì đã có setTimeout
      // Logic setLoading(false) và chuyển hướng đã được xử lý trong try block
      // Dù thành công hay thất bại, sau khi đã đợi đủ thời gian, setLoading sẽ false
      // Tuy nhiên, với logic hiện tại, nếu có lỗi, chúng ta sẽ không chuyển hướng
      // nên setLoading(false) cần được đặt ở đây để spinner tắt khi có lỗi.
      // Nếu thành công, router.push đã xử lý việc chuyển trang, component sẽ unmount.
      if (error) { // Chỉ tắt loading nếu có lỗi và không chuyển hướng
          setLoading(false);
      }
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md p-8 bg-white rounded shadow">
        <h1 className="text-2xl font-bold mb-6 text-center">Đăng nhập</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-2 bg-red-100 text-red-700 rounded">{error}</div>
          )}

          <input
            type="text"
            placeholder="Tên đăng nhập"
            value={username}
            onChange={e => setUsername(e.target.value)}
            disabled={loading}
            required
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Mật khẩu"
            value={password}
            onChange={e => setPassword(e.target.value)}
            disabled={loading}
            required
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition flex justify-center items-center"
          >
            {loading ? (
              <svg
                className="animate-spin h-5 w-5 mr-3 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
              </svg>
            ) : null}
            {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
          </button>
        </form>

        <p className="mt-4 text-center">
          Bạn chưa có tài khoản?{' '}
          <Link href="/signup" className="text-blue-600 hover:underline">
            Đăng ký ngay
          </Link>
        </p>
      </div>
    </div>
  )
}
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function SignUp() {
  const router = useRouter()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  function validateUsername(name) {
    return name.trim().length >= 3 // username tối thiểu 3 ký tự
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
    try {
      // Giả lập call API đăng ký
      await new Promise(resolve => setTimeout(resolve, 1500))

      alert('Đăng ký thành công, vui lòng đăng nhập.')
      router.push('/signin')
    } catch (err) {
      setError('Đăng ký thất bại, vui lòng thử lại')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md p-8 bg-white rounded shadow">
        <h1 className="text-2xl font-bold mb-6 text-center">Đăng ký</h1>

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
            {loading ? 'Đang đăng ký...' : 'Đăng ký'}
          </button>
        </form>

        <p className="mt-4 text-center">
          Bạn đã có tài khoản?{' '}
          <Link href="/signin" className="text-blue-600 hover:underline">
            Đăng nhập ngay
          </Link>
        </p>
      </div>
    </div>
  )
}

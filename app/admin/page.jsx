'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import AdminHeader from './components/Header/AdminHeader'
import AdminContent from './components/Content/AdminContent'
import AdminSidebar from './components/Sidebar/AdminSideBar'

const AdminDashboard = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const tabFromUrl = searchParams.get('tab')
  const [activeTab, setActiveTab] = useState(tabFromUrl || 'users')

  const [users, setUsers] = useState([])
  const [families, setFamilies] = useState([])

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      router.push('/signin')
    }
  }, [])

  useEffect(() => {
    if (activeTab !== tabFromUrl) {
      const params = new URLSearchParams(window.location.search)
      params.set('tab', activeTab)
      const newUrl = `${window.location.pathname}?${params.toString()}`
      router.replace(newUrl, { scroll: false })
    }
  }, [activeTab, tabFromUrl, router])

  const handleAddUser = (newUser) => {
    setUsers((prev) => [...prev, { id: Date.now(), ...newUser }])
  }

  const handleDeleteUser = (id) => {
    setUsers((prev) => prev.filter((user) => user.id !== id))
  }

  const handleAddFamily = (family) => {
    setFamilies((prev) => [...prev, { id: Date.now(), ...family }])
  }

  const handleDeleteFamily = (id) => {
    setFamilies((prev) => prev.filter((family) => family.id !== id))
  }

  const handleLogout = () => {
    localStorage.clear()
    router.push('/signin')
  }

  return (
    <div className="min-h-screen bg-gray-100 flex">
<AdminSidebar 
          activeTab={activeTab} 
          onTabChange={setActiveTab} 
          onLogout={handleLogout} />
      <main className='flex-1'>
        

        {/* <AdminHeader activeTab={activeTab} onTabChange={setActiveTab} onLogout={handleLogout} /> */}
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

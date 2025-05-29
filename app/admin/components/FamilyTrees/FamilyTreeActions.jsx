'use client'

import { useState } from 'react'

export default function FamilyTreeActions({ onAddFamily }) {
  const [name, setName] = useState('')
  const [age, setAge] = useState('')
  const [type, setType] = useState('child')
  const [father, setFather] = useState('')
  const [mother, setMother] = useState('')

  const handleAdd = () => {
    if (name.trim().length < 2) {
      alert('Tên phải có ít nhất 2 ký tự')
      return
    }
    if (!age || isNaN(age) || age <= 0) {
      alert('Vui lòng nhập tuổi hợp lệ')
      return
    }
    if (father.trim() === '' && mother.trim() === '') {
      if (!confirm('Bạn chưa nhập tên cha hoặc mẹ. Tiếp tục?')) return
    }

    onAddFamily({
      name: name.trim(),
      age: Number(age),
      type,
      parents: {
        father: father.trim() || null,
        mother: mother.trim() || null,
      }
    })

    // Reset form
    setName('')
    setAge('')
    setType('child')
    setFather('')
    setMother('')
  }

  return (
    <div className="space-y-3 max-w-lg">
      <div>
        <label className="block mb-1 font-semibold">Name</label>
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Tên thành viên"
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block mb-1 font-semibold">Age</label>
        <input
          type="number"
          value={age}
          onChange={e => setAge(e.target.value)}
          placeholder="Tuổi"
          min={0}
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block mb-1 font-semibold">Type</label>
        <select
          value={type}
          onChange={e => setType(e.target.value)}
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="child">Child</option>
          <option value="parent">Parent</option>
          <option value="grandparent">Grandparent</option>
          {/* Bạn có thể thêm hoặc sửa các loại khác */}
        </select>
      </div>

      <div>
        <label className="block mb-1 font-semibold">Father (Cha)</label>
        <input
          type="text"
          value={father}
          onChange={e => setFather(e.target.value)}
          placeholder="Tên cha"
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block mb-1 font-semibold">Mother (Mẹ)</label>
        <input
          type="text"
          value={mother}
          onChange={e => setMother(e.target.value)}
          placeholder="Tên mẹ"
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button
        onClick={handleAdd}
        className="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700 transition"
      >
        Thêm
      </button>
    </div>
  )
}

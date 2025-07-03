'use client'

import { useState, useEffect } from 'react'
import { uploadImageToCloudinary } from '@/modules/admin/utils/cloudinaryService'

export default function useEditPetForm(pet) {
  const [form, setForm] = useState({
    code: '', name: '', gender: '', birthDate: '', color: '', weight: '',
    father: '', mother: '', nationality: '', certificate: '', note: '', image: ''
  })

  const [imageFile, setImageFile] = useState(null)
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    if (pet) {
      setForm({
        code: pet.code || '',
        name: pet.name || '',
        gender: pet.gender || 'Male',
        birthDate: pet.birthDate?.slice(0, 10) || '',
        color: pet.color || '',
        weight: pet.weight || '',
        father: pet.father || '',
        mother: pet.mother || '',
        nationality: pet.nationality || '',
        certificate: pet.certificate || '',
        note: pet.note || '',
        image: pet.image || ''
      })
    }
  }, [pet])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (file) => setImageFile(file)

  const handleSubmit = async () => {
    setUploading(true)
    let imageUrl = form.image

    if (imageFile) {
      const uploaded = await uploadImageToCloudinary(imageFile)
      if (!uploaded) throw new Error('Upload ảnh thất bại.')
      imageUrl = uploaded
    }

    const payload = { ...form, image: imageUrl, weight: parseFloat(form.weight) || 0 }
    setUploading(false)
    return payload
  }

  return { form, handleChange, imageFile, handleFileChange, handleSubmit, uploading }
}

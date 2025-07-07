export const handleAddUser = async (newUser, setUsers, setError) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ ...newUser, role: newUser.role || 'user' }),
      })
      if (!response.ok) throw new Error((await response.json()).message || 'Failed to add user')
      const addedUser = await response.json()
      setUsers(prev => [...prev, addedUser])
    } catch (err) {
      setError(err.message)
    }
  }
  
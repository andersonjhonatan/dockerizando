import CardUsers from '@/components/CardUsers'
import { User } from '@/interface'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const UsersCards = () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'
  const [user, setUser] = useState<User[]>([])

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${apiUrl}/users`)
        setUser(response.data)
      } catch (error) {
        console.log('Error:', error)
      }
    }
    fetchUser()
  }, [apiUrl])

  return (
    <div className="flex flex-col justify-center items-center mx-auto max-w-7xl  p-8 rounded-md gap-4">
      <h1 className="text-3xl font-bold">Users Management </h1>
      <CardUsers card={user} />
    </div>
  )
}

export default UsersCards

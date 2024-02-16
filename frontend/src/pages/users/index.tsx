import { axiosInstance } from '@/axios'
import CardUsers from '@/components/CardUsers'
import { User } from '@/interface'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const UsersCards = () => {
  const [user, setUser] = useState<User[]>([])

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axiosInstance.get(`/users`)
        setUser(response.data)
      } catch (error) {
        console.log('Error:', error)
      }
    }
    fetchUser()
  }, [])

  return (
    <div className="flex flex-col justify-center items-center mx-auto max-w-7xl  p-8 rounded-md gap-4">
      <h1 className="text-3xl font-bold">Users Management </h1>
      <CardUsers card={user} />
    </div>
  )
}

export default UsersCards

import { INewUser } from '@/interface/INewUser'
import axios from 'axios'
import React, { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'

const FormComponents = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<INewUser>({
    defaultValues: {
      name: '',
      email: '',
    },
  })
  const [newUser, setNewUser] = useState<INewUser>({
    name: '',
    email: '',
  })

  const onSubmit: SubmitHandler<INewUser> = async (data) => {
    console.log(data)
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'
    try {
      const response = await axios.post(`${apiUrl}/users`, data)
      setNewUser(response.data)
      reset()
    } catch (error) {
      console.log('Error:', error)
    }
  }

  return (
    <div className="flex flex-col mx-auto w-screen border border-black h-screen justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-center items-center mx-auto max-w-7xl border border-black p-8 rounded-md gap-4"
      >
        <label htmlFor="name">Name: </label>
        <input {...register('name', { required: true })} className="p-3 rounded-lg" />
        {errors.name && <span className='text-red-500'>*This field is required</span>}

        <label htmlFor="email">Email: </label>
        <input {...register('email', { required: true })} className="p-3 rounded-lg" />

        {errors.email && <span className='text-red-500'>*This field is required</span>}
        <button type="submit" className="bg-blue-500 py-2 px-4 rounded w-full mt-2">
          Submit
        </button>
      </form>
    </div>
  )
}

export default FormComponents

import { axiosInstance } from '@/axios'
import { INewUser } from '@/interface/INewUser'
import Image from 'next/image'
import Link from 'next/link'
import { useForm, SubmitHandler } from 'react-hook-form'
import { toast } from 'react-hot-toast'

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

  const onSubmit: SubmitHandler<INewUser> = async (data) => {
    try {
      await axiosInstance.post('/users', data)
      reset()
      toast.success('User created successfully!')
    } catch (error) {
      console.log('Error:', error)
    }
  }

  return (
    <div className="flex flex-col mx-auto w-screen border border-black h-screen justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col  mx-auto lg:w-1/3 md:w-1/2 border border-gray-900 max-sm:border-none p-8 rounded-md gap-4 text"
      >
        <h1 className="text-3xl font-bold text-center">Register User</h1>
        <div className="w-full border border-gray-900"></div>
        <div className="flex flex-col gap-4">
          <label htmlFor="name">Name: </label>
          <input
            {...register('name', { required: true })}
            className="p-3 rounded-lg text-black outline-none"
            placeholder="Enter your name"
          />
          {errors.name && <span className="text-red-500">*This field is required</span>}

          <label htmlFor="email">Email: </label>
          <input
            {...register('email', { required: true })}
            className="p-3 rounded-lg text-black outline-none"
            placeholder="Enter your email"
          />

          {errors.email && <span className="text-red-500">*This field is required</span>}
          <button type="submit" className="bg-yellow-500 py-3 px-4 rounded w-full mt-2">
            Submit
          </button>
          <Link href={'/users'} className="text-blue-500 text-sm flex w-full justify-end">
            Click here to see all users
          </Link>
        </div>
      </form>
    </div>
  )
}

export default FormComponents

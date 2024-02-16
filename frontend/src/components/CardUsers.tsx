import { Card } from '@/interface'
import React, { FC } from 'react'

const CardUsers: FC<{ card: Card[] }> = ({ card }) => {
  return (
    <div className="mt-12 w-full">
      <div className="flex flex-col gap-4 max-w-4xl  mx-auto">
        {card.map((user) => (
          <div key={user.id} className="bg-gray-800 rounded-md p-4 w-full shadow-lg shadow-black/25">
            <p className='text-xl'>ID: {user.id}</p>
            <p className='text-xl'>Name: {user.name}</p>
            <p className='text-xl'>Email: {user.email}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CardUsers

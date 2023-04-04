import Image from 'next/image'
import React from 'react'

const TwitterToFollow = ({ user }: any) => {
  return (
    <div className='flex mb-4 p-3 gap-3   hover:bg-gray-100 transition duration-300 cursor-pointer'>
      <Image
        src={user.picture.thumbnail}
        width={50}
        height={50}
        alt='user photo'
        className='rounded-full'
      />
      <div className='flex flex-col flex-grow ml-1 text-[15px]'>
        <span className='font-bold truncate leading-5 hover:underline'>
          {' '}
          {user.name.first}&nbsp;
          {user.name.last}
        </span>

        <span className='text-gray-500 truncate leading-5'>
          @{user.login.username}
        </span>
      </div>
      <button className='lg:w-48 h-10 bg-black text-white font-bold text-base px-5 rounded-full'>
        Follow
      </button>
    </div>
  )
}

export default TwitterToFollow

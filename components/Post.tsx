import { chartBar, chat, ellipsis, heart, share, trash } from '@/assets/icons'
import { TPost } from '@/types'
import Image from 'next/image'
import React from 'react'

const Post = ({ post }: { post: TPost }) => {
  return (
    <div className='flex p-3 cursor-pointer border-b border-gray-200'>
      <div className='mr-4'>
        <Image
          src={post.userImg}
          alt='user'
          width={44}
          height={44}
          className='cursor-pointer hover:brightness-95 w-11 h-11'
        />
      </div>
      <div className='w-full h-auto'>
        <div className='flex justify-between'>
          <div className='flex gap-1 whitespace-nowrap items-center'>
            <h4 className='font-bold text-[14px] sm:text-[1rem] hover:underline'>
              {post.name}
            </h4>
            <span className='text-sm sm:text-base '>@{post.username} - </span>
            <span className='text-sm sm:text-base hover:underline'>
              {post.timestamp}
            </span>
          </div>
          <div className='flex items-center justify-center w-10 h-10 rounded-full hover:bg-sky-100 hover:text-sky-500'>
            <span className='icon '>{ellipsis}</span>
          </div>
        </div>
        <div>
          <p className='text-gray-800 text-[14px] sm:text-base mb-2'>
            {post.text}
          </p>
        </div>
        <div className=''>
          <Image
            src={post.img}
            width={500}
            height={300}
            alt='unsplash'
            className='object-cover rounded-2xl'
          />
        </div>
        <div className='post flex items-center justify-between text-gray-500 p-2'>
          <span className='icon hover:text-sky-500'>{chat}</span>
          <span className='icon hover:text-red-600'>{trash}</span>
          <span className='icon hover:text-red-600'>{heart}</span>
          <span className='icon hover:text-sky-500'>{share}</span>
          <span className='icon hover:text-sky-500'>{chartBar}</span>
        </div>
      </div>
    </div>
  )
}

export default Post

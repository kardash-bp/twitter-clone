import Image from 'next/image'
import React from 'react'
import Post from './Post'
import TweetInput from './TweetInput'
import { posts } from '../assets/data'
import { TPost } from '@/types'
const TweetMain = () => {
  return (
    <div className='border-x lg:min-w-[576px]'>
      {/* main header */}
      <div className='flex sticky items-center justify-between py-2 px-3 top-0 z-50 bg-white border-b border-gray-200'>
        {' '}
        <h2 className='text-lg sm:text-xl font-bold cursor-pointer'>Home</h2>
        <div className='flex items-center justify-center hover:bg-gray-200 rounded-full w-9 h-9'>
          <Image src='/spark.png' width={16} height={16} alt='spark' />
        </div>
      </div>
      <TweetInput />
      {posts.map((post: TPost, idx: number) => (
        <Post key={idx} post={post} />
      ))}
    </div>
  )
}

export default TweetMain

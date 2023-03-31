import { emoji, imgIcon } from '@/assets/icons'
import Image from 'next/image'
import React from 'react'

const TweetInput = () => {
  return (
    <div className='flex border-b border-gray-200 p-3 gap-5'>
      <Image
        src='/user.png'
        alt='user'
        width={44}
        height={44}
        className='cursor-pointer hover:brightness-95 w-11 h-11'
      />
      <div className='flex-grow divide-y divide-gray-200'>
        <textarea
          rows={2}
          placeholder="What's happening?"
          className='w-full border-none focus:ring-0 text-lg placeholder-gray-700 tracking-wide min-h-[50px] text-gray-700'
        ></textarea>

        <div className='flex justify-between p-2 '>
          <div className='flex'>
            <div className='hoverSideMenu flex items-center justify-center'>
              <span className='icon text-sky-500'>{imgIcon}</span>
            </div>
            <div className='hoverSideMenu flex items-center justify-center'>
              <span className='icon text-sky-500'>{emoji}</span>
            </div>
          </div>
          <button
            className='bg-blue-400 rounded-full px-4 py-1 text-white font-bold text-lg hover:brightness-95 disabled:opacity-50'
            disabled
          >
            Tweet
          </button>
        </div>
      </div>
    </div>
  )
}

export default TweetInput

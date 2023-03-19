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
              <span className='icon'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='inputTweetIcon'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z'
                  />
                </svg>
              </span>
            </div>
            <div className='hoverSideMenu flex items-center justify-center'>
              <span className='icon'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='inputTweetIcon'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z'
                  />
                </svg>
              </span>
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

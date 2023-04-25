import Image from 'next/image'
import React from 'react'
const Post = dynamic(() => import('./Post'), { ssr: false })
import TweetInput from './TweetInput'
import { TweetType } from '@/types'
import { useSession } from 'next-auth/react'
import dynamic from 'next/dynamic'
import { AnimatePresence, motion } from 'framer-motion'
const TweetMain = ({ posts }: { posts: TweetType[] }) => {
  return (
    <div className='border-x lg:min-w-[576px]'>
      {/* main header */}
      <div className='flex sticky items-center justify-between py-2 px-3 top-0 z-50 bg-white opacity-80 border-b border-gray-200'>
        {' '}
        <h2 className='text-lg sm:text-xl font-bold cursor-pointer'>Home</h2>
        <div className='flex items-center justify-center hover:bg-gray-200 rounded-full w-9 h-9'>
          <Image src='/spark.png' width={16} height={16} alt='spark' />
        </div>
      </div>
      <TweetInput />
      <AnimatePresence>
        {posts?.map((post: any, idx: number) => (
          <motion.div
            key={post.id}
            initial={{ x: -500, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -500, opacity: 0 }}
            transition={{ duration: 1 }}
          >
            {' '}
            <Post key={idx} post={{ ...post }} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

export default TweetMain

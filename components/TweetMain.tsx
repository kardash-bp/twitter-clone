import React from 'react'
const Post = dynamic(() => import('./Post'), { ssr: false })
import TweetInput from './TweetInput'
import { TweetType } from '@/types'
import dynamic from 'next/dynamic'
import { AnimatePresence, motion } from 'framer-motion'
import { useUserStore } from '@/store/userStore'
const TweetMain = ({
  posts,
  comments,
}: {
  posts: TweetType[]
  comments: any
}) => {
  const { currentUser } = useUserStore((state) => state)

  return (
    <div className='border-x w-[576px]'>
      {/* main header */}
      <div className='flex sticky items-center justify-between py-2 px-3 top-0 bg-white opacity-80 border-b border-gray-200'>
        {' '}
        <h2 className='text-lg sm:text-xl font-bold cursor-pointer py-2'>
          Home
        </h2>
      </div>
      {currentUser.uid && <TweetInput />}
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
            <Post
              key={idx}
              post={{ ...post }}
              totalComments={comments[post.id]?.length || 0}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

export default TweetMain

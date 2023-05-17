import Image from 'next/image'
import React from 'react'
const Post = dynamic(() => import('./Post'), { ssr: false })
import TweetInput from './TweetInput'
import { TweetType } from '@/types'
import dynamic from 'next/dynamic'
import { AnimatePresence, motion } from 'framer-motion'
import { useSession } from 'next-auth/react'
const TweetMain = ({
  posts,
  comments,
}: {
  posts: TweetType[]
  comments: any
}) => {
  const { data } = useSession()
  console.log(data)
  return (
    <div className='border-x md:max-w-[576px]'>
      {/* main header */}
      <div className='flex sticky items-center justify-between py-2 px-3 top-0 bg-white opacity-80 border-b border-gray-200'>
        {' '}
        <h2 className='text-lg sm:text-xl font-bold cursor-pointer py-2'>
          Home
        </h2>
      </div>
      {data?.user.uid && <TweetInput />}
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

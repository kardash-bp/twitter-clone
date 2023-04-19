import { chartBar, chat, ellipsis, heart, share, trash } from '@/assets/icons'
import { db } from '@/firebase'
import { LikesType, TPost } from '@/types'
import {
  doc,
  setDoc,
  DocumentData,
  getDoc,
  arrayUnion,
  arrayRemove,
  updateDoc,
} from 'firebase/firestore'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import React, { useEffect, useState, useCallback } from 'react'
const Post = ({ post }: any) => {
  const { data } = useSession()
  const [likes, setLikes] = useState<string[]>([])
  const [liked, setLiked] = useState(false)
  const formattedDate = new Date(post.date).toLocaleDateString('sr-RS')
  const formattedTime = new Date(post.date).toLocaleTimeString('sr-RS')

  const likeAddRemove = async () => {
    const fireDoc = doc(db, `likes/${post.id}`)
    const docSnap = await getDoc(fireDoc)
    const fireData = docSnap.data()

    if (!data?.user?.username) return

    if (fireData?.usernames.includes(data?.user.username)) {
      // remove like
      await updateDoc(fireDoc, { usernames: arrayRemove(data.user.username) })
      await getLikes()
    } else {
      // add like
      await setDoc(
        fireDoc,
        {
          usernames: arrayUnion(data?.user?.username),
        },
        { merge: true }
      )
      await getLikes()
    }
  }
  const getLikes = useCallback(async (): Promise<void> => {
    const docRef = doc(db, 'likes', post.id)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      setLikes(docSnap.data().usernames)
      // console.log(docSnap.data().usernames)
    } else {
      // docSnap.data() will be undefined in this case
      console.log('No such document!')
    }
  }, [likes])
  useEffect(() => {
    getLikes()
  }, [])

  useEffect(() => {
    if (data?.user.username && likes.includes(data?.user.username)) {
      setLiked(true)
    } else {
      setLiked(false)
    }
  }, [likes])
  console.log(likes)
  return (
    <div className='flex p-3 cursor-pointer border-b border-gray-200'>
      <div className='mr-4'>
        <Image
          src={post?.image}
          alt='user'
          width={44}
          height={44}
          className='hidden lg:block rounded-full cursor-pointer hover:brightness-95 w-12 h-11'
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
              {formattedTime} - {formattedDate}
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
            src={post.imageTw}
            width={500}
            height={300}
            alt='unsplash'
            className='object-cover rounded-2xl'
          />
        </div>
        <div className='post flex items-center justify-between text-gray-500 p-2'>
          <span className='icon hover:text-sky-500'>{chat}</span>
          <span className='icon hover:text-red-600'>{trash}</span>
          <span
            className={`icon ${
              liked && 'text-red-700'
            } hover:text-red-600 flex relative ${likes.length > 0 && 'w-10'}`}
            onClick={likeAddRemove}
          >
            {heart}
            <span className='text-sm absolute top-0 right-0 text-gray-400 font-bold'>
              {' '}
              {likes.length > 0 && likes.length}
            </span>
          </span>
          <span className='icon hover:text-sky-500'>{share}</span>
          <span className='icon hover:text-sky-500'>{chartBar}</span>
        </div>
      </div>
    </div>
  )
}

export default Post

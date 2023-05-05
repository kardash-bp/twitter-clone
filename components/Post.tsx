import { chartBar, chat, ellipsis, heart, share, trash } from '@/assets/icons'
import { db } from '@/firebase'
import { useCommentsStore } from '@/store/commentsStore'
import {
  doc,
  setDoc,
  getDoc,
  arrayUnion,
  arrayRemove,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore'
import { getStorage, ref, deleteObject } from 'firebase/storage'
import { signIn, useSession } from 'next-auth/react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useEffect, useState, useCallback } from 'react'
const Post = ({ post }: any) => {
  const router = useRouter()
  const { data } = useSession()
  const setOpen = useCommentsStore((state) => state.setOpen)
  const [likes, setLikes] = useState<string[]>([])
  const [liked, setLiked] = useState(false)
  const formattedDate = new Date(post.date).toLocaleDateString('sr-RS')
  const formattedTime = new Date(post.date).toLocaleTimeString('sr-RS')

  const handleComment = async () => {
    console.log({ data })
    if (!data || !data.user.username) {
      signIn()
    } else {
      setOpen(post)
    }
  }
  const delTweet = async () => {
    if (window.confirm('Are you sure?')) {
      await deleteDoc(doc(db, 'posts', post.id))
      await deleteDoc(doc(db, 'likes', post.id))
      if (post.imageTw) {
        const storage = getStorage()
        const fileRef = ref(storage, post.imageTw)
        try {
          await deleteObject(fileRef)
        } catch (error) {
          console.log(error)
        }
      }
      router.replace(router.asPath)
    }
  }
  const likeAddRemove = async () => {
    console.log({ data })
    if (!data || !data.user.username) return

    const fireDoc = doc(db, `likes/${post.id}`)
    const docSnap = await getDoc(fireDoc)
    const fireData = docSnap.data()

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
  return (
    <div className='flex p-3 cursor-pointer border-b border-gray-200'>
      <div className='mr-4'>
        <Image
          src={post.image}
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
        {post.imageTw && (
          <div className=''>
            <Image
              src={post.imageTw}
              width={500}
              height={300}
              alt='unsplash'
              className='object-cover rounded-2xl'
            />
          </div>
        )}
        <div className='post flex items-center justify-between text-gray-500 p-2'>
          <span className='icon hover:text-sky-500' onClick={handleComment}>
            {chat}
          </span>
          {data?.user.uid === post.uid && (
            <span className='icon hover:text-red-600' onClick={delTweet}>
              {trash}
            </span>
          )}
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

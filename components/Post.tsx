import { chartBar, chat, ellipsis, heart, share, trash } from '@/assets/icons'
import { db } from '@/firebase'
import { useCommentsStore } from '@/store/commentsStore'
import { useUserStore } from '@/store/userStore'
import { formatDate } from '@/utils/formatDate'
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
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState, useCallback } from 'react'

const Post = ({ post, totalComments = 0 }: any) => {
  const router = useRouter()
  const setOpen = useCommentsStore((state) => state.setOpen)
  const { currentUser } = useUserStore((state) => state)

  const [likes, setLikes] = useState<string[]>([])
  const [liked, setLiked] = useState(false)
  const formattedDate = formatDate(post.timestamp)

  const handleComment = async () => {
    if (!currentUser || !currentUser.username) {
      router.push('/auth/signin')
    } else {
      setOpen(post)
    }
  }

  const delTweet = async () => {
    if (window.confirm('Are you sure?')) {
      await deleteDoc(doc(db, 'posts', post.id))
      await deleteDoc(doc(db, 'likes', post.id))
      await deleteDoc(doc(db, 'comments', post.id))
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
      if (router.pathname !== '/') {
        router.push('/')
      }
    }
  }
  const likeAddRemove = async () => {
    if (!currentUser || !currentUser.username) return

    const fireDoc = doc(db, `likes/${post.id}`)
    const docSnap = await getDoc(fireDoc)
    const fireData = docSnap.data()

    if (fireData?.usernames.includes(currentUser.username)) {
      // remove like
      await updateDoc(fireDoc, { usernames: arrayRemove(currentUser.username) })
      await getLikes()
    } else {
      // add like
      await setDoc(
        fireDoc,
        {
          usernames: arrayUnion(currentUser.username),
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
    if (currentUser.username && likes.includes(currentUser.username)) {
      setLiked(true)
    } else {
      setLiked(false)
    }
  }, [likes])
  return (
    <div className='flex flex-col'>
      <div className='flex flex-row p-3 border-b border-gray-200'>
        <div className='mr-4'>
          <Image
            src={post.userImage ? post.userImage : '/user.png'}
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
                {formattedDate}
              </span>
            </div>
            <div className='flex items-center justify-center w-10 h-10 rounded-full hover:bg-sky-100 hover:text-sky-500'>
              <span className='icon '>{ellipsis}</span>
            </div>
          </div>
          <Link href={`/posts/${post.id}`}>
            <p className='text-gray-800 text-[14px] sm:text-base py-2'>
              {post.text}
            </p>
            {post.imageTw && (
              <Image
                src={post.imageTw}
                width={500}
                height={300}
                alt='unsplash'
                className='object-cover rounded-2xl '
              />
            )}{' '}
          </Link>
          <ul className='post flex  items-center justify-between text-gray-500 p-2'>
            <li className='flex gap-2'>
              <span className='icon hover:text-sky-500' onClick={handleComment}>
                {chat}
              </span>{' '}
              <span> {totalComments > 0 && totalComments}</span>
            </li>
            {currentUser.uid === post.uid && (
              <li className='icon hover:text-red-600' onClick={delTweet}>
                {trash}
              </li>
            )}
            <li
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
            </li>
            <span className='icon hover:text-sky-500'>{share}</span>
            <span className='icon hover:text-sky-500'>{chartBar}</span>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Post

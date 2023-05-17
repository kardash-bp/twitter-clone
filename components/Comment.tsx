import Image from 'next/image'
import React, { useCallback, useEffect, useState } from 'react'
import { chartBar, ellipsis, heart, share, trash } from '@/assets/icons'
import { useCommentsStore } from '@/store/commentsStore'

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
import { db } from '@/firebase'
import { useRouter } from 'next/router'
import { TComment } from '@/types'
import { removeElementFromState } from '@/lib/removeElementFromState'
import { useUserStore } from '@/store/userStore'
const Comment = ({ comment }: { comment: TComment }) => {
  const router = useRouter()
  const { currentUser } = useUserStore((state) => state)

  const { postComments, setPostComments } = useCommentsStore((state) => state)
  const [likes, setLikes] = useState<string[]>([])
  const [liked, setLiked] = useState(false)
  const formattedDate = formatDate(comment.timestamp!)

  const delComment = async () => {
    if (window.confirm('Are you sure?')) {
      try {
        const commRef = doc(db, 'comments', comment.postId)
        await updateDoc(commRef, { comments: arrayRemove(comment) })
        await deleteDoc(doc(db, 'likes-comment', comment.postId))
        removeElementFromState(postComments, comment, setPostComments)
        router.replace(router.asPath)
        // if (router.pathname !== '/') {
        //   router.push('/')
        // }
      } catch (err: any) {
        console.log(err.message)
      }
    }
  }
  const likeAddRemove = async () => {
    if (!currentUser || !currentUser.username) return

    const fireDoc = doc(db, `likes-comment/${comment.postId}`)
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
          usernames: arrayUnion(currentUser?.username),
        },
        { merge: true }
      )
      await getLikes()
    }
  }
  const getLikes = useCallback(async (): Promise<void> => {
    const docRef = doc(db, 'likes-comment', comment.postId)
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
  return (
    <div className='flex flex-row p-3 border-b border-gray-200'>
      <div className='mr-4'>
        <Image
          src={comment.userImage ? comment.userImage : '/user.png'}
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
              {comment.name}
            </h4>
            <span className='text-sm sm:text-base '>
              @{comment.username} -{' '}
            </span>
            <span className='text-sm sm:text-base hover:underline'>
              {formattedDate}
            </span>
          </div>
          <div className='flex items-center justify-center w-10 h-10 rounded-full hover:bg-sky-100 hover:text-sky-500'>
            <span className='icon '>{ellipsis}</span>
          </div>
        </div>
        <p className='text-gray-800 text-[14px] sm:text-base py-2'>
          {comment.text}
        </p>

        <ul className='post flex  items-center justify-between text-gray-500 p-2'>
          {currentUser.uid === comment.uid && (
            <li className='icon hover:text-red-600' onClick={delComment}>
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
  )
}

export default Comment

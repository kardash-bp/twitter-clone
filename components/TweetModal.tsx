import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { db } from '@/firebase'

import { useOutsideClick } from '@/pages/lib/useOutsideClick'
import { useCommentsStore } from '@/store/commentsStore'
import ReactModal from 'react-modal'
import { shallow } from 'zustand/shallow'
import { closeIcon, emoji, imgIcon, pin } from '@/assets/icons'
import Image from 'next/image'
import {
  setDoc,
  doc,
  arrayUnion,
  Timestamp,
  addDoc,
  collection,
} from 'firebase/firestore'
import { useRouter } from 'next/router'
import { useUserStore } from '@/store/userStore'
import { firebaseUploadHandler } from '@/pages/lib/firebaseUploadHandler'
ReactModal.setAppElement('#__next')
const TweetModal = () => {
  const [input, setInput] = useState('')
  const [image, setImage] = useState<File>()
  const [imageUrl, setImageUrl] = useState('')
  const router = useRouter()
  // upload progress
  const [percent, setPercent] = useState(0)
  const [loading, setLoading] = useState(false)
  let imgUploadRef = useRef<HTMLInputElement>(null)
  const { currentUser } = useUserStore((state) => state)
  const { isOpen, setClose } = useUserStore((state) => state)

  const refTweetModal = useRef<HTMLDivElement>(null)

  useOutsideClick(refTweetModal, setClose)

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value)
  }

  const savePost = async () => {
    if (loading) return
    try {
      setLoading(true)
      await addDoc(collection(db, 'posts'), {
        uid: currentUser.uid,
        name: currentUser.name,
        username: currentUser.username,
        userImage: currentUser.userImg,
        text: input,
        timestamp: Timestamp.now().seconds,
        imageTw: imageUrl,
      })
      setInput('')
      setImage(undefined)
      setPercent(0)
      setImageUrl('')
      setLoading(false)
      router.replace(router.asPath)
      setClose()
    } catch (err: any) {
      console.log(err.message)
      setLoading(false)
      setPercent(0)
      setInput('')
      setImage(undefined)
    }
  }
  // This function will be triggered when the "Remove This Image" button is clicked
  const removeSelectedImage = () => {
    setImage(undefined)
  }
  const addImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target
    const selectedFiles = files as FileList
    const file = selectedFiles?.[0]
    if (file) {
      setImage(file)
    } else {
      alert('Please choose a file first!')
    }
  }
  useEffect(() => {
    if (image) {
      firebaseUploadHandler(currentUser.uid!, image, setPercent, setImageUrl)
    }
  }, [image])
  return (
    <ReactModal
      className='
     top-12  flex overflow-x-hidden overflow-y-auto fixed inset-0 outline-none focus:outline-none'
      isOpen={isOpen}
      onRequestClose={setClose}
      shouldCloseOnEsc={true}
    >
      {' '}
      <div ref={refTweetModal} className='mx-auto  w-[600px] z-50'>
        <div className=' border-0 rounded-xl shadow-lg flex flex-col bg-white outline-none focus:outline-none'>
          {/*header*/}
          <div className='flex items-center p-3 rounded-t'>
            <button
              className='text-gray-800 bg-transparent p-1 rounded-full hover:bg-gray-100  text-2xl outline-none focus:outline-none transition duration-300'
              onClick={setClose}
            >
              {closeIcon}
            </button>
          </div>
          <div className='flex border-b border-gray-200 p-3 gap-5'>
            <Image
              src={currentUser.userImg!}
              alt='user'
              width={44}
              height={44}
              className='rounded-full cursor-pointer hover:brightness-95 w-11 h-11'
            />
            <div className='flex-grow divide-y divide-gray-200'>
              <textarea
                rows={2}
                placeholder="What's happening?"
                className='w-full border-none focus:ring-0 text-lg placeholder-gray-700 tracking-wide min-h-[50px] text-gray-700'
                value={input}
                onChange={handleChange}
              ></textarea>
              {image && (
                <div className='relative'>
                  <img
                    src={URL.createObjectURL(image)}
                    className={`w-[500px] h-[auto] rounded-xl ${
                      loading ? 'animate-ping' : ''
                    }`}
                    alt='Thumb'
                  />
                  <button
                    onClick={removeSelectedImage}
                    className='w-6 h-6 m-2 absolute top-0 right-0 z-10 font-bold text-base text-sky-500 bg-white rounded-full transition duration-300 hover:text-red-500 hover:rotate-180'
                  >
                    X
                  </button>
                </div>
              )}
              {!loading && (
                <div className='flex justify-between p-2 '>
                  <div className='flex'>
                    <div
                      className='hoverSideMenu flex items-center justify-center'
                      onClick={() => imgUploadRef?.current!.click()}
                    >
                      <span className='icon text-sky-500'>{imgIcon}</span>
                      <input
                        type='file'
                        hidden
                        ref={imgUploadRef}
                        onChange={addImage}
                        accept='/image/*'
                      />
                    </div>
                    <div className='hoverSideMenu flex items-center justify-center'>
                      <span className='icon text-sky-500'>{emoji}</span>
                    </div>
                    <div className='hoverSideMenu flex items-center justify-center'>
                      <span className='icon text-sky-500'>{pin}</span>
                    </div>
                  </div>
                  <button
                    disabled={!input.trim()}
                    className='bg-sky-400 rounded-full px-4 py-1 text-white font-bold text-lg hover:brightness-95 disabled:opacity-50 cursor-pointer transition-all duration-200'
                    onClick={savePost}
                  >
                    Tweet
                  </button>
                </div>
              )}
              {percent !== 0 && percent !== 100 && (
                <p className='inline-block'>{percent} % done</p>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className='opacity-25 fixed inset-0 bg-black'></div>
    </ReactModal>
  )
}

export default TweetModal

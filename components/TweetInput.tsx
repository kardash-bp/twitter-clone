import { emoji, imgIcon, pin } from '@/assets/icons'
import { db } from '@/firebase'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { addDoc, collection, doc } from 'firebase/firestore'
import { firebaseUploadHandler } from '@/lib/firebaseUploadHandler'
import { useRouter } from 'next/router'
const TweetInput = () => {
  const [input, setInput] = useState('')
  const [image, setImage] = useState<File>()
  const [imageUrl, setImageUrl] = useState('')
  const router = useRouter()
  // upload progress
  const [percent, setPercent] = useState(0)
  const [loading, setLoading] = useState(false)
  let imgUploadRef = useRef<HTMLInputElement>(null)
  const { data: session, status } = useSession()
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value)
  }
  const savePost = async () => {
    if (loading) return
    try {
      setLoading(true)
      const docRef = await addDoc(collection(db, 'posts'), {
        uid: session?.user.uid,
        name: session?.user.name,
        username: session?.user.username,
        userImage: session?.user.image,
        text: input,
        date: new Date().toLocaleString('rs'),
        imageTw: imageUrl,
      })
      setInput('')
      setImage(undefined)
      setPercent(0)
      setImageUrl('')
      setLoading(false)
      router.replace(router.asPath)
    } catch (err: any) {
      console.log(err.message)
      setLoading(false)
      setPercent(0)
      setInput('')
      setImage(undefined)
    }
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
  // This function will be triggered when the "Remove This Image" button is clicked
  const removeSelectedImage = () => {
    setImage(undefined)
  }
  useEffect(() => {
    if (image) {
      firebaseUploadHandler(session?.user.uid!, image, setPercent, setImageUrl)
    }
  }, [image])
  return (
    <div className='flex border-b border-gray-200 p-3 gap-5'>
      <Image
        src={session?.user.image!}
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
  )
}

export default TweetInput

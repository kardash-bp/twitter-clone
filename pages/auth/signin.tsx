import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { auth, db } from '@/firebase'

import { FcGoogle } from 'react-icons/fc'
import Image from 'next/image'
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore'
import { useRouter } from 'next/router'
import Link from 'next/link'
const SignIn = () => {
  const router = useRouter()
  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider()
      const userCard = await signInWithPopup(auth, provider)

      console.log(userCard.user)
      if (!userCard.user) return
      const { user } = userCard
      const userRef = doc(db, 'users', user.uid!)
      const userSnap = await getDoc(userRef)

      if (!userSnap.exists()) {
        await setDoc(userRef, {
          name: user.displayName,
          email: user.email,
          username: user.displayName!.split(' ').join('').toLocaleLowerCase(),
          userImg: user.photoURL,
          uid: user.uid,
          timestamp: serverTimestamp(),
        })
      }
      router.push('/')
    } catch (err: any) {
      console.log(err)
    }
  }
  return (
    <div className='flex justify-center mt-24 gap-10'>
      <Image
        src='/twitter-login.png'
        alt='twitter login'
        width={300}
        height={300}
        className='hidden md:block'
      />
      <div className='text-gray-700'>
        <Link href='/'>
          <h1 className='flex items-center text-2xl font-bold text-[#1da1f2] mb-8'>
            <Image src='/logo.png' width={68} height={68} alt='logo' /> Twitter
            Clone Demo
          </h1>
        </Link>
        <button
          onClick={signInWithGoogle}
          className='flex gap-2 items-center w-full justify-center py-2 bg-yellow-100 hover:text-[#1da1f2] rounded-md  border-transparent border-2  hover:border-[#1da1f2] transition-all duration-300 cursor-pointer'
        >
          <FcGoogle size={28} /> Sign In with{' '}
          <span className='font-bold'>Google</span>{' '}
        </button>
      </div>
    </div>
  )
}

export default SignIn

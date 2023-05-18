import Image from 'next/image'
import SidebarMenuItem from './SidebarMenuItem'
import {
  bell,
  bookmark,
  clipboard,
  ellipsis,
  envelope,
  explore,
  homeIcon,
  more,
  search,
  userIcon,
} from '../assets/icons'
import Link from 'next/link'
import { auth, db } from '@/firebase'
import { useEffect } from 'react'
import { useUserStore } from '@/store/userStore'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
const Sidebar = () => {
  const { currentUser, setCurrentUser } = useUserStore((state) => state)
  const handleLogout = () => {
    signOut(auth)
    setCurrentUser({ displayName: '', email: '', photoURL: '', uid: '' })
  }
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userRef = doc(db, 'users', auth.currentUser?.providerData[0].uid!)
        const userSnap = await getDoc(userRef)
        if (userSnap.exists()) {
          setCurrentUser(user)
        }
      }
    })
  }, [])
  return (
    <div className='hidden pl-2 sm:flex sm:flex-col w-[60px]  xl:w-[245px]'>
      <div className=''>
        <Link href='/' className='cursor-pointer'>
          {' '}
          <Image src='/logo.png' width={52} height={52} alt='logo' />
        </Link>
      </div>
      <div className='mt-4 mb-2'>
        <SidebarMenuItem text='Home' icon={homeIcon} active />
        <SidebarMenuItem text='Search' icon={search} />
        <SidebarMenuItem text='Explore' icon={explore} />

        {currentUser.uid && (
          <>
            <SidebarMenuItem text='Notifications' icon={bell} />
            <SidebarMenuItem text='Messages' icon={envelope} />
            <SidebarMenuItem text='Bookmarks' icon={bookmark} />
            <SidebarMenuItem text='Lists' icon={clipboard} />
            <SidebarMenuItem text='Profile' icon={userIcon} />
            <SidebarMenuItem text='More' icon={more} />
          </>
        )}
      </div>
      {currentUser && currentUser.uid ? (
        <>
          <button
            className='xl:w-52 h-12 xl:bg-blue-400 xl:rounded-full xl:shadow-md hover:brightness-95'
            onClick={handleLogout}
          >
            <Image
              src='/tweet.png'
              alt='tweet button'
              width={52}
              height={52}
              className='xl:hidden'
            />
            <span className=' text-white font-bold hover:brightness-95 text-lg hidden xl:inline'>
              {' '}
              Tweet
            </span>
          </button>
          <div className='hoverSideMenu  text-gray-800 flex items-center justify-center xl:justify-start mt-4 xl:h-auto xl:p-2'>
            <Image
              src={currentUser.userImg}
              alt='user'
              width={48}
              height={48}
              onClick={() => {
                if (confirm('Are you sure?')) {
                  handleLogout()
                }
              }}
              className='rounded-full w-12 h-12'
            />

            <button
              className='hidden xl:block xl:mx-2'
              onClick={() => {
                if (confirm('Are you sure?')) {
                  handleLogout()
                }
              }}
            >
              <h4 className='font-bold'>{currentUser.name}</h4>
              <p className='text-gray-500'>@{currentUser.username}</p>
            </button>
            <div className='icon hidden xl:inline'>{ellipsis}</div>
          </div>
        </>
      ) : (
        <Link
          className=' text-center flex justify-center items-center w-[3rem] leading-4 xl:w-[120px] xl:p-1 h-12 text-white bg-blue-400 rounded-full ml-2 shadow-md hover:brightness-95'
          href='/auth/signin'
        >
          Sign In{' '}
        </Link>
      )}
    </div>
  )
}

export default Sidebar

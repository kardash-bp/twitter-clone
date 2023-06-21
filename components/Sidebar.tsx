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
import { auth } from '@/firebase'
import { useUserStore } from '@/store/userStore'
import { signOut } from 'firebase/auth'
import { useRouter } from 'next/router'
import Tooltip from './Tooltip'
const Sidebar = () => {
  const router = useRouter()

  const { currentUser, setCurrentUser, setIsOpen } = useUserStore(
    (state) => state
  )

  const handleTweetPost = async () => {
    console.log('test tweet post')
    if (!currentUser || !currentUser.username) {
      router.push('/auth/signin')
    } else {
      setIsOpen()
    }
  }
  const handleLogout = () => {
    signOut(auth)
    setCurrentUser({ displayName: '', email: '', photoURL: '', uid: '' })
  }

  return (
    <div className='hidden sm:flex sm:flex-col pl-2  w-[60px]  xl:w-[245px]'>
      <div className=''>
        <Link href='/' className='cursor-pointer'>
          {' '}
          <Image src='/logo.png' width={52} height={52} alt='logo' />
        </Link>

        <div className='mt-4 mb-2'>
          <Link href='/'>
            <SidebarMenuItem text='Home' icon={homeIcon} active />
          </Link>
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
              <button
                className='xl:w-52 h-12 p-3 xl:bg-blue-400 xl:rounded-full xl:shadow-md hover:brightness-95'
                onClick={handleTweetPost}
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
            </>
          )}
        </div>
      </div>
      {currentUser && currentUser.uid ? (
        <Tooltip message='click to logout'>
          <div className='hoverSideMenu mb-5 text-gray-800 flex items-center justify-center xl:justify-start mt-4 xl:p-3'>
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
            <div className='icon hidden xl:inline'>{ellipsis}</div>{' '}
          </div>
        </Tooltip>
      ) : (
        <Link
          className=' text-center flex justify-center items-center w-[3rem] leading-4 xl:w-[120px] xl:p-1 h-12 text-white bg-blue-400 rounded-full ml-2 shadow-md hover:brightness-95'
          href='/auth/signin'
        >
          <Tooltip message='Click to signin'>Sign In</Tooltip>
        </Link>
      )}
    </div>
  )
}

export default Sidebar

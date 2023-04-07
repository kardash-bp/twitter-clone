import Image from 'next/image'
import { signIn, signOut } from 'next-auth/react'
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
import { useSession } from 'next-auth/react'
const Sidebar = () => {
  const { data: session, status } = useSession()
  console.log(session)
  return (
    <div className='hidden sm:flex sm:flex-col p-2 lg:w-[275px] lg:items-starth-full'>
      <div className='hoverSideMenu p-0 hover:bg-blue-100 ml-2'>
        <Image src='/logo.png' width={52} height={52} alt='logo' />
      </div>
      <div className='mt-4 mb-2 ml-2'>
        <SidebarMenuItem text='Home' icon={homeIcon} active />
        <SidebarMenuItem text='Search' icon={search} />
        <SidebarMenuItem text='Explore' icon={explore} />

        {session && (
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
      {session ? (
        <>
          <button className='lg:w-56 h-12 lg:bg-blue-400 lg:rounded-full ml-2 lg:shadow-md hover:brightness-95'>
            <Image
              src='/tweet.png'
              alt='tweet button'
              width={52}
              height={52}
              className='lg:hidden'
            />
            <span className=' text-white font-bold hover:brightness-95 text-lg hidden lg:inline'>
              {' '}
              Tweet
            </span>
          </button>
          <div className='w-full ml-1 mt-4 hoverSideMenu text-gray-700 flex items-center justify-center lg:justify-start gap-1'>
            <Image
              src={session.user.image}
              alt='user'
              width={52}
              height={52}
              onClick={() => {
                if (confirm('Are you sure?')) {
                  signOut()
                }
              }}
              className='rounded-full'
            />

            <div className='hidden lg:block lg:mx-2'>
              <h4 className='font-bold'>{session.user.name}</h4>
              <p className='text-gray-500'>@{session.user.username}</p>
            </div>
            <div className='icon hidden lg:inline lg:ml-auto'>{ellipsis}</div>
          </div>
        </>
      ) : (
        <button
          className='w-[5rem] p-1 h-12 text-white bg-blue-400 rounded-full ml-2 shadow-md hover:brightness-95'
          onClick={() => signIn()}
        >
          Sign In{' '}
        </button>
      )}
    </div>
  )
}

export default Sidebar

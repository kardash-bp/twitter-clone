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
  return (
    <div className='hidden sm:flex sm:flex-col w-[60px]  xl:w-[275px]'>
      <div className='p-0 ml-2'>
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
          <button className='xl:w-56 h-12 xl:bg-blue-400 xl:rounded-full ml-2 xl:shadow-md hover:brightness-95'>
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
          <div className='hoverSideMenu w-full text-gray-700 flex items-center justify-center xl:justify-start xl:gap-1 mt-4 xl:h-auto'>
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
              className='rounded-full w-12 h-12'
            />

            <div className='hidden xl:block xl:mx-2 xl:flex-grow'>
              <h4 className='font-bold'>{session.user.name}</h4>
              <p className='text-gray-500'>@{session.user.username}</p>
            </div>
            <div className='icon hidden xl:inline lg:ml-auto'>{ellipsis}</div>
          </div>
        </>
      ) : (
        <button
          className='w-[3rem] leading-4 xl:w-[120px] xl:p-1 h-12 text-white bg-blue-400 rounded-full ml-2 shadow-md hover:brightness-95'
          onClick={() => signIn()}
        >
          Sign In{' '}
        </button>
      )}
    </div>
  )
}

export default Sidebar

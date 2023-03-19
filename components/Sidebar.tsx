import Image from 'next/image'
import React from 'react'
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
  userIcon,
} from '../assets/icons'
const Sidebar = () => {
  return (
    <div className='hidden sm:flex flex-col p-2 lg:items-start fixed h-full'>
      <div className='hoverSideMenu p-0 hover:bg-blue-100 ml-2'>
        <Image src='/logo.png' width={52} height={52} alt='logo' />
      </div>
      <div className='mt-4 mb-2 ml-2'>
        <SidebarMenuItem text='Home' icon={homeIcon} active />
        <SidebarMenuItem text='Explore' icon={explore} />
        <SidebarMenuItem text='Notifications' icon={bell} />
        <SidebarMenuItem text='Messages' icon={envelope} />
        <SidebarMenuItem text='Bookmarks' icon={bookmark} />
        <SidebarMenuItem text='Lists' icon={clipboard} />
        <SidebarMenuItem text='Profile' icon={userIcon} />
        <SidebarMenuItem text='More' icon={more} />
      </div>
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
      <div className='w-full ml-1 hoverSideMenu text-gray-700 flex items-center justify-center lg:justify-start mt-auto gap-1'>
        <Image src='/user.png' alt='user' width={52} height={52} />

        <div className='hidden lg:block lg:mx-2'>
          <h4 className='font-bold'>John Doe</h4>
          <p className='text-gray-500'>@john-doe</p>
        </div>
        <div className='icon hidden lg:inline lg:ml-auto'>{ellipsis}</div>
      </div>
    </div>
  )
}

export default Sidebar

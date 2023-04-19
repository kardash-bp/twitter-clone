import { search } from '@/assets/icons'
import { TArticle, TProps } from '@/pages'
import React from 'react'
import News from './News'
import Footer from './Footer'
import TwitterUsers from './TwitterUsers'

const Widgets = ({ data, users }: { data: TArticle[]; users: any }) => {
  return (
    <div className='hidden br:block br:w-[350px] ml-6 space-y-5'>
      <div className='w-[95%]  sticky top-0 bg-white py-1.5 z-40'>
        <div className='relative flex items-center p-3 rounded-full'>
          <span className='icon z-50 text-gray-500'>{search}</span>
          <input
            type='text'
            placeholder='Search Twitter'
            className='absolute w-full inset-0 rounded-full pl-12 border-gray-400 text-gray-700 focus:shadow-lg'
          />
        </div>
      </div>
      <News news={data} />
      <TwitterUsers users={users} />
      <Footer />
    </div>
  )
}

export default Widgets

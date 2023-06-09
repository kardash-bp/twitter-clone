import { search } from '@/assets/icons'
import { TArticle, TProps } from '@/pages'
import React from 'react'
import News from './News'
import Footer from './Footer'
import TwitterUsers from './TwitterUsers'

const Widgets = ({ data, users }: { data: TArticle[]; users: any }) => {
  return (
    <div className='hidden br:block br:w-[350px] ml-6 space-y-5'>
      <div className='w-[95%]  sticky top-0 py-1.5'>
        <div className='relative flex items-center p-3 rounded-full'>
          <span className='icon z-50 text-gray-500'>{search}</span>
          <input
            type='text'
            placeholder='Search Twitter'
            className='absolute w-full appearance-none border border-transparent inset-0 rounded-full pl-12 bg-gray-100 text-gray-700 focus:shadow-lg  focus:border-[#38bdf8]'
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

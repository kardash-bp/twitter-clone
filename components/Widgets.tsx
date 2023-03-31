import { search } from '@/assets/icons'
import React from 'react'

const Widgets = () => {
  return (
    <div className='hidden lg:inline lg:w-[600px] ml-6 space-y-5'>
      <div className='w-[90%] lg:w-[75%] sticky top-0 bg-white py-1.5 z-40'>
        <div className='relative flex items-center p-3 rounded-full'>
          <span className='icon z-50 text-gray-500'>{search}</span>
          <input
            type='text'
            placeholder='Search Twitter'
            className='absolute inset-0 rounded-full pl-12 border-gray-400 text-gray-700 focus:shadow-lg'
          />
        </div>
      </div>
    </div>
  )
}

export default Widgets

import { TArticle } from '@/pages'
import Link from 'next/link'
import React from 'react'

const NewsArticle = ({ article }: { article: TArticle }) => {
  return (
    <div className=' text-gray-700  hover:bg-gray-100 transition duration-300 mb-3 rounded-xl p-3 w-[95%]'>
      <Link
        href={article.url}
        target='_blank'
        className='flex gap-2 justify-between items-center'
        rel='noreferrer'
      >
        <div className='space-y-1'>
          <h4 className='leading-5 font-bold'>
            {article?.title?.split(' ').slice(0, 15).join(' ')} ...
          </h4>
          <p className='text-sm'>{article.source?.name}</p>
        </div>
        {article.urlToImage && (
          <img
            src={article.urlToImage}
            alt='cover photo'
            className='w-[100px] rounded-xl'
          />
        )}
      </Link>
    </div>
  )
}

export default NewsArticle

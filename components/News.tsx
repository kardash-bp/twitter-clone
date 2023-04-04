import { TArticle, TProps } from '@/pages'
import React, { useState } from 'react'
import NewsArticle from './NewsArticle'
type TNews = { news: TArticle[] }
const News = ({ news }: TNews) => {
  const [numberToShow, setNumberToShow] = useState(5)
  return (
    <div className='bg-gray-50'>
      <h3 className='font-bold text-xl p-4'>Trends for you</h3>
      {news
        .map((n, i) => <NewsArticle key={i} article={n} />)
        .slice(0, numberToShow)}
      <button
        className='w-full rounded-b-lg text-left text-[#1da1f2] px-4 py-3  hover:bg-gray-200'
        onClick={() => setNumberToShow(numberToShow + 5)}
      >
        Show more
      </button>
    </div>
  )
}

export default News

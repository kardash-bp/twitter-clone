import { TArticle, TProps } from '@/pages'
import React, { useState } from 'react'
import NewsArticle from './NewsArticle'
type TNews = { news: TArticle[] }
const News = ({ news }: TNews) => {
  const [numberToShow, setNumberToShow] = useState(5)
  return (
    <div>
      <h3 className='font-bold text-xl p-4'>Trends for you</h3>
      {news
        .map((n, i) => <NewsArticle key={i} article={n} />)
        .slice(0, numberToShow)}
      <button
        className='text-blue-400 p-3 hover:text-blue-600'
        onClick={() => setNumberToShow(numberToShow + 5)}
      >
        Show more
      </button>
    </div>
  )
}

export default News

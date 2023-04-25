import { TArticle, TProps } from '@/pages'
import React, { useState } from 'react'
import NewsArticle from './NewsArticle'
import { AnimatePresence, motion } from 'framer-motion'

type TNews = { news: TArticle[] }
const News = ({ news }: TNews) => {
  const [numberToShow, setNumberToShow] = useState(5)
  return (
    <div className='bg-gray-50'>
      <h3 className='font-bold text-xl p-4'>Trends for you</h3>
      <AnimatePresence>
        {news
          .map((n, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
            >
              <NewsArticle key={i} article={n} />
            </motion.div>
          ))
          .slice(0, numberToShow)}
      </AnimatePresence>
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

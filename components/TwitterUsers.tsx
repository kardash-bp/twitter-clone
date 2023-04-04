import { useState } from 'react'
import NewsArticle from './NewsArticle'
import TwitterToFollow from './TwitterToFollow'

const TwitterUsers = ({ users }: any) => {
  const [numberToShow, setNumberToShow] = useState(3)
  return (
    <div className='bg-gray-50 rounded-lg'>
      <h3 className='font-bold text-xl p-4'>Who to follow</h3>
      {users
        .map((user: any, i: number) => <TwitterToFollow key={i} user={user} />)
        .slice(0, numberToShow)}
      <button
        className='w-full rounded-b-lg text-left text-[#1da1f2] px-4 py-3  hover:bg-gray-200'
        onClick={() => setNumberToShow(numberToShow + 3)}
      >
        Show more
      </button>
    </div>
  )
}

export default TwitterUsers

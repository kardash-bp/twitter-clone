import React from 'react'
import Comment from './Comment'
import { TComment } from '@/types'

const Comments = ({ comments }: { comments: TComment[] }) => {
  const reversed = [...comments].reverse()
  return (
    <div className='flex flex-col'>
      {reversed?.map((c: any) => (
        <Comment comment={c} />
      ))}
    </div>
  )
}

export default Comments

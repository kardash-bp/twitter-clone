import { ReactNode, useState } from 'react'

const Tooltip = ({
  children,
  message,
}: {
  children: ReactNode
  message: string
}) => {
  return (
    <div className='group relative'>
      {children}{' '}
      <span className='absolute bottom-0 left-5  scale-0 group-hover:scale-100'>
        {message}
      </span>
    </div>
  )
}

export default Tooltip

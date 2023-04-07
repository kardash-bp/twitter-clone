import React from 'react'

const SidebarMenuItem = ({ text, icon, active }: any) => {
  return (
    <div className='hoverSideMenu flex items-center text-gray-700 justify-center lg:justify-start text-lg space-x-3'>
      <span className='icon'> {icon}</span>
      <span className={`${active && 'font-bold'} hidden lg:inline`}>
        {text}
      </span>
    </div>
  )
}

export default SidebarMenuItem

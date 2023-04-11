import React from 'react'

const SidebarMenuItem = ({ text, icon, active }: any) => {
  return (
    <div className='hoverSideMenu flex justify-center xl:justify-start xl:items-center text-gray-700 text-lg space-x-3'>
      <span className='icon'> {icon}</span>
      <span className={`${active && 'font-bold'} hidden xl:inline`}>
        {text}
      </span>
    </div>
  )
}

export default SidebarMenuItem

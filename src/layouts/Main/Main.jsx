import React from 'react'
import { TopNav } from '../../Shared/Navbar/TopNav'
import { BottomNav } from '../../Shared/Navbar/BottomNav'
import { Outlet } from 'react-router-dom'

export const Main = () => {
  return (
    <div className='relative w-screen h-screen'>
          <TopNav />
          <Outlet />
          <BottomNav/>
        </div>
  )
}

import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import { FaGift, FaUser, FaUserAlt } from 'react-icons/fa';
import { TopNav } from './TopNav';
import icon from '../../assets/messi.webp'
import { BottomNav } from './BottomNav';


export const Navbar = () => {
  return (
    <div className='relative w-screen h-screen'>
      <TopNav />
      <Outlet />
      <BottomNav/>
    </div>
  )
}

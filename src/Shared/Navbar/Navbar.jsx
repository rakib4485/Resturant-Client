import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import { FaGift, FaUser, FaUserAlt } from 'react-icons/fa';
import { TopNav } from './TopNav';
import icon from '../../assets/messi.webp'


export const Navbar = () => {
  return (
    <div>
      <TopNav />
      <div className="drawer lg:drawer-open">
        <input id="menu-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content p-4">
          {/* Page content here */}
          <Outlet />
          <label htmlFor="menu-drawer" aria-label="close sidebar" className="drawer-overlay bg-[#2B3440]"></label>
        </div>
        <div className="drawer-side">
          <label htmlFor="menu-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
          <ul className="menu p-4 w-[250px] min-h-full bg-[#2B3440] text-white">
            {/* Sidebar content here */}
            <div classNam e='mt-5 md:w-[240px] px-5 border-b-2 pb-5 '>
              <div className="avatar">
                <div className="w-24 rounded-full mx-auto">
                  <img src={icon} />
                </div>
              </div>
              <h3 className={`text-lg font-semibold mt-5  text-center `}>Rakib</h3>
              <p className='flex gap-3 justify-center items-center text-lg font-semibold'> 'User'

              </p>
              {
                // (!isDoctor && !isAdmin && !isSeller) &&
                <div className='text-center'>
                  <button className="btn btn-xs btn-primary text-white" onClick={() => document.getElementById('seller-modal').showModal()} >Become a Seller</button>
                </div>
              }

              {/* {
                  (!isAdmin && !isDoctor && !isReception && !isRequest) &&
                  <button className="btn btn-xs bg-gradient-to-r from-cyan-500 to-blue-500" onClick={() => document.getElementById('doctor-modal').showModal()} disabled={disabled}>Doctor Request</button>
                } */}

              {/* </p> */}
            </div>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><Link to="/menu">Menu</Link></li>
          </ul>
        </div>
      </div>
    </div>
  )
}

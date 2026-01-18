import React from 'react'
import logo from '../../assets/logo.svg'
import { Link } from 'react-router-dom'

export const TopNav = () => {

  return (
    <div>

      <nav className="bg-[#2B3440] p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
          
            <Link to="" className="text-white font-bold text-xl flex items-center gap-2">
              <img src={logo} alt='' className='w' />
            </Link>
          </div>
          <label htmlFor="menu-drawer" aria-label="close sidebar" className="drawer-overlay bg-red-500"></label>
          <label htmlFor="menu-drawer" className="btn btn-primary drawer-button lg:hidden">
      Open drawer
    </label>
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-4 text-white">
            {/* {menuItems} */}
            {/* <div className="navbar-end hidden md:flex">
              {user?.uid ?
                <>
                  <Link className='mr-4' to="/dashboard">Dashboard</Link>
                   {
                    isSeller &&
                    <Link to="/dashboard/my-product-order" className="text-white mr-16">
                      <div className='mr-5'>
                        <span className='absolute' >New Order</span>
                        {
                          newOrder.length > 0 &&
                          <div className='h-5 w-10 rounded-full bg-primary flex justify-center items-center relative -top-4 -right-16'><span>new</span></div>
                        }
                      </div>
                    </Link>
                  } 
                  <Link onClick={handleLogOut}>Log out</Link>
                </>
                :
                <Link to='/login'>Login</Link>
              }
            </div> */}
            
          </div>
         </div>
      </nav>
    </div>
  )
}

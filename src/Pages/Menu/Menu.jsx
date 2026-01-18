import React from 'react'
import { FaBoxOpen, FaPizzaSlice } from "react-icons/fa";
import { PiHamburgerFill } from "react-icons/pi";
import { GiCoffeeCup } from "react-icons/gi";

export const Menu = () => {
    const menuItems = [
        {
            id: 1,
            name: "Pizza",
            Icons: <FaPizzaSlice/>
        },
        {
            id: 2,
            name: "Burger",
            Icons: <PiHamburgerFill/>
        },
        {
            id: 3,
            name: "Coffee",
            Icons: <GiCoffeeCup />
        },
        {
            id: 4,
            name: "Meat Box",
            Icons: <FaBoxOpen />
        },
    ]
  return (
    <div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {
                menuItems.map(item => 
                    <div key={item.id} className='flex gap-2 justify-center items-center h-[100px] bg-[#2B3440] shadow-xl rounded-md'>
                        <span className='text-[40px]'>{item.Icons}</span>
                        <h2 className="text-2xl">{item.name}</h2>
                    </div>
                )
            }
        </div>
    </div>
  )
}

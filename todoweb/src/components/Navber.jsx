import React from 'react'
import { FaBookOpen } from "react-icons/fa";


export default function Navber() {
  return (
    <nav className="flex flex-wrap bg-pink-500 text-white justify-between p-3 shadow-lg">
        <div className=" text-2xl logo font-bold sm:text-4xl mx-auto flex gap-2 items-center ">Saad TodoWeb
        <FaBookOpen />
        </div>
        <ul className="flex gap-4 mx-auto font-semibold text-xl sm:text-2xl mt-2 ">
            <li className='hover:text-green-400 transition-all duration-500 hover:border-b-2'>Home</li>
            <li className='hover:text-green-400 transition-all duration-500  hover:border-b-2'>Todo</li>
            <li className='hover:text-green-400 transition-all duration-500 hover:border-b-2'>Profile</li>
        </ul>
    </nav>
  )
}

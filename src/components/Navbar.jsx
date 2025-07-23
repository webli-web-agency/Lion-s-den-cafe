import React from 'react'
import Logo from "../assets/logo/1000078386.png"

const Navbar = () => {
  return (
    <nav className="fixed w-full h-[12vh] top-0 left-0 px-2 flex justify-center items-center">
        <div className='flex gap-[3vw] text-[1.2vw] h-full items-center'>
            <ul className='flex gap-[1.5vw] h-full items-center'>
                <li className='cursor-pointer'>Service</li>
                <li className='cursor-pointer'>Gallery</li>
            </ul>
            <div id="logo" className='w-[4vw] h-[4vw] rounded-full overflow-hidden'>
                <img className="w-full h-full object-cover" src={Logo}alt="Lion's Den Logo" />
            </div>
            <ul className='flex gap-4 h-full items-center'>
                <li className='cursor-pointer'>About</li>
                <li className='cursor-pointer'>Contact</li>
            </ul>
        </div>
    </nav>
  )
}

export default Navbar
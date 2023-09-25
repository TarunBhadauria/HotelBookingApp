import React from 'react'
import {AiOutlineSearch,AiOutlineMenu} from 'react-icons/ai'
import {BsGlobe2} from 'react-icons/bs'
import {FaUser} from 'react-icons/fa'
const Navbar = () => {
  return (
    <div className='flex px-4 my-2 justify-between items-center'>
        {/* First Div */}
        <div>
            <h3 className='text-2xl font-bold text-[#ff385c]'>airbnb</h3>
        </div>
        {/* Second Div  */}
        <div className='flex mx-auto justify-center outline text-[14px] outline-2 outline-[#e3e3e3] px-4 py-2 rounded-full gap-4 items-center'>
            <div className='text-black font-semibold'>Anywhere</div>
            {/* <div className='w-[10%] border-b-[2px] border-[#a7a7a7] rotate-90'></div> */}
            <div className='text-black font-semibold'>Any Week</div>
            <div className='flex  justify-between gap-2 items-center '>
                <p className=' text-[#a7a7a7] font-semibold'>Add Guests</p>
                <div className='p-2 text-white text-xl text-white  rounded-full bg-[#ff385c]'>
                    <AiOutlineSearch />
                </div>
            </div>
            
        </div>
        {/* Third Div */}
        <div className='flex gap-3  justify-between items-center'>
            <div className='text-[#303030] font-semibold hover:bg-[#e3e3e3] hover:rounded-full hover:cursor-pointer p-2'>Airbnb your home</div>
            <BsGlobe2 size={20}/>
            <div className='flex gap-2 justify-center items-center px-3 p-2 rounded-full outline outline-[#e3e3e3]'>
                <AiOutlineMenu/>
                <div className='p-2 gap-2 text-white rounded-full bg-[#717171]'>
                    <FaUser/>
                </div>
            </div>
            
        </div>
    </div>
  )
}

export default Navbar
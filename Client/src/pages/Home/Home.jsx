import React from 'react'
import { AiOutlineSearch } from "react-icons/ai";
import exploreOptions from '../../assets/data/exploreOptions.json'
// box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;


const Home = () => {
  return (
    // "box-shadow: box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;;  shadow-[0_35px_60px_-15px_rgba(0, 0, 0, 0.35)]"
    <div className='flex justify-center py-4 items-center'>
      <div className='flex justify-between px-8 py-2 shadow-[0px_3px_8px_rgba(0,0,0,0.24)] py-1 items-center   w-[70%] rounded-full'>
        {exploreOptions.map((options, index) => (
          <div key={index} className={`${options.title!=="Who ?"?"border-r-2   border-[#e5e5e5] px-4":""}`}>
            <p>{options.title}</p>
            <p className='text-gray-400 text-sm font-light'>{options.description}</p>
          </div>
        ))}

        <div className='p-2 text-white text-xl text-white  hover:scale-110 transition-all duration-110ms  rounded-full bg-[#ff385c] cursor-pointer'>
          <AiOutlineSearch />
        </div>
      </div>
    </div>
  )
}

export default Home;
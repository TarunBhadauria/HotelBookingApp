import React from 'react'
import { AiOutlineSearch } from "react-icons/ai";
import exploreOptions from 'assets/data/exploreOptions.json'

const BookingWidget = () => {
  return (
    <div className="flex w-full justify-center py-4 items-center">
      <div className="flex bg-white justify-between px-8 py-2 shadow-[0px_3px_8px_rgba(0,0,0,0.24)] py-1 items-center   w-[70%] rounded-full">
        {exploreOptions.map((options, index) => (
          <div
            key={index}
            className={`${
              options.title !== "Who ?"
                ? "border-r-2   border-[#e5e5e5] px-4"
                : "ml-2"
            }`}
          >
            <p className='text-[#484848] font-semibold'>{options.title}</p>
            {/* <p className="text-gray-400 text-sm font-light">
              {options.description}
            </p> */}
            <input className='outline-none text-[#C2C6CC]' type={options.type} placeholder={options.description}/>
          </div>
        ))}

        <div className="p-2 text-xl text-white  hover:scale-110 transition-all duration-110ms  rounded-full bg-[#484848] cursor-pointer">
          <AiOutlineSearch />
        </div>
      </div>
    </div>
  );
};

export default BookingWidget;

import React from "react";
import { AiOutlineSearch, AiOutlineMenu } from "react-icons/ai";
import { BsGlobe2 } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import HostButton from "./HostButton";
const Navbar = () => {
    const navigate = useNavigate();
  return (
    <div className=" flex px-8 my-4 justify-between items-center hover:cursor-pointer">
      {/* First Div */}
      <div onClick={()=>navigate('/')}>
        <h3 className="text-2xl font-bold text-[#484848] capitalize">suitscape</h3>
      </div>
      {/* Second Div  */}
      <div className="flex mx-auto justify-center  text-[14px] px-4 py-2 color-[#484848] gap-8 items-center">
        <div className="text-black font-semibold hover:cursor-pointer">
          Find a property
        </div>
        {/* <div className='w-[10%] border-b-[2px] border-[#a7a7a7] rotate-90'></div> */}
        <div className="text-black font-semibold hover:cursor-pointer">
          Share stories
        </div>
        <div className="text-black font-semibold hover:cursor-pointer">
          Rental guides
        </div>
        <div className="text-black font-semibold hover:cursor-pointer">
          Contact us
        </div>
      </div>
      {/* Third Div */}
      <div className="flex gap-3  justify-between items-center">
        <HostButton/>
        <div className="flex gap-2 justify-between items-center px-4 py-1 rounded-full outline outline-[#e3e3e3]">
          <AiOutlineMenu />
          <div className="p-2 gap-2 text-white rounded-full  ">
            <FaUserCircle size={24}  className=" hover:cursor-pointer" onClick={()=>{navigate('/login')}}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

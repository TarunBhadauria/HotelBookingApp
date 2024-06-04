import React from 'react'
import HostButton from '../common/HostButton';

const Banner = () => {
  return (
    <div>
      <div className=" max-w-[1270px] mx-auto bg-[#EFF0F2] flex justify-between items-center rounded-md">
        {/* left section */}
        <div className="w-[30%] mx-12 space-y-4">
          <p className="capitalize font-bold text-4xl w-[70%] text-[#484848]">
            try hosting with us
          </p>
          <p className="text-sm text-[#9A9A9A]">
            Earn extra just by renting your properties
          </p>
          <HostButton />
        </div>
        {/* Right Section */}
        <div className="w-[50%]">
          <img className="rounded-r-md " src="https://images.unsplash.com/photo-1556741533-6e6a62bd8b49?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
        </div>
      </div>
    </div>
  )
}

export default Banner;
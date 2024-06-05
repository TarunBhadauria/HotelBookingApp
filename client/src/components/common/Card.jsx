import React from "react";
import { FaRegHeart } from "react-icons/fa";

const Card = ({ data }) => {
    console.log(data);
    return (
        <div className="relative w-[25%] min-w-[270px] mx-6 bg-[#E0E2E6] rounded-md flex flex-col items-start justify-end">
            <div className="">
                <img className=" rounded-t-md" src={data.image} alt="room" />
            </div>
            {/* <div className="bg-[#2ecc71] absolute bottom-12 mx-4 my-4 p-2 rounded-full text-white">14%</div> */}
            <div className="px-4 py-4">
                <p className="text-[#484848]">{data.title}</p>
                <p className="capitalize text-[#9A9A9A]">
                    {data.city} <span className="uppercase text-[#9A9A9A]">{data.state}</span>
                </p>
            </div>
            <div className="absolute right-0 top-0 p-2 text-2xl hover:cursor-pointer">
                <FaRegHeart />
            </div>
        </div>
    );
};

export default Card;

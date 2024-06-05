import React from "react";
import Card from "./Card";

const HeroSectionCard = ({ title, image, data }) => {
    return (
        <div className="w-full py-4 ">
            <p className="capitalize px-10 leading-10 text-3xl font-bold text-[#484848] max-w-[80%]">
                {title}
            </p>
            <div className="w-[8%] my-2 mx-10 border-b-4 rounded-full border-[#484848]"></div>
            <div className="flex w-full justify-between overflow-x-auto">
                {
                    data.map(d=>(<Card data={d}/>))
                }
                
            </div>
        </div>
    );
};

export default HeroSectionCard;

import React from "react";
import Card from "../common/Card";

const HeroSectionCard = ({title,image}) => {
  return (
    <div className="w-full py-4 px-10">
      <p className="capitalize leading-10 text-3xl font-bold text-[#484848] w-[20vw]">
        {title}
      </p>
      <div className="w-[8%] my-2 border-b-4 rounded-full border-[#484848]"></div>
      <div className="flex  gap-12 w-full ">
        <Card url={image}/>
        <Card url={image}/>
        <Card url={image}/>
        <Card url={image}/>
      </div>
    </div>
  );
};

export default HeroSectionCard;

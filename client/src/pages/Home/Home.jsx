import React, { useState } from "react";
import BookingWidget from "components/core/Home/BookingWidget";
import HeroSectionCard from "components/common/HeroSectionCard";
import Banner from "components/core/Home/Banner";
import tempData from "assets/data/tempCards"

const Home = () => {
  const [latest, setLatest] = useState(tempData)
  const [nearby, setNearby] = useState(tempData)
  const [rated, setRated] = useState(tempData)

  return (
    <>
      {/* Hero Section 1 */}
      <div className="h-[60vh] bg-center bg-cover bg-[url('https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')]">
        <div className="  flex flex-col h-full justify-end items-center mr-14">
          <p className="capitalize text-2xl">
            <span className=" tracking-wider uppercase text-4xl font-bold text-[#ffffff] ">
              Find{" "}
            </span>
            your comfort place !
          </p>
          <BookingWidget />
        </div>
      </div>

      {/* Latest Property*/}
      <HeroSectionCard
        title="latest on property listing"
        image="https://images.unsplash.com/photo-1584132967334-10e028bd69f7?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        data={latest}
        />

      {/* Nearby properties  */}
      <HeroSectionCard
        title="nearby listed properties"
        image="https://images.unsplash.com/photo-1602002418082-a4443e081dd1?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        data={nearby}
        />

      {/* Rated properties  */}
      <HeroSectionCard
        title="top rated properties"
        image="https://images.unsplash.com/photo-1608198399988-341f712c3711?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        data={rated}
      />
      {/* Hosting Banner */}
      <Banner/>
    </>
  );
};

export default Home;

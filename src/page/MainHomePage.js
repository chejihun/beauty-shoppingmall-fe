import React, { useRef, useState }  from "react";
import SlideBanner from "../component/SlideBanner";
import HomeBrandPage from "../component/HomeBrandPage";
import HomeBestProduct from "../component/HomeBestProduct";
import HomeEvent from "../component/HomeEvent";
import "../style/event.css"
const MainHomePage = () => {
  return (
    <div className="home">
      
      <SlideBanner />
      <HomeBrandPage />
      
      {/* <div className='home-banner'>
        <div className='home-banner-l'>1번</div>
        <div className='home-banner-r'>2번</div>
      </div> */}
      <HomeBestProduct />
      <HomeEvent />
    </div>
  )
}

export default MainHomePage;
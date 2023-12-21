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
      <HomeBestProduct />
      <HomeEvent />
    </div>
  )
}

export default MainHomePage;
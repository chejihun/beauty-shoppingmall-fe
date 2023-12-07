import React, { useRef, useState }  from "react";
import SlideBanner from "../component/SlideBanner";
import HomeBrandPage from "../component/HomeBrandPage";
import HomeBestProduct from "../component/HomeBestProduct";

const MainHomePage = () => {
  return (
    <div className="home">
      
      <SlideBanner />
      <HomeBrandPage />
      <HomeBestProduct />
      <div className="box3">
        화면3
      </div>
    </div>
  )
}

export default MainHomePage;
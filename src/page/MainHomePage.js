import React, { useRef, useState }  from "react";
import SlideBanner from "../component/SlideBanner";
import HomeBrandPage from "../component/HomeBrandPage";


const MainHomePage = () => {
  return (
    <div className="home">
      
      <SlideBanner />
      <HomeBrandPage />
      <div  className="box3">
        화면3
      </div>
    </div>
  )
}

export default MainHomePage;
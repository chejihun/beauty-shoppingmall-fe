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
        <input type="file"/>
        <button onClick={() => {}}>업로드</button>
      </div>
    </div>
  )
}

export default MainHomePage;
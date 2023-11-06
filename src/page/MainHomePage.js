import React from "react";
import SlideBanner from "../component/SlideBanner";

const MainHomePage = () => {
  return (
    <div className="home">
      
      <SlideBanner />
      <div  className="box2">
        화면2
      </div>
      <div  className="box3">
        화면3
      </div>
    </div>
  )
}

export default MainHomePage;
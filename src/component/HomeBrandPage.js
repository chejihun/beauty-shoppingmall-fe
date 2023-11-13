import React from "react"
import "../style/brand.css"
import { useNavigate } from "react-router-dom";

const HomeBrandPage = () => {

  const navigate = useNavigate();
  
  const handleBrandClick = () => {
    navigate("/brand");
  };

  return (
    <div className="section-brand-area">
      <div className="line"></div>
      <p>brand_Nature & Beauty</p>
      <h1>About Pure Beauty</h1>
      <p>
        가장 인간 친화적인 물, 자작나무 수액을 베이스로 피부에 깊은 수분과 영양을 전달합니다.<br />
        청정 자연 성분으로 피부 본연의 힘을 키울 수 있도록, 더 맑게 빛나는 피부를 당신이 만날 수 있도록,
        필로소피는 피부 장벽을 회복시키는 약산성 스킨케어를 제안합니다.
      </p>
      <div className="brand-view" onClick={() => handleBrandClick()}>VIEW MORE</div>
      <div className="brand-img2"></div>

    </div>
  )
}

export default HomeBrandPage;
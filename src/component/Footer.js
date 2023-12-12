import React from 'react'
import { IoIosCall } from "react-icons/io";
import "../style/footer.css"
import "../App.css"

const Footer = () => {
  return (
    <div className='footer-area'>
      <div className='footer-grid'>
        <ul className='footer-demo-menu'>
          <li>홈</li>
          <li>회사소개</li>
          <li>이용약관</li>
          <li>개인정보처리방침</li>
          <li>이용안내</li>
        </ul>
        <div className='footer-content'>
          <h3>NatureBeauty</h3>
          <p>
            <span className='fs-title-1'>CUSTOMER CENTER</span>
            <span className='fs-title-2'><IoIosCall /> 1588-0000</span>
            
            평일 09:00 ~ 18:00 / 점심 12:00 ~ 13:00 (토, 일, 공휴일 휴무)
          </p>
          <div className='fs-title-3' >
            <p><span>상호명</span> : NatureBeauty</p>
            <p><span>대표자</span> : 채지훈</p>
            <p><span>고객센터</span> : 1588-0000</p>
            <p><span>주소</span> : 경기도 성남시 중원구 둔촌대로</p>
            <p><span>개인정보보호책임자</span> : 채지훈(jas8157@naver.com)</p>
          </div>
          <div className='fs-title-4'> Copyright © 2023 NatureBeauty. All rights reserved.</div>
        </div>
      </div>
    </div>
  )
}

export default Footer;
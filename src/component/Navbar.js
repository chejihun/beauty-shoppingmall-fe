import React from 'react'
import '../style/navbar.css'
import { useNavigate } from "react-router-dom";
import { FaRegUser } from 'react-icons/fa';
import { BiSearch, BiShoppingBag } from 'react-icons/bi';
import { HiMenu } from 'react-icons/hi';

const Navbar = () => {

  const navigate = useNavigate();

  const menuList = [
    "브랜드",
    "스토어",
    "이벤트",
    "공지사항"
  ];

  const handleMenuClick = (menu) => {
    navigate(`/${menu}`);
  };

  return (
    <div className='navbar-area'>
      {/* 기본 웹 메뉴 */}
      <div className='nav-web-menu'>
        <div className='nav-menu1'>
          <h2 className='web-logo'>BUU</h2>
          {menuList.map((menu, index) => (
            <div className='nav-list'
              key={index}
              onClick={() => handleMenuClick(menu)}>
              {menu}
            </div>
          ))}
        </div>
        <div className='nav-menu2'>
          <div className='nav-i-list'><FaRegUser /></div>
          <div className='nav-i-list'><BiShoppingBag /></div>
          <div className='nav-i-list'><BiSearch /></div>
        </div>
      </div>

      {/* 반응형 앱 메뉴 */}
      <div className='nav-app-menu'>
        <div className='app-menu'>
          <h2 className='app-logo'>BUU</h2>
          <div>
            <HiMenu className='nav-i-menu'/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
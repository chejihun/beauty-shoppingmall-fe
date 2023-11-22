import React from 'react'
import { useEffect, useState } from 'react'
import "../style/appnavmenu.css"
import { Button, Modal } from 'react-bootstrap'
import { useSearchParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userAction } from "../action/userAction";
import { cartAction } from "../action/cartAction";
import { IoClose } from "react-icons/io5";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { TfiYoutube } from "react-icons/tfi";

const AppNavMenu = ({ showAppMenu, setShowAppMenu, setShowModalSearch, logout, cartItemCount, user, menuList }) => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const appLoginClick = () => {
    navigate("/login")
    setShowAppMenu(false)
  }
  const appRegisterClick = () => {
    navigate("/register")
    setShowAppMenu(false)
  }
  const appMenuClose = () => {
    setShowAppMenu(false)
  }
  const appCartClick = () => {
    navigate("/cart")
    setShowAppMenu(false)
  }
  const handleMenuClick = (path) => {
    navigate(`/${path}`);
    setShowAppMenu(false)
  };

  useEffect(() => {
    if (user) {
      dispatch(cartAction.getCartQty());
    }

  }, [showAppMenu, user])

  return (
    <div
      className={`app-nav-menu ${showAppMenu ? 'visible' : 'hidden'}`}
      style={{ display: showAppMenu ? 'block' : 'none' }}
    >
      <Button
        onClick={appMenuClose}
        className='nav-app-close'
      >
        <IoClose className='nav-app-close-icon' />
      </Button>

      <div className='app-menu-user'>
        {user ? (
          <div onClick={logout} className="app-menu-login">
            로그아웃
          </div>
        ) : (
          <div onClick={() => appLoginClick()} className="app-menu-login">
            로그인
          </div>
        )}
        <div onClick={() => appRegisterClick()} className="app-menu-register">
          회원가입
        </div>
      </div>
      <div className="app-menu-cart" onClick={() => appCartClick()}>
        <div className="app-cart" >장바구니 ({`${cartItemCount || 0}`})</div>
      </div>
      <div className='app-line'></div>

      <div className='app-menulist-area'>
        <div className="app-menulist-grid">
          {menuList.map((menu, index) => (
            <div
              className="app-menulist"
              key={index}
              onClick={() => handleMenuClick(menu.path)}
            >
              {menu.label}
              <span className='w-line'>〉</span>
            </div>
          ))}
        </div>
      </div>
      <div className="app-i-bottom-menu">
        <div className="web-i-bottom-menu-list">
          <FaFacebookF />
        </div>
        <div className="web-i-bottom-menu-list">
          <FaInstagram />
        </div>
        <div className="web-i-bottom-menu-list">
          <TfiYoutube />
        </div>
      </div>
    </div>
  )
}

export default AppNavMenu
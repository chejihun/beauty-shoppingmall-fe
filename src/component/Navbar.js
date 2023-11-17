import React, { useState, useEffect } from "react";
import "../style/navbar.css";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { FaRegUser, FaFacebookF, FaInstagram } from "react-icons/fa";
import { BiSearch, BiShoppingBag, BiLogOut } from "react-icons/bi";
import { TfiYoutube } from "react-icons/tfi";
import { HiMenu } from "react-icons/hi";
import { FiSettings } from "react-icons/fi";
import { ROUTE_PATH } from "../constants/route.path";
import { useDispatch, useSelector } from "react-redux";
import { userAction } from "../action/userAction";
import { cartAction } from "../action/cartAction";

const Navbar = () => {

  const { user } = useSelector((state) => (state.user))
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = window.navigator.userAgent.indexOf("Mobile") !== -1;
  const { cartItemCount } = useSelector((state) => state.cart);

  const menuList = [
    { label: "브랜드", path: ROUTE_PATH.BRAND },
    { label: "스토어", path: ROUTE_PATH.STORE },
    { label: "이벤트", path: ROUTE_PATH.EVENT },
    { label: "공지사항", path: ROUTE_PATH.NOTICE },
  ];

  const handleMenuClick = (path) => {
    navigate(`/${path}`);
  };

  const handleLogoClick = () => {
    navigate("/");
  };

  const homePage = location.pathname === "/";

  const logout = () => {
    dispatch(userAction.logout());
  };

  useEffect(() => {
    if (user) {
      dispatch(cartAction.getCartQty());
    }
  }, [user]);

  return (
    <div className={`navbar-area ${homePage ? 'home-page' : ''}`}>
      {/* 기본 웹 메뉴 */}
      <div className="nav-web-menu">
        <div className="nav-menu1">
          <h2
            className={`web-logo ${homePage ? "white-text" : "black-text"}`}
            onClick={() => handleLogoClick()}
          >
            N<span>&</span>B
          </h2>
          {menuList.map((menu, index) => (
            <div
              className={`nav-list ${homePage ? "white-text" : "black-text"}`}
              key={index}
              onClick={() => handleMenuClick(menu.path)}
            >
              {menu.label}
            </div>
          ))}

          {/* sns 아이콘 메뉴 */}
          <div className="web-i-bottom-menu">
            <div
              className={`web-i-bottom-menu-list ${homePage ? "white-text" : "black-text"}`}
            >
              <FaFacebookF />
            </div>
            <div
              className={`web-i-bottom-menu-list ${homePage ? "white-text" : "black-text"}`}
            >
              <FaInstagram />
            </div>
            <div
              className={`web-i-bottom-menu-list ${homePage ? "white-text" : "black-text"}`}
            >
              <TfiYoutube />
            </div>
          </div>
        </div>
        <div className="nav-menu2">
          <div>
            {user ? (
              <div onClick={logout} className={`nav-i-list ${homePage ? "white-text" : "black-text"}`}>
                {!isMobile && <BiLogOut className="nav-i-login" />}
                <span className="i-message i-message-logout">로그아웃</span>
              </div>
            ) : (
              <div onClick={() => navigate("/login")} className={`nav-i-list ${homePage ? "white-text" : "black-text"}`}>

                {!isMobile && <FaRegUser className="nav-i-login" />}
                <span className="i-message i-message-login">로그인 / 회원가입</span>
              </div>
            )}
          </div>
          
          <div
          className={`nav-i-list ${homePage ? "white-text" : "black-text"}`}
            onClick={() => navigate("/cart")}
          >
            <BiShoppingBag />
            {!isMobile && (
            <span className="shop-count"> {`(${cartItemCount || 0})`} </span>
            )}
            <span className="i-message i-message-logout">장바구니</span>
          </div>

          <div
            className={`nav-i-list ${homePage ? "white-text" : "black-text"}`}
          >
            <BiSearch />
            <span className="i-message i-message-search">검색</span>
          </div>

          {/* admin 계정으로 로그인시 보이는 설정 페이지 */}
          {user && user.level === "admin" && (
            <Link to="/admin"
              className={`nav-i-list ${homePage ? "white-text" : "black-text"}`}
            >
              <FiSettings />
              <span className="i-message i-message-logout">상품 설정</span>
            </Link>
          )}
        </div>
      </div>

      {/* 반응형 앱 메뉴 */}
      <div className="nav-app-menu">
        <div className="app-menu">
          <h2 className="app-logo">N<span>&</span>B</h2>
          <div>
            <HiMenu className="nav-i-menu" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
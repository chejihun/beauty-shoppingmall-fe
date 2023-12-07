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
import ModalSearch from "./ModalSearch";
import AppNavMenu from "./AppNavMenu"

const Navbar = () => {

  const { user } = useSelector((state) => (state.user))

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { cartItemCount } = useSelector((state) => state.cart);
  const [showModalSearch, setShowModalSearch] = useState(false);
  const [showAppMenu, setShowAppMenu] = useState(false);

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

  const handleClickModalSearch = () => {
    setShowModalSearch(true)
  };

  const handleClickAppMenu = () => {
    setShowAppMenu(true)
  }

  useEffect(() => {
    if (user) {
      dispatch(cartAction.getCartQty());
    }
  }, [user]);

  return (
    <div className="navbar-area">
      {/* 기본 웹 메뉴 */}
      <div className="nav-web-menu">
        <div className="nav-menu1">
          <h2
            className="web-logo"
            onClick={() => handleLogoClick()}
          >
            N<span>&</span>B
          </h2>
          {menuList.map((menu, index) => (
            <div
              className="nav-list"
              key={index}
              onClick={() => handleMenuClick(menu.path)}
            >
              {menu.label}
            </div>
          ))}

          {/* sns 아이콘 메뉴 */}
          <div className="web-i-bottom-menu">
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
        <div className="nav-menu2">
          <div>
            {user ? (
              <div onClick={logout} className="nav-i-list">
                <BiLogOut className="nav-i-login" />
                <span className="i-message i-message-logout">로그아웃</span>
              </div>
            ) : (
              <div onClick={() => navigate("/login")} className="nav-i-list">

                <FaRegUser className="nav-i-login" />
                <span className="i-message i-message-login">로그인 / 회원가입</span>
              </div>
            )}
          </div>
          <div className="nav-i-list" onClick={() => navigate("/cart")}>
            <BiShoppingBag />
            <span className="shop-count"> {`${cartItemCount || 0}`} </span>
            <span className="i-message i-message-logout">장바구니</span>
          </div>
          <div
            className="nav-i-list"
            onClick={handleClickModalSearch}
          >
            <BiSearch />
            <span className="i-message i-message-search">검색</span>
          </div>

          {/* admin 계정으로 로그인시 보이는 설정 페이지 */}
          {user && user.level === "admin" && (
            <div className="nav-i-list admin-setting" onClick={() => navigate("/admin")}>
              <FiSettings />
              <span className="i-message i-message-logout">상품 설정</span>
            </div>
          )}
        </div>
      </div>

      {/* 반응형 앱 메뉴 */}
      <div className="nav-app-menu">
        <div className="app-menu">
          <h2 className="app-logo"
            onClick={() => handleLogoClick()}
          >N<span>&</span>B</h2>
          <div className="app-r-menu">
            <div onClick={handleClickModalSearch}>
              <BiSearch className="app-search"/>
            </div>
            <div onClick={handleClickAppMenu}>
              <HiMenu className="nav-i-menu" />
            </div>
          </div>
        </div>
      </div>

      <ModalSearch
        showModalSearch={showModalSearch}
        setShowModalSearch={setShowModalSearch}
      />

      <AppNavMenu
        showAppMenu={showAppMenu}
        setShowAppMenu={setShowAppMenu}
        setShowModalSearch={setShowModalSearch}
        logout={logout}
        cartItemCount={cartItemCount}
        user={user}
        menuList={menuList}
      />

    </div>
  )
}

export default Navbar
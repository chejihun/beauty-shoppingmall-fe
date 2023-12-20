import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes, Outlet } from "react-router";
import MainHomePage from "./page/MainHomePage";
import Navbar from "./component/Navbar";
import BrandPage from "./page/BrandPage";
import StorePage from "./page/StorePage";
import EventPage from "./page/EventPage";
import NoticePage from "./page/NoticePage";
import { ROUTE_PATH } from "./constants/route.path";
import LoginPage from "./page/LoginPage";
import RegisterPage from "./page/RegisterPage";
import ToastMessage from "./component/ToastMessage";
import { userAction } from "./action/userAction";
import { useDispatch } from "react-redux";
import React, { useEffect } from "react";
import AdminPage from "./page/AdminPage";
import ProductDetail from "./page/ProductDetail";
import CartPage from "./page/CartListPage"
import Posting from "./page/Posting";
import Post from "./page/Post";
import Footer from "./component/Footer";
import NotFoundPage from "./page/NotFoundPage";
import PrivateRoute from "./routes/PrivateRoute";
import PaymentPage from "./page/PaymentPage";
import OrderCompletePage from "./page/orderCompletePage";

const App = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userAction.loginWithToken());
  }, []);

  return (
    <>
      <div className="App">
        <Navbar />
        <ToastMessage />

        <Routes>
          <Route path="/" element={<MainHomePage />} />
          <Route path={ROUTE_PATH.BRAND} element={<BrandPage />} />
          <Route path={ROUTE_PATH.STORE} element={<StorePage />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path={ROUTE_PATH.EVENT} element={<EventPage />} />
          <Route path={ROUTE_PATH.NOTICE} element={<NoticePage />} />
          <Route path="/post/:id" element={<Post />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route element={<PrivateRoute permissionLevel="admin" />}>
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/posting" element={<Posting />} />
          </Route>

          <Route element={<PrivateRoute permissionLevel="user" />}>
            <Route path="/cart" element={<CartPage />} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/payment/success" element={<OrderCompletePage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div >
      <Footer />
    </>
  );

}

export default App;
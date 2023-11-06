import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router";
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

const App = () => {
  
  const user = null;

  return (
    <div className="App">

        <Navbar user={user} />
        <ToastMessage />

        <Routes>
          <Route path="/" element={<MainHomePage />} />
          <Route path={ROUTE_PATH.BRAND} element={<BrandPage />} />
          <Route path={ROUTE_PATH.STORE} element={<StorePage />} />
          <Route path={ROUTE_PATH.EVENT} element={<EventPage />} />
          <Route path={ROUTE_PATH.NOTICE} element={<NoticePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>

    </div >
  );
}

export default App;

import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router";
import MainHomePage from './page/MainHomePage'
import Navbar from './component/Navbar';

const App = () => {
  return (
    <div className="App">

      <Navbar />
      <MainHomePage />

      <Routes>
        {/* <Route path="/브랜드" element={<Brand />} />
        <Route path="/스토어" element={<Store />} />
        <Route path="/이벤트" element={<Event />} />
        <Route path="/커뮤니티" element={<Community />} /> */}
      </Routes>



    </div>
  );
}

export default App;

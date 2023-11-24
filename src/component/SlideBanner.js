import React, { useRef, useState } from "react"
import "../style/slidebanner.css"
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slide1 from "../image/slide_background_01.jpg"
import Slide2 from "../image/slide_background_02.jpg"
import Slide3 from "../image/slide_background_03.jpg"
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";


const Slide = ({ id, image, title, content, view }) => {
  return (
    <div key={id} className="st-area">
      <img src={image} alt={`Slide ${id}`} className="slide-bg-img" />
      <h2 className="slide-bg-title">{title}</h2>
      <p className="slide-bg-content">{content}</p>
      <p className="slide-bg-view">{view}</p>
    </div>
  );
};

const SlideBanner = () => {

  const slideList = [
    {
      id: 1,
      image: Slide1,
      title: "New Moisturizing Skin",
      content: "99% Extraction of Plant Ingredients",
      view: "view"
    },
    {
      id: 2,
      image: Slide2,
      title: "Rosemary Essential oil",
      content: "My special handmade care",
      view: "view"
    },
    {
      id: 3,
      image: Slide3,
      title: "Soft Natural Cosmetics",
      content: "Protect my sensitive skin",
      view: "view"
    }
  ]

  const settings = {
    dots: true, // 개수 표시 점
    infinite: true, // 무한 캐러셀
    speed: 1000, // 다음 컨텐츠 까지의 속도
    slidesToShow: 1, // 화면에 보이는 컨텐츠 수
    slidesToScroll: 1, // 스크롤 시 넘어가는 컨텐츠 수
    centerMode: true, // 현재 컨텐츠 가운데 정렬
    centerPadding: '0px', // 중앙 컨텐츠 padding 값
    autoplay: true, // 자동 캐러셀
    autoplaySpeed: 4000, // 자동 캐러셀 속도
    draggable: true, // 드래그      
    fade: true, // 사라졌다 나타나는 효과
    arrows: false, // 좌,우 버튼
    vertical: false, // 세로 캐러셀
    initialSlide: 0, // 첫 컨텐츠 번호
    pauseOnFocus: true, // focus시 정지
    pauseOnHover: true, // hover시 정지
    responsive: [] // 반응형 옵션 
  };

  return (
    <div className="slide-bg">
      <Slider {...settings} className="qwe ">
        {slideList.map(slide => (
          <Slide key={slide.id} {...slide} />
        ))}
      </Slider>
    </div>
  )
}

export default SlideBanner
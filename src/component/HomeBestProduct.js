import React, { useEffect, useState } from "react";
import "../style/homeBestProduct.css"
import { productAction } from "../action/productAction";
import ProductCard from "../component/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { currencyFormat } from "../utils/number";
import Slider from 'react-slick';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const HomeBestProduct = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.product.productList)
  const [moreProducts, setMoreProducts] = useState(5);

  const showProduct = (id) => {
    navigate(`/product/${id}`);
  };

  const CustomPrevArrow = ({ onClick }) => (
    <button className="custom-prev-arrow" onClick={onClick}>
      <IoIosArrowBack className="custom-prev-arrow-i" />
    </button>
  );

  const CustomNextArrow = ({ onClick }) => (
    <button className="custom-next-arrow" onClick={onClick}>
      <IoIosArrowForward className="custom-next-arrow-i" />
    </button>
  );

  const settings = {
    className: "slider variable-width",
    dots: false,
    infinite: true, //무한 반복
    centerMode: false, //
    slidesToShow: 1,
    slidesToScroll: 1,
    variableWidth: true,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />
  };

  useEffect(() => {
    dispatch(
      productAction.getProductList()
    )
  }, [])

  return (
    <div className='home-best-product-area'>

      <div className='hbp-grid'>

        <div className='hbp-grid-img'>
          <div className="new-title">
            <div>#이달의 신제품</div>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            <p>Aliquam erat volutpat. </p>
          </div>
        </div>

        <div className='hbp-grid-product'>
          <div className='np-area'>
            <h3 className="new-pro" >NEW PRODUCT</h3>
            <Slider {...settings}>
              {productList.slice(0, 6).map((item) => (
                <div key={item._id}>
                  <div className="new-card" onClick={() => showProduct(item._id)}>
                    <img src={item?.image} alt={item?.image} className="new-card-img" />
                    <div>{item?.name}</div>
                    <div>{item?.description}</div>
                    <div>₩ {currencyFormat(item?.price)}</div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomeBestProduct;
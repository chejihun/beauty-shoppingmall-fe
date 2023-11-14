import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { currencyFormat } from "../utils/number";
import "../style/store.css"

const ProductCard = ( {item} ) => {
  
  const navigate = useNavigate();

  const showProduct = (id) => {
    navigate(`/product/${id}`);
  };
  return (
    <div className="card" onClick={() => showProduct(item._id)}>
      <img src={item?.image} alt={item?.image} className="card-img"/>
      <div>{item?.name}</div>
      <div>{item?.description}</div>
      <div>₩ {currencyFormat(item?.price)}</div>
    </div>
  );
};

export default ProductCard;

import React, { useEffect, useState } from "react";
import ProductCard from "../component/ProductCard";
import { Row, Col, Container } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { productAction } from "../action/productAction";
import { commonUiAction } from "../action/commonUiAction";
import LoadingSpinner from '../component/LoadingSpinner';

const StorePage = () => {

  const dispatch = useDispatch();
  const productList = useSelector((state) => state.product.productList)
  const [query, serQuery] = useSearchParams();
  const name = query.get("name");
  const storeSort = ["최신순", "가격높은순", "가격낮은순"]
  const [sortTab, setSortTab] = useState("최신순")
  const [moreProducts, setMoreProducts] = useState(8);
  const [isLoading, setIsLoading] = useState(true);

  const handleSortClick = (item) => {
    setSortTab(item)
    if(item === "최신순") {
      return productList.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }  if (item === "가격높은순") {
      return productList.sort((a, b) => b.price - a.price);
    }if (item === "가격낮은순") {
      return productList.sort((a, b) => a.price - b.price);
    }
  };

  const handleShowMoreClick = () => {
    setMoreProducts((prev) => prev + 8);
  };

  useEffect(() => {
    setIsLoading(true);
    dispatch(productAction.getProductList({name})).then(() => {
      setIsLoading(false); 
    });
  }, [query])

  return (
    <div className="st-flex">
      <Container className="store-sort-area">
        <div className="store-total">Product ({productList.length})</div>
        <div className="store-sort">
          {storeSort.map((item) => (
            <div key={item} onClick={() => handleSortClick(item)} className="sort-item">
              {item}
            </div>
          ))}
        </div>
      </Container>

      
      <Container className="store-area">
        <div className="store-card">
          {isLoading && <LoadingSpinner />} 
          {productList.length > 0 ? (
          productList.slice(0, moreProducts).map((item) => (
            <div key={item._id}>
              <ProductCard item={item} />
            </div>
          ))
          ): (
            !isLoading && <div className="not-keyword">등록된 제품이 없습니다</div>
          )}
        </div>
       
      </Container>
      <div className="store-more-area">
        {moreProducts < productList.length && (
          <div>
            <button
            onClick={handleShowMoreClick}
            className="store-more-btn"
            >
              More +</button>
          </div>
        )}
        </div>
      
    </div>
  )
}

export default StorePage
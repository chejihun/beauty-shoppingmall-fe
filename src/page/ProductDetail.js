import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Row, Col, Button, Dropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { productAction } from "../action/productAction";
import { commonUiAction } from "../action/commonUiAction";
import { currencyFormat } from "../utils/number";
import "../style/productDetail.css"
import { cartAction } from "../action/cartAction";

const ProductDetail = () => {
  const dispatch = useDispatch();
  const { selectedProduct } = useSelector((state) => state.product);
  const { user } = useSelector((state) => state.user)
  const [size, setSize] = useState("");
  const { id } = useParams();
  const [sizeError, setSizeError] = useState(false);
  const navigate = useNavigate();
  const productList = useSelector((state) => state.product.productList)
  const productDetailCategory = selectedProduct && selectedProduct.category;
  const filteredProductList = productList.filter(item => selectedProduct && selectedProduct.category === productDetailCategory);

  const addItemToCart = () => {
    if (size === "") {
      setSizeError(true)
      return
    }
    if (!user) {
      navigate("/login")
    }
    dispatch(cartAction.addToCart({ id, size }));
  };

  const selectSize = (value) => {
    if (sizeError) {
      setSizeError(false)
    }
    setSize(value)
  };

  const showProduct = (id) => {
    navigate(`/product/${id}`);
  };

  useEffect(() => {
    dispatch(productAction.getProductDetail(id));
    dispatch(productAction.getProductList())
  }, [id]);

  return (
    <Container className="product-detail-card">
      <div className="product-detail-category">
        Product  &nbsp; &gt; &nbsp; {selectedProduct && selectedProduct.category
        }</div>
      <Row>
        <Col sm={6} className="sss">
          {selectedProduct && selectedProduct.image && (
            <img src={selectedProduct.image} className="pd-img" alt="image" />
          )}
        </Col>
        <Col className="product-info-area" sm={6}>
          <div className="product-info">
            {selectedProduct && selectedProduct.name}

          </div>
          <div className="product-info">
            {selectedProduct && selectedProduct.description ? selectedProduct.description : ''}

          </div>
          <div className="product-info">
            {selectedProduct && selectedProduct.price ? `₩ ${currencyFormat(selectedProduct.price)}` : ''}
          </div>

          <Dropdown
            className="drop-down size-drop-down"
            title={size}
            align="start"
            onSelect={(value) => selectSize(value)}
          >
            <Dropdown.Toggle
              className="size-drop-down"
              variant={sizeError ? "outline-danger" : "outline-dark"}
              id="dropdown-basic"
              align="start"
            >
              {size === "" ? "용량 선택" : size.toUpperCase()}
            </Dropdown.Toggle>

            <Dropdown.Menu className="size-drop-down">
              {selectedProduct && selectedProduct.stock && Object.keys(selectedProduct.stock).length > 0 ? (
                Object.keys(selectedProduct.stock).map((item) => (
                  selectedProduct.stock[item] > 0 ? (
                    <Dropdown.Item eventKey={item}>
                      {item.toUpperCase()}
                    </Dropdown.Item>
                  ) : (
                    <Dropdown.Item eventKey={item} disabled={true}>
                      {item.toUpperCase()}
                    </Dropdown.Item>
                  )
                ))
              ) : (
                <Dropdown.Item disabled={true}>용량이 없습니다</Dropdown.Item>
              )}
            </Dropdown.Menu>
          </Dropdown>
          <div className="warning-message">
            {sizeError && "용량을 선택해주세요."}
          </div>
          <Button variant="dark" className="cart-add-button" onClick={addItemToCart}>
            장바구니에 추가
          </Button>
        </Col>
      </Row>
      <Row className="fixed-content-area">
        <div className="fixed-content">
          <h3>제품과 비슷한 추천상품</h3>
          <p>이 상품을 구매한 고객들이 함께 본 상품입니다.</p>
          <Row className="store-card">
            {filteredProductList.slice(0, 4).map((item) => (
              <Col key={item._id}>
                <div className="pro-detail-card" onClick={() => showProduct(item._id)}>
                  <img src={item?.image} alt={item?.image} className="detail-card-img" />
                  <div>{item?.name}</div>
                  <div>{item?.description}</div>
                  <div>₩ {currencyFormat(item?.price)}</div>
                </div>
              </Col>
            ))}
          </Row>
        </div>

      </Row>
    </Container>
  );
};

export default ProductDetail;

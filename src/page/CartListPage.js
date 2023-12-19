import React from "react";
import { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { cartAction } from "../action/cartAction";
import CartProductCard from "../component/CartProductCard";
import OrderReceipt from "../component/OrderReceipt";
import "../style/cart.css";

const CartPage = () => {
  const dispatch = useDispatch();
  const { cartList, totalPrice } = useSelector((state) => state.cart)

  useEffect(() => {
    dispatch(cartAction.getCartList())
  }, []);

  return (
    <Container className="cart-area">
      <Row>
        <Col lg={7} md={12} xs={12}>
          {cartList.length > 0 ? (
            cartList.map((item) => (<CartProductCard item={item} key={item._id} />
            ))
          ) : (
            <div className="empty-bag">
              <h2>장바구니가 비어있습니다.</h2>
              <div>상품을 담아주세요!</div>
            </div>
          )}

        </Col>
        <Col lg={5} md={12} >
          <OrderReceipt cartList={cartList} totalPrice={totalPrice} />
        </Col>
      </Row>
    </Container>
  );
};

export default CartPage;
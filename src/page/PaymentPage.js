import React, { useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import OrderReceipt from "../component/OrderReceipt";
import PaymentForm from "../component/PaymentForm"
import "../style/paymentPage.css";
import { useSelector, useDispatch } from "react-redux";
import { orderAction } from "../action/orderAction";
import { useNavigate } from "react-router";
import { commonUiAction } from "../action/commonUiAction";
import { cc_expires_format } from "../utils/number";

const PaymentPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [cardValue, setCardValue] = useState({
    cvc: "",
    expiry: "",
    focus: "",
    name: "",
    number: "",
  });

  const [firstLoading, setFirstLoading] = useState(true);
  const [shipInfo, setShipInfo] = useState({
    firstName: "",
    lastName: "",
    contact: "",
    address: "",
    city: "",
    zip: "",
  });
  const { cartList, totalPrice } = useSelector((state) => state.cart)

  const handleSubmit = (event) => {
    event.preventDefault();
    const { firstName, lastName, contact, address, city, zip } = shipInfo

    const data = {
      totalPrice,
      shipTo: { address, city, zip },
      contact: { firstName, lastName, contact },
      orderList: cartList.map((item) => {
        return {
          productId: item.productId._id,
          price: item.productId.price,
          qty: item.qty,
          size: item.size
        }
      })
    }
    dispatch(orderAction.createOrder(data, navigate))
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target
    setShipInfo({ ...shipInfo, [name]: value });
  };

  const handlePaymentInfoChange = (event) => {
    const { name, value } = event.target;
    if (name === "expiry") {
      let newValue = cc_expires_format(value)
      setCardValue({ ...cardValue, [name]: newValue })
      return;
    }
    setCardValue({ ...cardValue, [name]: value })
  };

  const handleInputFocus = (e) => {
    setCardValue({ ...cardValue, focus: e.target.name });
  };

  if (cartList.length === 0) {
    navigate("/cart")
  }
  return (
    <div className="payment-area">
      <Row className="payment-flex">
        <Col className="payment-l" >
          <div>
            <h2 className="mb-2">배송 주소</h2>
            <div>
              <Form onSubmit={handleSubmit}>
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="lastName">
                    <Form.Label>성</Form.Label>
                    <Form.Control
                      type="text"
                      onChange={handleFormChange}
                      required
                      name="lastName"
                    />
                  </Form.Group>

                  <Form.Group as={Col} controlId="firstName">
                    <Form.Label>이름</Form.Label>
                    <Form.Control
                      type="text"
                      onChange={handleFormChange}
                      required
                      name="firstName"
                    />
                  </Form.Group>
                </Row>

                <Form.Group className="mb-3" controlId="formGridAddress1">
                  <Form.Label>연락처</Form.Label>
                  <Form.Control
                    placeholder="010-xxx-xxxxx"
                    onChange={handleFormChange}
                    required
                    name="contact"
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formGridAddress2">
                  <Form.Label>주소</Form.Label>
                  <Form.Control
                    placeholder="Apartment, studio, or floor"
                    onChange={handleFormChange}
                    required
                    name="address"
                  />
                </Form.Group>

                <Row className="mb-3">
                  <Form.Group as={Col} controlId="formGridCity">
                    <Form.Label>City</Form.Label>
                    <Form.Control
                      onChange={handleFormChange}
                      required
                      name="city"
                    />
                  </Form.Group>

                  <Form.Group as={Col} controlId="formGridZip">
                    <Form.Label>Zip</Form.Label>
                    <Form.Control
                      onChange={handleFormChange}
                      required
                      name="zip"
                    />
                  </Form.Group>
                </Row>

                <div className="credit-card-area">
                  <h2 className="payment-title">결제 정보</h2>
                  <PaymentForm
                    cardValue={cardValue}
                    handleInputFocus={handleInputFocus}
                    handlePaymentInfoChange={handlePaymentInfoChange}
                  />
                </div>

                {/* <div className="mobile-receipt-area">
                  <OrderReceipt cartList={cartList} totalPrice={totalPrice}/>
                </div> */}

                <Button
                  variant="dark"
                  className="payment-button pay-button"
                  type="submit"
                >
                  결제하기
                </Button>

              </Form>
            </div>
          </div>
        </Col>
        <Col className="receipt-area">
          <OrderReceipt cartList={cartList} totalPrice={totalPrice} />
          
        </Col>
      </Row>
    </div>
  );
};

export default PaymentPage;
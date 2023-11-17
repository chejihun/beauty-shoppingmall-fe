import React from "react";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Row, Col, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { cartAction } from "../action/cartAction";
import { currencyFormat } from "../utils/number";
import { RiDeleteBinLine } from "react-icons/ri";
import { useState } from "react";

const CartProductCard = ({ item }) => {
  const dispatch = useDispatch();

  const handleQtyChange = (id, value) => {
    dispatch(cartAction.updateQty(id, value))
  };

  const deleteCart = (id) => {
    dispatch(cartAction.deleteCart(id))
  };

  return (
    <div className="product-card-cart">
      <div className="cart-display-flex">
        <div className="img-cart">
          <img
            // className="img-cart"
            src={item.productId.image}
            width={155}
          />
        </div>
        <div className="card-mg">
          <div className="card-bt">
            <h3>{item.productId.name}</h3>
          </div>
          <button className="trash-button">
              <RiDeleteBinLine
                className="cart-product-card-delete"
                onClick={() => deleteCart(item._id)}
              />
            </button>

          <div className="card-pr">
            가격 : ₩ {currencyFormat(item.productId.price)}
          </div>
          <div className="card-ml">용량 : {item.size}</div>
          <div className="card-qty">
            수량 : 
            <input
              type="number"
              onChange={(event) =>
                handleQtyChange(item._id, event.target.value)
              }
              value={item.qty}
              className="qty-input"
            />
          </div>
          <div className="card-tpr">총 가격: ₩ {currencyFormat(
            item.productId.price * item.qty
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartProductCard;
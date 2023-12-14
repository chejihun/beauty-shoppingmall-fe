import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "../style/paymentPage.css";

const OrderCompletePage = () => {
  const { orderNum } = useSelector((state) => state.order) || {};
  console.log("오더값이 왜 없냐?", orderNum)

  return (
    <div className="confirmation-page">
      <div className="confirmation-back">
        <div className="confirmation-back2">
          <img
            src="/greenCheck.png"
            width={100}
            className="check-image"
            alt="greenCheck.png"
          />
          <h2>고객님의 주문이 완료됬습니다!</h2>
          <div>주문번호 :  {orderNum} </div>
          <div>
            배송은 주문일로 부터 2~3일 정도 소요됩니다
            <div className="text-align-center">
              <Link to={"/"}>메인 페이지 바로가기</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderCompletePage;
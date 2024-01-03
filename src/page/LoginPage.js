import React, { useState } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "../style/login.css";
import { useDispatch, useSelector } from "react-redux";
import { userAction } from "../action/userAction";


const LoginPage = () => {

  const user = useSelector((state) => (state.user.user));
  const error = useSelector((state) => (state.user.error));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginWithEmail = (event) => {
    event.preventDefault();
    dispatch(userAction.loginWithEmail({ email, password }));
  };

  if (user) {
    navigate("/")
  }

  return (
    <div>
      <Container className="login-area">
        <Form className="login-form" onSubmit={loginWithEmail}>
          <h2 className="login-form-title">로그인</h2>
          {error && (
            <div className="error-message">
              <Alert variant="danger">{error}</Alert>
            </div>
          )}
          <Form.Group className="login-form-id" controlId="formBasicEmail">
            <Form.Label className="m-title-none">Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="이메일을 입력해주세요"
              required
              onChange={(event) => setEmail(event.target.value)}
              className="form-area"
            />
          </Form.Group>

          <Form.Group className="login-form-id" controlId="formBasicPassword">
            <Form.Label className="m-title-none">Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="비밀번호를 입력해주세요"
              required
              onChange={(event) => setPassword(event.target.value)}
              className="form-area"
            />
          </Form.Group>
          <div className="login-button-area">
            <Button variant="danger" type="submit" className="login-btn">
              로그인
            </Button>
            
            <div className="register-move">
              <h4>회원이 아니신가요? </h4>
              <p>회원가입을 통해 주문 내역을 확인하고, 위시리스트에 관심 제품을 저장하거나, 저장된 정보를 사용하여 더 빠른 온라인 결제 경험을 즐기실 수 있습니다.</p>
              <Link to="/register" className="register-btn-link">
                <div className="register-link-text">회원가입</div>
              </Link>{" "}

            </div>
          </div>

        </Form>
      </Container>



    </div>
  )
}

export default LoginPage
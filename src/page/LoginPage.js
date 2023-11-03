import React, { useState } from "react";
import { Container, Form, Button} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import '../style/login.css'

const LoginPage = () => {


  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginWithEmail = (event) => {
    event.preventDefault();
    
  };

  return (
    <div>
      <Container className="login-area">
        
        <Form className="login-form" onSubmit={loginWithEmail}>
          <h2 className="login-form-title">로그인</h2>
          <Form.Group className="login-form-id" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="이메일 주소를 입력해주세요"
              required
              onChange={(event) => setEmail(event.target.value)}
            />
          </Form.Group>

          <Form.Group className="login-form-id" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="비밀번호를 입력해주세요"
              required
              onChange={(event) => setPassword(event.target.value)}
            />
          </Form.Group>
          <div className="login-button-area">
            <Button variant="danger" type="submit">
              Login
            </Button>
            <div>
              아직 계정이 없으세요? <Link to="/register">회원가입 하기</Link>{" "}
            </div>
          </div>

        </Form>
      </Container>



    </div>
  )
}

export default LoginPage
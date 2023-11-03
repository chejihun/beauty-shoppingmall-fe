import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import '../style/login.css'

const RegisterPage = () => {

  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
    policy: false,
  });
  const navigate = useNavigate();
  const [passwordError, setPasswordError] = useState("");
  const [policyError, setPolicyError] = useState(false);

  const register = (event) => {
    event.preventDefault();
  };

  const handleChange = (event) => {
    event.preventDefault();
  };

  return (
    <Container className="register-area">
      <Form onSubmit={register} className="login-form">
      <h2 className="login-form-title">회원가입</h2>
        <Form.Group className="login-form-id">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            id="email"
            placeholder="이메일을 입력해주세요"
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="login-form-id">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            id="name"
            placeholder="성함을 입력해주세요"
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="login-form-id">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            id="password"
            placeholder="비밀번호를 입력해주세요"
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="login-form-id">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            id="confirmPassword"
            placeholder="비밀번호를 재입력해주세요"
            onChange={handleChange}
            required
            isInvalid={passwordError}
          />
          <Form.Control.Feedback type="invalid">
            {passwordError}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="login-form-id">
          <Form.Check
            type="checkbox"
            label="이용약관에 동의합니다"
            id="policy"
            onChange={handleChange}
            isInvalid={policyError}
          />
        </Form.Group>
        <Button variant="danger" type="submit" className="register-btn">
          회원가입
        </Button>
      </Form>
    </Container>
  );
}

export default RegisterPage
import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import "../style/login.css";
import { useDispatch, useSelector } from "react-redux";
import { userAction } from "../action/userAction";
import { useNavigate } from "react-router";

const RegisterPage = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
    policy: false,
  });
  const [passwordError, setPasswordError] = useState("");
  const [policyError, setPolicyError] = useState(false);

  const register = (event) => {
    event.preventDefault();
    const { name, email, password, confirmPassword, policy } = formData
    //비밀번호 중복체크
    if (password !== confirmPassword) {
      setPasswordError('2차 비밀번호가 일치하지 않습니다');
      return;
    }
    // 이용약관 체크박스 체크
    if (!policy) {
      setPolicyError(true)
      return
    }
    setPasswordError("");
    setPolicyError(false);
    dispatch(userAction.registerUser({ name, email, password }, navigate));
  };

  const handleChange = (event) => {
    event.preventDefault();
    const { id, value, checked } = event.target
    if (id === "policy") {
      setFormData({ ...formData, [id]: checked });
    } else {
      setFormData({ ...formData, [id]: value });
    }
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
            className="form-area"
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
            className="form-area"
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
            className="form-area"
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
            className="form-area"
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
            className="form-area"
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
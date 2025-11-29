import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Form, Button, Alert, Container, Row, Col, Card, Image } from "react-bootstrap";

export default function LoginPage() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // clear previous error

    const success = await login(formData.username, formData.password);

    if (success) {
      navigate("/menu");
    } else {
      setError("Invalid username or password. Make sure you registered first.");
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Row className="w-100">
        <Col xs={12} md={6} className="mx-auto">
          <Card className="p-4 shadow-sm">
            {/* icon */}
            <div className="d-flex align-items-center mb-4">
              <Image src={`${import.meta.env.BASE_URL}images/paimon-icon.gif`} alt="Logo" width={40} height={40}/>
              <h3 className="mb-0">Login</h3>
            </div>

            {error && <Alert variant="danger">{error}</Alert>}

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="username">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100"> Log In </Button>
            </Form>

            <p className="mt-3 text-center"> Don't have an account?{" "}
              <span style={{ color: "blue", cursor: "pointer" }} onClick={() => navigate("/register")}> Register </span>
            </p>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
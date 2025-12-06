import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Alert, Form, Button, Container, Row, Col, Card, Image } from "react-bootstrap";

export default function RegisterPage() {
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ username: "", password: "", confirmPassword: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");




    if (!formData.username || !formData.password || !formData.confirmPassword) {
      return setError("Please fill all fields.");
    }

    // validate password match
    if (formData.password !== formData.confirmPassword) {
      return setError("Passwords do not match.");
    }

    try {
      const res = await register(formData.username, formData.password, "customer");
      if (res) {
        setSuccess("Registration successful! Redirecting to login...");
        setTimeout(() => navigate("/"), 1500);
      } else {
        setError("Registration failed. Username might already exist.");
      }
    } catch (err) {
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Row className="w-100">
        <Col xs={12} md={6} className="mx-auto">
          <Card className="p-4 shadow-sm">
            {/* icon  */}
            <div className="d-flex align-items-center mb-4">
              <Image src={`${import.meta.env.BASE_URL}images/paimon-icon.gif`} alt="Logo" width={40} height={40} className="me-2"/>
              <h3 className="mb-0">Register</h3>
            </div>

            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}

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

              <Form.Group className="mb-3" controlId="confirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100">Register</Button>
            </Form>

            <p className="mt-3 text-center">Already have an account?{" "}<span
                style={{ color: "blue", cursor: "pointer" }}
                onClick={() => navigate("/login")}>Login </span>
            </p>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
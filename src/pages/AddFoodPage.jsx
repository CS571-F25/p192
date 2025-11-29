import React, { useState, useContext } from "react";
import { addFood } from "../services/api";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";

export default function AddFoodPage() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  
 const handleSubmit = async (e) => {
    e.preventDefault();
    const ok = await addFood({ name, category, price: parseFloat(price), image }, token);
    if (ok) navigate("/foods/manage");
    else alert("Failed to add food.");
  };

  return (
    <Container className="my-4">
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title className="mb-4 text-center">Add New Food</Card.Title>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="food-name">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter food name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required // required field
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="food-category">
                  <Form.Label>Category</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required // required field
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="food-price">
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required // required field
                    min="0"
                    step="0.01"
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="food-image">
                  <Form.Label>Image URL</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter image URL (optional)"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                  />
                </Form.Group>

                <div className="d-flex justify-content-between">
                  <Button variant="secondary" onClick={() => navigate("/menu")}>
                    Cancel
                  </Button>
                  <Button variant="primary" type="submit">
                    Add Food
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

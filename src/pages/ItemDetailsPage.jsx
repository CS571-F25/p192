// src/pages/ItemDetailsPage.jsx
import React, { useEffect, useState, useContext } from "react";
import { getFoods } from "../services/api";
import { useParams, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { Container, Row, Col, Card, Button, Toast, ToastContainer } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";
 

export default function ItemDetailsPage() {
  const { uuid } = useParams();
  const [food, setFood] = useState(null);
  const { addToCart } = useContext(CartContext);
  const [showToast, setShowToast] = useState(false);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchFood = async () => {
      const foods = await getFoods();
      const f = foods.find((f) => f.uuid === uuid);
      setFood(f);
    };
    fetchFood();
  }, [uuid]);

  if (!food) return <p>Loading...</p>;

  const handleAddToCart = (food) => {
    addToCart(food);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000); // auto hide after 2 seconds
  };

  return (
    <Container className="my-4">
      <Button variant="secondary" onClick={() => navigate(-1)} className="mb-3">
        &larr; Back to Menu
      </Button>

      <Row className="justify-content-center">
        <Col xs={12} md={6}>
          <Card className="shadow-sm">
            <Card.Img
              variant="top"
              src={`${import.meta.env.BASE_URL}${food.image || "/images/placeholder.png"}`}
              alt={food.name}
              style={{ objectFit: "cover", maxHeight: "400px" }}
            />
            <Card.Body>
              <Card.Title className="mb-3">{food.name}</Card.Title>
              <Card.Text>
                <strong>Category:</strong> {food.category} <br />
                <strong>Price:</strong> ${Number(food.price).toFixed(2)}
              </Card.Text>
              {/* Show Add to Cart only for non-admin users */}
              {user?.role !== "manager" && (
                <Button variant="primary" onClick={() => handleAddToCart(food)}>Add to Cart</Button> )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Toast Notification */}
      <ToastContainer className="p-3" position="bottom-end">
        <Toast show={showToast} bg="primary" onClose={() => setShowToast(false)} delay={2000} autohide>
          <Toast.Header>
            <strong className="me-auto">Cart</strong>
          </Toast.Header>
          <Toast.Body>{food.name} added to cart!</Toast.Body>
        </Toast>
      </ToastContainer>
    </Container>
  );
}

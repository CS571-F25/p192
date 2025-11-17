// src/pages/CartPage.jsx
import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { Card, Button, Row, Col, Container } from "react-bootstrap";

export default function CartPage() {
  const { cart, addToCart, decrementFromCart, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <Container className="my-4">
      <h1 className="mb-4 text-center">Your Cart</h1>

      {cart.length === 0 ? (
        <div className="text-center">
          <p>Your cart is empty.</p>
          <Button variant="primary" onClick={() => navigate("/menu")}>
            Back to Menu
          </Button>
        </div>
      ) : (
        <>
          <Row className="g-3">
            {cart.map((item) => (
              <Col key={item.id} xs={12} sm={6} md={4} lg={3}>
                <Card className="h-100">
                  <Card.Img
                    variant="top"
                    src={`${import.meta.env.BASE_URL}${item.image}`}
                    alt={item.name}
                    style={{ height: "180px", objectFit: "cover" }}
                  />
                  <Card.Body className="d-flex flex-column">
                    <Card.Title>{item.name}</Card.Title>
                    <Card.Text className="flex-grow-1">
                      {item.category} <br />
                      ${item.price.toFixed(2)}
                    </Card.Text>

                    <div className="d-flex align-items-center justify-content-between">
                      <Button variant="outline-danger" onClick={() => decrementFromCart(item.id)}>
                        -
                      </Button>
                      <span>{item.quantity}</span>
                      <Button variant="outline-success" onClick={() => addToCart(item)}>
                        +
                      </Button>
                    </div>

                    
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          <h3 className="mt-4 text-center">Total: ${total.toFixed(2)}</h3>

          <div className="d-flex justify-content-center gap-3 mt-3 flex-wrap">
            <Button variant="primary" onClick={() => navigate("/checkout")}>
              Proceed to Checkout
            </Button>
            <Button variant="outline-secondary" onClick={() => navigate("/menu")}>
              Back to Menu
            </Button>
            <Button variant="danger" onClick={clearCart}>
              Clear Cart
            </Button>
          </div>
        </>
      )}
    </Container>
  );
}

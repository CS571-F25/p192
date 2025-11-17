// src/pages/CheckoutPage.jsx
import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { submitOrder } from "../services/api";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

export default function CheckoutPage() {
  const { cart, clearCart } = useContext(CartContext);
  const { user, token } = useContext(AuthContext);
  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleConfirm = async () => {
    if (cart.length === 0) return;

    const success = await submitOrder({ user: user.username, items: cart, total }, token);

    if (success) {
      clearCart();
      navigate("/confirmation");
    } else {
      alert("Failed to submit order. Try again.");
    }
  };

  return (
    <Container className="my-4">
      <h1 className="text-center mb-4">Checkout</h1>

      {cart.length === 0 ? (
        <p className="text-center">Your cart is empty.</p>
      ) : (
        <>
          <Row xs={1} sm={2} md={3} lg={4} className="g-3">
            {cart.map((item) => (
              <Col key={item.id}>
                <Card className="h-100">
                  <Card.Img
                    variant="top"
                    src={`${import.meta.env.BASE_URL}${item.image}`}
                    alt={item.name}
                    style={{ height: "150px", objectFit: "cover" }}
                  />
                  <Card.Body className="d-flex flex-column">
                    <Card.Title>{item.name}</Card.Title>
                    <Card.Text className="flex-grow-1">
                      Quantity: {item.quantity} <br />
                      ${ (item.price * item.quantity).toFixed(2) }
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          <h3 className="text-end mt-4">Total: ${total.toFixed(2)}</h3>

          <div className="d-flex justify-content-between mt-4 flex-wrap gap-2">
            <Button variant="secondary" onClick={() => navigate("/cart")}>
              Back to Cart
            </Button>
            <Button variant="primary" onClick={handleConfirm}>
              Confirm Order
            </Button>
          </div>
        </>
      )}
    </Container>
  );
}

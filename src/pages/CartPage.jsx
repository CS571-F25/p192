// src/pages/CartPage.jsx
import React from "react";
import { Container, Row, Col, Button, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function CartPage({ cart, setCart }) {
  const navigate = useNavigate();

  const removeItem = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <Container>
      <h2 className="mt-3">Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Food</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Subtotal</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>${item.price.toFixed(2)}</td>
                  <td>{item.quantity}</td>
                  <td>${(item.price * item.quantity).toFixed(2)}</td>
                  <td>
                    <Button variant="danger" onClick={() => removeItem(item.id)}>
                      Remove
                    </Button>
                  </td>
                </tr>
              ))}Sea
            </tbody>
          </Table>
          <h4>Total: ${total.toFixed(2)}</h4>
          <Button onClick={() => navigate("/checkout")}>Proceed to Checkout</Button>
        </>
      )}
    </Container>
  );
}

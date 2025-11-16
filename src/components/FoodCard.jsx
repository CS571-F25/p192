// src/components/FoodCard.jsx
import React from "react";
import { Card, Button } from "react-bootstrap";

export default function FoodCard({ item, addToCart }) {
  return (
    <Card style={{ width: "18rem", margin: "1rem" }}>
      <Card.Img variant="top" src={item.image} alt={item.name} />
      <Card.Body>
        <Card.Title>{item.name}</Card.Title>
        <Card.Text>
          {item.category} <br />
          ${item.price.toFixed(2)}
        </Card.Text>
        <Button variant="primary" onClick={() => addToCart(item)}>
          Add to Cart
        </Button>
      </Card.Body>
    </Card>
  );
}

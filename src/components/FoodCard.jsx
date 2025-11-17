// src/components/FoodCard.jsx
import React from "react";
import { Card, Button } from "react-bootstrap";

export default function FoodCard({ food, onAdd, onEdit, onDelete }) {
  return (
    <Card style={{ width: "100%", height: "100%" }} className="h-100 shadow-sm">
      <Card.Img
        variant="top"
        src={`${import.meta.env.BASE_URL}${food.image || "/images/placeholder.png"}`}
        alt={food.name}
        style={{ height: "180px", objectFit: "cover" }}
      />

      <Card.Body className="d-flex flex-column">
        <Card.Title>{food.name}</Card.Title>

        <Card.Text className="flex-grow-1">
          {food.category} <br />
          ${Number(food.price).toFixed(2)}
        </Card.Text>

        {/* Customer button */}
        {onAdd && (
          <Button variant="primary" className="mt-auto" onClick={() => onAdd(food)}>
            Add to Cart
          </Button>
        )}

        {/* Admin buttons */}
        {!onAdd && (
          <div className="d-flex gap-2 mt-auto">
            <Button variant="warning" onClick={onEdit}>Edit</Button>
            <Button variant="danger" onClick={onDelete}>Delete</Button>
          </div>
        )}
      </Card.Body>
    </Card>
  );
}

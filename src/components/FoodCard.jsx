import React, {useContext} from "react";
import { Card, Button } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";


export default function FoodCard({ food, onAdd, onEdit, onDelete }) {

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

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

        {/* Show Details button */}
        <Button variant="info" className="mb-2" onClick={() => navigate(`/foods/${food.uuid}`)}>
          Show Details
        </Button>

        {/* Add button */}
        {onAdd && ( <Button variant="primary" className="mt-auto" onClick={() => onAdd(food)}> Add to Cart</Button>)}

        {/* Edit button */}
        {onEdit && (<Button variant="warning" className="mt-2" onClick={() => onEdit(food.uuid)}>Edit </Button>)}

        {/* Delete button */}
        {onDelete && (<Button variant="danger" className="mt-2" onClick={() => onDelete(food.uuid)}>Delete</Button>)}
      </Card.Body>
    </Card>
  );
}

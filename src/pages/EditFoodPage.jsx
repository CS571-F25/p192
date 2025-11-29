import React, { useState, useEffect, useContext } from "react";
import { updateFood, getFoods } from "../services/api";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Container, Form, Button, Row, Col } from "react-bootstrap";



export default function EditFoodPage() {
  const { uuid } = useParams();
  const navigate = useNavigate();
  const [food, setFood] = useState(null);
  const { token } = useContext(AuthContext);


  useEffect(() => {
    const fetchFood = async () => {
      const foods = await getFoods();
      const f = foods.find(f => f.uuid === uuid);
      setFood(f);
    };
    fetchFood();
  }, [uuid]);


   const handleSubmit = async (e) => {
    e.preventDefault();
    if (!food) return;

    const ok = await updateFood(food.uuid, { ...food, price: parseFloat(food.price) }, token);
    if (ok) navigate("/foods/manage");
    else alert("Failed to update food.");
  };


  if (!food) return <p>Loading...</p>;


  return (
    <Container className="mt-5">
      <h1 className="mb-4 text-center">Edit Food</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group as={Row} className="mb-3" controlId="food-name">
          <Form.Label column sm={2}>Name</Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              value={food.name}
              onChange={(e) => setFood({ ...food, name: e.target.value })}
              required // required field
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="food-category">
          <Form.Label column sm={2}>Category</Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              value={food.category}
              onChange={(e) => setFood({ ...food, category: e.target.value })}
              required // required field
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="food-price">
          <Form.Label column sm={2}>Price</Form.Label>
          <Col sm={10}>
            <Form.Control
              type="number"
              value={food.price}
              onChange={(e) => setFood({ ...food, price: e.target.value })}
              required // required field
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="food-image">
          <Form.Label column sm={2}>Image URL</Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              value={food.image}
              onChange={(e) => setFood({ ...food, image: e.target.value })}
            />
          </Col>
        </Form.Group>

        <div className="d-flex justify-content-between">
          <Button variant="primary" type="submit">Save Changes</Button>
          <Button variant="secondary" onClick={() => navigate("/foods/manage")}>Cancel</Button>
        </div>
      </Form>
    </Container>
  );
}
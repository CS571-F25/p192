// src/pages/ItemDetailsPage.jsx
import React, { useEffect, useState, useContext } from "react";
import { getFoods } from "../services/api";
import { useParams } from "react-router-dom";
import { CartContext } from "../context/CartContext";

export default function ItemDetailsPage() {
  const { uuid } = useParams();
  const [food, setFood] = useState(null);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchFood = async () => {
      const foods = await getFoods();
      const f = foods.find((f) => f.id === parseInt(uuid));
      setFood(f);
    };
    fetchFood();
  }, [uuid]);

  if (!food) return <p>Loading...</p>;

  return (
    <div className="container">
      <h1>{food.name}</h1>
      <p>Category: {food.category}</p>
      <p>Price: ${food.price}</p>
      <img src={food.image} alt={food.name} width="200" />
      <button onClick={() => addToCart(food)}>Add to Cart</button>
    </div>
  );
}

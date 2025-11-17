// src/pages/EditFoodPage.jsx
import React, { useState, useEffect } from "react";
import { updateFood, getFoods } from "../services/api";
import { useParams, useNavigate } from "react-router-dom";


export default function EditFoodPage() {
  const { uuid } = useParams();
  const navigate = useNavigate();
  const [food, setFood] = useState(null);


  useEffect(() => {
    const fetchFood = async () => {
      const foods = await getFoods();
      const f = foods.find((f) => f.id === parseInt(uuid));
      setFood(f);
    };
    fetchFood();
  }, [uuid]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateFood(uuid, { ...food, price: parseFloat(food.price) });
    navigate("/foods/manage");
  };


  if (!food) return <p>Loading...</p>;


  return (
    <div className="container">
      <h1>Edit Food</h1>
      <form onSubmit={handleSubmit}>
        <input value={food.name} onChange={e=>setFood({...food,name:e.target.value})}/>
        <input value={food.category} onChange={e=>setFood({...food,category:e.target.value})}/>
        <input type="number" value={food.price} onChange={e=>setFood({...food,price:e.target.value})}/>
        <input value={food.image} onChange={e=>setFood({...food,image:e.target.value})}/>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}

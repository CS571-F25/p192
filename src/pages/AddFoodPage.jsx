// src/pages/AddFoodPage.jsx
import React, { useState } from "react";
import { addFood } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function AddFoodPage() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addFood({ name, category, price: parseFloat(price), image });
    navigate("/foods/manage");
  };

  return (
    <div className="container">
      <h1>Add Food</h1>
      <form onSubmit={handleSubmit}>
        <input placeholder="Name" value={name} onChange={e=>setName(e.target.value)}/>
        <input placeholder="Category" value={category} onChange={e=>setCategory(e.target.value)}/>
        <input placeholder="Price" type="number" value={price} onChange={e=>setPrice(e.target.value)}/>
        <input placeholder="Image URL" value={image} onChange={e=>setImage(e.target.value)}/>
        <button type="submit">Add Food</button>
      </form>
    </div>
  );
}

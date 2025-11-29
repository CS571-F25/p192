// src/pages/ManageFoodPage.jsx
import React, { useEffect, useState, useContext } from "react";
import { getFoods, deleteFood } from "../services/api";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import FoodCard from "../components/FoodCard";
import PaginationBar from "../components/PaginationBar";


export default function ManageFoodPage() {
  const { token } = useContext(AuthContext); // need token for delete/edit
  const navigate = useNavigate();


  const [foods, setFoods] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;


  // Fetch all foods
  useEffect(() => {
    const fetchFoods = async () => {
      const data = await getFoods();
      setFoods(data); // uuid included
    };
    fetchFoods();
  }, []);


  // Pagination logic
  const totalPages = Math.ceil(foods.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const paginatedFoods = foods.slice(startIdx, startIdx + itemsPerPage);


  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));


  // Delete food
  const handleDelete = async (uuid) => {
    const confirmed = window.confirm("Are you sure you want to delete this food?");
    if (!confirmed) return;


    const success = await deleteFood(uuid, token);
    if (success) setFoods(prev => prev.filter(f => f.uuid !== uuid));
    else alert("Delete failed.");
  };


  // Edit food
  const handleEdit = (uuid) => {
    navigate(`/foods/edit/${uuid}`);
  };


  return (
    <Container className="my-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Manage Foods</h1>
        <div>
          <Button variant="secondary" onClick={() => navigate("/menu")} className="me-2">
            Back to Menu
          </Button>
          <Button variant="primary" onClick={() => navigate("/foods/add")}>
            Add Food
          </Button>
        </div>
      </div>


      {paginatedFoods.length === 0 ? (
        <p className="text-center">No foods found.</p>
      ) : (
        <Row>
          {paginatedFoods.map((food) => (
            <Col key={food.uuid} xs={12} sm={6} md={4} lg={3} className="mb-4">
              <FoodCard food={food} onEdit={handleEdit} onDelete={handleDelete} />
            </Col>
          ))}
        </Row>
      )}


      {/* Pagination */}
      <PaginationBar
        currentPage={currentPage}
        totalPages={totalPages}
        onPrev={handlePrev}
        onNext={handleNext}
      />
    </Container>
  );
}





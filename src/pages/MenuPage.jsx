import React, { useEffect, useState, useContext } from "react";
import { getFoods } from "../services/api";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import FoodCard from "../components/FoodCard";
import AdminOnly from "../components/AdminOnly";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Button, Toast, ToastContainer} from "react-bootstrap";

import PaginationBar from "../components/PaginationBar";
import NavbarHeader from "../components/NavbarHeader";
import CategorySidebar from "../components/CategorySidebar";
import SearchBar from "../components/SearchBar";

export default function MenuPage() {
  const [foods, setFoods] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");


  useEffect(() => {setCurrentPage(1);}, [searchTerm, selectedCategory]);

  const { addToCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);

  useEffect(() => {
  const fetchFoods = async () => {
    const data = await getFoods(); // wait til array returns
    setFoods(data);

    const cats = Array.from(new Set(data.map((food) => food.category)));
    setCategories(cats);
  };
  fetchFoods();
}, []);



  // Filter foods by search and category
  const filteredFoods = foods.filter((food) => {
    const matchesSearch = food.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || food.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Pagination
  const totalPages = Math.ceil(filteredFoods.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const paginatedFoods = filteredFoods.slice(startIdx, startIdx + itemsPerPage);

  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

   const handleAddToCart = (food) => {
    addToCart(food);
    setToastMessage(`${food.name} added to cart!`);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000); // auto hide after 2 seconds
    };

  return (
    <Container fluid className="my-4">

      {/* Navbar */}
      <NavbarHeader />

      <h1 className="text-center mb-4">Menu</h1>

      {/* Admin buttons */}
      <AdminOnly>
        <div className="d-flex justify-content-center gap-2 mb-3 flex-wrap">
          <Button onClick={() => navigate("/foods/add")}>Add Food</Button>
          <Button onClick={() => navigate("/foods/manage")}>Manage Foods</Button>
        </div>
      </AdminOnly>

      <Row>
        {/* Category sidebar */}
        <Col xs={12} md={2}>
          <CategorySidebar
            categories={["All", ...categories]}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        </Col>

      
        {/* Main content */}
      <Col xs={12} md={10}>
    <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm}/>

    {/* Center the row */}
    <Row className="g-3">
    {paginatedFoods.length > 0 ? (
      paginatedFoods.map((food) => (
        <Col key={food.uuid} xs={12} sm={6} md={4} lg={3}>
          <FoodCard food={food} 
          onAdd={user.role !== "manager" ? () => handleAddToCart(food) : null} >
          </FoodCard>
        </Col>
      ))
    ) : (
      <Col>
        <p className="text-center mt-4">No foods found.</p>
      </Col>
    )}
  </Row>

    <PaginationBar
      currentPage={currentPage}
      totalPages={totalPages}
      onPrev={handlePrev}
      onNext={handleNext}
    />
  </Col>
        </Row>

        {/* Toast Notification */}
        <ToastContainer className="p-3" position="bottom-end">
          <Toast show={showToast} bg="primary" onClose={() => setShowToast(false)} delay={2000} autohide>
            <Toast.Header>
              <strong className="me-auto">Cart</strong>
            </Toast.Header>
            <Toast.Body>{toastMessage}</Toast.Body>
          </Toast>
        </ToastContainer>
      </Container>
    );
  }

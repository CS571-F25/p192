// src/pages/MenuPage.jsx
import React, { useState } from "react";
import menuData from "../data/menuData";
import FoodCard from "../components/FoodCard";
import { Container, Row, Col, Form, Button, Dropdown } from "react-bootstrap";

const categories = ["All", "Soup", "Rice", "Noodle", "Appetizer", "Drink"];

export default function MenuPage({ cart, setCart }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const addToCart = (item) => {
    const existing = cart.find((i) => i.id === item.id);
    if (existing) {
      setCart(
        cart.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        )
      );
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const filteredItems = menuData.filter((item) => {
    const matchesCategory =
      selectedCategory === "All" || item.category === selectedCategory;
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirst, indexOfLast);

  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const handleCategoryChange = (cat) => {
    setSelectedCategory(cat);
    setCurrentPage(1);
  };

  return (
    <Container>
      <h2 className="mt-3 mb-3">Menu</h2>

      <Row className="mb-4">
        <Col md={6}>
          <Form.Control
            type="text"
            placeholder="Search food..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Col>
        <Col md={6}>
          <Dropdown onSelect={handleCategoryChange}>
            <Dropdown.Toggle variant="secondary">
              {selectedCategory}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {categories.map((cat) => (
                <Dropdown.Item key={cat} eventKey={cat}>
                  {cat}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </Col>
      </Row>

      <Row>
        {currentItems.map((item) => (
          <Col key={item.id} md={4}>
            <FoodCard item={item} addToCart={() => addToCart(item)} />
          </Col>
        ))}
        {currentItems.length === 0 && <Col>No items found.</Col>}
      </Row>

      <Row className="mt-4 mb-5">
        <Col className="d-flex justify-content-center align-items-center">
          <Button
            variant="outline-primary"
            onClick={handlePrev}
            disabled={currentPage === 1}
            className="me-2"
          >
            Previous
          </Button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant="outline-primary"
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className="ms-2"
          >
            Next
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

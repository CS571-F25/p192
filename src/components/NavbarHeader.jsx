// src/components/NavbarHeader.jsx
import React, { useContext } from "react";
import { Navbar, Nav, Container, Badge } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";

export default function NavbarHeader() {
  const { user, logout } = useContext(AuthContext);
  const { cartItems } = useContext(CartContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const { cart = [] } = useContext(CartContext); // use cart, default empty array
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  
  return (
    <Navbar bg="light" expand="lg" className="mb-4">
      <Container>
        <Navbar.Brand as={Link} to="/menu">
          Tian's Grab&Go
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/menu">Menu</Nav.Link>
            
            {user?.role === "manager" && (
              <Nav.Link as={Link} to="/foods/manage">Manage Foods</Nav.Link>
            )}

            {user?.role === "customer" && (
              <Nav.Link as={Link} to="/cart">
                Cart {cartCount > 0 && <Badge bg="primary">{cartCount}</Badge>}
              </Nav.Link>
            )}
          </Nav>

          <Nav>
            {user ? (
              <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                <Nav.Link as={Link} to="/register">Register</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

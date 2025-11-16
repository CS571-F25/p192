import React from "react";
import { Navbar, Nav, Container, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function NavbarHeader({ cartCount }) {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/menu">Tian's Grab&Go</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/menu">Menu</Nav.Link>
            <Nav.Link as={Link} to="/cart">
              Cart {cartCount > 0 && <Badge bg="primary">{cartCount}</Badge>}
            </Nav.Link>
            <Nav.Link as={Link} to="/logout">Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
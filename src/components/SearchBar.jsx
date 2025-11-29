import React from "react";
import { Form } from "react-bootstrap";

export default function SearchBar({ searchTerm, onSearchChange }) {
  return (
    <Form.Control
      type="text"
      placeholder="Search food..."
      value={searchTerm}
      onChange={(e) => onSearchChange(e.target.value)}
      className="mb-3"
    />
  );
}

// src/components/CategorySidebar.jsx
import React from "react";
import { ListGroup } from "react-bootstrap";

export default function CategorySidebar({ categories, selectedCategory, onSelectCategory }) {
  return (
    <ListGroup className="mb-3">
      {categories.map((cat) => (
        <ListGroup.Item
          key={cat}
          active={cat === selectedCategory}
          action
          onClick={() => onSelectCategory(cat)}
        >
          {cat}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}

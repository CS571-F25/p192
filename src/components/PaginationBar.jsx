// src/components/PaginationBar.jsx
import React from "react";
import { Button, Row, Col } from "react-bootstrap";

export default function PaginationBar({ currentPage, totalPages, onPrev, onNext }) {
  return (
    <Row className="mt-4 mb-5">
      <Col className="d-flex justify-content-center align-items-center">
        <Button
          variant="outline-primary"
          onClick={onPrev}
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
          onClick={onNext}
          disabled={currentPage === totalPages}
          className="ms-2"
        >
          Next
        </Button>
      </Col>
    </Row>
  );
}

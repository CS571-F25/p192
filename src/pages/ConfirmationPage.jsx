// src/pages/ConfirmationPage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

export default function ConfirmationPage() {
  const navigate = useNavigate();

  // Get current local time
  const now = new Date();

  // Format function: MM/DD/YYYY hh:mm AM/PM
  const formatTime = (date) => {
    const options = { 
      year: "numeric", 
      month: "2-digit", 
      day: "2-digit", 
      hour: "numeric", 
      minute: "2-digit", 
      hour12: true 
    };
    return date.toLocaleString(undefined, options);
  };

  // Estimate pickup time 30 minutes later
  const pickupTime = new Date(now.getTime() + 30 * 60000);

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <Card className="text-center p-4 shadow-sm">
            <Card.Body>
              <Card.Title className="mb-3">Thank you!</Card.Title>
              <Card.Text className="mb-2">
                Your order has been successfully confirmed at <strong>{formatTime(now)}</strong>
              </Card.Text>
              <Card.Text className="mb-2">
                You may expect to pick up your order at <strong>{formatTime(pickupTime)}</strong>
              </Card.Text>
              <Card.Text className="mb-4">
                At Address: <strong>1300 University Ave, Madison, WI 53707</strong>
              </Card.Text>
              <Button variant="primary" onClick={() => navigate("/menu")}>
                Back to Menu
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

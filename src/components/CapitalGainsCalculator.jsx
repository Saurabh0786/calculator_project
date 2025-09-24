import React, { useState, useEffect } from 'react';
import { Form, Card, Row, Col, Alert } from 'react-bootstrap';

const CapitalGainsCalculator = () => {
  const [purchasePrice, setPurchasePrice] = useState(100000);
  const [salePrice, setSalePrice] = useState(150000);
  const [isLongTerm, setIsLongTerm] = useState(true);
  const [capitalGains, setCapitalGains] = useState(0);
  const [tax, setTax] = useState(0);

  useEffect(() => {
    const calculateTax = () => {
      const gains = salePrice - purchasePrice;
      if (gains <= 0) {
        setCapitalGains(0);
        setTax(0);
        return;
      }
  
      setCapitalGains(gains);
  
      let taxRate = 0;
      if (isLongTerm) {
        // Assuming a 20% long-term capital gains tax rate
        taxRate = 0.20;
      } else {
        // Assuming a 15% short-term capital gains tax rate
        taxRate = 0.15;
      }
  
      setTax((gains * taxRate).toFixed(2));
    };

    calculateTax();
  }, [purchasePrice, salePrice, isLongTerm]);

  return (
    <Card className="calculator-card">
      <Card.Body>
        <Card.Title className="text-center mb-4">Capital Gains Tax Calculator</Card.Title>
        <Form>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column lg={6}>Purchase Price (₹):</Form.Label>
            <Col lg={6}>
              <Form.Control
                type="text"
                value={purchasePrice}
                onChange={(e) => setPurchasePrice(e.target.value)}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column lg={6}>Sale Price (₹):</Form.Label>
            <Col lg={6}>
              <Form.Control
                type="text"
                value={salePrice}
                onChange={(e) => setSalePrice(e.target.value)}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column lg={6}>Investment Type:</Form.Label>
            <Col lg={6}>
              <Form.Select onChange={(e) => setIsLongTerm(e.target.value === 'true')} value={isLongTerm.toString()}>
                <option value="true">Long Term (more than 1 year)</option>
                <option value="false">Short Term (1 year or less)</option>
              </Form.Select>
            </Col>
          </Form.Group>
        </Form>
        {capitalGains > 0 && (
          <Alert variant="success" className="result-alert">
            <div><strong>Capital Gains:</strong> ₹ {capitalGains}</div>
            <div><strong>Estimated Tax:</strong> ₹ {tax}</div>
          </Alert>
        )}
      </Card.Body>
    </Card>
  );
};

export default CapitalGainsCalculator;

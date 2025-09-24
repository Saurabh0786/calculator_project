import React, { useState, useEffect } from 'react';
import { Form, Card, Row, Col, Alert } from 'react-bootstrap';

const RealEstateCalculator = () => {
  const [propertyValue, setPropertyValue] = useState(5000000);
  const [downPayment, setDownPayment] = useState(1000000);
  const [loanTerm, setLoanTerm] = useState(20);
  const [interestRate, setInterestRate] = useState(8.5);
  const [emi, setEmi] = useState(0);
  const [error, setError] = useState('');

  useEffect(() => {
    const calculateEmi = () => {
      if (!propertyValue || !downPayment || !loanTerm || !interestRate) {
        setError('Please enter all fields.');
        setEmi(0);
        return;
      }

      setError('');
      const principal = propertyValue - downPayment;
      if (principal <= 0) {
        setEmi(0);
        return;
      }
      const monthlyInterestRate = interestRate / (12 * 100);
      const numberOfMonths = loanTerm * 12;
      
      if (monthlyInterestRate === 0) {
          setEmi(principal / numberOfMonths);
          return;
      }
  
      const emiValue =
        (principal *
          monthlyInterestRate *
          Math.pow(1 + monthlyInterestRate, numberOfMonths)) /
        (Math.pow(1 + monthlyInterestRate, numberOfMonths) - 1);
  
      setEmi(emiValue.toFixed(2));
    };
    calculateEmi();
  }, [propertyValue, downPayment, loanTerm, interestRate]);

  return (
    <Card className="calculator-card">
      <Card.Body>
        <Card.Title className="text-center mb-4">Real Estate Calculator</Card.Title>
        <Form>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column lg={6}>Property Value (₹):</Form.Label>
            <Col lg={6}>
              <Form.Control
                type="text"
                value={propertyValue}
                onChange={(e) => setPropertyValue(e.target.value)}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column lg={6}>Down Payment (₹):</Form.Label>
            <Col lg={6}>
              <Form.Control
                type="text"
                value={downPayment}
                onChange={(e) => setDownPayment(e.target.value)}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column lg={6}>Loan Term (Years):</Form.Label>
            <Col lg={6}>
              <Form.Control
                type="text"
                value={loanTerm}
                onChange={(e) => setLoanTerm(e.target.value)}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column lg={6}>Interest Rate (%):</Form.Label>
            <Col lg={6}>
              <Form.Control
                type="text"
                step="0.1"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
              />
            </Col>
          </Form.Group>
        </Form>
        {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
        {emi > 0 && (
          <Alert variant="success" className="result-alert">
            <div><strong>Monthly EMI:</strong> ₹ {emi}</div>
          </Alert>
        )}
      </Card.Body>
    </Card>
  );
};

export default RealEstateCalculator;

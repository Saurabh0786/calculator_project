import React, { useState, useEffect } from 'react';
import { Form, Card, Row, Col, Alert } from 'react-bootstrap';

const RetirementCalculator = () => {
  const [currentAge, setCurrentAge] = useState(30);
  const [retirementAge, setRetirementAge] = useState(60);
  const [monthlySavings, setMonthlySavings] = useState(20000);
  const [expectedReturn, setExpectedReturn] = useState(10);
  const [retirementCorpus, setRetirementCorpus] = useState(0);

  useEffect(() => {
    const calculateCorpus = () => {
      const yearsToRetirement = retirementAge - currentAge;
      if (yearsToRetirement <= 0) {
        setRetirementCorpus(0);
        return;
      }
  
      const monthlyRate = expectedReturn / 12 / 100;
      const numberOfMonths = yearsToRetirement * 12;
      const futureValue = monthlySavings * ((Math.pow(1 + monthlyRate, numberOfMonths) - 1) / monthlyRate) * (1 + monthlyRate);
  
      setRetirementCorpus(futureValue.toFixed(2));
    };

    calculateCorpus();
  }, [currentAge, retirementAge, monthlySavings, expectedReturn]);

  return (
    <Card className="calculator-card">
      <Card.Body>
        <Card.Title className="text-center mb-4">Retirement Calculator</Card.Title>
        <Form>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column lg={6}>Current Age:</Form.Label>
            <Col lg={6}>
              <Form.Control
                type="text"
                value={currentAge}
                onChange={(e) => setCurrentAge(e.target.value)}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column lg={6}>Retirement Age:</Form.Label>
            <Col lg={6}>
              <Form.Control
                type="text"
                value={retirementAge}
                onChange={(e) => setRetirementAge(e.target.value)}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column lg={6}>Current Monthly Savings (₹):</Form.Label>
            <Col lg={6}>
              <Form.Control
                type="text"
                value={monthlySavings}
                onChange={(e) => setMonthlySavings(e.target.value)}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column lg={6}>Expected Rate of Return (%):</Form.Label>
            <Col lg={6}>
              <Form.Control
                type="text"
                step="0.1"
                value={expectedReturn}
                onChange={(e) => setExpectedReturn(e.target.value)}
              />
            </Col>
            {/* Add any additional form fields here if needed */}
          </Form.Group>
        </Form>
        {retirementCorpus > 0 && (
          <Alert variant="success" className="result-alert">
            <div><strong>Estimated Retirement Corpus:</strong> ₹ {retirementCorpus}</div>
          </Alert>
        )}
      </Card.Body>
    </Card>
  );
};

export default RetirementCalculator;

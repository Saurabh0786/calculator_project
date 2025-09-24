  import React, { useState, useEffect } from 'react';
  import { Form, Card, Row, Col, Alert } from 'react-bootstrap';

  function MutualFundCalculator() {
    const [initialInvestment, setInitialInvestment] = useState('100000');
    const [interestRate, setInterestRate] = useState('12');
    const [period, setPeriod] = useState('10');
    const [result, setResult] = useState(null);

    const calculateMutualFund = () => {
      const p = Number(initialInvestment);
      const r = Number(interestRate);
      const t = Number(period);

      if (p > 0 && r > 0 && t > 0) {
        const i = r / 100;
        const futureValue = p * Math.pow(1 + i, t);
        const totalInvestment = p;
        const wealthGained = futureValue - totalInvestment;

        setResult({
          futureValue: futureValue.toFixed(2),
          totalInvestment: totalInvestment.toFixed(2),
          wealthGained: wealthGained.toFixed(2),
        });
      } else {
        setResult(null);
      }
    };

    useEffect(() => {
      calculateMutualFund();
    }, [initialInvestment, interestRate, period]);

    return (
      <Card className="calculator-card">
        <Card.Body>
          <Card.Title className="text-center mb-4">Mutual Fund (Lump Sum) Calculator</Card.Title>
          <Form>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column lg={6}>Initial Investment (₹)</Form.Label>
              <Col lg={6}>
                <Form.Control type="text" value={initialInvestment} onChange={(e) => setInitialInvestment(e.target.value)} />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column lg={6}>Expected Return Rate (% p.a.)</Form.Label>
              <Col lg={6}>
                <Form.Control type="text" value={interestRate} onChange={(e) => setInterestRate(e.target.value)} />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column lg={6}>Time Period (Years)</Form.Label>
              <Col lg={6}>
                <Form.Control type="text" value={period} onChange={(e) => setPeriod(e.target.value)} />
              </Col>
            </Form.Group>
          </Form>
          {result && (
            <Alert variant="primary" className="result-alert">
              <div><strong>Maturity Value:</strong> ₹{result.futureValue}</div>
              <div><strong>Total Investment:</strong> ₹{result.totalInvestment}</div>
              <div><strong>Wealth Gained:</strong> ₹{result.wealthGained}</div>
            </Alert>
          )}
        </Card.Body>
      </Card>
    );
  }

  export default MutualFundCalculator;
import React, { useState, useEffect } from 'react';
      import { Form, Card, Row, Col, Alert } from 'react-bootstrap';

      function FdCalculator() {
        const [principal, setPrincipal] = useState('100000');
        const [interestRate, setInterestRate] = useState('6.5');
        const [period, setPeriod] = useState('5');
        const [result, setResult] = useState(null);

        const calculateFd = () => {
          const p = Number(principal);
          const r = Number(interestRate);
          const t = Number(period);

          if (p > 0 && r > 0 && t > 0) {
            const i = r / 100;
            const futureValue = p * Math.pow(1 + i, t); //updated this line
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
          calculateFd();
        }, [principal, interestRate, period]);

        return (
          <Card className="calculator-card">
            <Card.Body>
              <Card.Title className="text-center mb-4">Fixed Deposit (FD) Calculator</Card.Title>
              <Form>
                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm={6}>Investment Amount (₹)</Form.Label>
                  <Col sm={6}>
                    <Form.Control type="text" value={principal} onChange={(e) => setPrincipal(e.target.value)} />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm={6}>Interest Rate (% p.a.)</Form.Label>
                  <Col sm={6}>
                    <Form.Control type="text" value={interestRate} onChange={(e) => setInterestRate(e.target.value)} />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm={6}>Time Period (Years)</Form.Label>
                  <Col sm={6}>
                    <Form.Control type="text" value={period} onChange={(e) => setPeriod(e.target.value)} />
                  </Col>
                </Form.Group>
              </Form>
              {result && (
                <Alert variant="warning" className="result-alert">
                  <div><strong>Maturity Amount:</strong> ₹{result.futureValue}</div>
                  <div><strong>Principal Amount:</strong> ₹{result.totalInvestment}</div>
                  <div><strong>Total Interest:</strong> ₹{result.wealthGained}</div>
                </Alert>
              )}
            </Card.Body>
          </Card>
        );
      }

      export default FdCalculator;
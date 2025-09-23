 import React, { useState, useEffect } from 'react';
      import { Form, Card, Row, Col, Alert, Table } from 'react-bootstrap';

      function EmiCalculator() {
        const [principal, setPrincipal] = useState(5000000);
        const [interestRate, setInterestRate] = useState(8.5);
        const [tenure, setTenure] = useState(20);
        const [result, setResult] = useState(null);

        function calculateEmi() {
          const principalAmount = Number(principal);
          const annualRate = Number(interestRate);
          const years = Number(tenure);

          if (principalAmount > 0 && annualRate > 0 && years > 0) {
            const monthlyRate = annualRate / 12 / 100;
            const numberOfMonths = years * 12;

            const emi = (principalAmount * monthlyRate  *Math.pow(1 + monthlyRate, numberOfMonths)) / (Math.pow(1 + monthlyRate, numberOfMonths) - 1);
            const totalPayable = emi * numberOfMonths;
            const totalInterest = totalPayable - principalAmount;

            const schedule = [];
            let remainingBalance = principalAmount;
            const startDate = new Date();
            // Using 3-letter month names
            const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

            for (let i = 0; i < numberOfMonths; i++) {
              const paymentDate = new Date(startDate.getFullYear(), startDate.getMonth() + 1 + i, 1);

              const interestForMonth = remainingBalance * monthlyRate;
              const principalForMonth = emi - interestForMonth;
              remainingBalance -= principalForMonth;

              schedule.push({
                month: i + 1,
                year: paymentDate.getFullYear(),
                monthName: monthNames[paymentDate.getMonth()],
                principal: principalForMonth.toFixed(2),
                interest: interestForMonth.toFixed(2),
                balance: remainingBalance < 0 ? '0.00' : remainingBalance.toFixed(2),
              });
            }

            setResult({
              emi: emi.toFixed(2),
              totalPayable: totalPayable.toFixed(2),
              totalInterest: totalInterest.toFixed(2),
              schedule: schedule,
            });
          } else {
            setResult(null);
          }
        }

        useEffect(() => {
          calculateEmi();
        }, [principal, interestRate, tenure]);

        return (
          <Card className="calculator-card">
            <Card.Body>
              <Card.Title className="text-center mb-4">Home Loan / EMI Calculator</Card.Title>
              <Form>
                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm={5}>Loan Amount (₹)</Form.Label>
                  <Col sm={7}>
                    <Form.Control type="text" value={principal} onChange={(e) => setPrincipal(e.target.value)} />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm={5}>Interest Rate (% p.a.)</Form.Label>
                  <Col sm={7}>
                    <Form.Control type="text" value={interestRate} onChange={(e) => setInterestRate(e.target.value)} />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm={5}>Loan Tenure (Years)</Form.Label>
                  <Col sm={7}>
                    <Form.Control type="text" value={tenure} onChange={(e) => setTenure(e.target.value)} />
                  </Col>
                </Form.Group>
              </Form>
              {result && (
                <>
                  <Alert variant="info" className="result-alert">
                    <div><strong>Monthly EMI:</strong> ₹{result.emi}</div>
                    <div><strong>Total Interest Payable:</strong> ₹{result.totalInterest}</div>
                    <div><strong>Total Payment:</strong> ₹{result.totalPayable}</div>
                  </Alert>
                  <div className="mt-4">
                    <h4 className="text-center mb-3">Monthly Payment Schedule</h4>
                    <div className="amortization-table-container">
                      <Table striped bordered hover responsive className="amortization-table">
                        <thead>
                          <tr>
                            <th>Year</th>
                            <th>Month</th>
                            <th>Monthly EMI (₹)</th>
                            <th>Principal Paid (₹)</th>
                            <th>Interest Paid (₹)</th>
                            <th>Remaining Balance (₹)</th>
                          </tr>
                        </thead>
                        <tbody>
                          {result.schedule.map((row) => (
                            <tr key={row.month}>
                              <td>{row.year}</td>
                              <td>{row.monthName}</td>
                              <td>{result.emi}</td>
                              <td>{row.principal}</td>
                              <td>{row.interest}</td>
                              <td>{row.balance}</td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </div>
                  </div>
                </>
              )}
            </Card.Body>
          </Card>
        );
      }

      export default EmiCalculator;
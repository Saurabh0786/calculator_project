import React, { useState, useEffect } from 'react';
import { Form, Card, Row, Col, Alert, Table } from 'react-bootstrap';

const PfCalculator = () => {
  const [basicSalary, setBasicSalary] = useState(25000);
  const [currentAge, setCurrentAge] = useState(25);
  const [retirementAge, setRetirementAge] = useState(58);
  const [currentEpfBalance, setCurrentEpfBalance] = useState(0);
  const [annualSalaryIncrease, setAnnualSalaryIncrease] = useState(5);
  const [interestRate, setInterestRate] = useState(8.25);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const employeeContributionRate = 0.12;
  const employerContributionRateToEpf = 0.0367;

  useEffect(() => {
    const calculatePf = () => {
      if (!basicSalary || !currentAge || !retirementAge || !annualSalaryIncrease || !interestRate) {
        setError('Please enter all fields.');
        setResult(null);
        return;
      }

      setError('');

      let openingBalance = Number(currentEpfBalance);
      let currentSalary = Number(basicSalary);
      const yearsToRetirement = retirementAge - currentAge;
      const yearlyData = [];

      for (let i = 1; i <= yearsToRetirement; i++) {
        const annualSalary = currentSalary * 12;
        const employeeContribution = annualSalary * employeeContributionRate;
        const employerContribution = annualSalary * employerContributionRateToEpf;
        const totalContribution = employeeContribution + employerContribution;
        const interestEarned = (openingBalance + totalContribution) * (interestRate / 100);
        const closingBalance = openingBalance + totalContribution + interestEarned;

        yearlyData.push({
          year: new Date().getFullYear() + i -1,
          openingBalance: openingBalance.toFixed(2),
          employeeContribution: employeeContribution.toFixed(2),
          employerContribution: employerContribution.toFixed(2),
          totalContribution: totalContribution.toFixed(2),
          interestEarned: interestEarned.toFixed(2),
          closingBalance: closingBalance.toFixed(2),
        });

        openingBalance = closingBalance;
        currentSalary *= (1 + annualSalaryIncrease / 100);
      }

      setResult({
        retirementCorpus: openingBalance.toFixed(2),
        yearlyData: yearlyData,
      });
    };

    calculatePf();
  }, [basicSalary, currentAge, retirementAge, currentEpfBalance, annualSalaryIncrease, interestRate]);

  return (
    <Card className="calculator-card calculator-card-lg">
      <Card.Body>
        <Card.Title className="text-center mb-4">Provident Fund (PF) Calculator</Card.Title>
        <Form>
          <Row>
            <Col md={6}>
              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={6}>Basic Monthly Salary (₹)</Form.Label>
                <Col sm={6}>
                  <Form.Control type="text" value={basicSalary} onChange={(e) => setBasicSalary(e.target.value)} />
                </Col>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={6}>Your Age</Form.Label>
                <Col sm={6}>
                  <Form.Control type="text" value={currentAge} onChange={(e) => setCurrentAge(e.target.value)} />
                </Col>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={6}>Retirement Age</Form.Label>
                <Col sm={6}>
                  <Form.Control type="text" value={retirementAge} onChange={(e) => setRetirementAge(e.target.value)} />
                </Col>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={6}>Current EPF Balance (₹)</Form.Label>
                <Col sm={6}>
                  <Form.Control type="text" value={currentEpfBalance} onChange={(e) => setCurrentEpfBalance(e.target.value)} />
                </Col>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={6}>Annual Salary Increase (%)</Form.Label>
                <Col sm={6}>
                  <Form.Control type="text" value={annualSalaryIncrease} onChange={(e) => setAnnualSalaryIncrease(e.target.value)} />
                </Col>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={6}>Interest Rate (% p.a.)</Form.Label>
                <Col sm={6}>
                  <Form.Control type="text" value={interestRate} onChange={(e) => setInterestRate(e.target.value)} />
                </Col>
              </Form.Group>
            </Col>
          </Row>
        </Form>
        {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
        {result && (
          <>
            <Alert variant="success" className="result-alert">
              <div><strong>Total Retirement Corpus:</strong> ₹{result.retirementCorpus}</div>
            </Alert>
            <div className="mt-4">
              <h4 className="text-center mb-3">Yearly PF Balance</h4>
              <div className="amortization-table-container">
                <Table striped bordered hover responsive className="amortization-table">
                  <thead>
                    <tr>
                      <th>Year</th>
                      <th>Opening Balance (₹)</th>
                      <th>Your Contribution (₹)</th>
                      <th>Employer's Contribution (₹)</th>
                      <th>Total Contribution (₹)</th>
                      <th>Interest Earned (₹)</th>
                      <th>Closing Balance (₹)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.yearlyData.map((row) => (
                      <tr key={row.year}>
                        <td>{row.year}</td>
                        <td>{row.openingBalance}</td>
                        <td>{row.employeeContribution}</td>
                        <td>{row.employerContribution}</td>
                        <td>{row.totalContribution}</td>
                        <td>{row.interestEarned}</td>
                        <td>{row.closingBalance}</td>
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
};

export default PfCalculator;

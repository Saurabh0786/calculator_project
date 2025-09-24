import React, { useState, useEffect } from 'react';
import { Form, Card, Row, Col, Alert, Table, ToggleButton, ToggleButtonGroup } from 'react-bootstrap';

const SalaryCalculator = () => {
  const [ctc, setCtc] = useState(1000000);
  const [taxRegime, setTaxRegime] = useState('new');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const calculateIncomeTax = (taxableIncome, regime) => {
    let tax = 0;
    if (regime === 'new') {
      if (taxableIncome > 1500000) tax += (taxableIncome - 1500000) * 0.30;
      if (taxableIncome > 1200000) tax += (Math.min(taxableIncome, 1500000) - 1200000) * 0.20;
      if (taxableIncome > 900000) tax += (Math.min(taxableIncome, 1200000) - 900000) * 0.15;
      if (taxableIncome > 600000) tax += (Math.min(taxableIncome, 900000) - 600000) * 0.10;
      if (taxableIncome > 300000) tax += (Math.min(taxableIncome, 600000) - 300000) * 0.05;
    } else {
      // Old regime (simplified, assuming no deductions other than standard)
      const standardDeduction = 50000;
      taxableIncome -= standardDeduction;
      if (taxableIncome > 1000000) tax += (taxableIncome - 1000000) * 0.30;
      if (taxableIncome > 500000) tax += (Math.min(taxableIncome, 1000000) - 500000) * 0.20;
      if (taxableIncome > 250000) tax += (Math.min(taxableIncome, 500000) - 250000) * 0.05;
    }
    // Add cess
    tax += tax * 0.04;
    return tax;
  };

  useEffect(() => {
    const calculateSalary = () => {
      if (!ctc || ctc <= 0) {
        setError('Please enter a valid CTC.');
        setResult(null);
        return;
      }

      setError('');

      const basicSalary = ctc * 0.50;
      const hra = basicSalary * 0.40;
      const pfContribution = basicSalary * 0.12;
      const professionalTax = 2400; // Simplified
      const specialAllowance = ctc - basicSalary - hra - pfContribution;

      const grossSalary = basicSalary + hra + specialAllowance;
      const taxableIncome = grossSalary - (taxRegime === 'old' ? hra : 0);
      const incomeTax = calculateIncomeTax(taxableIncome, taxRegime);

      const totalDeductions = pfContribution + professionalTax + incomeTax;
      const inHandSalaryAnnual = ctc - totalDeductions;
      const inHandSalaryMonthly = inHandSalaryAnnual / 12;

      setResult({
        ctc: ctc,
        basicSalary: basicSalary.toFixed(2),
        hra: hra.toFixed(2),
        specialAllowance: specialAllowance.toFixed(2),
        pfContribution: pfContribution.toFixed(2),
        professionalTax: professionalTax.toFixed(2),
        incomeTax: incomeTax.toFixed(2),
        totalDeductions: totalDeductions.toFixed(2),
        inHandSalaryAnnual: inHandSalaryAnnual.toFixed(2),
        inHandSalaryMonthly: inHandSalaryMonthly.toFixed(2),
      });
    };

    calculateSalary();
  }, [ctc, taxRegime]);

  return (
    <Card className="calculator-card">
      <Card.Body>
        <Card.Title className="text-center mb-4">Salary Calculator</Card.Title>
        <Form>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column lg={6}>Your Annual CTC (₹)</Form.Label>
            <Col lg={6}>
              <Form.Control type="text" value={ctc} onChange={(e) => setCtc(e.target.value)} />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column lg={6}>Tax Regime</Form.Label>
            <Col lg={6}>
              <ToggleButtonGroup type="radio" name="taxRegime" value={taxRegime} onChange={setTaxRegime}>
                <ToggleButton id="tbg-radio-1" value={'new'}>New</ToggleButton>
                <ToggleButton id="tbg-radio-2" value={'old'}>Old</ToggleButton>
              </ToggleButtonGroup>
            </Col>
          </Form.Group>
        </Form>
        {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
        {result && (
          <div className="mt-4">
            <Alert variant="primary">
              <h5>Monthly In-Hand Salary: ₹{result.inHandSalaryMonthly}</h5>
              <div>Annual In-Hand Salary: ₹{result.inHandSalaryAnnual}</div>
            </Alert>
            <Table striped bordered hover responsive className="mt-4">
              <thead>
                <tr><th colSpan="2">Salary Breakdown</th></tr>
              </thead>
              <tbody>
                <tr><td>Basic Salary</td><td>₹{result.basicSalary}</td></tr>
                <tr><td>House Rent Allowance (HRA)</td><td>₹{result.hra}</td></tr>
                <tr><td>Special Allowance</td><td>₹{result.specialAllowance}</td></tr>
                <tr><td colSpan="2"><strong>Deductions</strong></td></tr>
                <tr><td>Provident Fund (PF)</td><td>₹{result.pfContribution}</td></tr>
                <tr><td>Professional Tax</td><td>₹{result.professionalTax}</td></tr>
                <tr><td>Income Tax</td><td>₹{result.incomeTax}</td></tr>
                <tr><td><strong>Total Deductions</strong></td><td><strong>₹{result.totalDeductions}</strong></td></tr>
              </tbody>
            </Table>
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default SalaryCalculator;

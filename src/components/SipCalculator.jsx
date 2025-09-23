  import React, { useState, useEffect } from 'react';
  import { Form, Card, Row, Col, Alert } from 'react-bootstrap';
  import { Pie } from 'react-chartjs-2';
  import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

  ChartJS.register(ArcElement, Tooltip, Legend);

  function SipCalculator() {
    const [monthlyInvestment, setMonthlyInvestment] = useState('10000');
    const [interestRate, setInterestRate] = useState('12');
    const [period, setPeriod] = useState('10');
    const [stepUp, setStepUp] = useState('10'); // New state for annual step-up percentage
    const [result, setResult] = useState(null);
    const [chartData, setChartData] = useState(null);

    const calculateSip = () => {
      const p = Number(monthlyInvestment);
      const r = Number(interestRate);
      const t = Number(period);
      const annualStepUpPercent = Number(stepUp);

      if (p > 0 && r > 0 && t > 0) {
        const monthlyRate = r / 12 / 100;
        let futureValue = 0;
        let totalInvestment = 0;
        let currentMonthlySip = p;

        // Loop through each year to apply the step-up
        for (let year = 0; year < t; year++) {
          // Calculate value for 12 months at the current SIP amount
          for (let month = 0; month < 12; month++) {
            totalInvestment += currentMonthlySip;
            futureValue = (futureValue + currentMonthlySip) * (1 + monthlyRate);
          }
          // Increase the SIP amount for the next year
          currentMonthlySip = currentMonthlySip * (1 + (annualStepUpPercent / 100));
        }

        const wealthGained = futureValue - totalInvestment;

        setResult({
          futureValue: futureValue.toFixed(2),
          totalInvestment: totalInvestment.toFixed(2),
          wealthGained: wealthGained.toFixed(2),
        });

        setChartData({
          labels: ['Total Investment', 'Wealth Gained'],
          datasets: [
            {
              label: 'Value (₹)',
              data: [totalInvestment, wealthGained],
              backgroundColor: ['#36A2EB', '#4BC0C0'],
              borderColor: ['#36A2EB', '#4BC0C0'],
              borderWidth: 1,
            },
          ],
        });
      } else {
        setResult(null);
        setChartData(null);
      }
    };

    useEffect(() => {
      calculateSip();
    }, [monthlyInvestment, interestRate, period, stepUp]);

    return (
      <Card className="calculator-card">
        <Card.Body>
          <Card.Title className="text-center mb-4">Step-up SIP Calculator</Card.Title>
          <Form>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={6}>Monthly Investment (₹)</Form.Label>
              <Col sm={6}>
                <Form.Control type="text" value={monthlyInvestment} onChange={(e) => setMonthlyInvestment(e.target.value)} />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={6}>Expected Return Rate (% p.a.)</Form.Label>
              <Col sm={6}>
                <Form.Control type="text" value={interestRate} onChange={(e) => setInterestRate(e.target.value)} />
              </Col>
            </Form.Group>
            {/* New Input Field for Step-up */}
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={6}>Annual Step-up (% )</Form.Label>
              <Col sm={6}>
                <Form.Control type="text" value={stepUp} onChange={(e) => setStepUp(e.target.value)} />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={6}>Time Period (Years)</Form.Label>
              <Col sm={6}>
                <Form.Control type="text" value={period} onChange={(e) => setPeriod(e.target.value)} />
              </Col>
            </Form.Group>
          </Form>

          {result && chartData && (
            <Row className="mt-4 d-flex align-items-center">
              <Col md={6}>
                <Alert variant="success" className="result-alert h-100">
                  <div><strong>Future Value:</strong> ₹{result.futureValue}</div>
                  <hr/>
                  <div><strong>Total Investment:</strong> ₹{result.totalInvestment}</div>
                  <div><strong>Wealth Gained:</strong> ₹{result.wealthGained}</div>
                </Alert>
              </Col>
              <Col md={6}>
                <Pie data={chartData} />
              </Col>
            </Row>
          )}
        </Card.Body>
      </Card>
    );
  }

  export default SipCalculator;
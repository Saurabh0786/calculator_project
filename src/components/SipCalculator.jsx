  import React, { useState, useEffect } from 'react';
  import { Form, Card, Row, Col, Alert } from 'react-bootstrap';
  import { Pie } from 'react-chartjs-2';
  import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

  ChartJS.register(ArcElement, Tooltip, Legend);

  function SipCalculator() {
    const [monthlyInvestment, setMonthlyInvestment] = useState('10000');
    const [interestRate, setInterestRate] = useState('12');
    const [period, setPeriod] = useState('10');
    const [result, setResult] = useState(null);
    const [chartData, setChartData] = useState(null);

    const calculateSip = () => {
      const p = Number(monthlyInvestment);
      const r = Number(interestRate);
      const t = Number(period);

      if (p > 0 && r > 0 && t > 0) {
        const monthlyRate = r / 12 / 100;
        const numberOfMonths = t * 12;
        const futureValue = p * ((Math.pow(1 + monthlyRate, numberOfMonths) - 1) / monthlyRate) * (1 + monthlyRate);
        const totalInvestment = p * numberOfMonths;
        const wealthGained = futureValue - totalInvestment;

        setResult({
          totalValue: futureValue.toFixed(2),
          investedAmount: totalInvestment.toFixed(2),
          estReturns: wealthGained.toFixed(2),
        });

        setChartData({
          labels: ['Invested Amount', 'Est. Returns'],
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
    }, [monthlyInvestment, interestRate, period]);

    return (
      <Card className="calculator-card">
        <Card.Body>
          <Card.Title className="text-center mb-4">SIP Calculator</Card.Title>
          <Form>
            <div className="slider-box">
              <Form.Group as={Row} className="align-items-center">
                <Form.Label column lg={6}>Monthly Investment</Form.Label>
                <Col lg={6} className="text-end">
                  <span className="slider-value">₹{Number(monthlyInvestment).toLocaleString()}</span>
                </Col>
              </Form.Group>
              <Form.Range value={monthlyInvestment} onChange={(e) => setMonthlyInvestment(e.target.value)} min="500" max="100000" step="500" />
            </div>

            <div className="slider-box">
              <Form.Group as={Row} className="align-items-center">
                <Form.Label column lg={6}>Expected Return Rate</Form.Label>
                <Col lg={6} className="text-end">
                  <span className="slider-value">{interestRate}%</span>
                </Col>
              </Form.Group>
              <Form.Range value={interestRate} onChange={(e) => setInterestRate(e.target.value)} min="1" max="30" step="0.5" />
            </div>

            <div className="slider-box">
              <Form.Group as={Row} className="align-items-center">
                <Form.Label column lg={6}>Time Period</Form.Label>
                <Col lg={6} className="text-end">
                  <span className="slider-value">{period} Yrs</span>
                </Col>
              </Form.Group>
              <Form.Range value={period} onChange={(e) => setPeriod(e.target.value)} min="1" max="40" step="1" />
            </div>
          </Form>

          {result && chartData && (
            <Row className="mt-4 d-flex align-items-center">
              <Col md={6}>
                <Alert variant="success" className="result-alert h-100">
                  <div><strong>Total Value:</strong> ₹{result.totalValue}</div>
                  <hr/>
                  <div><strong>Invested Amount:</strong> ₹{result.investedAmount}</div>
                  <div><strong>Est. Returns:</strong> ₹{result.estReturns}</div>
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
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
        const i = r / 12 / 100;
        const n = t * 12;
        const futureValue = p  ((Math.pow(1 + i, n) - 1) / i)  (1 + i);
        const totalInvestment = p * n;
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
    }, [monthlyInvestment, interestRate, period]);

    return (
      <Card className="calculator-card">
        <Card.Body>
          <Card.Title className="text-center mb-4">SIP Calculator</Card.Title>
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
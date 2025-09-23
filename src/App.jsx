import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import SipCalculator from './components/SipCalculator';
import MutualFundCalculator from './components/MutualFundCalculator';
import EmiCalculator from './components/EmiCalculator';
import FdCalculator from './components/FdCalculator';
import { Container } from 'react-bootstrap';

function App() {
  return (
    <Router>
      <Header />
      <Container className="mt-4">
        <Routes>
          <Route path="/" element={<SipCalculator />} />
          <Route path="/mutual-fund" element={<MutualFundCalculator />} />
          <Route path="/emi" element={<EmiCalculator />} />
          <Route path="/fd" element={<FdCalculator />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
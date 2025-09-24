import React from 'react';
  import { HashRouter as Router, Routes, Route } from 'react-router-dom';
  import Header from './components/Header';
  import Footer from './components/footer';
  import SipCalculator from './components/SipCalculator';
  import MutualFundCalculator from './components/MutualFundCalculator';
  import EmiCalculator from './components/EmiCalculator';
  import FdCalculator from './components/FdCalculator';
  import RealEstateCalculator from './components/RealEstateCalculator';
  import CapitalGainsCalculator from './components/CapitalGainsCalculator';
  import LoanCalculator from './components/LoanCalculator';
  import RetirementCalculator from './components/RetirementCalculator';
  import PfCalculator from './components/PfCalculator';
  import SalaryCalculator from './components/SalaryCalculator';
  import { Container } from 'react-bootstrap';

  function App() {
    return (
      <Router>
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Header />
          <Container as="main" className="mt-4" style={{ flex: 1 }}>
            <Routes>
              <Route path="/" element={<SipCalculator />} />
              <Route path="/mutual-fund" element={<MutualFundCalculator />} />
              <Route path="/emi" element={<EmiCalculator />} />
              <Route path="/fd" element={<FdCalculator />} />
              <Route path="/real-estate" element={<RealEstateCalculator />} />
              <Route path="/capital-gains" element={<CapitalGainsCalculator />} />
              <Route path="/loan" element={<LoanCalculator />} />
              <Route path="/retirement" element={<RetirementCalculator />} />
              <Route path="/pf" element={<PfCalculator />} />
              <Route path="/salary" element={<SalaryCalculator />} />
            </Routes>
          </Container>
          <Footer /> {/* Add the Footer at the end */}
        </div>
      </Router>
    );
  }

  export default App;
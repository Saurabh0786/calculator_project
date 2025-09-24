import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

function Header() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="#">Financial Calculators</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <LinkContainer to="/">
              <Nav.Link>SIP</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/mutual-fund">
              <Nav.Link>Mutual Fund</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/emi">
              <Nav.Link>Home Loan / EMI</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/fd">
              <Nav.Link>Fixed Deposit</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/real-estate">
              <Nav.Link>Real Estate</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/capital-gains">
              <Nav.Link>Capital Gains</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/loan">
              <Nav.Link>Loan</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/retirement">
              <Nav.Link>Retirement</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/pf">
              <Nav.Link>PF Calculator</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/salary">
              <Nav.Link>Salary Calculator</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;

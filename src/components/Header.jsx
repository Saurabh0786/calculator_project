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
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;

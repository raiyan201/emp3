
import React from "react"

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

const NavbarMenu = () => {
  return (
    <div>
        {/* <Navbar expand="lg" className="bg-body bg-dark tertiary"> */}
        <Navbar  expand="lg" className=" text-light tertiary">

            <Container>

            <Navbar.Brand href="/">Home</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="department">Department</Nav.Link>
            <Nav.Link href="employee">Employee</Nav.Link>
          </Nav>

        </Navbar.Collapse>
            </Container>

        </Navbar>
      
    </div>
  )
}

export default NavbarMenu

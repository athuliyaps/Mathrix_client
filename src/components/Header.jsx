import React from 'react';
import { Button, Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const Header = ({insideExplore,insideLogout}) => {

const navigate = useNavigate('/register')

const logout =()=>{
  sessionStorage.clear()
  navigate('/register')
}


  return (
    <Navbar expand="lg" className="bg-primary-subtle text-white shadow">
      <Container>
        <Navbar.Brand href="#home" className="text-danger fw-bolder fs-1">
          <i className="fa-solid fa-plus-minus"></i>
        <Link to={'/'} style={{textDecoration:'none'}}>  <span className="ms-2 text-danger " >Mathrix</span></Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="border-light" />
        <Navbar.Collapse id="basic-navbar-nav">
       {
        insideExplore &&    <Nav className="mx-auto">
        <NavDropdown title={<span className="text-danger fw-bold">Explore</span>} id="basic-nav-dropdown">
          <NavDropdown.Item className="fw-bold text-danger" href="#join">
           <Link to={'/register'}>
           Sign in
           </Link>
          </NavDropdown.Item>
          <NavDropdown.Item className="fw-bold text-danger" href="#login">
           <Link to={'/register'}>
            Login
           </Link> 
          </NavDropdown.Item>
        </NavDropdown>
      </Nav>
       }
{
  insideLogout && <div className='ms-auto'>
         <Button  onClick={logout} className="ms-5"><i class="fa-solid fa-right-from-bracket"></i>Logout</Button>
  
</div> 
 }     
 </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;

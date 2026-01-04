import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = ({insideFooter}) => {
  return (
    <footer className="bg-primary-subtle text-dark py-4 shadow-lg">
      <Container>
        {
          insideFooter && <>
          <Row className="text-center">
          {/* About Section */}
          <Col md={4} className="mb-3">
            <h6 className="fw-bold text-warning">About</h6>
            <p className="text-dark">
              Mathrix is a Math community aiming to impart the essence of advanced Mathematics and inspire passionate learners with proper guidance. Our goal is to cultivate mathematical professionalism for those seeking a career in this classical science.
            </p>
          </Col>

          {/* Links Section */}
          <Col md={4} className="mb-3">
            <h6 className="fw-bold text-warning">Links</h6>
            <Link className="btn btn-outline-dark btn-sm m-1" to={'/register'}>Join Now</Link>
            <Link className="btn btn-outline-dark btn-sm m-1" to={'/register'}>Login</Link>
          </Col>

          {/* Social Media Section */}
          <Col md={4} className="mb-3">
            <h6 className="fw-bold text-warning">Network</h6>
            <div className="d-flex justify-content-center mt-3">
              <i className="fa-brands fa-instagram text-dark fs-4 mx-2"></i>
              <i className="fa-brands fa-x-twitter text-dark fs-4 mx-2"></i>
              <i className="fa-brands fa-youtube text-dark fs-4 mx-2"></i>
            </div>
          </Col>
        </Row>

        <hr className="border-dark-50" />
          </>
        }

        {/* Copyright & Policies */}
        
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-center">
          <p className="text-dark-50 mb-2 mb-md-0">© 2003-2025 Mathrix Inc. All rights reserved.</p>
          <div>
            <Link className="text-dark-50 me-3 text-decoration-none" to="#">Cookie Notice</Link>
            <Link className="text-dark-50 me-3 text-decoration-none" to="#">Privacy Policy</Link>
            <Link className="btn btn-warning text-dark btn-sm" to="#">Manage Preferences</Link>
            <Link className="text-dark-50 ms-3 text-decoration-none" to="#">General Policies</Link>
          </div>
        </div>
        
      </Container>
    </footer>
  );
};

export default Footer;

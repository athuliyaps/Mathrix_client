import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SplitText from '../animations/SplitText'
import landImg from '../assets/landImg.jpg'


const Landing = ({insieLogout}) => {

  const handleAnimationComplete = () => {
    console.log('All letters have animated!');
  };

  return (
    <>
      <Header insideExplore={true} />       
      <Container fluid className="bg-info-subtle text-dark min-vh-100 d-flex flex-column justify-content-center align-items-center p-0">
        {/* Image Section with Overlay Text */}
        <div className="position-relative w-100">
          <img
            src={landImg} alt="Mathematics Concept" className="img-fluid w-100"style={{ height: '100vh', objectFit: 'cover' }} // Adjust image height
          /> 
          {/* Overlay Content */}
          <div className="position-absolute top-50 start-50 translate-middle text-center text-light p-4 rounded" >
            {/* <p className="fw-bolder fs-1 text-warning">
              Welcome to <span className="text-danger fs-1">Mathrix</span>
            </p> */}


<SplitText
  text="Welcome to Mathrix"
  className="text-center text-light fw-bolder" 
  delay={150}
  animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
  animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
  easing="easeOutCubic"
  threshold={0.2}
  rootMargin="-50px"
  onLetterAnimationComplete={handleAnimationComplete}
/>

            <p className="fs-2 text-light">Let's unlock the Matrix of Mathematics</p>
            <Link to="/home">
              <Button variant="warning" size="lg" className="fw-bold">Explore</Button>
            </Link>
          </div>
        </div>
      </Container>
     
      <Footer insideFooter={true} />
    </>
  );
};

export default Landing;

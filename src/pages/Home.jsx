import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import BlurText from '../animations/BlurText';
import img5 from '../assets/img5.jpg'
import { FaStar } from 'react-icons/fa';
import { CiCircleCheck } from "react-icons/ci";
import { LuNotebookPen } from "react-icons/lu";
import { PiBookOpenTextBold } from "react-icons/pi";
import Header from '../components/Header';
import Footer from '../components/Footer'

const Home = () => {
  const handleAnimationComplete = () => {
    console.log('Animation completed!');
  };
  
  return (
   <>  
   <Header insideExplore={true}/>
        <div style={{
    backgroundImage: "url('https://static.vecteezy.com/system/resources/previews/009/913/741/non_2x/light-orange-template-with-math-simbols-vector.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  }}>
       <div className="min-vh-100 d-flex flex-column justify-content-center align-items-center p-4">
        {/* Hero Section */}
        <div className="text-center text-light mb-5">
          <p className="fw-bolder fs-1  mt-3">"Exploring the Infinite Frontiers of Mathematics"</p>
        </div>
  
        {/* create account Section */}
        <Container className=''>
        <Row className="g-4 align-items-center bg-danger-subtle py-8 px-3 border border-danger rounded">
    
         {/* Right Column - Account Creation */}
         <Col lg={6} className="d-flex flex-column justify-content-center text-center  border border-dark rounded p-4">
         {/* <h3 className="fw-bold fs-1  text-danger" style={{fontFamily:"Sriracha, serif"}}>Have an unsolved problem?</h3> */}

          <BlurText
          text="Have an unsolved problem?"
          delay={150}
          animateBy="words"
          direction="top"
          onAnimationComplete={handleAnimationComplete}
          className="fw-bold fs-1  text-danger mb-8"
          style={{fontFamily:"Sriracha, serif"}}
        />
        
        <div className="text-dark-emphasis border border-dark rounded shadow py-2 px-3 w-75 mx-auto bg-light">
        Get expert answers and clear your doubts instantly! 
        </div>
  
        <div className="text-dark-emphasis border border-dark rounded shadow py-2 px-3 w-75 mx-auto bg-light mt-2">
        Join the Mathrix community and start solving today!
        </div>
  
  
    
          <Link to="/register">
          <Button variant="danger" className="fw-bold text-light mt-3 px-4 py-2">Create Account</Button>
          </Link>
          <p className='text-danger mt-3'>OR</p>
          <Link to="/register">
          <Button variant="danger"  className="fw-bold text-light mt-1 px-4 py-2">Login</Button>
          </Link>
          </Col>
  
  
      {/* Left Column - Image */}
       <Col lg={6} className="d-flex justify-content-center">
        <Card className="shadow border-0 mb-3" style={{ width: '26rem', height: '30rem' }}>
        <Card.Img  variant="top"  className="border border-dark rounded h-100" src="https://i.pinimg.com/736x/83/1e/f8/831ef87537cce9900eb9a2c266063ac9.jpg" 
          style={{ objectFit: 'cover' }} 
        />
      </Card>
      </Col>
        </Row>
        </Container>
          <hr  className='w-75 ms-3 mt-5'/>
         
  
           {/* courseSection */}
           <div className='bg-danger-subtle  py-5 mt-2 border-danger rounded '>
            <Container className='w-100'>
          <Row className="  mt-5">
            {/* Left Column - Course Card */}
            <Col lg={6} className="d-flex justify-content-center ">
              <Card className="shadow border-0 position-relative" style={{ width: '35rem' }}>
              <div className='position-relative'>
                  <Card.Img variant="top"  src="https://miro.medium.com/v2/resize:fit:1400/1*DKBxItEBzRDm9I2Qe_S1vw.jpeg" />
                   {/* <Button variant="danger" className="fw-bold position-absolute start-50 translate-middle-x text-light mt-5 mb-0">Open Course</Button> */}
              </div>
              </Card>
            </Col>
            {/* Right Column - Additional Information */}
            <Col lg={6} className="d-flex flex-column justify-content-center text-center">
            <h3 className="fw-bold text-danger fs-3 " style={{fontFamily:"Sriracha, serif"}}>Why Choose Mathrix?</h3>
            <p className="text-dark">
              Unlock the power of advanced Mathematics with our structured learning programs.
               Get expert guidance, access high-quality resources, and join a thriving community of math enthusiasts.
            </p>
           <Button variant="danger" className="fw-bold text-light"> <Link to={'/courses'} className='text-decoration-none text-light'>Explore More </Link></Button>
            </Col>
          </Row>
          </Container>
          </div>
          <hr  className='w-75 mt-5'/>

        
        </div>
        </div>  

      {/* user advertisement */}
   <Row>
   <div className="d-flex align-items-center justify-content-between p-5 ">
      {/* Left Section - Image & Speech Bubble */}
     <Col lg={6}>
          <div className="position-relative">
            {/* Image */}
            <img
              src={img5}
              alt="User"
              className="rounded img-fluid ms-5"
              style={{ width: "300px", height: "300px", objectFit: "cover" }}
            />
    
            {/* Speech Bubble */}
            <div
              className="position-absolute top-0 start-50 translate-middle p-2 bg-danger-subtle border rounded shadow ms-5"
              style={{ width: "180px", fontSize: "14px" }}
            >
              <p className="mb-0 fw-bold">
                Which is the smallest non-abelian group?
              </p>
            </div>
    
            {/* Dashed Connector Line */}
            <div
              className="position-absolute start-50 translate-middle text-danger"
              style={{
                top: "60px",
                width: "2px",
                height: "50px",
                borderTop: "2px dashed gray",
              }}
            ></div>
    
            {/* Expert Answer Box */}
            <div
              className="position-absolute start-50 translate-middle-x p-2 rounded ms-5"
              style={{
                top: "90px",
                background: "rgba(255, 111, 0, 1)",
                color: "white",
                width: "180px",
              }}
            >
              <FaStar className="me-1" /> <b> Answer:</b>
              <p className="mb-0">The Symmetric group s<sub>3</sub></p>
            </div>
          </div>
     </Col>
     

      {/* Right Section - Main Content */}
    <Col lg={6}>
       
          <h4 className="fw-bold text-dark d-flex justify-center">
          Unlock your potential with Mathrix— 89% of users see a boost in their academic performance!
          </h4>
        
    </Col>
    </div>
   </Row>

   {/* last section */}

   <div className='bg bg-danger-subtle p-4 mt-2'>
    <Row className='d-flex justify-content-between align-items-center'>
      <Col lg={4} className='d-flex  justify-content-center align-items-center'>
      <CiCircleCheck  className='me-1 text-dark ' style={{fontSize:'50px'}}/>
      <p className='text-dark fw-semibold'>Solutions backed by verified <br /> experts</p>
      </Col>
      <Col lg={4} className='d-flex  justify-content-center align-items-center' >
      <LuNotebookPen className='me-1 text-dark ' style={{fontSize:'50px'}}  />
      <p className='text-dark fw-semibold' > Specialised tools to help master your goals</p>
      </Col>
      <Col lg={4} className='d-flex  justify-content-center align-items-center' >
      <PiBookOpenTextBold className='me-1 text-dark ' style={{fontSize:'50px'}} />
      <p className='text-dark fw-semibold' > Tailored the way you learn</p>
      </Col>
    </Row>
   </div>

   <div className='text-center'>
  <p>1.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea iusto iure enim molestias illo architecto mollitia consequatur pariatur atque tempore quas quia quod quo delectus excepturi, dolorem repellat nemo minima.</p>
  <p>2.Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias similique nesciunt assumenda quis vitae dolorem excepturi, magnam culpa, consectetur eos quia accusamus eaque.</p>
   </div>      
  <Footer insideFooter={true}/>     
   </>
  );
};

export default Home;

import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom"; 
import { Button, Container, Row, Col } from "react-bootstrap";
import { FaSmile } from "react-icons/fa";
import Header from "../components/Header";


const Result = ({insideLogout}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { score, total } = location.state || { score: 0, total: 10 };

  const passStatus = score > 5 ? "Pass" : "Fail";

  useEffect(()=>{
    if(passStatus === "Fail" && !sessionStorage.getItem("QuizStatus")){
      sessionStorage.setItem("quizAstatus","failed")
    }
      
  },[passStatus])

  return (
  <>
    <Header insideLogout={true} />
      <div className="bg-danger-subtle min-vh-100 d-flex align-items-center justify-content-center">
        <Container>
          <Row className="">
            <Col md={6} className="mx-auto text-center bg-danger-subtle rounded shadow-lg p-4">
              <div className="p-4 border rounded shadow-lg bg-light">
                <h1 className="fw-bold text-danger">Quiz Result</h1>
                <h2 className="my-4">Score: {score} / {total}</h2>
                <h3 className={passStatus === "Pass" ? "text-success fw-bolder" : "text-danger"}>
                  You {passStatus} the Quiz!
                  {
                    passStatus ==="Fail" && 
                  <div>
                     <h3 className="text-success">Don't Worry <FaSmile size={50} color="gold"/></h3>
                     <div> <Link to={'/dash'}><Button className="btn btn-danger">Retry the test</Button></Link></div>
                  </div>
                  }
                </h3>
  
                {passStatus === "Pass" && (
                  <div className="mt-4">
                    <h3>That's Good, Now you can add questions</h3>
                    <Button variant="success" onClick={() => navigate("/addPage")}>
                    Click here
                    </Button>
                    <hr />
                    <h4>Or</h4>
                    <h3>Lets get deep in Mathematics</h3>
                    <Button variant="secondary" onClick={() => navigate("/courses")}>
                    Explore More
                    </Button>
                  </div>
                )}
              </div>
            </Col>
          </Row>
        </Container>
      </div>
  </>
  );
};

export default Result;

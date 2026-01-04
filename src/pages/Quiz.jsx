import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Card, CardContent, Radio, RadioGroup, FormControlLabel, FormControl, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom"; // For navigation
import { quizResult } from "../services/allAPIs";

const quizQuestions = [
  { question: "What is the determinant of the identity matrix of order n?", options: ["0", "1", "n", "n!"], correctAnswer: "1" },
  { question: "Which of the following is an eigenvalue of a diagonal matrix?", options: ["0", "1", "Any diagonal element", "Trace of matrix"], correctAnswer: "Any diagonal element" },
  { question: "What is the Laplace transform of e^(-3t)?", options: ["1/s", "1/(s+3)", "s/(s+3)", "e^(-3s)"], correctAnswer: "1/(s+3)" },
  { question: "If f(x) is continuous on [a, b] and differentiable on (a, b), then which theorem guarantees that there exists c in (a, b) such that f'(c) = (f(b) - f(a)) / (b - a)?", options: ["Rolle's Theorem", "Mean Value Theorem", "Lagrange's Theorem", "Cauchy's Theorem"], correctAnswer: "Mean Value Theorem" },
  { question: "Which of the following is a necessary condition for a function to have a maximum or minimum?", options: ["Derivative is zero", "Derivative is positive", "Function is increasing", "Function is decreasing"], correctAnswer: "Derivative is zero" },
  { question: "What is the rank of a 3x3 matrix with two linearly dependent rows?", options: ["3", "2", "1", "0"], correctAnswer: "2" },
  { question: "Which space is a complete normed vector space?", options: ["Metric space", "Hilbert space", "Banach space", "Euclidean space"], correctAnswer: "Banach space" },
  { question: "Which of the following series converges?", options: ["Harmonic series", "Geometric series with ratio > 1", "Alternating series", "p-series with p > 1"], correctAnswer: "p-series with p > 1" },
  { question: "What is the Fourier series representation used for?", options: ["Solving differential equations", "Approximating periodic functions", "Finding eigenvalues", "Transforming matrices"], correctAnswer: "Approximating periodic functions" },
  { question: "What is the solution of the differential equation dy/dx = y?", options: ["y = x", "y = e^x", "y = Ce^x", "y = log(x)"], correctAnswer: "y = Ce^x" },
  { question: "In group theory, which group operation must be associative?", options: ["Addition", "Multiplication", "Both", "None"], correctAnswer: "Both" },
  { question: "What is the characteristic polynomial of a 2x2 matrix A with trace 5 and determinant 6?", options: ["x² - 5x + 6", "x² + 5x + 6", "x² - 6x + 5", "x² - x + 6"], correctAnswer: "x² - 5x + 6" },
  { question: "Which of the following is an example of a continuous but nowhere differentiable function?", options: ["x^2", "|x|", "sin(x)", "Weierstrass function"], correctAnswer: "Weierstrass function" },
  { question: "If A and B are two n×n matrices such that AB = BA = I, what can be said about A?", options: ["A is singular", "A is the zero matrix", "A is invertible", "A is a scalar matrix"], correctAnswer: "A is invertible" },
  { question: "Which of the following is NOT a valid inner product?", options: ["<f, g> = ∫ fg dx", "<f, g> = fg", "<f, g> = ∫ f'g' dx", "<f, g> = ∫ fg dμ"], correctAnswer: "<f, g> = fg" }
];

const getRandomQuestions = (questions, num) => {
  const shuffled = [...questions].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, num);
};

const Quiz = () => {
  const [quizData, setQuizData] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [answers, setAnswers] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const hasPassed = sessionStorage.getItem("hasPassed")
    console.log("hasPassed-----",hasPassed);
    
    if(hasPassed ==="true"){
      alert("You have already passed the quiz")
      navigate('/dash')
    }
    setQuizData(getRandomQuestions(quizQuestions, 10)); 
  }, []);

  if (quizData.length === 0) {
    return <div className="text-center mt-5">Loading questions...</div>;
  }

  const handleSaveAndNext = async () => {
    if (selectedAnswer) {
      setAnswers((prevAnswers) => ({
        ...prevAnswers,
        [currentQuestionIndex]: selectedAnswer,
      }));
      if (currentQuestionIndex < quizData.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedAnswer("");
      } else {
        const score = quizData.reduce((total, question, index) => {
          return total + (answers[index] === question.correctAnswer ? 1 : 0);
        }, selectedAnswer === quizData[currentQuestionIndex].correctAnswer ? 1 : 0); 
         await handleQuizCompletion(score);
      }
    }
  };


//   const handleQuizCompletion = async(score)=>{
//     try{
//       const store = sessionStorage.getItem("user")
//       const userId = JSON.parse(store)._id
//       const result = await quizResult(userId,score)
//       if(result.status===200){
//         const data = result.data
//         sessionStorage.setItem("hasPassed",data.hasPassed)
//         alert(data.hasPassed?"Quiz Passed!":"Quiz Failed.Try again!")
//         navigate("/dash")
//       }else{
//         console.error("Failed to update quiz result:", result.data);
//       alert("Something went wrong. Please try again.");

//       }
//     }catch (error) {
//       console.error("Error in quiz completion:", error);
//       alert("Error updating quiz result. Please try again.");
//   }
// }

// const handleSaveAndNext = async () => {
//   if (selectedAnswer) {
//     setAnswers((prevAnswers) => ({
//       ...prevAnswers,
//       [currentQuestionIndex]: selectedAnswer,
//     }));

//     if (currentQuestionIndex < quizData.length - 1) {
//       setCurrentQuestionIndex(currentQuestionIndex + 1);
//       setSelectedAnswer("");
//     } else {
//       // Calculate the final score
//       const finalScore = quizData.reduce((total, question, index) => {
//         return total + (answers[index] === question.correctAnswer ? 1 : 0);
//       }, selectedAnswer === quizData[currentQuestionIndex].correctAnswer ? 1 : 0);

//       // Submit to backend
//       await handleQuizCompletion(finalScore);
//     }
//   }
// };

const handleQuizCompletion = async (score) => {
  try {
    const store = sessionStorage.getItem("user");
    const user = JSON.parse(store);
    const token = sessionStorage.getItem("token");
    
    const result = await quizResult(user._id, score, token);
    
    if (result.status === 200) {
      const data = result.data;
      sessionStorage.setItem("hasPassed", data.hasPassed);
      sessionStorage.setItem("quizScore", score);
      
      navigate("/result", { 
        state: { 
          score, 
          total: quizData.length,
          hasPassed: data.hasPassed 
        } 
      });
    } else {
      console.error("Failed to update quiz result:", result.data);
      alert("Something went wrong. Please try again.");
    }
  } catch (error) {
    console.error("Error in quiz completion:", error);
    alert("Error updating quiz result. Please try again.");
  }
};

  return (
    <div className="bg-danger-subtle min-vh-100 d-flex align-items-center justify-content-center">
      <Container>
        <Row className="w-100">
          <Col md={8} className="mx-auto">
            <Card className="border border-danger rounded shadow-lg p-4">
              <CardContent>
                <Typography variant="h5" className="fw-bold mb-3 text-center text-danger">
                  Question {currentQuestionIndex + 1} / {quizData.length}
                </Typography>
                <Typography variant="h6" className="mb-4">
                  {quizData[currentQuestionIndex].question}
                </Typography>

                <FormControl component="fieldset">
                  <RadioGroup
                    value={selectedAnswer}
                    onChange={(e) => setSelectedAnswer(e.target.value)}
                  >
                    {quizData[currentQuestionIndex].options.map((option, index) => (
                      <FormControlLabel key={index} value={option} control={<Radio />} label={option} />
                    ))}
                  </RadioGroup>
                </FormControl>

                <div className="d-flex justify-content-end mt-4">
                  <Button
                    variant="outline-primary"
                    onClick={handleSaveAndNext}
                    disabled={!selectedAnswer} 
                  >
                    Save and Next
                  </Button>
                </div>
              </CardContent>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Quiz;

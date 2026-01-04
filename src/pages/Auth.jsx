import React, { useEffect, useState } from 'react';
import { Row, Col, Spinner, Button } from 'react-bootstrap';
import { Box, Divider, TextField, Typography } from '@mui/material';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { loginAPI, registerAPI } from '../services/allAPIs';
import { Link, useNavigate } from 'react-router-dom';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true); 
  const [loggedin, setLoggedin] = useState(false);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [inputData, setInputData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  useEffect(() => {
    const user = sessionStorage.getItem('user');
    const token = sessionStorage.getItem('token');
    if (user && token) {
      setLoggedin(true);
      navigate('/dash');
    } else {
      setLoggedin(false);
    }
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoginData({ email: '', password: '' }); 
    console.log('Inside register handler');

    if (inputData.username && inputData.email && inputData.password) {
      try {
        const result = await registerAPI(inputData);
        console.log(result);

        if (result?.status === 200) {
          alert(`User registered successfully. Welcome ${result.data.username}! Login to continue Mathrix.`);
          setInputData({ username: '', email: '', password: '' });
        } else {
          alert(result?.data?.error || 'User registration failed.');
        }
      } catch (err) {
        console.log(err);
        alert('User registration failed. Try again.');
      }
    } else {
      alert('Please fill the form completely to explore Mathrix.');
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (loginData.email && loginData.password) {
      try {
        const result = await loginAPI(loginData);
        console.log('Login result:', result);
        console.log("Token from result:", result?.data?.token); 
        if (result?.status === 200) {
          sessionStorage.setItem('user', JSON.stringify(result.data.user));
          sessionStorage.setItem('token', result.data.token);
          sessionStorage.setItem('hasPassed', result.data.hasPassed.toString());
          console.log('Token stored in sessionStorage:', sessionStorage.getItem('token'));
          console.log('Login result:', result);
          console.log('Token from result:', result?.data?.token);
           console.log("hasPassed", result.data?.hasPassed);
          
          setLoggedin(true);
        

          navigate('/dash');
        } else {
          alert(result?.data?.error || 'Login failed.');
        }
      } catch (err) {
        console.log(err);
        alert('Login failed. Please try again.');
      }
    } else {
      alert('Please fill the login completely.');
    }
  };

  return (
    <>
      <Header insideLogout={false} />
      <Row className="vh-100 position-relative">
        {/* Background Image */}
        <div
          className="w-100 h-100 position-absolute"
          style={{
            backgroundImage: `url('https://png.pngtree.com/thumb_back/fw800/background/20230714/pngtree-unlocking-knowledge-3d-books-and-key-on-vibrant-orange-background-image_3859381.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        ></div>

        {/* Text Overlay */}
        <div
          className="position-absolute top-25 mt-5 start-50 translate-right bg-light p-4 border border-danger rounded shadow"
          style={{ maxWidth: '27%', zIndex: 10, backgroundColor: 'rgba(255, 255, 255, 0.8)' }}
        >
          <h2 className="fw-bolder fs-1 text-center text-danger">Mathrix</h2>
          <p className="text-center text-dark fw-bold mb-2">Welcome</p>

          {isLogin ? (
            <>
              <p className="text-center text-dark fw-bold mb-2">Sign in to your Mathrix account</p>
              <TextField
                value={loginData.email}
                onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                label="Email Address"
                type="email"
                className="mt-3"
                variant="outlined"
                fullWidth
                required
              />
              <TextField
                value={loginData.password}
                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                label="Password"
                className="mt-3"
                type="password"
                variant="outlined"
                fullWidth
                required
              />

              <div onClick={handleLogin} className="text-center">
                <button className="btn btn-danger mt-3 px-5 fw-bolder">
                  {loggedin && (
                    <Spinner
                      className="me-3"
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                  )}
                  Continue
                </button>
              </div>
              <p className="text-center text-dark mt-3">
                Don't have an account?{' '}
                <span
                  className="text-danger fw-bold ms-2"
                  onClick={() => setIsLogin(false)}
                  style={{ cursor: 'pointer' }}
                >
                  Sign up
                </span>
              </p>
            </>
          ) : (
            <>
              <TextField
                value={inputData.username}
                onChange={(e) => setInputData({ ...inputData, username: e.target.value })}
                label="Username"
                className="mt-3"
                type="text"
                variant="outlined"
                fullWidth
                required
              />
              <TextField
                value={inputData.email}
                onChange={(e) => setInputData({ ...inputData, email: e.target.value })}
                label="Email Address"
                type="email"
                variant="outlined"
                fullWidth
                required
                className="mt-3"
              />
              <TextField
                value={inputData.password}
                onChange={(e) => setInputData({ ...inputData, password: e.target.value })}
                label="Password"
                className="mt-3"
                type="password"
                variant="outlined"
                fullWidth
                required
              />
              <div className="text-center">
                <button onClick={handleRegister} className="btn btn-danger mt-3 px-5 fw-bolder">
                  Sign up
                </button>
              </div>
              <p className="text-center text-dark mt-3">
                Already have an account?{' '}
                <span
                  className="text-danger fw-bold ms-2"
                  onClick={() => setIsLogin(true)}
                  style={{ cursor: 'pointer' }}
                >
                  Sign in
                </span>
              </p>
            </>
          )}
        </div>

        {/* Left Section - Quiz Details */}
        <Col md={6} className="text-white text-center p-5" style={{ zIndex: 10 }}>
          <h1 className="fw-bold display-4">Mathrix Quiz</h1>
          <p className="fs-5">
            Challenge yourself with a variety of math problems and test your skills!  
            Participate in quizzes, track your progress, and <span className='text-dark fw-bold'>only you can upload unsolved questions.</span>
          </p>
          <ul className="list-unstyled">
            <li className='fw-bold'>✅ 10 Random Questions</li>
            <li className='fw-bold'>✅ Multiple Choice questions</li>
            <li className='fw-bold'>✅ If you score 5 out of 10, then only you can upload unsolved questions</li>
          </ul>
        </Col>
      </Row>
      <Link to={'/home' } className='position-absolute top-0 start-0 m-3 text-decoration-none'>
      <Button>Back</Button>
      </Link>
      <Footer />
    </>
  );
};

export default Auth;

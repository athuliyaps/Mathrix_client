import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import dashImg from '../assets/dashImg.jpg'
import { Button } from 'react-bootstrap'
import { Link, useLocation, useNavigate } from 'react-router-dom'



const DashBoard = () => {
  const [username,setUsername] = useState("")
    const [quizStatus,setQuizStatus] = useState("start") //default as start quiz
    const navigate = useNavigate()

    // useEffect(() => {
    //   const user = JSON.parse(sessionStorage.getItem('user'));
    //   // const hasPasses = sessionStorage.getItem('hasPassed');
    //   // console.log("hasPassed from sessionStorage:", hasPasses);
    //   if (user) {
    //     setUsername(user.username.split(" ")[0]);
    //     if (user.hasPassedQuiz === true || user.hasPassedQuiz === "true") {
    //       setQuizStatus("Passed");
    //       navigate('/addPage')
    //     } else {
    //       setQuizStatus("start");
    //     }
    //   } else {
    //     setUsername("");
    //   }
    // }, []);
    

    useEffect(() => {
  const user = JSON.parse(sessionStorage.getItem('user') || '{}');
  const hasPassedStorage = sessionStorage.getItem('hasPassed');
  
  console.log("🧪 Full user object:", user);           // Debug
  console.log("🧪 sessionStorage hasPassed:", hasPassedStorage); // Debug
  
  if (user && user.username) {
    setUsername(user.username.split(" ")[0]);
    
    // ✅ FIX 1: Check CORRECT field name + sessionStorage
    if (user.hasPassed === true || 
        hasPassedStorage === 'true' || 
        user.hasPassed === 'true') {
      setQuizStatus("Passed");
      navigate('/addPage');  // Auto redirect ✅
    } else {
      setQuizStatus("start");
    }
  } else {
    navigate('/auth');
  }
}, [navigate]); // ✅ Add navigate as dependency

    console.log("Quiz status in Dashboard",quizStatus);
    


 const handleNavigateCourses =()=>{
  navigate('/courses')
 }

 const handleNavigateAddPage =()=>{
  navigate('/addPage')
 }


  return (
    <>
   <div  style={{backgroundImage: `url(${dashImg})`, backgroundSize: 'cover', height: '100vh'}}>
      <Header insideLogout={true} />
      <div className='container mt-5'>
        <div className='d-flex justify-content-center align-items-center'>  
         <div>
            <h1 className='fw-bolder fs-1 mt-4 text-primary'>Welcome <span className='text-light'>  {username} ,</span></h1>
            <p className='fw-bold text-light fs-3'>To be a part of Mathrix problem solvers you have to pass the test</p>
            <p className='fw-bold text-light fs-3'>OR</p>
            <p className='fw-bold text-light fs-3'> Do you want to learn higher Topics in Mathematics</p>

            <ul className="list-unstyled text-light mt-3">
                <li className='fw-bold'>✅ Total Questions: 10 </li>
                <li className='fw-bold'>✅ Time Limit: 10 minutes </li>
                <li className='fw-bold'>✅ Question Type: Multiple Choice Questions (MCQs) </li>
                <li className='fw-bold'>✅ Passing Criteria: </li>
                <li className='fw-bold ' style={{ listStyleType: 'disc', display: 'list-item', marginLeft: '20px' }}> You must score at least 5 out of 10 to qualify.
                </li>
                <li className='fw-bold'  style={{ listStyleType: 'disc', display: 'list-item', marginLeft: '20px' }}> If you pass, you will gain access to upload and discuss unsolved questions with the community, and can explore Mathematics </li>
                <li className='fw-bold'  style={{ listStyleType: 'disc', display: 'list-item', marginLeft: '20px' }}> If you fail, Don't worry , you still have chance to attend it. </li>
              </ul>
            
            {
              quizStatus === "Passed" ?(
                <div className='d-flex flex-column gap-3'> 
                <Button  className='fw-bold'>You alread Passed the quiz, you no longer need to attend it</Button>
                <Button onClick={handleNavigateAddPage} className='fw-bold'>Let's solve some Problems</Button>
                <Button onClick={handleNavigateCourses} className='fw-bold'> Explore Mathematics</Button>
                </div>
              ):
              (
                <Link to={'/quiz'}>
                   <Button variant='danger'  className='fw-bold w-75 mt-2'>{quizStatus ==="retry"? "Retry Quiz" : "Start Quiz"}</Button>
                   </Link>

              )
            }
              
                
         </div>
        </div>
      </div>
   </div>
    </>
  )
}

export default DashBoard

import React, { useEffect, useState } from 'react';
import AddComment from './AddComment';
import { Box, Typography, Button, Card, CardContent } from '@mui/material';
import Footer from '../components/Footer';
import { addAPI, deleteQuestionAPI, getAPI } from '../services/allAPIs';
import { Modal } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import addPage from '../assets/addPage.png'

const AddQuestion = ({insideLogout}) => {
    const [questions, setAddQuestions] = useState({ question: '' });
    const [questionList, setQuestionList] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();
    
    const showModal = new URLSearchParams(location.search).get('modal') === 'true';
    const handleClose = () =>{
        navigate('/addPage'); 
        setAddQuestions({question: ''}); 
    }
    const handleShow = () => navigate('/addPage?modal=true');  

    const userId = sessionStorage.getItem("userId");
    const token = sessionStorage.getItem("token");
    console.log("Token inside AddQuestion:", token); 
    

    useEffect(() => {
        fetchQuestions();
    }, []);

    const fetchQuestions = async () => {
        try {
            if(!token){
                alert("Unthorized!Please log in again")
                navigate("/register")
                return; 
            }
            const result = await getAPI(token);
            if (result && result.data) {
                setQuestionList(result.data);
            } else {
                setQuestionList([]);
            }
        } catch (error) {
            console.error("Error fetching questions:", error);
            setQuestionList([]);
        }
    };


    const handleAddQuestion = async ()=>{
        try{
        const result = await addAPI({question:questions.question},token)
        if(result.status ==200){
            alert("Question added successfully")
            fetchQuestions()
            setAddQuestions({question:''})
            handleClose()
        }else{
            alert("Failed to add question")
            
        }
        }catch(err){
            console.log("Error adding question:",err);
            
        }
    }

     const handleDeleteQuestion = async(id)=>{
       try{
         const result = await deleteQuestionAPI(id,{headers:{Authorization:`Bearer ${token}`}})
         if(result.status==200){
           alert("Deleted succesfully")
           fetchQuestions()  
         }else{
           alert("Failed to delete")
         }
       }catch(err){
         console.log(err);   
       }
     }


    return (
        <>
          <div >
                <Header insideLogout={true} />

                <div >

                    <Box sx={{ minHeight: '100vh', padding: 3 }} className='bg bg-danger-subtle' style={{backgroundImage: `url(${addPage})`, backgroundSize: 'cover', backgroundRepeat:'no-repeat',backgroundPosition:'center', minHeight: '100vh'}}>
                        <Typography variant='h3' textAlign='center' className='text-light fw-bolder mt-5'>
                            Expert Question Portal
                        </Typography>
        
                        {/* Add Question Button */}
                        <div className='text-center mt-5' >
                            <Button variant='contained'  className='btn btn-primary rounded shadow border success text-light w-50' onClick={handleShow}>
                               Ask Here <i class="fa-solid fa-plus ms-3"></i>
                            </Button>
                        </div>
        
                        {/* Modal for Adding Question */}
                        <Modal show={showModal} onHide={handleClose} backdrop="static" keyboard={false}>
                            <Modal.Header closeButton className='d-flex justify-content-center'>
                                <Modal.Title className='text-info'>Add a New Question</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter your question"
                                    onChange={(e) => setAddQuestions({ question: e.target.value })}
                                    value={questions.question}
                                />
                            </Modal.Body>
                            <Modal.Footer>
                                <Button className='btn btn-success' variant="secondary" onClick={handleClose}>
                                    Close
                                </Button>
                                <Button onClick={handleAddQuestion} className='btn btn-danger' variant="primary">Submit Question</Button>
                            </Modal.Footer>
                        </Modal>
        
                        {/* Display Uploaded Questions */}
                        { 
                           questionList.length >0 ? (
                          questionList.map((item) => (
                            <Card key={item._id} sx={{ maxWidth: 600, margin: '20px auto', padding: 2, boxShadow: 3 }}>
                                <CardContent >
                                   <div className='d-flex justify-content-between'>
                                        <Typography variant="h6">{item.question}</Typography>
                                        <Button variant='secondary'  onClick={handleDeleteQuestion} className='btn border rounded'>  <i class="fa-solid fa-trash"></i></Button>
                                   </div>
        
                                     <div><AddComment questionId={item._id}/></div>
                                </CardContent>
                            </Card>
                          ))
                        ):(
                            <Card sx={{ maxWidth: 600, margin: '20px auto', padding: 2, boxShadow: 3 }}>
                                <CardContent >
                                    <Typography variant="h6" className='text-center'>No Questions Available</Typography>
                                </CardContent>
                            </Card>
                       
                    
                        )}
                         
                    </Box>
    
               </div>
                <Footer />
            </div>
        
        </>
    );
};

export default AddQuestion;


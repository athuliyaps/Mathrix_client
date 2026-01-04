import React, { useEffect, useState } from 'react'
import { Button, Typography,Card,CardContent,Box} from '@mui/material'
import { Modal } from 'react-bootstrap'
import {  useNavigate } from 'react-router-dom'
import { addCommentAPI, deleteCommentAPI, editCommentAPI, getCommentAPI } from '../services/allAPIs'


const token = sessionStorage.getItem("token");
            console.log("token",token);

const AddComment = ({ questionId }) => {
    const [comments, setAddComments] = useState({ comment: '' });
    const [commentList, setCommentList] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editcomment, setEditComments] = useState({ comment: '' });


    useEffect(() => {
        if(questionId){
            fetchComments();
        }
        }, [questionId]); 
        
           
            
        

    const handleAddComment = async () => {
      if(!token){
        alert("Please login to add comment")
        return;
      }
        try {
            const result = await addCommentAPI({ comment: comments.comment, questionId }, token);
            console.log("result",result);
            
            if (result.status === 200) {
                alert("Comment added successfully");
                setAddComments({ comment: '' });
                fetchComments(); 
                setShowModal(false);
            }else{
                alert("Failed to add comment")
            }
        } catch (err) {
            console.error("Error adding comment:", err);
        }
    };

    const fetchComments = async () => {
        try {
            const result = await getCommentAPI(questionId, token); 
            if (result && result.data) {
                setCommentList(result.data);
            } else {
                setCommentList([]);
            }
        } catch (error) {
            console.error("Error fetching comments:", error);
            setCommentList([]);
        }
    };

    const handleEditModal = (comment) => {
      console.log(comment);
        setEditComments({id:comment._id,comment:comment.comment});
        setShowEditModal(true);
    }

    const handleEditComment = async()=>{
      try{
        const result = await editCommentAPI(editcomment.id,{comment:editcomment.comment},token)
        if(result.status==200){
          console.log(result.data);
          alert("Updated sucessfully")
          fetchComments()
          setShowEditModal(false)
        }else{
     alert("failed to update")
        }

      }catch(err){
        console.log(err);
        
      }
    }

    const handleDeleteComment = async(id)=>{
      try{
        const result = await deleteCommentAPI(id,token)
        if(result.status==200){
          alert("Deleted succesfully")
          fetchComments()
        }else{
          alert("Failed to delete")
        }
      }catch(err){
        console.log(err);   
      }
    }
    return (
        <>
            <Button onClick={() => setShowModal(true)}  size="small" sx={{ mt: 1 }}>
            <i class="fa-solid fa-comment fs-3 me-3"></i> comment
            </Button>

            <Modal show={showModal} onHide={() => setShowModal(false)} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title className='text-primary fw-bolder'>Add Solutions</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter comment"
                        value={comments.comment}
                        onChange={(e) => setAddComments({ comment: e.target.value })}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="variant" className='mb-3 btn-info' onClick={() => setShowModal(false)}>
                        Close
                    </Button>
                    <Button onClick={handleAddComment} className="btn btn-danger mb-3 ms-2">
                        Comment
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showEditModal} onHide={() => setShowEditModal(false)} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Comment</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter comment"
                        value={editcomment.comment}
                        onChange={(e) => setEditComments({ ...editcomment, comment: e.target.value })}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" className='btn btn-danger border rounded danger me-2' onClick={() => setShowEditModal(false)}>
                        Close
                    </Button>
                    <Button onClick={handleEditComment} className="btn btn-primary  border rounded primary">save changes</Button>
                    </Modal.Footer>
            </Modal>

                       
            <div className='mb-3'></div>
             <div>
   {commentList.map((comment) => (
    <Card 
      key={comment._id} 
      sx={{ mb: 2, boxShadow: 2, borderRadius: 2 }}
    >
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box>
            <Typography variant="body1" gutterBottom>
              {comment.comment}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              - <strong>{comment.userId?.username || "Anonymous"}</strong>
            </Typography>
          </Box>
          <Box>
           
              <Button 
               className='text-info'
                color="primary" 
                size="small" 
                onClick={() => handleEditModal(comment)}
                sx={{ mr: 1 }}
              >
                 <i class="fa-solid fa-pen-to-square"></i>
              </Button>
            <Button 
               className='text-danger'
              color="error" 
              size="small"
              onClick={() => handleDeleteComment(comment._id)}
            >
              <i class="fa-solid fa-trash"></i>
            
            </Button>
          </Box>
        </Box>
      </CardContent>
    </Card>
  ))}
</div>
        </>
    );
};

export default AddComment
import React from 'react'
import { Button, Card, ListGroup } from 'react-bootstrap'


const courseCard = ({course,onShowModal}) => {
  return (
    <>
<Card className='mt-3 text-center' style={{ width: '25rem' }}  >
             <Card.Img variant="top" style={{width:'100%' , height:'200px',objectFit:'cover'}} src={course.image} />
             <Card.Body>
               <Card.Title className='text-dark fw-bold fs-5'> {course.title}</Card.Title>
               <Card.Text className='text-dark fw-bold'>
                 {course.description}
               </Card.Text>
             </Card.Body>
             <ListGroup className="list-group-flush">
               <ListGroup.Item><span className='text-dark fw-bold'>Duration :</span> {course.duration}</ListGroup.Item>
               <ListGroup.Item><span className='text-dark fw-bold'>Level :</span>  {course.level}</ListGroup.Item>
             </ListGroup>
             <Card.Body>
               <Card.Link className='text-danger' href={course.url}>Click here </Card.Link>
               <Button variant='danger' className='mt-2 ms-5' onClick={() => onShowModal(course)}>Get Certificate</Button>
             </Card.Body>
  </Card>
    </>
  )
}

export default courseCard

import React, { useState } from 'react'
import { Button, Card, Form, ListGroup, Modal } from 'react-bootstrap'
import Header from '../components/Header'
import Footer from '../components/Footer'
import CourseList from './courseList'
import CourseCertificate from './courseCertificate'
import jsPDF from 'jspdf'
import courseImg from '../assets/course.jpg'




const AddCourse = ({insideLogout}) => {
const [search,setSearch] = useState('')
const [currentPage,setCurrentPage] = useState(1)
const [showModal, setShowModal] = useState(false);
const [selectedCourse, setSelectedCourse] = useState(null);
const [participantName, setParticipantName] = useState('');
const [collegeName, setCollegeName] = useState('');

 const courses =[{
  id:1,
  title:"Algebra of Mathematics",
  description:"Introduction to algebra PG sem 1",
  duration:"2 weeks, 5 hr/day",
  level:"Intermediate",
  url:"https://www.youtube.com/watch?v=zAdfEvN0QhU&list=PLe6e1xuTdeSxlva89VrHd3icUZJsp3QVM",
  image:"https://m.media-amazon.com/images/I/71SERROqFPL.jpg"
 },{
 id:2,
  title:"Ring Theory",
  description:"Introduction to Ring theory",
  duration:"3 weeks, 4 hr/day",
  level:"Intermedite-advanced",
  url:"https://www.youtube.com/watch?v=ReTzwwEN_Do&list=PL8D5taFfp6CxkdMqjByPnj1qCf6yCwYwR",
  image:"https://d502jbuhuh9wk.cloudfront.net/courses/657b4356e4b01987703172a6/657b4356e4b01987703172a6_scaled_cover.jpg?v=1"
 },{
 id:3,
  title:"Real Analysis",
  description:"Introduction to Real Analysis",
  duration:"4 weeks, 5 hr/day",
  level:"Intermediate",
  url:"https://www.youtube.com/watch?v=4UxpJBmFZmE&list=PLAKz2M2GzlkTmeNUmL_xxs49JrhVPVR_t",
  image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSudWJ_yQ9f32d1JbmJh6DLBv8QwK7DtwBYVg&s"
 },{
  id:4,
   title:"Principles of Mathematical analysis",
   description:"A go through entire real analysis",
   duration:"6 weeks, 4hr/day",
   level:"Advanced",
   url:"https://www.youtube.com/watch?v=8hJYD_NcOGQ&list=PLun8-Z_lTkC5HAjzXCLEx0gQkJZD4uCtJ",
   image:"https://measure.axler.net/MIRAcover.png"
  },{
  id:5,
    title:"Matrices",
    description:"Introduction to Matrices and its applications -Algebra for Engineers",
    duration:"4 weeks, 5 hr/day",
    level:"Begginer",
    url:"https://www.youtube.com/watch?v=pfN1_rrEEuw&list=PLhSp9OSVmeyIVQpCt2kwsC1dNVl1GwlVn",
    image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRynYMEOp0zJCSB7bHwrcR8VlsZbiw1hCctQw&s"
  },{
  id:6,
    title:"Linear Algebra",
    description:"Introduction to Linear Algebra from Kenneth Hoffman text ",
    duration:"3 weeks, 8hr/day",
    level:"Intermediate",
    url:"https://www.youtube.com/watch?v=iSABQePItDU&list=PLlLFP5aO-s4w--JLqahAJCL5E6YDHOXiS",
    image:"https://media.licdn.com/dms/image/v2/D5610AQHSyQFKdenm6A/image-shrink_800/image-shrink_800/0/1717507862071?e=2147483647&v=beta&t=ryDWwVZaHl51ChYpX-U3mKyoTcGRiRFYhx3PLh2vptk"
 },{
  id:7,
    title:"Inner Product Space",
    description:"A study of inner product spaces - Theory and applications ",
    duration:"2 weeks, 8hr/day",
    level:"Advanced",
    url:"https://www.youtube.com/watch?v=iSABQePItDU&list=PLlLFP5aO-s4w--JLqahAJCL5E6YDHOXiS",
    image:"https://d3f1iyfxxz8i1e.cloudfront.net/courses/course_image/f70002df570f.jpg"
}, {
  id:8,
  title:"Complex analysis",
  description:"Introduction to complex analysis by Brown and Churchill ",
  duration:"4 weeks, 6hr/day",
  level:"Intermediate",
  url:"https://www.youtube.com/watch?v=pNREo5l3_7c&list=PL9AzxofEGgJOLSOqAc_S6RItQljs8Pp-_",
  image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_fqDnzEbCL2_-SCnpD6vRhle4nGsp5DqILw&s"
}, {
  id:9,
  title:"Calculus",
  description:"Introduction to calculus - one and severable variables  ",
  duration:"3 weeks, 8hr/day",
  level:"Intermediate",
  url:"https://www.youtube.com/watch?v=WsQQvHm4lSw",
  image:"https://media.springernature.com/full/springer-static/cover-hires/book/978-1-4614-7946-8"
},{
id:10,
  title:"Differentail Equations",
  description:"Ordinary and Partial Differential equations ",
  duration:"9 weeks, 3hr/day",
  level:"Intermediate-Advanced",
  url:"https://www.youtube.com/watch?v=Kk5SEzASkZU&list=PLLy_2iUCG87CX7wprwaVnYbVce1ftGlDV",
  image:"https://rukminim1.flixcart.com/image/300/300/xif0q/regionalbooks/s/5/w/ordinary-and-partial-differential-equations-20th-edition-by-m-d-original-imaggc3myg3tnxxz.jpeg"
}]

const handleShowModal = (course)=>{
  setSelectedCourse(course)
  setShowModal(true)
}

const handleCloseModal = ()=>{
  setShowModal(false)
  setParticipantName("")
  setCollegeName("")
  
}

const filteredCourse = courses.filter(course=>course.title.toLowerCase().includes(search.toLowerCase()))

const coursesperpage = 3
const indexOfLastCourse = currentPage * coursesperpage
const indexOfFirstCourse = indexOfLastCourse - coursesperpage
const currentCourses = filteredCourse.slice(indexOfFirstCourse,indexOfLastCourse)
const totalPages = Math.ceil(filteredCourse.length/coursesperpage) 

const handleGenerateCertificate = ()=>{
  const doc = new jsPDF()
 doc.setTextColor(255, 87, 34);

 doc.setFontSize(26);
 doc.setFont("helvetica", "bold");
 doc.text("± Mathrix", 80, 30); 

 doc.setFontSize(22);
 doc.text("Certificate of Completion", 60, 45); 

 doc.setTextColor(0, 0, 0);
 doc.setFontSize(16);

 const startY = 70;
 const paragraphStart = `This is to certify that `;
 doc.setFont("times", "normal");
 doc.text(paragraphStart, 30, startY);

 doc.setFont("times", "italic");
 doc.text(`${participantName}`, doc.getTextWidth(paragraphStart) + 30, startY);

 const afterName = ` from `;
 doc.setFont("times", "normal");
 doc.text(afterName, doc.getTextWidth(paragraphStart + participantName) + 30, startY);

 doc.setFont("times", "italic");
 doc.text(`${collegeName}`, doc.getTextWidth(paragraphStart + participantName + afterName) + 30, startY);

 const middleText = ` has successfully completed the course `;
 doc.setFont("times", "normal");
 doc.text(middleText, doc.getTextWidth(paragraphStart + participantName + afterName + collegeName) + 30, startY);

 doc.setFont("times", "italic");
 const courseText = `"${selectedCourse.title}"`;
 doc.text(courseText, doc.getTextWidth(paragraphStart + participantName + afterName + collegeName + middleText) + 30, startY);

 doc.setFont("times", "normal");
 const endText = `.`;
 doc.text(endText, doc.getTextWidth(paragraphStart + participantName + afterName + collegeName + middleText + courseText) + 30, startY);

 doc.setFontSize(14);
 doc.text(`Date: ${new Date().toLocaleDateString()}`, 30, startY + 20);


  doc.save(`${participantName}-certificate.pdf`)
  handleCloseModal()
}


  return (
    <>
     <div className=" bg-danger-subtle" style={{backgroundImage:`url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOb5Iv25fMMdLIZAPDgr2hHEoKB9-KulGJfSInp0DCrpX8eR2BvyH1llN6CprGh4Z4HEU&usqp=CAU)`, backgroundSize: 'cover',backgroundPosition: 'center', backgroundRepeat: 'no-repeat', minHeight: '100vh'}}>
    <Header insideLogout={true}/>
     
  <h2 className="text-center text-danger fw-bold mt-5">
  Master the Fundamentals of Algebra and Discover New Mathematical Insights
  </h2>
  
  <CourseList courses={courses}
          search={search}
          setSearch={setSearch}
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
          onShowModal={handleShowModal} />
          
    <CourseCertificate  showModal={showModal}
          handleClose={handleCloseModal}
          participantName={participantName}
          setParticipantName={setParticipantName}
          collegeName={collegeName}
          setCollegeName={setCollegeName}
          handleGenerateCertificate={handleGenerateCertificate}
          />

 <div className='mb-3'></div>



{/* pagination control */}
{/* <div className="d-flex justify-content-center align-items-center mt-4">
  <Button variant="success" className='me-2 text-dark'  disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}
  > Previous
  </Button>
  <span className='text-dark'>Page {currentPage} of {totalPages}</span>
  
  <Button variant="success"  className='ms-2 text-dark' disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}
  >
    Next
  </Button>
</div> */}

{/* Modal for certificate */}
{/* <Modal show={showModal} onHide={handleCloseModal}>
  <Modal.Header closeButton>
    <Modal.Title>Enter Participant Details</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <Form>
      <Form.Group controlId="participantName">
        <Form.Label>Name</Form.Label>
        <Form.Control  type="text" value={participantName} onChange={(e) => setParticipantName(e.target.value)}  placeholder="Enter your name" />
      </Form.Group>
      <Form.Group controlId="collegeName" className="mt-3">
        <Form.Label>College</Form.Label>
        <Form.Control type="text"  value={collegeName} onChange={(e) => setCollegeName(e.target.value)}  placeholder="Enter college name" />
      </Form.Group>
    </Form>
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" >Close</Button>
    <Button   variant="danger"  disabled={!participantName || !collegeName} >
      Generate Certificate
    </Button>
  </Modal.Footer>
</Modal> */}

{/* <div className='mt-3 mb-3'></div> */}
{/* end */}
<Footer/>
</div>


    </>
  )
}

export default AddCourse

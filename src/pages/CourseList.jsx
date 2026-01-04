import React from 'react'
import CourseCard from './CourseCard'
import { Button } from 'react-bootstrap'


const CourseList = ({courses, search, setSearch, currentPage, totalPages, setCurrentPage, onShowModal }) =>{

  const filteredCourse = courses.filter(course => course.title.toLowerCase().includes(search.toLowerCase()));
  
  // Filtered & paginated
  const  coursesPerPage = 3;
  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = filteredCourse.slice(indexOfFirstCourse, indexOfLastCourse);


  return (
    <>
    <div>
      {/* Search */}
      <div className='d-flex justify-content-center align-items-center mb-4'>
        <input onChange={(e) => setSearch(e.target.value)} value={search} type='text' placeholder='Search courses...' className='form-control mt-3 w-25' />
      </div>

      {/* Courses Grid */}
      <div className='row'>
        {currentCourses.map((course) => (
          <div className='col-4 mb-4' key={course.id}>
            <CourseCard course={course} onShowModal={onShowModal} />
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="d-flex justify-content-center align-items-center mt-4">
        <Button variant="success" className='me-2 text-dark' disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}> Previous </Button>
        <span className='text-dark'>Page {currentPage} of {totalPages}</span>
        <Button variant="success" className='ms-2 text-dark' disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}> Next </Button>
      </div>
    </div>
  
    </>
  )
}

export default CourseList
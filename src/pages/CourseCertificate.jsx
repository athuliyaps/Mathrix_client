import React from 'react'
import { Button, Form, Modal } from 'react-bootstrap'


const CourseCertificate = ({showModal, handleClose, participantName, setParticipantName, collegeName, setCollegeName,handleGenerateCertificate }) => {
  return (
    <>
     <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Enter Participant Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="participantName">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" value={participantName} onChange={(e) => setParticipantName(e.target.value)} placeholder="Enter your name" />
          </Form.Group>
          <Form.Group controlId="collegeName" className="mt-3">
            <Form.Label>College</Form.Label>
            <Form.Control type="text" value={collegeName} onChange={(e) => setCollegeName(e.target.value)} placeholder="Enter college name" />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Close</Button>
        <Button variant="danger"  onClick={handleGenerateCertificate} disabled={!participantName || !collegeName}>Generate Certificate</Button>
      </Modal.Footer>
    </Modal>
    </>
  )
}

export default CourseCertificate
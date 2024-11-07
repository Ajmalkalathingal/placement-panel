import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import api from "../../api";

const InterviewDetailsModal = ({ showModal, handleCloseModal, studentId, onEmailSent }) => {
  const [interviewDetails, setInterviewDetails] = useState({
    venue: "",
    time: "",
    otherDetails: "",
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInterviewDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };
console.log(studentId)
  const handleSubmit = async () => {
    try {
      await api.post(`/api/interview-details/${studentId}/`, {
        job_application_id: studentId,
        ...interviewDetails,
      });
      console.log('ok')
      onEmailSent(studentId);
      handleCloseModal();
    } catch (err) {
      console.error("Error sending interview details:", err);
      setError("Failed to send interview details.");
    }
  };

  return (
    <Modal show={showModal} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Send Interview Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <p className="text-danger">{error}</p>}
        <Form>
          <Form.Group controlId="venue">
            <Form.Label>Venue</Form.Label>
            <Form.Control
              type="text"
              name="venue"
              value={interviewDetails.venue}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="time" className="mt-2">
            <Form.Label>Time</Form.Label>
            <Form.Control
              type="datetime-local"  // Changed to datetime-local for capturing date and time
              name="time"
              value={interviewDetails.time}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="otherDetails" className="mt-2">
            <Form.Label>Other Details</Form.Label>
            <Form.Control
              as="textarea"
              name="otherDetails"
              rows={3}
              value={interviewDetails.otherDetails}
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Send Details
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default InterviewDetailsModal;

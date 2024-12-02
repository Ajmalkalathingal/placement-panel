import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Image, Badge, Spinner, Container } from 'react-bootstrap';
import api from '../../api';
import "./student.css";


const InterviewDetails = () => {
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getInterviewDetails() {
      try {
        const response = await api.get('api/interview-details-list/');
        if (response) {
          setInterviews(response.data.results);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    getInterviewDetails();
  }, []);

  return (
    <Container className="py-4">
      <h2 className="text-center mb-4">Interview Details</h2>
      {loading ? (
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '50vh' }}>
          <Spinner animation="border" variant="primary" />
        </div>
      ) : interviews.length > 0 ? (
        <Row className="g-3" style={{ fontSize: '1.2rem' }}>
          {interviews.map((interview) => {
            const { id, venue, time, emailSent, job_application } = interview;
            const { job, status, applied_on, student } = job_application;
            const { title, recruiter, location, salary, job_type } = job || {};
            const formattedTime = new Date(time).toLocaleString();
            const appliedDate = new Date(applied_on).toLocaleDateString();

            return (
              <Col key={id} md={6} lg={4}>
                <Card className="shadow-sm border-0 h-100 rounded-4 ">
                  <Card.Body className="p-4">
                  <h5 className='mb-2'>Your selected for the interview</h5>
                    <div className="d-flex align-items-center mb-3">
                      <Image
                        src={recruiter?.company_logo || "https://via.placeholder.com/50"}
                        roundedCircle
                        width={50}
                        height={50}
                        alt={`${recruiter?.company_name || "Company"} logo`}
                        className="me-3 border border-2"
                      />
                      <div>
                        <h5 className="mb-1 text-truncate">{recruiter?.company_name || "Unknown Company"}</h5>
                        <small className="text-muted">
                          {location || "Location Unavailable"} | {job_type || "Job Type N/A"}
                        </small>
                      </div>
                    </div>
                    
                    <p className="mb-2">
                      <strong>Job Title:</strong> {title || "N/A"}
                    </p>
                    <p className="mb-2">
                      <strong>Venue:</strong> {venue || "N/A"}
                    </p>
                    <p className="mb-2">
                      <strong>Time:</strong> {formattedTime}
                    </p>
                    <p className="mb-2">
                      <strong>Salary:</strong> ${salary || "N/A"}
                    </p>
                    <p className="mb-2">
                      <strong>Applied On:</strong> {appliedDate}
                    </p>
                    <div className="mt-3">
                      <Badge
                        bg={status === "reviewed" ? "info" : status === "scheduled" ? "success" : "warning"}
                        className="p-2 rounded-pill"
                      >
                        {status ? status.charAt(0).toUpperCase() + status.slice(1) : "Status Unavailable"}
                      </Badge>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      ) : (
        <div className="text-center mt-5">
          <p className="text-muted fs-5">No interview details available.</p>
        </div>
      )}
    </Container>
  );
};

export default InterviewDetails;

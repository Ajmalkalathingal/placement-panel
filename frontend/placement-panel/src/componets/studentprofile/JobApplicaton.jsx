import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Image, Badge, Spinner } from 'react-bootstrap';
import api from '../../api';

const InterviewDetails = () => {
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true); // Track loading state

  useEffect(() => {
    async function getInterviewDetails() {
      try {
        const response = await api.get('api/interview-details-list/');
        console.log(response);
        if (response) {
          setInterviews(response.data.results);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false); // Set loading to false after the API request is done
      }
    }
    getInterviewDetails();
  }, []);

  return (
    <Row>
      {loading ? (
        // Show loading spinner while data is being fetched
        <Col className="text-center">
          <Spinner animation="border" variant="primary" />
        </Col>
      ) : interviews.length > 0 ? (
        // Display interviews once data is loaded
        interviews.map((interview) => {
          const { id, venue, time, emailSent, job_application } = interview;
          const { job, status, applied_on, student } = job_application;
          const { title, recruiter, location, salary, job_type } = job || {};
          const formattedTime = new Date(time).toLocaleString();
          const appliedDate = new Date(applied_on).toLocaleDateString();

          return (
            <Col key={id} md={6} lg={4} className="mb-4">
              <Card className="shadow-sm border h-100 rounded-3 mt-4">
                <Card.Body>
                  <div className="d-flex align-items-center mb-3">
                    <Image
                      src={recruiter?.company_logo || "https://via.placeholder.com/50"}
                      roundedCircle
                      width={50}
                      height={50}
                      alt={`${recruiter?.company_name} logo`}
                      className="me-3 border"
                    />
                    <div>
                      <h5 className="card-title mb-1">{recruiter?.company_name}</h5>
                      <small className="text-muted">
                        {location} | {job_type}
                      </small>
                    </div>
                  </div>
                  <p className="mb-1">
                    <strong>Job Title:</strong> {title}
                  </p>
                  <p className="mb-1">
                    <strong>Interview Venue:</strong> {venue}
                  </p>
                  <p className="mb-1">
                    <strong>Interview Time:</strong> {formattedTime}
                  </p>
                  <p className="mb-1">
                    <strong>Salary:</strong> ${salary}
                  </p>
                  <p className="mb-1">
                    <strong>Applied On:</strong> {appliedDate}
                  </p>
                  <div className="mt-3">
                    <Badge
                      bg={status === "reviewed" ? "secondary" : "primary"}
                      className="p-2"
                    >
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </Badge>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          );
        })
      ) : (
        <Col className="text-center">
          <p className="text-muted">
            No interview details available.
          </p>
        </Col>
      )}
    </Row>
  );
};

export default InterviewDetails;

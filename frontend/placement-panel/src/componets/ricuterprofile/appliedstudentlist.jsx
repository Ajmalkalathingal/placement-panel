import React, { useEffect, useState } from "react";
import {
  Badge,
  Image,
  Spinner,
  Card,
  Row,
  Col,
  Container,
  Button,
} from "react-bootstrap";
import api from "../../api";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import InterviewDetailsModal from "./InterviewDetailsModal";

const AppliedStudentList = () => {
  const [students, setStudents] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  useEffect(() => {
    const fetchAppliedStudents = async () => {
      try {
        const response = await api.get(`/api/recruiter/job-applications/`);
        setStudents(response.data);
      } catch (err) {
        console.error(err);
        setError("Error fetching applied students");
      } finally {
        setLoading(false);
      }
    };

    fetchAppliedStudents();
  }, [students]);

  const handleStatusChange = async (studentId, status) => {
    try {
      await api.patch(`/api/recruiter/job-applications/${studentId}/`, {
        status,
      });
      setStudents((prevStudents) =>
        prevStudents.map((student) =>
          student.id === studentId ? { ...student, status } : student
        )
      );
    } catch (err) {
      console.error("Error updating status", err);
      setError("Failed to update student status");
    }
  };

  const handleShowModal = (student) => {
    setSelectedStudent(student);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleEmailSent = (studentId) => {
    setStudents((prevStudents) =>
      prevStudents.map((student) =>
        student === studentId ? { ...student, emailSent: true } : student
      )
    );
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center mt-5">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  if (error) {
    return <p className="text-center text-danger">{error}</p>;
  }
  console.log(students);
  return (
    <Container className="mt-5">
      <h2 className="text-primary mb-4 text-center">
        Applied Students for Your Jobs
      </h2>
      <Row>
        {students.length > 0 ? (
          students.map((student) => (
            <Col key={student.id} md={6} lg={4} className="mb-4">
              <Card className="shadow-sm border h-100 rounded-3">
                <Card.Body>
                  <div className="d-flex align-items-center mb-3">
                    <Image
                      src={
                        student.student.img || "https://via.placeholder.com/50"
                      }
                      roundedCircle
                      width={50}
                      height={50}
                      alt={`${student.student.user.first_name}'s profile`}
                      className="me-3 border"
                    />
                    <div>
                      <h5 className="card-title mb-1">
                        {student.student.user.first_name}
                      </h5>
                      <small className="text-muted">
                        {student.student.user.email}
                      </small>
                    </div>
                  </div>
                  <p className="mb-1">
                    <strong>Graduation Year:</strong>{" "}
                    {student.student.graduation_year || "current"}
                  </p>
                  <p className="mb-1">
                    <strong>Course:</strong>{" "}
                    {student.student.registration.course || "N/A"}
                  </p>
                  <p className="mb-1">
                    <strong>Email:</strong>{" "}
                    {student.student.user.email || "N/A"}
                  </p>
                  {student.student.resume && (
                    <p className="mb-1">
                      <strong>Resume:</strong>{" "}
                      <a
                        href={student.student.resume}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View Resume
                      </a>
                    </p>
                  )}
                  <p className="mb-1">
                    <strong>Applied On:</strong>{" "}
                    {new Date(student.applied_on).toLocaleDateString()}
                  </p>
                  <div className="mt-3">
                    <Badge
                      bg={
                        student.status === "accepted"
                          ? "success"
                          : student.status === "rejected"
                          ? "danger"
                          : student.status === "reviewed"
                          ? "warning"
                          : "secondary"
                      }
                      className="p-2"
                    >
                      {student.status.charAt(0).toUpperCase() +
                        student.status.slice(1)}
                    </Badge>
                    <div className="mt-2">
                      {!student.email_sent ? (
                        <Button
                          variant="primary"
                          className="me-2 d-flex align-items-center"
                          onClick={() => handleShowModal(student.id)}
                        >
                          <FontAwesomeIcon
                            icon={faPaperPlane}
                            className="me-2"
                          />
                          Send Interview Details
                        </Button>
                      ) : (
                        <div className="d-flex align-items-center">
                          <FontAwesomeIcon
                            icon={faCheckCircle}
                            className="text-success me-2"
                          />{" "}
                          {/* Success Icon */}
                          <span className="">Email Sent</span>
                        </div>
                      )}
                      {student.status === "rejected" ? (
                        <Button
                          variant="success"
                          onClick={() =>
                            handleStatusChange(student.id, "accepted")
                          }
                        >
                          Accept
                        </Button>
                      ) : (
                        <Button
                          variant="danger"
                          className="me-2"
                          onClick={() =>
                            handleStatusChange(student.id, "rejected")
                          }
                        >
                          Reject
                        </Button>
                      )}
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <Col className="text-center">
            <p className="text-muted">
              No students have applied for your jobs.
            </p>
          </Col>
        )}
      </Row>

      {/* Modal for Sending Interview Details */}
      {selectedStudent && (
        <InterviewDetailsModal
          showModal={showModal}
          handleCloseModal={handleCloseModal}
          studentId={selectedStudent}
          onEmailSent={() => handleEmailSent(selectedStudent.id)}
        />
      )}
    </Container>
  );
};

export default AppliedStudentList;

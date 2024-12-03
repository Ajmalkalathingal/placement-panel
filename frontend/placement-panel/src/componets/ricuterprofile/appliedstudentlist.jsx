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
  Dropdown,
  Table,
} from "react-bootstrap";
import api from "../../api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import InterviewDetailsModal from "./InterviewDetailsModal";

const AppliedStudentList = () => {
  const [students, setStudents] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  useEffect(() => {
    // Fetch the recruiter's job posts on component mount
    const fetchJobs = async () => {
      try {
        const response = await api.get(`/api/jobs/`);
        if (response.data && response.data.results) {
          setJobs(response.data.results);
        }
      } catch (err) {
        console.error("Error fetching jobs", err);
        setError("Failed to load job posts");
      }
    };

    fetchJobs();
  }, []);

  const fetchAppliedStudents = async (jobId) => {
    console.log(jobId);
    setLoading(true);
    // setStudents([]);
    setError(null);
    try {
      const response = await api.get(
        `/api/recruiter/job-applicants/${jobId}/`
      );
      if (response.data) {
        setStudents(response.data);
      }
    } catch (err) {
      console.error("Error fetching applied students", err);
      setError("Error fetching applied students");
    } finally {
      setLoading(false);
    }
  };

  const handleJobSelection = (job) => {
    setSelectedJob(job);
    fetchAppliedStudents(job.id);
  };

  const handleStatusChange = async (studentId, status) => {
    try {
      const response = await api.patch(`/api/recruiter/job-applications/${studentId}/`, {
        status,
      });
      console.log(response)
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
        student.id === studentId ? { ...student, emailSent: true } : student
      )
    );
  };

  return (
    <Container className="mt-5">
      <h2 className="text-primary mb-4 text-center">Applied Students</h2>
      <Row className="justify-content-center">
  {jobs.map((job) => (
    <Col key={job.id} md={4} lg={3} className="mb-4">
      <Card
        className={`shadow-sm p-3 rounded-3 ${
          selectedJob && selectedJob.id === job.id
            ? "bg-primary text-white"
            : "border-secondary"
        }`}
        onClick={() => handleJobSelection(job)}
        style={{ cursor: "pointer", transition: "transform 0.2s" }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      >
        <Card.Body>
          <Card.Title className="fs-5 mb-2 text-truncate">
            {job.title}
          </Card.Title>
          <Card.Text className="text-muted mb-3 small">
            Applications: {job.application_count}
          </Card.Text>
          <div className="mb-2">
            <span className="badge bg-success text-white small">
              {job.job_type.replace("-", " ").toUpperCase()}
            </span>
          </div>
          <div className="text-muted small w-100 text-end">
            <strong>Deadline:</strong>{" "}
            <span className="fw-bold">
              {new Date(job.deadline).toISOString().split("T")[0]}
            </span>
          </div>
        </Card.Body>
      </Card>
    </Col>
  ))}
</Row>



      {loading ? (
        <div className="d-flex justify-content-center mt-5">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : error ? (
        <p className="text-center text-danger">{error}</p>
      ) : students.length > 0 ? (
        <Table striped bordered hover responsive className="mt-4">
          <thead className="table-primary">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Graduation Year</th>
              <th>Course</th>
              <th>Resume</th>
              <th>Applied On</th>
              <th>Status</th>
              <th>Actions</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr key={student.id}>
                <td>{index + 1}</td>
                <td>{student.student.user.first_name}</td>
                <td>{student.student.user.email}</td>
                <td>{student.student.graduation_year || "current"}</td>
                <td>{student.student.registration.course || "N/A"}</td>
                <td>
                  {student.student.resume ? (
                    <a
                      href={student.student.resume}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Resume
                    </a>
                  ) : (
                    "N/A"
                  )}
                </td>
                <td>{new Date(student.applied_on).toLocaleDateString()}</td>
                <td>
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
                  >
                    {student.status.charAt(0).toUpperCase() +
                      student.status.slice(1)}
                  </Badge>
                </td>
                <td>
                  <div className="d-flex flex-column gap-2">
                    {!student.email_sent ? (
                      <Button
                        variant="primary"
                        className="d-flex align-items-center"
                        onClick={() => handleShowModal(student.id)}
                      >
                        <FontAwesomeIcon icon={faPaperPlane} className="me-2" />
                        Send Interview Details
                      </Button>
                    ) : (
                      <div className="d-flex align-items-center">
                        <FontAwesomeIcon
                          icon={faCheckCircle}
                          className="text-success me-2"
                        />
                        <span>Email Sent</span>
                      </div>
                    )}
                  </div>
                </td>
                <td>
                  <div className="d-flex flex-column gap-2">
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
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p className="text-muted text-center mt-4">
          No students have applied for this job.
        </p>
      )}

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
